import { 
  type User, 
  type InsertUser, 
  type Document, 
  type InsertDocument,
  type Analysis,
  type InsertAnalysis,
  type Activity,
  type InsertActivity
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Document operations
  getDocument(id: number): Promise<Document | undefined>;
  getDocumentsByUserId(userId: number): Promise<Document[]>;
  createDocument(document: InsertDocument): Promise<Document>;
  updateDocument(id: number, updates: Partial<Document>): Promise<Document | undefined>;
  
  // Analysis operations
  getAnalysis(id: number): Promise<Analysis | undefined>;
  getAnalysisByDocumentId(documentId: number): Promise<Analysis | undefined>;
  createAnalysis(analysis: InsertAnalysis): Promise<Analysis>;
  
  // Activity operations
  getActivities(userId: number, limit?: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
}

export class MemStorage implements IStorage {
  private users: User[] = [];
  private documents: Document[] = [];
  private analyses: Analysis[] = [];
  private activities: Activity[] = [];
  private nextId = 1;

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.nextId++,
      username: insertUser.username,
      password: insertUser.password,
      name: insertUser.name,
      userType: insertUser.userType || "startup",
      avatarUrl: insertUser.avatarUrl || null,
      createdAt: new Date()
    };
    this.users.push(user);
    return user;
  }

  // Document operations
  async getDocument(id: number): Promise<Document | undefined> {
    return this.documents.find(doc => doc.id === id);
  }

  async getDocumentsByUserId(userId: number): Promise<Document[]> {
    return this.documents.filter(doc => doc.userId === userId);
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const document: Document = {
      id: this.nextId++,
      ...insertDocument,
      pageCount: insertDocument.pageCount ?? null,
      score: insertDocument.score ?? null,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.documents.push(document);
    return document;
  }

  async updateDocument(id: number, updates: Partial<Document>): Promise<Document | undefined> {
    const index = this.documents.findIndex(doc => doc.id === id);
    if (index === -1) return undefined;
    
    this.documents[index] = { ...this.documents[index], ...updates, updatedAt: new Date() };
    return this.documents[index];
  }

  // Analysis operations
  async getAnalysis(id: number): Promise<Analysis | undefined> {
    return this.analyses.find(analysis => analysis.id === id);
  }

  async getAnalysisByDocumentId(documentId: number): Promise<Analysis | undefined> {
    return this.analyses.find(analysis => analysis.documentId === documentId);
  }

  async createAnalysis(insertAnalysis: InsertAnalysis): Promise<Analysis> {
    const analysis: Analysis = {
      id: this.nextId++,
      ...insertAnalysis,
      createdAt: new Date()
    };
    this.analyses.push(analysis);
    return analysis;
  }

  // Activity operations
  async getActivities(userId: number, limit: number = 10): Promise<Activity[]> {
    return this.activities
      .filter(activity => activity.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const activity: Activity = {
      id: this.nextId++,
      ...insertActivity,
      createdAt: new Date()
    };
    this.activities.push(activity);
    return activity;
  }
}

// Create hybrid storage with Azure capability when credentials are available
class HybridStorage extends MemStorage {
  private azureEnabled = false;

  constructor() {
    super();
    this.checkAzureAvailability();
  }

  private async checkAzureAvailability() {
    try {
      const { azureServices } = await import('./azure-services');
      this.azureEnabled = azureServices.isAzureEnabled();
      
      if (this.azureEnabled) {
        console.log('Azure services enabled - using cloud storage');
      } else {
        console.log('Using in-memory storage - add Azure credentials for cloud storage');
      }
    } catch (error) {
      console.log('Azure services not available, using in-memory storage');
    }
  }

  // Override methods to use Azure when available
  async createUser(insertUser: InsertUser): Promise<User> {
    const user = await super.createUser(insertUser);
    
    if (this.azureEnabled) {
      try {
        const { azureServices } = await import('./azure-services');
        if (azureServices.cosmos.isAvailable()) {
          await azureServices.cosmos.createDocument('users', { 
            ...user, 
            userId: user.id.toString(),
            createdAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.log('Azure sync failed, using local storage');
      }
    }
    
    return user;
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const document = await super.createDocument(insertDocument);
    
    if (this.azureEnabled) {
      try {
        const { azureServices } = await import('./azure-services');
        if (azureServices.cosmos.isAvailable()) {
          await azureServices.cosmos.createDocument('documents', { 
            ...document, 
            userId: document.userId.toString(),
            documentId: document.id.toString(),
            createdAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.log('Azure sync failed, using local storage');
      }
    }
    
    return document;
  }

  async createAnalysis(insertAnalysis: InsertAnalysis): Promise<Analysis> {
    const analysis = await super.createAnalysis(insertAnalysis);
    
    if (this.azureEnabled) {
      try {
        const { azureServices } = await import('./azure-services');
        if (azureServices.cosmos.isAvailable()) {
          await azureServices.cosmos.createDocument('analyses', { 
            ...analysis, 
            documentId: analysis.documentId.toString(),
            analysisId: analysis.id.toString(),
            createdAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.log('Azure sync failed, using local storage');
      }
    }
    
    return analysis;
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const activity = await super.createActivity(insertActivity);
    
    if (this.azureEnabled) {
      try {
        const { azureServices } = await import('./azure-services');
        if (azureServices.cosmos.isAvailable()) {
          await azureServices.cosmos.createDocument('activities', { 
            ...activity, 
            userId: activity.userId.toString(),
            activityId: activity.id.toString(),
            createdAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.log('Azure sync failed, using local storage');
      }
    }
    
    return activity;
  }
}

export const storage = new HybridStorage();