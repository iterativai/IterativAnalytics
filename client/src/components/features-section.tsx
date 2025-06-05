import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Shield, Users, Clock, Settings, Smartphone } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Advanced Analytics",
    description: "Deep dive into your financial data with AI-powered insights and predictive analytics that reveal hidden opportunities.",
    color: "text-primary"
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description: "Comprehensive risk evaluation tools that help you identify potential challenges before they impact your business.",
    color: "text-secondary"
  },
  {
    icon: Users,
    title: "Capital Access",
    description: "Connect with the right investors and funding opportunities through our intelligent matching platform.",
    color: "text-accent"
  },
  {
    icon: Clock,
    title: "Real-time Monitoring",
    description: "Stay on top of your financial performance with real-time dashboards and automated alerts.",
    color: "text-cta"
  },
  {
    icon: Settings,
    title: "Custom Reports",
    description: "Generate tailored reports that speak to your stakeholders with customizable templates and branding.",
    color: "text-primary"
  },
  {
    icon: Smartphone,
    title: "Mobile Access",
    description: "Access your financial intelligence anywhere with our responsive platform and mobile apps.",
    color: "text-secondary"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="section-padding bg-muted/50">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
            Powerful Features for <span className="gradient-text">Smart Decisions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive suite of financial intelligence tools empowers businesses 
            to make informed decisions and accelerate growth.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-background hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className={`w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Technology Dashboard Image */}
        <div className="text-center">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800" 
            alt="Financial analytics dashboard interface" 
            className="rounded-2xl shadow-2xl mx-auto max-w-4xl w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
