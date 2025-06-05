import { CheckCircle } from "lucide-react";

const benefits = [
  {
    title: "AI-Powered Insights",
    description: "Leverage machine learning algorithms to uncover patterns and opportunities in your financial data."
  },
  {
    title: "Enterprise-Grade Security",
    description: "Your financial data is protected with bank-level encryption and compliance with industry standards."
  },
  {
    title: "Seamless Integration",
    description: "Connect with your existing financial systems and workflows without disruption."
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
              Empowering Businesses Through
              <span className="gradient-text"> Financial Intelligence</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              At Iterativ Analytics, we believe that every business deserves access to 
              sophisticated financial intelligence tools, regardless of size or budget. 
              Our platform democratizes access to the insights that drive success.
            </p>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-cta rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="h-4 w-4 text-background" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{benefit.title}</h4>
                    <p className="text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Team collaborating on financial strategy" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
