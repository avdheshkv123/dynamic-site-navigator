
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { Package, BarChart, Truck, Users } from "lucide-react";

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ElementType; 
  title: string; 
  description: string;
}) => (
  <div className="rounded-lg border bg-card p-6">
    <div className="bg-primary/10 p-3 w-fit rounded-full mb-4">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      
      {/* Hero Section */}
      <section className="bg-brand-dark text-white py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Streamline Your Inventory Management
              </h1>
              <p className="text-lg text-gray-300">
                InvenFlow helps businesses manage inventory efficiently with real-time tracking, 
                analytics, and automated reordering.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button variant="green" size="lg" asChild>
                  <Link to="/login">Get Started</Link>
                </Button>
                <Button variant="outline" size="lg" className="border-white text-white">
                  <Link to="/contact">Contact Sales</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://placehold.co/600x400/10b981/FFFFFF?text=InvenFlow+Dashboard" 
                alt="InvenFlow Dashboard" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Inventory Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              InvenFlow provides all the tools you need to manage your inventory effectively, 
              reduce costs, and improve customer satisfaction.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={Package} 
              title="Real-Time Tracking" 
              description="Monitor stock levels and movements in real-time across all locations."
            />
            <FeatureCard 
              icon={BarChart} 
              title="Advanced Analytics" 
              description="Gain insights with powerful reporting and forecasting tools."
            />
            <FeatureCard 
              icon={Truck} 
              title="Supply Chain Integration" 
              description="Connect with suppliers for seamless ordering and delivery."
            />
            <FeatureCard 
              icon={Users} 
              title="Role-Based Access" 
              description="Control who can view and modify inventory data with custom roles."
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Optimize Your Inventory?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of businesses that trust InvenFlow for their inventory management needs.
            </p>
            <Button variant="green" size="lg" asChild>
              <Link to="/login">Start Your Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-brand-dark text-white py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="font-bold text-xl mb-4">
                <span className="text-primary">Inven</span>Flow
              </h3>
              <p className="text-gray-300">
                Streamline your inventory management with our powerful platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Inventory Management</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Warehouse Management</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Supply Chain</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center">
            <p className="text-gray-400">© 2025 InvenFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
