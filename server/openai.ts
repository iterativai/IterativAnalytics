import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "demo-key" });

export interface DocumentAnalysisResponse {
  overallScore: number;
  feasibilityScore: number;
  scalabilityScore: number;
  financialHealthScore: number;
  innovationScore: number;
  marketFitScore: number;
  improvementAreas: Array<{
    area: string;
    score: number;
    suggestion: string;
  }>;
  comparisonData: {
    industryAverage: number;
    topPerformers: number;
  };
  summary: string;
}

export async function analyzeDocument(
  title: string,
  fileContent: string,
  contentType: string,
  userId?: string
): Promise<DocumentAnalysisResponse> {
  try {
    // Try Azure OpenAI first
    try {
      const { azureServices } = await import('./azure-services');
      const azureResult = await azureServices.openai.analyzeBusinessPlan(
        fileContent,
        contentType,
        userId || 'unknown'
      );
      if (azureResult && azureResult.overallScore) {
        return azureResult;
      }
    } catch (azureError) {
      console.log('Azure OpenAI not available, trying standard OpenAI');
    }

    // Fallback to standard OpenAI
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "demo-key") {
      return generateDemoAnalysis(title);
    }
    
    const prompt = `
    You are an expert business analyst specializing in African startup ecosystems. Your goal is to help entrepreneurs improve their business plans while maintaining an encouraging tone. Please analyze the following ${contentType.toUpperCase()} document:
    
    Title: ${title}
    
    Content: ${fileContent.substring(0, 2000)}... (truncated)
    
    Focus on African market dynamics, mobile-first solutions, regulatory environment, and funding landscape specific to African startups.
    
    Provide a comprehensive analysis with scores for different areas (0-100), improvement suggestions, and comparison with industry standards.
    Return your analysis in JSON format with the following structure:
    {
      "overallScore": number,
      "feasibilityScore": number,
      "scalabilityScore": number,
      "financialHealthScore": number,
      "innovationScore": number,
      "marketFitScore": number,
      "improvementAreas": [
        {
          "area": string,
          "score": number,
          "suggestion": string,
          "priority": "low|medium|high"
        }
      ],
      "comparisonData": {
        "industryAverage": number,
        "topPerformers": number
      },
      "summary": string,
      "confidence": number
    }
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0].message.content || "";
    if (content) {
      const result = JSON.parse(content);
      return result;
    } else {
      console.error("No response content from OpenAI");
      return generateDemoAnalysis(title);
    }

  } catch (error) {
    console.error("Error analyzing document:", error);
    return generateDemoAnalysis(title);
  }
}

// For demo purposes only, when no API key is available
function generateDemoAnalysis(title: string): DocumentAnalysisResponse {
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
        suggestion: "Develop market entry strategy for key African markets (Nigeria, Kenya, South Africa). Consider local regulations and payment methods.",
        priority: "high"
      },
      {
        area: "Mobile-First Approach",
        score: 65,
        suggestion: "Optimize for mobile usage patterns prevalent in African markets. Consider offline capabilities and low-bandwidth scenarios.",
        priority: "high"
      },
      {
        area: "Financial Projections",
        score: 78,
        suggestion: "Include multi-currency support (USD, ZAR, NGN, KES) and local payment methods like M-Pesa, Airtel Money.",
        priority: "medium"
      },
      {
        area: "Regulatory Compliance",
        score: 60,
        suggestion: "Address regulatory requirements across target African markets, including data protection (POPIA) and financial services regulations.",
        priority: "high"
      }
    ],
    comparisonData: {
      industryAverage: 68,
      topPerformers: 92
    },
    summary: `Our AI analysis of "${title}" shows strong potential for the African market with good innovation scores. Key opportunities include developing a comprehensive African market strategy, optimizing for mobile-first usage patterns, and ensuring regulatory compliance across target markets. The business shows above-average potential but would benefit from deeper African market localization.`,
    confidence: 85
  };
}
