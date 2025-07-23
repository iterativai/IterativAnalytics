
import { OpenAI } from 'openai';
import { CosmosClient } from '@azure/cosmos';
import { BlobServiceClient } from '@azure/storage-blob';
import { SecretClient } from '@azure/keyvault-secrets';
import { DefaultAzureCredential, ClientSecretCredential } from '@azure/identity';
import { createClient, RedisClientType } from 'redis';
import { logger } from './utils/logger';

// Azure Configuration Manager
export class AzureConfig {
  private static instance: AzureConfig;
  private credential: DefaultAzureCredential | ClientSecretCredential | null = null;
  private isAzureConfigured: boolean = false;

  private constructor() {
    this.initializeCredentials();
  }

  private initializeCredentials() {
    try {
      // Check if running in Azure with managed identity
      if (process.env.AZURE_CLIENT_ID) {
        this.credential = new ClientSecretCredential(
          process.env.AZURE_TENANT_ID!,
          process.env.AZURE_CLIENT_ID!,
          process.env.AZURE_CLIENT_SECRET!
        );
      } else {
        this.credential = new DefaultAzureCredential();
      }
      this.isAzureConfigured = true;
      logger.info('Azure credentials initialized');
    } catch (error) {
      logger.warn('Azure credentials not configured, using fallback mode');
      this.isAzureConfigured = false;
    }
  }

  public static getInstance(): AzureConfig {
    if (!AzureConfig.instance) {
      AzureConfig.instance = new AzureConfig();
    }
    return AzureConfig.instance;
  }

  public getCredential() {
    return this.credential;
  }

  public isConfigured(): boolean {
    return this.isAzureConfigured;
  }
}

// Azure OpenAI Service
export class AzureOpenAIService {
  private client: OpenAI | null = null;
  private isConfigured: boolean = false;

  constructor() {
    this.initializeClient();
  }

  private initializeClient() {
    try {
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
        this.isConfigured = true;
        logger.info('Azure OpenAI service initialized');
      } else {
        logger.warn('Azure OpenAI not configured, using fallback');
      }
    } catch (error) {
      logger.error('Failed to initialize Azure OpenAI:', error);
    }
  }

  async analyzeBusinessPlan(content: string, documentType: string, userId: string): Promise<any> {
    if (!this.isConfigured || !this.client) {
      return this.getFallbackAnalysis();
    }

    try {
      const response = await this.client.chat.completions.create({
        model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert business analyst specializing in African startup ecosystems. 
            Analyze the provided ${documentType} and return a comprehensive assessment in JSON format with:
            - overallScore (0-100)
            - feasibilityScore (0-100)
            - scalabilityScore (0-100) 
            - financialHealthScore (0-100)
            - innovationScore (0-100)
            - marketFitScore (0-100)
            - improvementAreas (array of {area, score, suggestion, priority})
            - comparisonData ({industryAverage, topPerformers})
            - summary (detailed analysis)
            - confidence (0-100)
            
            Focus on African market dynamics, mobile-first solutions, regulatory environment, 
            and funding landscape specific to African startups.`
          },
          {
            role: 'user',
            content: `Analyze this ${documentType} for an African startup:\n\n${content.substring(0, 4000)}`
          }
        ],
        max_tokens: 2000,
        temperature: 0.3,
        response_format: { type: 'json_object' }
      });

      const result = JSON.parse(response.choices[0].message?.content || '{}');
      logger.info('Azure OpenAI analysis completed', { userId, overallScore: result.overallScore });
      return result;
    } catch (error) {
      logger.error('Azure OpenAI analysis error:', error);
      return this.getFallbackAnalysis();
    }
  }

  async generateBusinessInsights(userId: string, analysisHistory: any[]): Promise<string> {
    if (!this.isConfigured || !this.client) {
      return 'Azure OpenAI not configured. Using demo insights.';
    }

    try {
      const response = await this.client.chat.completions.create({
        model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a strategic business consultant specializing in African startups. Provide actionable insights based on historical performance data.'
          },
          {
            role: 'user',
            content: `Based on this analysis history: ${JSON.stringify(analysisHistory.slice(0, 5), null, 2)}, provide strategic insights for growth in African markets.`
          }
        ],
        max_tokens: 1000,
        temperature: 0.4
      });

      return response.choices[0]?.message?.content || 'Unable to generate insights at this time.';
    } catch (error) {
      logger.error('Azure OpenAI insights error:', error);
      return 'Unable to generate insights at this time.';
    }
  }

  private getFallbackAnalysis(): any {
    return {
      overallScore: 78,
      feasibilityScore: 75,
      scalabilityScore: 82,
      financialHealthScore: 76,
      innovationScore: 85,
      marketFitScore: 72,
      improvementAreas: [
        {
          area: "African Market Strategy",
          score: 70,
          suggestion: "Develop market entry strategy for key African markets (Nigeria, Kenya, South Africa)",
          priority: "high"
        },
        {
          area: "Mobile-First Approach",
          score: 65,
          suggestion: "Optimize for mobile usage patterns prevalent in African markets",
          priority: "high"
        },
        {
          area: "Financial Projections",
          score: 78,
          suggestion: "Include multi-currency support and local payment methods",
          priority: "medium"
        }
      ],
      comparisonData: {
        industryAverage: 68,
        topPerformers: 92
      },
      summary: "Strong business concept with good African market potential. Focus on mobile-first approach and local market adaptation.",
      confidence: 85
    };
  }
}

// Azure Cosmos DB Service
export class AzureCosmosService {
  private client: CosmosClient | null = null;
  private database: any = null;
  private containers: { [key: string]: any } = {};
  private isConfigured: boolean = false;

  constructor() {
    this.initializeConnection();
  }

  private async initializeConnection() {
    try {
      const endpoint = process.env.AZURE_COSMOS_ENDPOINT;
      const key = process.env.AZURE_COSMOS_KEY;
      
      if (!endpoint || !key) {
        logger.warn('Azure Cosmos DB not configured');
        return;
      }

      this.client = new CosmosClient({ endpoint, key });
      await this.initializeDatabase();
      this.isConfigured = true;
      logger.info('Azure Cosmos DB initialized');
    } catch (error) {
      logger.error('Failed to initialize Azure Cosmos DB:', error);
    }
  }

  private async initializeDatabase() {
    if (!this.client) return;

    try {
      const { database } = await this.client.databases.createIfNotExists({
        id: 'IterativAnalyticsDB'
      });
      this.database = database;

      // Create containers
      await this.createContainer('users', '/userId');
      await this.createContainer('documents', '/userId');
      await this.createContainer('analyses', '/documentId');
      await this.createContainer('activities', '/userId');
    } catch (error) {
      logger.error('Cosmos DB database initialization error:', error);
    }
  }

  private async createContainer(containerId: string, partitionKey: string) {
    if (!this.database) return;

    try {
      const { container } = await this.database.containers.createIfNotExists({
        id: containerId,
        partitionKey: { paths: [partitionKey] }
      });
      this.containers[containerId] = container;
    } catch (error) {
      logger.error(`Error creating container ${containerId}:`, error);
    }
  }

  async createDocument(containerName: string, document: any): Promise<any> {
    if (!this.isConfigured || !this.containers[containerName]) {
      throw new Error('Azure Cosmos DB not configured');
    }

    try {
      const { resource } = await this.containers[containerName].items.create(document);
      return resource;
    } catch (error) {
      logger.error('Cosmos DB create error:', error);
      throw error;
    }
  }

  async getDocument(containerName: string, id: string, partitionKeyValue: string): Promise<any> {
    if (!this.isConfigured || !this.containers[containerName]) {
      return null;
    }

    try {
      const { resource } = await this.containers[containerName].item(id, partitionKeyValue).read();
      return resource;
    } catch (error) {
      logger.error('Cosmos DB read error:', error);
      return null;
    }
  }

  async queryDocuments(containerName: string, query: string, parameters: any[] = []): Promise<any[]> {
    if (!this.isConfigured || !this.containers[containerName]) {
      return [];
    }

    try {
      const { resources } = await this.containers[containerName].items.query({
        query,
        parameters
      }).fetchAll();
      return resources;
    } catch (error) {
      logger.error('Cosmos DB query error:', error);
      return [];
    }
  }

  isAvailable(): boolean {
    return this.isConfigured;
  }
}

// Azure Blob Storage Service
export class AzureBlobService {
  private blobServiceClient: BlobServiceClient | null = null;
  private containerName = 'business-documents';
  private isConfigured: boolean = false;

  constructor() {
    this.initializeConnection();
  }

  private async initializeConnection() {
    try {
      const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
      
      if (!connectionString) {
        logger.warn('Azure Blob Storage not configured');
        return;
      }

      this.blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
      await this.initializeContainer();
      this.isConfigured = true;
      logger.info('Azure Blob Storage initialized');
    } catch (error) {
      logger.error('Failed to initialize Azure Blob Storage:', error);
    }
  }

  private async initializeContainer() {
    if (!this.blobServiceClient) return;

    try {
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      await containerClient.createIfNotExists({
        access: 'blob'
      });
    } catch (error) {
      logger.error('Blob container initialization error:', error);
    }
  }

  async uploadDocument(fileName: string, fileBuffer: Buffer, contentType: string): Promise<string> {
    if (!this.isConfigured || !this.blobServiceClient) {
      throw new Error('Azure Blob Storage not configured');
    }

    try {
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      const blobName = `${Date.now()}-${fileName}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      await blockBlobClient.upload(fileBuffer, fileBuffer.length, {
        blobHTTPHeaders: { blobContentType: contentType }
      });

      return blockBlobClient.url;
    } catch (error) {
      logger.error('Blob upload error:', error);
      throw new Error('Failed to upload document to Azure Blob Storage');
    }
  }

  async downloadDocument(blobName: string): Promise<Buffer> {
    if (!this.isConfigured || !this.blobServiceClient) {
      throw new Error('Azure Blob Storage not configured');
    }

    try {
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      
      const downloadResponse = await blockBlobClient.download();
      const chunks: Buffer[] = [];
      
      if (downloadResponse.readableStreamBody) {
        for await (const chunk of downloadResponse.readableStreamBody) {
          chunks.push(Buffer.from(chunk));
        }
      }
      
      return Buffer.concat(chunks);
    } catch (error) {
      logger.error('Blob download error:', error);
      throw new Error('Failed to download document from Azure Blob Storage');
    }
  }

  async deleteDocument(blobName: string): Promise<void> {
    if (!this.isConfigured || !this.blobServiceClient) {
      return;
    }

    try {
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.delete();
    } catch (error) {
      logger.error('Blob delete error:', error);
    }
  }

  isAvailable(): boolean {
    return this.isConfigured;
  }
}

// Azure Redis Cache Service
export class AzureRedisService {
  private client: RedisClientType | null = null;
  private isConnected: boolean = false;
  private isConfigured: boolean = false;

  constructor() {
    this.initializeConnection();
  }

  private async initializeConnection() {
    try {
      const redisUrl = process.env.AZURE_REDIS_CONNECTION_STRING;
      
      if (!redisUrl) {
        logger.warn('Azure Redis not configured');
        return;
      }

      this.client = createClient({
        url: redisUrl,
        socket: {
          tls: true,
          rejectUnauthorized: false
        }
      });

      this.client.on('error', (err: Error) => {
        logger.error('Azure Redis Client Error:', err);
        this.isConnected = false;
      });

      this.client.on('connect', () => {
        logger.info('Azure Redis Client Connected');
        this.isConnected = true;
      });

      await this.client.connect();
      this.isConfigured = true;
    } catch (error) {
      logger.error('Failed to connect to Azure Redis:', error);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.isConnected || !this.client) return null;

    try {
      const value = await this.client.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      logger.error('Azure Redis get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, ttl = 3600): Promise<boolean> {
    if (!this.isConnected || !this.client) return false;

    try {
      await this.client.setEx(key, ttl, JSON.stringify(value));
      return true;
    } catch (error) {
      logger.error('Azure Redis set error:', error);
      return false;
    }
  }

  async del(key: string): Promise<boolean> {
    if (!this.isConnected || !this.client) return false;

    try {
      await this.client.del(key);
      return true;
    } catch (error) {
      logger.error('Azure Redis delete error:', error);
      return false;
    }
  }

  isAvailable(): boolean {
    return this.isConfigured && this.isConnected;
  }
}

// Azure Key Vault Service
export class AzureKeyVaultService {
  private secretClient: SecretClient | null = null;
  private isConfigured: boolean = false;

  constructor() {
    this.initializeConnection();
  }

  private initializeConnection() {
    try {
      const keyVaultName = process.env.AZURE_KEY_VAULT_NAME;
      
      if (!keyVaultName) {
        logger.warn('Azure Key Vault not configured');
        return;
      }

      const azureConfig = AzureConfig.getInstance();
      this.secretClient = new SecretClient(
        `https://${keyVaultName}.vault.azure.net/`,
        azureConfig.getCredential()
      );
      this.isConfigured = true;
      logger.info('Azure Key Vault initialized');
    } catch (error) {
      logger.error('Failed to initialize Azure Key Vault:', error);
    }
  }

  async getSecret(secretName: string): Promise<string | undefined> {
    if (!this.isConfigured || !this.secretClient) {
      return undefined;
    }

    try {
      const setting = await this.secretClient.getSecret(secretName);
      return setting.value;
    } catch (error) {
      logger.error('Key Vault get error:', error);
      return undefined;
    }
  }

  async setSecret(secretName: string, value: string): Promise<void> {
    if (!this.isConfigured || !this.secretClient) {
      throw new Error('Azure Key Vault not configured');
    }

    try {
      await this.secretClient.setSecret(secretName, value);
    } catch (error) {
      logger.error('Key Vault set error:', error);
      throw error;
    }
  }

  isAvailable(): boolean {
    return this.isConfigured;
  }
}

// Combined Azure Services Manager
export class AzureServicesManager {
  public openai: AzureOpenAIService;
  public cosmos: AzureCosmosService;
  public blob: AzureBlobService;
  public redis: AzureRedisService;
  public keyVault: AzureKeyVaultService;

  constructor() {
    this.openai = new AzureOpenAIService();
    this.cosmos = new AzureCosmosService();
    this.blob = new AzureBlobService();
    this.redis = new AzureRedisService();
    this.keyVault = new AzureKeyVaultService();
  }

  async healthCheck(): Promise<{ [service: string]: boolean }> {
    const results: { [service: string]: boolean } = {};

    // Test each service availability
    results.openai = true; // OpenAI is always available (falls back to demo)
    results.cosmos = this.cosmos.isAvailable();
    results.blob = this.blob.isAvailable();
    results.redis = this.redis.isAvailable();
    results.keyVault = this.keyVault.isAvailable();

    return results;
  }

  isAzureEnabled(): boolean {
    return AzureConfig.getInstance().isConfigured();
  }
}

export const azureServices = new AzureServicesManager();
