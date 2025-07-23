
#!/bin/bash

# Azure Deployment Script for Replit
# This script helps deploy the Iterativ Analytics application to Azure while keeping it running on Replit

set -e

echo "🚀 Azure Deployment Helper for Iterativ Analytics"
echo "This script prepares your application for Azure deployment while keeping it running on Replit"

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "⚠️  Azure CLI not found. Installing..."
    curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
fi

# Login check
if ! az account show &> /dev/null; then
    echo "Please login to Azure first:"
    echo "Run: az login"
    exit 1
fi

# Configuration
RESOURCE_GROUP="rg-iterativ-analytics"
LOCATION="South Africa North"
APP_NAME="iterativ-analytics"
SUBSCRIPTION=$(az account show --query id -o tsv)

echo "📋 Deployment Configuration:"
echo "  Resource Group: $RESOURCE_GROUP"
echo "  Location: $LOCATION"
echo "  App Name: $APP_NAME"
echo "  Subscription: $SUBSCRIPTION"

# Create .env.azure for Azure-specific environment variables
echo "🔧 Creating Azure environment configuration..."

cat > .env.azure << 'EOF'
# Azure Environment Variables
# Copy these to your Azure App Service Application Settings

# Core Azure Settings
NODE_ENV=production
PORT=8080
WEBSITES_ENABLE_APP_SERVICE_STORAGE=false

# Azure OpenAI Configuration
AZURE_OPENAI_ENDPOINT=https://your-openai-resource.openai.azure.com/
AZURE_OPENAI_API_KEY=your-openai-api-key-here
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4

# Azure Cosmos DB Configuration
AZURE_COSMOS_ENDPOINT=https://your-cosmos-account.documents.azure.com:443/
AZURE_COSMOS_KEY=your-cosmos-key-here

# Azure Blob Storage Configuration
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=your-storage-account;AccountKey=your-storage-key;EndpointSuffix=core.windows.net

# Azure Redis Cache Configuration
AZURE_REDIS_CONNECTION_STRING=your-redis-connection-string-here

# Azure Key Vault Configuration
AZURE_KEY_VAULT_NAME=your-keyvault-name

# Azure Identity Configuration (for managed identity)
AZURE_CLIENT_ID=your-managed-identity-client-id
AZURE_TENANT_ID=your-tenant-id
AZURE_CLIENT_SECRET=your-client-secret

# Application Insights
APPINSIGHTS_INSTRUMENTATIONKEY=your-insights-key
EOF

# Create web.config for Azure App Service
echo "📄 Creating web.config for Azure App Service..."

cat > web.config << 'EOF'
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <handlers>
      <add name="iisnode" path="server/index.js" verb="*" modules="iisnode"/>
    </handlers>
    <rewrite>
      <rules>
        <rule name="DynamicContent">
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="True"/>
          </conditions>
          <action type="Rewrite" url="server/index.js"/>
        </rule>
      </rules>
    </rewrite>
    <security>
      <requestFiltering removeServerHeader="true"/>
    </security>
    <httpErrors existingResponse="PassThrough" />
    <iisnode watchedFiles="web.config;*.js"/>
  </system.webServer>
</configuration>
EOF

# Create Azure-specific package.json scripts
echo "📦 Creating Azure deployment package.json..."

# Read current package.json and add Azure scripts
node << 'EOF'
const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Add Azure-specific scripts
packageJson.scripts = {
  ...packageJson.scripts,
  'azure:build': 'npm run build',
  'azure:start': 'node server/index.js',
  'azure:install': 'npm ci --production',
  'azure:postinstall': 'npm run build'
};

// Add Azure dependencies if not present
if (!packageJson.dependencies['@azure/identity']) {
  packageJson.dependencies['@azure/identity'] = '^3.4.2';
}
if (!packageJson.dependencies['@azure/keyvault-secrets']) {
  packageJson.dependencies['@azure/keyvault-secrets'] = '^4.7.0';
}
if (!packageJson.dependencies['@azure/storage-blob']) {
  packageJson.dependencies['@azure/storage-blob'] = '^12.17.0';
}
if (!packageJson.dependencies['@azure/cosmos']) {
  packageJson.dependencies['@azure/cosmos'] = '^4.4.1';
}
if (!packageJson.dependencies['redis']) {
  packageJson.dependencies['redis'] = '^4.6.10';
}

fs.writeFileSync('package-azure.json', JSON.stringify(packageJson, null, 2));
EOF

# Create startup script for Azure
echo "🔧 Creating startup script for Azure App Service..."

cat > startup.sh << 'EOF'
#!/bin/bash
echo "Starting Iterativ Analytics on Azure App Service..."

# Install dependencies
echo "Installing dependencies..."
npm ci --production

# Build the application
echo "Building application..."
npm run build

# Start the application
echo "Starting application..."
npm run azure:start
EOF

chmod +x startup.sh

# Create ARM template for infrastructure
echo "🏗️ Creating Azure Resource Manager template..."

cat > azure-template.json << 'EOF'
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {
    "siteName": {
      "type": "string",
      "defaultValue": "iterativ-analytics",
      "metadata": {
        "description": "The name of the web app that you wish to create."
      }
    },
    "location": {
      "type": "string",
      "defaultValue": "[resourceGroup().location]",
      "metadata": {
        "description": "Location for all resources."
      }
    }
  },
  "variables": {
    "hostingPlanName": "[concat(parameters('siteName'), '-plan')]",
    "cosmosAccountName": "[concat(parameters('siteName'), '-cosmos')]",
    "storageAccountName": "[concat(replace(parameters('siteName'), '-', ''), 'storage')]",
    "redisName": "[concat(parameters('siteName'), '-redis')]"
  },
  "resources": [
    {
      "type": "Microsoft.Web/serverfarms",
      "apiVersion": "2020-06-01",
      "name": "[variables('hostingPlanName')]",
      "location": "[parameters('location')]",
      "sku": {
        "name": "B1",
        "capacity": 1
      },
      "properties": {
        "name": "[variables('hostingPlanName')]"
      }
    },
    {
      "type": "Microsoft.Web/sites",
      "apiVersion": "2020-06-01",
      "name": "[parameters('siteName')]",
      "location": "[parameters('location')]",
      "dependsOn": [
        "[resourceId('Microsoft.Web/serverfarms', variables('hostingPlanName'))]"
      ],
      "properties": {
        "serverFarmId": "[resourceId('Microsoft.Web/serverfarms', variables('hostingPlanName'))]",
        "siteConfig": {
          "nodeVersion": "18.x",
          "appSettings": [
            {
              "name": "NODE_ENV",
              "value": "production"
            },
            {
              "name": "WEBSITES_ENABLE_APP_SERVICE_STORAGE",
              "value": "false"
            }
          ]
        }
      }
    }
  ]
}
EOF

echo "✅ Azure deployment preparation complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Review and update .env.azure with your Azure resource details"
echo "2. Deploy infrastructure: az deployment group create --resource-group $RESOURCE_GROUP --template-file azure-template.json"
echo "3. Configure Azure App Service with environment variables from .env.azure"
echo "4. Deploy code: az webapp deployment source config-zip --resource-group $RESOURCE_GROUP --name $APP_NAME --src deployment.zip"
echo ""
echo "🔗 Useful Azure Commands:"
echo "  Create resource group: az group create --name $RESOURCE_GROUP --location \"$LOCATION\""
echo "  Deploy template: az deployment group create --resource-group $RESOURCE_GROUP --template-file azure-template.json"
echo "  Set app settings: az webapp config appsettings set --resource-group $RESOURCE_GROUP --name $APP_NAME --settings @.env.azure"
echo "  View logs: az webapp log tail --resource-group $RESOURCE_GROUP --name $APP_NAME"
echo ""
echo "📚 Documentation:"
echo "  Azure App Service: https://docs.microsoft.com/en-us/azure/app-service/"
echo "  Azure OpenAI: https://docs.microsoft.com/en-us/azure/cognitive-services/openai/"
echo ""
echo "🎉 Your application is ready for Azure deployment while continuing to run on Replit!"
