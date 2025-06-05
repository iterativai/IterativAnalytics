
import { Button } from "./ui/button";
import { jsPDF } from "jspdf";

export function PDFExport({ analysis, document }) {
  const exportToPDF = () => {
    const pdf = new jsPDF();
    
    pdf.setFontSize(20);
    pdf.text("Business Plan Analysis Report", 20, 20);
    
    pdf.setFontSize(12);
    pdf.text(`Document: ${document.title}`, 20, 40);
    pdf.text(`Overall Score: ${document.score}/100`, 20, 50);
    
    // Add metrics
    pdf.text("Key Metrics:", 20, 70);
    pdf.text(`Feasibility: ${analysis.feasibilityScore}/100`, 30, 80);
    pdf.text(`Scalability: ${analysis.scalabilityScore}/100`, 30, 90);
    pdf.text(`Market Fit: ${analysis.marketFitScore}/100`, 30, 100);
    
    // Add improvement areas
    pdf.text("Improvement Areas:", 20, 120);
    analysis.improvementAreas.forEach((area, index) => {
      pdf.text(`${area.area}: ${area.score}/100`, 30, 130 + (index * 10));
      pdf.text(`Suggestion: ${area.suggestion}`, 40, 140 + (index * 10));
    });
    
    pdf.save(`${document.title}-analysis.pdf`);
  };

  return (
    <Button 
      onClick={exportToPDF}
      className="bg-blue-600 hover:bg-blue-700 text-white"
    >
      Export to PDF
    </Button>
  );
}
