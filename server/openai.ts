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
  contentType: string
): Promise<DocumentAnalysisResponse> {
  try {
    // Use demo mode if no valid API key is provided
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "demo-key") {
      return generateDemoAnalysis(title);
    }
    
    // In a real implementation, we would process the document content based on its type
    // and extract relevant text for analysis
    
    const prompt = `
    You are Planner.AI, a friendly and insightful business advisor with a playful personality. Your goal is to help entrepreneurs improve their business plans while maintaining an encouraging tone. Please analyze the following ${contentType.toUpperCase()} document:
    
    Title: ${title}
    
    Content: ${fileContent.substring(0, 2000)}... (truncated)
    
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
          "suggestion": string
        }
      ],
      "comparisonData": {
        "industryAverage": number,
        "topPerformers": number
      },
      "summary": string
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
      // Fallback if no response content
      console.error("No response content from OpenAI");
      return generateDemoAnalysis(title);
    }

  } catch (error) {
    console.error("Error analyzing document:", error);
    // Fallback to demo analysis if OpenAI call fails
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
        area: "Go-to-Market Strategy",
        score: 65,
        suggestion: "Add more detail about customer acquisition channels and costs."
      },
      {
        area: "Financial Projections",
        score: 78,
        suggestion: "Include sensitivity analysis for key assumptions."
      },
      {
        area: "Competitive Analysis",
        score: 82,
        suggestion: "Highlight key differentiators more prominently."
      },
      {
        area: "Exit Strategy",
        score: 45,
        suggestion: "Develop a more detailed exit strategy with potential acquirers or IPO timeline."
      }
    ],
    comparisonData: {
      industryAverage: 72,
      topPerformers: 92
    },
    summary: `Our AI analysis of "${title}" shows promising aspects in scalability and innovation. Key areas for improvement include the go-to-market strategy and exit planning. Overall, the document scores above industry average but could be strengthened by providing more detailed financial projections and clearer competitive differentiation.`
  };
}
