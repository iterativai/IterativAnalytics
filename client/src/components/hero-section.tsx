import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="pt-16 pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          <div className="lg:col-span-6">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-poppins leading-tight mb-6">
                <span className="gradient-text">Democratising</span><br />
                Financial Intelligence
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0">
                Unlock powerful financial insights and capital access with our advanced analytics platform. 
                Make data-driven decisions that drive growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={scrollToContact}
                  className="bg-cta text-cta-foreground hover:bg-cta/90 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 px-8 py-4"
                  size="lg"
                >
                  Start Free Trial
                </Button>
                <Button 
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold text-lg px-8 py-4"
                  size="lg"
                >
                  Watch Demo
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-cta mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-cta mr-2" />
                  14-day free trial
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-6 mt-12 lg:mt-0">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Professional working with financial analytics" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-background rounded-xl shadow-lg p-4 hidden lg:block border">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-cta rounded-full"></div>
                  <span className="text-sm font-medium">Analytics Active</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-background rounded-xl shadow-lg p-4 hidden lg:block border">
                <div className="text-2xl font-bold text-primary">+127%</div>
                <div className="text-sm text-muted-foreground">Growth Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
