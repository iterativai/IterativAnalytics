
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Globe, Users, Heart, TrendingUp, Shield } from 'lucide-react';
import { FadeIn, Stagger } from '@/components/ui/animated';

export const AboutSection = () => {
  const values = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Trust & Transparency',
      description: 'Building credibility through verified data and transparent processes'
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Pan-African Focus',
      description: 'Designed specifically for the unique challenges and opportunities of African markets'
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: 'Inclusive Growth',
      description: 'Democratizing access to capital and financial intelligence for all entrepreneurs'
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: 'Innovation First',
      description: 'Leveraging cutting-edge AI and blockchain technology to solve real problems'
    }
  ];

  const milestones = [
    { year: '2024', event: 'Platform conceptualization and market research across 15 African countries' },
    { year: '2025 Q1', event: 'Beta launch with first cohort of 100 startups' },
    { year: '2025 Q2', event: 'Integration of blockchain capital markets (Iterativ Xchange)' },
    { year: '2025 Q3', event: 'Launch of supply chain management module (Iterativ Sourcing)' }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        {/* Mission Statement */}
        <FadeIn>
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
              Our Mission
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Democratising Financial Intelligence
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We're building the infrastructure that African startups need to thrive in the global economy. 
              By combining AI-powered business intelligence, blockchain capital access, and intelligent supply 
              chain management, we're creating a comprehensive ecosystem that levels the playing field for 
              African entrepreneurs.
            </p>
          </div>
        </FadeIn>

        {/* The Problem We're Solving */}
        <FadeIn delay={0.2}>
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">
                  The Challenge
                </h3>
                <div className="space-y-4 text-gray-300">
                  <p className="text-lg">
                    African startups face unique challenges that traditional tools weren't designed to solve:
                  </p>
                  <ul className="space-y-3 text-gray-400">
                    <li className="flex items-start">
                      <span className="text-red-400 mr-3 mt-1">⚠</span>
                      <span>Limited access to investors familiar with African markets</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-3 mt-1">⚠</span>
                      <span>Lack of standardized business documentation and verification</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-3 mt-1">⚠</span>
                      <span>Complex supply chain challenges across fragmented markets</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 mr-3 mt-1">⚠</span>
                      <span>Currency volatility and cross-border payment friction</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-2xl p-8 border border-cyan-500/20">
                <h3 className="text-3xl font-bold text-white mb-6">
                  Our Solution
                </h3>
                <div className="space-y-4 text-gray-300">
                  <p className="text-lg">
                    An integrated platform that combines three powerful modules:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-3 mt-1">✓</span>
                      <div>
                        <strong className="text-white">Iterativ Startups:</strong> AI-driven business intelligence and planning
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-3 mt-1">✓</span>
                      <div>
                        <strong className="text-white">Iterativ Xchange:</strong> Blockchain-powered capital markets
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 mr-3 mt-1">✓</span>
                      <div>
                        <strong className="text-white">Iterativ Sourcing:</strong> Intelligent supply chain management
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Core Values */}
        <FadeIn delay={0.3}>
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Our Core Values
              </h3>
              <p className="text-xl text-gray-400">
                The principles that guide everything we build
              </p>
            </div>

            <Stagger staggerDelay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="bg-gray-800/30 backdrop-blur border-gray-700/50 h-full hover:border-cyan-500/30 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="bg-cyan-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-cyan-400">
                          {value.icon}
                        </div>
                        <h4 className="text-lg font-semibold text-white mb-2">
                          {value.title}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Stagger>
          </div>
        </FadeIn>

        {/* Journey & Milestones */}
        <FadeIn delay={0.4}>
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Our Journey
              </h3>
              <p className="text-xl text-gray-400">
                Building the future of African entrepreneurship
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 to-blue-500"></div>

                {/* Milestones */}
                <div className="space-y-8">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative pl-20"
                    >
                      <div className="absolute left-0 w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center border-4 border-gray-900">
                        <span className="text-white font-bold text-sm">
                          {milestone.year}
                        </span>
                      </div>
                      <Card className="bg-gray-800/30 backdrop-blur border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300">
                        <CardContent className="p-6">
                          <p className="text-gray-300">{milestone.event}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Team Vision */}
        <FadeIn delay={0.5}>
          <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-2xl p-12 border border-cyan-500/20 text-center">
            <Users className="h-16 w-16 text-cyan-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">
              Built by Entrepreneurs, for Entrepreneurs
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
              Our team combines deep experience in African markets, cutting-edge technology expertise, 
              and a genuine passion for empowering the next generation of African entrepreneurs.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 px-4 py-2">
                📍 HQ: Cape Town / Nairobi / Remote
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
                🌍 Operating in 15+ African Countries
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">
                🚀 Supporting 2,500+ Startups
              </Badge>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutSection;
