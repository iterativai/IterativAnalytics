import { motion } from "framer-motion";
import { FaGoogle, FaMicrosoft, FaAmazon, FaFacebook } from "react-icons/fa";
import { SiNetflix, SiShopify } from "react-icons/si";

const TrustedBySection = () => {
  const companies = [
    { name: "Google", icon: FaGoogle },
    { name: "Microsoft", icon: FaMicrosoft },
    { name: "Netflix", icon: SiNetflix },
    { name: "Amazon", icon: FaAmazon },
    { name: "Facebook", icon: FaFacebook },
    { name: "Shopify", icon: SiShopify },
  ];

  return (
    <section className="py-12 bg-white border-t border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 text-sm font-medium uppercase tracking-wider mb-8">
          Trusted by innovative companies worldwide
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {companies.map((company, index) => (
            <motion.div 
              key={company.name}
              className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <company.icon className="h-8 w-auto text-gray-700" size={32} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
