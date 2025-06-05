import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeDocument } from "./openai";
import { insertUserSchema, insertDocumentSchema, insertAnalysisSchema, insertActivitySchema } from "@shared/schema";
import multer from "multer";
import { z } from "zod";

// Set up in-memory file storage for uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      // Check if the user exists
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // In a real application, password would be hashed and compared
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Return the user without password
      const { password: _, ...userWithoutPassword } = user;
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      // Validate the request body
      const validation = insertUserSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid user data", errors: validation.error.errors });
      }
      
      // Check if the username is already taken
      const existingUser = await storage.getUserByUsername(validation.data.username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }
      
      // Create the user
      const user = await storage.createUser(validation.data);
      
      // Return the user without password
      const { password: _, ...userWithoutPassword } = user;
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Document routes
  app.get("/api/documents", async (req: Request, res: Response) => {
    try {
      const userIdParam = req.query.userId;
      
      if (!userIdParam) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      const userId = parseInt(userIdParam as string, 10);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID format" });
      }
      
      const documents = await storage.getDocumentsByUserId(userId);
      return res.status(200).json(documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/documents/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid document ID" });
      }
      
      const document = await storage.getDocument(id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      return res.status(200).json(document);
    } catch (error) {
      console.error("Error fetching document:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/documents/upload", upload.single("file"), async (req: Request, res: Response) => {
    try {
      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      
      const { userId, title } = req.body;
      
      if (!userId || !title) {
        return res.status(400).json({ message: "User ID and title are required" });
      }
      
      const userIdNum = parseInt(userId, 10);
      if (isNaN(userIdNum)) {
        return res.status(400).json({ message: "Invalid user ID format" });
      }
      
      // Get file content and convert to base64
      const fileContent = req.file.buffer.toString("base64");
      const contentType = req.file.mimetype;
      let pageCount = 0;
      
      // In a real application, we would parse the document to get the page count
      // For now, set a random page count between 5 and 30
      if (contentType.includes("pdf") || contentType.includes("presentation")) {
        pageCount = Math.floor(Math.random() * 25) + 5;
      }
      
      // Create document record
      const document = await storage.createDocument({
        userId: userIdNum,
        title,
        contentType,
        fileContent,
        pageCount,
        score: 0, // Will be updated after analysis
      });
      
      // Analyze the document
      const analysis = await analyzeDocument(title, fileContent, contentType);
      
      // Create analysis record
      await storage.createAnalysis({
        documentId: document.id,
        overallScore: analysis.overallScore,
        feasibilityScore: analysis.feasibilityScore,
        scalabilityScore: analysis.scalabilityScore,
        financialHealthScore: analysis.financialHealthScore,
        innovationScore: analysis.innovationScore,
        marketFitScore: analysis.marketFitScore,
        improvementAreas: analysis.improvementAreas,
        comparisonData: analysis.comparisonData,
      });
      
      // Update document with score
      await storage.updateDocument(document.id, { 
        score: analysis.overallScore 
      });
      
      // Create activity record
      await storage.createActivity({
        userId: userIdNum,
        documentId: document.id,
        activityType: "document_upload",
        details: {
          title: title,
          score: analysis.overallScore,
          summary: analysis.summary,
        },
      });
      
      // Return the document with its analysis
      return res.status(201).json({
        document: { ...document, score: analysis.overallScore },
        analysis,
      });
    } catch (error) {
      console.error("Error uploading document:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Analysis routes
  app.get("/api/analyses/document/:documentId", async (req: Request, res: Response) => {
    try {
      const documentId = parseInt(req.params.documentId, 10);
      if (isNaN(documentId)) {
        return res.status(400).json({ message: "Invalid document ID" });
      }
      
      const analysis = await storage.getAnalysisByDocumentId(documentId);
      if (!analysis) {
        return res.status(404).json({ message: "Analysis not found" });
      }
      
      return res.status(200).json(analysis);
    } catch (error) {
      console.error("Error fetching analysis:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Activity routes
  app.get("/api/activities", async (req: Request, res: Response) => {
    try {
      const userIdParam = req.query.userId;
      const limitParam = req.query.limit;
      
      if (!userIdParam) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      const userId = parseInt(userIdParam as string, 10);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID format" });
      }
      
      let limit = 10;
      if (limitParam) {
        limit = parseInt(limitParam as string, 10);
        if (isNaN(limit)) {
          return res.status(400).json({ message: "Invalid limit format" });
        }
      }
      
      const activities = await storage.getActivities(userId, limit);
      return res.status(200).json(activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Stats routes
  app.get("/api/stats", async (req: Request, res: Response) => {
    try {
      const userIdParam = req.query.userId;
      
      if (!userIdParam) {
        return res.status(400).json({ message: "User ID is required" });
      }
      
      const userId = parseInt(userIdParam as string, 10);
      if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID format" });
      }
      
      // Get all documents for the user
      const documents = await storage.getDocumentsByUserId(userId);
      
      // Calculate average score
      let averageScore = 0;
      if (documents.length > 0) {
        const totalScore = documents.reduce((acc, doc) => acc + (doc.score || 0), 0);
        averageScore = Math.round(totalScore / documents.length);
      }
      
      // In a real application, we'd calculate investor views
      const investorViews = Math.floor(Math.random() * 20) + 1;
      
      return res.status(200).json({
        documentCount: documents.length,
        averageScore,
        investorViews,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
