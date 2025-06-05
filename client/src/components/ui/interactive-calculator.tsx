import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const FundingCalculator = () => {
  const [revenue, setRevenue] = useState(100000);
  const [growthRate, setGrowthRate] = useState(25);
  const [marketSize, setMarketSize] = useState(1000000);
  const [result, setResult] = useState<number | null>(null);

  const calculateFunding = () => {
    // Simplified funding potential calculation
    const projectedRevenue = revenue * (1 + growthRate / 100) * 2;
    const marketPenetration = Math.min(projectedRevenue / marketSize * 100, 15);
    const fundingPotential = projectedRevenue * (marketPenetration / 100) * 8;
    setResult(Math.round(fundingPotential));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="bg-white shadow-apple-lg border-0 rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white p-6">
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5" />
            <span>Funding Potential Calculator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                Annual Revenue ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-apple-gray-400" />
                <input
                  type="number"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-apple-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="100,000"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                Growth Rate (%)
              </label>
              <div className="relative">
                <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-apple-gray-400" />
                <input
                  type="number"
                  value={growthRate}
                  onChange={(e) => setGrowthRate(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-apple-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="25"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">
                Total Market Size ($)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-apple-gray-400" />
                <input
                  type="number"
                  value={marketSize}
                  onChange={(e) => setMarketSize(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-apple-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  placeholder="1,000,000"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={calculateFunding}
            className="w-full apple-button text-white py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Calculate Funding Potential
          </Button>

          {result !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-green-700">
                  ${result.toLocaleString()}
                </div>
                <div className="text-sm text-green-600 mt-1">
                  Estimated Funding Potential
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};