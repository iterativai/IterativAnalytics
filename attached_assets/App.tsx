import React, { useState } from 'react';
import { 
  BarChart3, 
  Brain, 
  Building2,
  Coins,
  Globe2,
  Users,
  Menu,
  X,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('planner');

  return (
    <div className="min-h-screen bg-primary-50">
      {/* Hero Section */}
      <header className="relative bg-primary-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-primary-100 to-primary-50"></div>
        <nav className="relative container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-8 w-8 text-primary-800" />
              <span className="text-xl font-bold text-secondary-900">Iterativ Analytics</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-secondary-600 hover:text-secondary-800 transition">About</a>
              <a href="#solutions" className="text-secondary-600 hover:text-secondary-800 transition">Solutions</a>
              <a href="#contact" className="text-secondary-600 hover:text-secondary-800 transition">Contact</a>
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition">
                Get Started
              </button>
            </div>
            <button 
              className="md:hidden text-secondary-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-6 space-y-4">
              <a href="#about" className="block text-secondary-600 hover:text-secondary-800 transition">About</a>
              <a href="#solutions" className="block text-secondary-600 hover:text-secondary-800 transition">Solutions</a>
              <a href="#contact" className="block text-secondary-600 hover:text-secondary-800 transition">Contact</a>
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition">
                Get Started
              </button>
            </div>
          )}
        </nav>
        
        <div className="relative container mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-secondary-900">
                Democratizing Financial Intelligence Across Africa
              </h1>
              <p className="text-xl mb-8 text-secondary-600">
                Empowering businesses and entrepreneurs with AI-driven financial solutions and capital access
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button className="border border-primary-600 text-primary-600 hover:bg-primary-50 font-semibold py-3 px-8 rounded-lg transition duration-300">
                  Learn More
                </button>
              </div>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Analytics Dashboard"
                className="rounded-lg shadow-2xl transform hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-600">500+</p>
              <p className="text-secondary-600">Businesses Empowered</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-600">$10M+</p>
              <p className="text-secondary-600">Capital Facilitated</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-600">15+</p>
              <p className="text-secondary-600">African Countries</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary-600">98%</p>
              <p className="text-secondary-600">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Products Section */}
      <section className="py-20 bg-primary-50" id="solutions">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-secondary-900">Our Solutions</h2>
          <p className="text-secondary-600 text-center max-w-2xl mx-auto mb-16">
            Discover our comprehensive suite of financial intelligence tools and capital access solutions designed specifically for African businesses.
          </p>
          
          {/* Product Tabs */}
          <div className="flex justify-center mb-8">
            <button 
              className={`px-6 py-2 rounded-l-lg transition ${
                activeTab === 'planner' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-secondary-600 hover:bg-primary-50'
              }`}
              onClick={() => setActiveTab('planner')}
            >
              Iterativ Planner
            </button>
            <button 
              className={`px-6 py-2 rounded-r-lg transition ${
                activeTab === 'xchange' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white text-secondary-600 hover:bg-primary-50'
              }`}
              onClick={() => setActiveTab('xchange')}
            >
              Iterativ Xchange
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {activeTab === 'planner' ? (
              <div className="bg-white rounded-xl shadow-lg p-8 border border-primary-100 transform hover:scale-105 transition duration-300">
                <div className="flex items-center mb-4">
                  <Brain className="h-8 w-8 text-primary-600" />
                  <h3 className="text-2xl font-semibold ml-3 text-secondary-900">Iterativ Planner</h3>
                </div>
                <p className="text-secondary-600 mb-6">
                  Enhance your financial intelligence and funding readiness with our comprehensive planning tools.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center text-secondary-700">
                    <CheckCircle2 className="h-5 w-5 text-primary-600 mr-3" />
                    <div>
                      <h4 className="font-semibold">Business Plan Development</h4>
                      <p className="text-sm text-secondary-600">Create dynamic, iterative business plans</p>
                    </div>
                  </li>
                  <li className="flex items-center text-secondary-700">
                    <CheckCircle2 className="h-5 w-5 text-primary-600 mr-3" />
                    <div>
                      <h4 className="font-semibold">Plan Evaluation</h4>
                      <p className="text-sm text-secondary-600">Get expert analysis and feedback</p>
                    </div>
                  </li>
                  <li className="flex items-center text-secondary-700">
                    <CheckCircle2 className="h-5 w-5 text-primary-600 mr-3" />
                    <div>
                      <h4 className="font-semibold">Startup Valuations</h4>
                      <p className="text-sm text-secondary-600">Accurate, data-driven company valuations</p>
                    </div>
                  </li>
                </ul>
                <button className="mt-8 w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition">
                  Start Planning
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 border border-primary-100 transform hover:scale-105 transition duration-300">
                <div className="flex items-center mb-4">
                  <Coins className="h-8 w-8 text-primary-600" />
                  <h3 className="text-2xl font-semibold ml-3 text-secondary-900">Iterativ Xchange</h3>
                </div>
                <p className="text-secondary-600 mb-6">
                  Access modern funding solutions and capital through our innovative platform.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center text-secondary-700">
                    <CheckCircle2 className="h-5 w-5 text-primary-600 mr-3" />
                    <div>
                      <h4 className="font-semibold">Crowdfunding Platform</h4>
                      <p className="text-sm text-secondary-600">Connect with multiple investors</p>
                    </div>
                  </li>
                  <li className="flex items-center text-secondary-700">
                    <CheckCircle2 className="h-5 w-5 text-primary-600 mr-3" />
                    <div>
                      <h4 className="font-semibold">Equity Tokenization</h4>
                      <p className="text-sm text-secondary-600">Modernize your capital structure</p>
                    </div>
                  </li>
                  <li className="flex items-center text-secondary-700">
                    <CheckCircle2 className="h-5 w-5 text-primary-600 mr-3" />
                    <div>
                      <h4 className="font-semibold">Capital Access</h4>
                      <p className="text-sm text-secondary-600">Find the right funding options</p>
                    </div>
                  </li>
                </ul>
                <button className="mt-8 w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition">
                  Access Capital
                </button>
              </div>
            )}
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Analytics Platform"
                className="rounded-lg shadow-xl h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-2xl font-bold mb-2">Ready to Transform Your Business?</h3>
                  <p className="mb-4">Join hundreds of successful businesses across Africa</p>
                  <button className="bg-white text-primary-900 px-6 py-2 rounded-lg hover:bg-primary-50 transition">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-secondary-900">Our Impact Across Africa</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center transform hover:scale-105 transition duration-300">
              <div className="bg-primary-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-secondary-900">Business Growth</h3>
              <p className="text-secondary-600">Empowering African businesses with data-driven insights</p>
            </div>
            <div className="text-center transform hover:scale-105 transition duration-300">
              <div className="bg-primary-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-secondary-900">Financial Inclusion</h3>
              <p className="text-secondary-600">Breaking barriers to capital access across the continent</p>
            </div>
            <div className="text-center transform hover:scale-105 transition duration-300">
              <div className="bg-primary-100 rounded-full p-6 w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <Globe2 className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-secondary-900">Economic Growth</h3>
              <p className="text-secondary-600">Fostering sustainable development in African markets</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Transform Your Business?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of successful businesses across Africa who are already benefiting from our innovative financial solutions.
          </p>
          <button className="bg-white text-primary-900 font-semibold py-3 px-8 rounded-lg hover:bg-primary-50 transition duration-300">
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <BarChart3 className="h-8 w-8 mr-2" />
                <span className="text-xl font-bold">Iterativ Analytics</span>
              </div>
              <p className="text-secondary-400">Transforming Africa's Financial Landscape</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-secondary-400">
                <li><a href="#" className="hover:text-white transition">Iterativ Planner</a></li>
                <li><a href="#" className="hover:text-white transition">Iterativ Xchange</a></li>
                <li><a href="#" className="hover:text-white transition">Business Valuation</a></li>
                <li><a href="#" className="hover:text-white transition">Capital Access</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-secondary-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-secondary-400">
                <li>info@iterativ.co.za</li>
                <li>Cape Town, South Africa</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-secondary-800 mt-8 pt-8 text-center md:text-left">
            <p className="text-secondary-400">© 2024 Iterativ Analytics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;