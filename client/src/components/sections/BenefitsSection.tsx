import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { benefits, statistics } from "@/lib/constants";

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const BenefitItem = ({ benefit }: { benefit: typeof benefits[0] }) => {
  return (
    <motion.div 
      variants={itemVariants}
      className="flex"
    >
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary/10 text-primary">
          <i className={`${benefit.icon} text-xl`}></i>
        </div>
      </div>
      <div className="ml-4">
        <h3 className="text-xl font-semibold">{benefit.title}</h3>
        <p className="mt-2 text-gray-600">{benefit.description}</p>
      </div>
    </motion.div>
  );
};

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="max-w-lg">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">Real Results</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Measurable Impact on Your Business</h2>
              <p className="text-lg text-gray-600 mb-8">
                Join successful startups and investors who have transformed their business planning with data-driven insights.
              </p>
              
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {benefits.map((benefit, index) => (
                  <BenefitItem key={index} benefit={benefit} />
                ))}
              </motion.div>
              
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <a href="#" className="inline-flex items-center font-medium text-primary hover:text-primary/80">
                  Learn more about our results <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">The Impact of Iterativ Planner</h3>
                
                {/* Testimonial */}
                <div className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full mr-4 bg-gray-200 flex items-center justify-center text-gray-500">
                      <i className="fas fa-user-tie"></i>
                    </div>
                    <div>
                      <h4 className="font-bold">Sarah Johnson</h4>
                      <p className="text-gray-600 text-sm">CFO, TechVenture Inc.</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    "Iterativ Planner transformed our financial planning process. What used to take weeks now takes days, and the AI insights have helped us identify growth opportunities we would have missed."
                  </p>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-6">
                  {statistics.map((stat, index) => (
                    <motion.div 
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <p className="text-4xl font-bold text-primary">{stat.value}</p>
                      <p className="text-gray-600 mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
