
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  CheckCircle2, 
  Building, 
  Truck, 
  MapPin, 
  ShoppingBag, 
  User
} from "lucide-react";

// Mock data - would come from state/API in a real app
const cartItems = [
  { id: 1, name: "Office Chair", price: 199.99, quantity: 2 },
  { id: 2, name: "Standing Desk", price: 349.99, quantity: 1 },
  { id: 3, name: "Monitor Stand", price: 79.99, quantity: 3 },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState("shipping");
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Order Placed Successfully",
      description: "Thank you for your order! You will receive a confirmation email soon.",
    });
    
    navigate("/orders");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const shipping = 0;
  const total = subtotal + tax + shipping;
  
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <div className="flex items-center">
          <div className={`flex items-center ${step === "shipping" ? "text-primary" : "text-muted-foreground"}`}>
            <div className="flex items-center justify-center h-8 w-8 rounded-full border-2 border-current mr-2">
              1
            </div>
            <span>Shipping</span>
          </div>
          <div className="h-0.5 w-12 bg-border mx-4"></div>
          <div className={`flex items-center ${step === "payment" ? "text-primary" : "text-muted-foreground"}`}>
            <div className="flex items-center justify-center h-8 w-8 rounded-full border-2 border-current mr-2">
              2
            </div>
            <span>Payment</span>
          </div>
          <div className="h-0.5 w-12 bg-border mx-4"></div>
          <div className="flex items-center text-muted-foreground">
            <div className="flex items-center justify-center h-8 w-8 rounded-full border-2 border-current mr-2">
              3
            </div>
            <span>Confirmation</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <Tabs value={step} onValueChange={setStep} className="w-full">
                <TabsContent value="shipping" className="mt-0">
                  <form onSubmit={handleShippingSubmit}>
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                          <User className="h-5 w-5" /> Contact Information
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input 
                              id="fullName"
                              name="fullName"
                              value={shippingInfo.fullName}
                              onChange={handleShippingChange}
                              required
                            />
                          </div>
                          <div className="col-span-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input 
                              id="phone"
                              name="phone"
                              value={shippingInfo.phone}
                              onChange={handleShippingChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                          <MapPin className="h-5 w-5" /> Shipping Address
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2">
                            <Label htmlFor="address">Address</Label>
                            <Input 
                              id="address"
                              name="address"
                              value={shippingInfo.address}
                              onChange={handleShippingChange}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="city">City</Label>
                            <Input 
                              id="city"
                              name="city"
                              value={shippingInfo.city}
                              onChange={handleShippingChange}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="state">State</Label>
                            <Input 
                              id="state"
                              name="state"
                              value={shippingInfo.state}
                              onChange={handleShippingChange}
                              required
                            />
                          </div>
                          <div className="col-span-2">
                            <Label htmlFor="zipCode">ZIP Code</Label>
                            <Input 
                              id="zipCode"
                              name="zipCode"
                              value={shippingInfo.zipCode}
                              onChange={handleShippingChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button type="submit" variant="green" className="w-full">
                          Continue to Payment
                        </Button>
                      </div>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="payment" className="mt-0">
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
                          <CreditCard className="h-5 w-5" /> Payment Details
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="col-span-2">
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input 
                              id="cardName"
                              name="cardName"
                              value={paymentInfo.cardName}
                              onChange={handlePaymentChange}
                              required
                            />
                          </div>
                          <div className="col-span-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input 
                              id="cardNumber"
                              name="cardNumber"
                              value={paymentInfo.cardNumber}
                              onChange={handlePaymentChange}
                              placeholder="1234 5678 9012 3456"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input 
                              id="expiry"
                              name="expiry"
                              value={paymentInfo.expiry}
                              onChange={handlePaymentChange}
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvc">CVC</Label>
                            <Input 
                              id="cvc"
                              name="cvc"
                              value={paymentInfo.cvc}
                              onChange={handlePaymentChange}
                              placeholder="123"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <div className="flex gap-3">
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => setStep("shipping")}
                          >
                            Back to Shipping
                          </Button>
                          <Button 
                            type="submit" 
                            variant="green" 
                            className="flex-1"
                            disabled={isProcessing}
                          >
                            {isProcessing ? (
                              <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                              </span>
                            ) : "Place Order"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                <span className="flex items-center gap-1">
                  <ShoppingBag className="h-4 w-4" /> {cartItems.length} items
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-4 items-start">
              <div className="flex items-center gap-2 w-full text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center gap-2 w-full text-sm">
                <Truck className="h-4 w-4" />
                <span>Free shipping on orders above $100</span>
              </div>
              <div className="flex items-center gap-2 w-full text-sm">
                <Building className="h-4 w-4" />
                <span>Trusted by 10,000+ businesses</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
