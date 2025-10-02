import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUp, 
  Shield, 
  Clock, 
  Users,
  ChevronRight,
  Star,
  Globe,
  Smartphone,
  BarChart3
} from 'lucide-react';

interface LandingProps {
  onGetStarted: () => void;
  onLogin: () => void;
  onAdminLogin: () => void;
}

const Landing = ({ onGetStarted, onLogin, onAdminLogin }: LandingProps) => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: TrendingUp,
      title: "Smart Investments",
      description: "AI-powered investment strategies with guaranteed returns"
    },
    {
      icon: Shield,
      title: "Secure Platform", 
      description: "Bank-level security with 256-bit SSL encryption"
    },
    {
      icon: Clock,
      title: "24/7 Trading",
      description: "Trade anytime with our automated trading systems"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Professional team available around the clock"
    }
  ];

  const stats = [
    { value: "15,000+", label: "Active Traders" },
    { value: "100%", label: "Security Funds" },
    { value: "1:500", label: "Max Leverage" },
    { value: "0.0", label: "Pips Spread" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Professional Trader",
      comment: "ProfitPay has transformed my investment strategy. The returns are incredible!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Business Owner", 
      comment: "Most reliable platform I've used. Withdrawals are instant and support is amazing.",
      rating: 5
    },
    {
      name: "Emma Williams",
      role: "Financial Analyst",
      comment: "The AI-powered insights help me make better investment decisions daily.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-balance text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-lg font-bold">PI</span>
              </div>
              <h1 className="text-xl font-bold">ProfitPay Investment</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                onClick={onAdminLogin}
                className="text-white hover:bg-white/20"
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin
              </Button>
              <Button 
                variant="ghost" 
                onClick={onLogin}
                className="text-white hover:bg-white/20"
              >
                Login
              </Button>
              <Button 
                onClick={onGetStarted}
                className="bg-white text-primary hover:bg-white/90"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-balance text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Combining a Transparent<br />
            <span className="text-blue-200">Trading Environment</span><br />
            with the Best Pricing
          </h1>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Start your investment journey with our AI-powered platform. 
            Guaranteed returns, secure transactions, and 24/7 support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={onGetStarted}
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4"
            >
              Start Investing Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={onLogin}
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
            >
              Login to Portal
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose ProfitPay?</h2>
            <p className="text-xl text-muted-foreground">Experience the future of investment trading</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-elevated ${
                    activeFeature === index ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-balance rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Traders Say</h2>
            <p className="text-xl text-muted-foreground">Join thousands of successful investors</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.comment}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-balance text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Trading?</h2>
          <p className="text-xl mb-8 text-white/90">
            Join over 15,000 traders already making profits with ProfitPay
          </p>
          <Button 
            size="lg"
            onClick={onGetStarted}
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4"
          >
            Create Account Now
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-balance rounded-xl flex items-center justify-center">
                  <span className="text-lg font-bold text-white">PI</span>
                </div>
                <span className="font-bold text-lg">ProfitPay Investment</span>
              </div>
              <p className="text-muted-foreground">
                The most trusted investment platform with guaranteed returns and 24/7 support.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Trading</a></li>
                <li><a href="#" className="hover:text-foreground">Investments</a></li>
                <li><a href="#" className="hover:text-foreground">Analytics</a></li>
                <li><a href="#" className="hover:text-foreground">Portfolio</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground">Live Chat</a></li>
                <li><a href="#" className="hover:text-foreground">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About Us</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-foreground">Press</a></li>
                <li><a href="#" className="hover:text-foreground">Legal</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 ProfitPay Investment. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;