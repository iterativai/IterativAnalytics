import { OpenAI } from 'openai';
import { CosmosClient } from '@azure/cosmos';
import { BlobServiceClient } from '@azure/storage-blob';
import { AppConfigurationClient } from '@azure/app-configuration';
import { DefaultAzureCredential } from '@azure/identity';

// Azure OpenAI Configuration
export class AzureOpenAIService {
  private client: OpenAI | null = null;
  private isAzureConfigured: boolean = false;

  constructor() {
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    
    if (endpoint && apiKey) {
      this.client = new OpenAI({
        apiKey: apiKey,
        baseURL: `${endpoint}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4'}/`,
        defaultQuery: { 'api-version': '2024-02-01' },
        defaultHeaders: {
          'api-key': apiKey,
        },
      });
      this.isAzureConfigured = true;
    }
  }

  async analyzeBusinessPlan(content: string, documentType: string): Promise<any> {
    try {
      const response = await this.client.chat.completions.create({
        model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert business analyst specializing in ${documentType} evaluation. 
            Analyze the provided content and return a comprehensive assessment in JSON format with:
            - overallScore (0-100)
            - feasibilityScore (0-100)
            - scalabilityScore (0-100) 
            - financialHealthScore (0-100)
            - innovationScore (0-100)
            - marketFitScore (0-100)
            - improvementAreas (array of {area, score, suggestion})
            - comparisonData ({industryAverage, topPerformers})
            - summary (detailed analysis)`
          },
          {
            role: 'user',
            content: `Analyze this ${documentType}:\n\n${content}`
          }
        ],
        max_tokens: 2000,
        temperature: 0.3,
        response_format: { type: 'json_object' }
      });

      return JSON.parse(response.choices[0].message?.content || '{}');
    } catch (error) {
      console.error('Azure OpenAI analysis error:', error);
      throw new Error('Failed to analyze document with Azure OpenAI');
    }
  }

  async generateInvestorInsights(businessData: any): Promise<string> {
    try {
      const response = await this.client.getChatCompletions(
        process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4',
        [
          {
            role: 'system',
            content: 'You are an expert investor advisor. Generate actionable insights for improving investment readiness.'
          },
          {
            role: 'user',
            content: `Based on this business analysis: ${JSON.stringify(businessData)}, provide specific recommendations for improving investor appeal.`
          }
        ],
        {
          maxTokens: 1000,
          temperature: 0.4
        }
      );

      return response.choices[0].message?.content || '';
    } catch (error) {
      console.error('Azure OpenAI insights error:', error);
      throw new Error('Failed to generate investor insights');
    }
  }
}

// Azure Cosmos DB Configuration
export class AzureCosmosService {
  private client: CosmosClient;
  private database: any;
  private containers: { [key: string]: any } = {};

  constructor() {
    const endpoint = process.env.AZURE_COSMOS_ENDPOINT!;
    const key = process.env.AZURE_COSMOS_KEY!;
    
    this.client = new CosmosClient({ endpoint, key });
    this.initializeDatabase();
  }

  private async initializeDatabase() {
    try {
      const { database } = await this.client.databases.createIfNotExists({
        id: 'IterativPlannerDB'
      });
      this.database = database;

      // Create containers
      await this.createContainer('users', '/userId');
      await this.createContainer('documents', '/userId');
      await this.createContainer('analyses', '/documentId');
      await this.createContainer('activities', '/userId');
    } catch (error) {
      console.error('Cosmos DB initialization error:', error);
    }
  }

  private async createContainer(containerId: string, partitionKey: string) {
    try {
      const { container } = await this.database.containers.createIfNotExists({
        id: containerId,
        partitionKey: { paths: [partitionKey] }
      });
      this.containers[containerId] = container;
    } catch (error) {
      console.error(`Error creating container ${containerId}:`, error);
    }
  }

  async createDocument(containerName: string, document: any): Promise<any> {
    try {
      const { resource } = await this.containers[containerName].items.create(document);
      return resource;
    } catch (error) {
      console.error('Cosmos DB create error:', error);
      throw error;
    }
  }

  async getDocument(containerName: string, id: string, partitionKeyValue: string): Promise<any> {
    try {
      const { resource } = await this.containers[containerName].item(id, partitionKeyValue).read();
      return resource;
    } catch (error) {
      console.error('Cosmos DB read error:', error);
      return null;
    }
  }

  async queryDocuments(containerName: string, query: string, parameters: any[] = []): Promise<any[]> {
    try {
      const { resources } = await this.containers[containerName].items.query({
        query,
        parameters
      }).fetchAll();
      return resources;
    } catch (error) {
      console.error('Cosmos DB query error:', error);
      return [];
    }
  }

  async updateDocument(containerName: string, id: string, partitionKeyValue: string, updates: any): Promise<any> {
    try {
      const { resource } = await this.containers[containerName].item(id, partitionKeyValue).replace(updates);
      return resource;
    } catch (error) {
      console.error('Cosmos DB update error:', error);
      throw error;
    }
  }
}

// Azure Blob Storage Configuration
export class AzureBlobService {
  private blobServiceClient: BlobServiceClient;
  private containerName = 'business-documents';

  constructor() {
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING!;
    this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    this.initializeContainer();
  }

  private async initializeContainer() {
    try {
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      await containerClient.createIfNotExists({
        access: 'blob'
      });
    } catch (error) {
      console.error('Blob container initialization error:', error);
    }
  }

  async uploadDocument(fileName: string, fileBuffer: Buffer, contentType: string): Promise<string> {
    try {
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      const blobName = `${Date.now()}-${fileName}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      await blockBlobClient.upload(fileBuffer, fileBuffer.length, {
        blobHTTPHeaders: { blobContentType: contentType }
      });

      return blockBlobClient.url;
    } catch (error) {
      console.error('Blob upload error:', error);
      throw new Error('Failed to upload document to Azure Blob Storage');
    }
  }

  async downloadDocument(blobName: string): Promise<Buffer> {
    try {
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      
      const downloadResponse = await blockBlobClient.download();
      const chunks: Buffer[] = [];
      
      if (downloadResponse.readableStreamBody) {
        for await (const chunk of downloadResponse.readableStreamBody) {
          chunks.push(chunk);
        }
      }
      
      return Buffer.concat(chunks);
    } catch (error) {
      console.error('Blob download error:', error);
      throw new Error('Failed to download document from Azure Blob Storage');
    }
  }

  async deleteDocument(blobName: string): Promise<void> {
    try {
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.delete();
    } catch (error) {
      console.error('Blob delete error:', error);
      throw new Error('Failed to delete document from Azure Blob Storage');
    }
  }

  async listDocuments(prefix?: string): Promise<string[]> {
    try {
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      const blobs = [];
      
      for await (const blob of containerClient.listBlobsFlat({ prefix })) {
        blobs.push(blob.name);
      }
      
      return blobs;
    } catch (error) {
      console.error('Blob list error:', error);
      return [];
    }
  }
}

// Azure App Configuration Service
export class AzureConfigService {
  private client: AppConfigurationClient;

  constructor() {
    const connectionString = process.env.AZURE_APP_CONFIG_CONNECTION_STRING!;
    this.client = new AppConfigurationClient(connectionString);
  }

  async getConfiguration(key: string): Promise<string | undefined> {
    try {
      const setting = await this.client.getConfigurationSetting({ key });
      return setting.value;
    } catch (error) {
      console.error('App Config get error:', error);
      return undefined;
    }
  }

  async setConfiguration(key: string, value: string, label?: string): Promise<void> {
    try {
      await this.client.setConfigurationSetting({
        key,
        value,
        label
      });
    } catch (error) {
      console.error('App Config set error:', error);
      throw error;
    }
  }

  async getFeatureFlag(flagName: string): Promise<boolean> {
    try {
      const setting = await this.client.getConfigurationSetting({
        key: `.appconfig.featureflag/${flagName}`
      });
      return JSON.parse(setting.value || '{}').enabled || false;
    } catch (error) {
      console.error('Feature flag error:', error);
      return false;
    }
  }
}

// Combined Azure Services Manager
export class AzureServicesManager {
  public openai: AzureOpenAIService;
  public cosmos: AzureCosmosService;
  public blob: AzureBlobService;
  public config: AzureConfigService;

  constructor() {
    this.openai = new AzureOpenAIService();
    this.cosmos = new AzureCosmosService();
    this.blob = new AzureBlobService();
    this.config = new AzureConfigService();
  }

  async healthCheck(): Promise<{ [service: string]: boolean }> {
    const results: { [service: string]: boolean } = {};

    try {
      // Test OpenAI
      await this.openai.generateInvestorInsights({ test: true });
      results.openai = true;
    } catch {
      results.openai = false;
    }

    try {
      // Test Cosmos DB
      await this.cosmos.queryDocuments('users', 'SELECT TOP 1 * FROM c');
      results.cosmos = true;
    } catch {
      results.cosmos = false;
    }

    try {
      // Test Blob Storage
      await this.blob.listDocuments();
      results.blob = true;
    } catch {
      results.blob = false;
    }

    try {
      // Test App Configuration
      await this.config.getConfiguration('test-key');
      results.config = true;
    } catch {
      results.config = false;
    }

    return results;
  }
}

export const azureServices = new AzureServicesManager();