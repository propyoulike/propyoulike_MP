import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  Phone, 
  User, 
  Building,
  ArrowRight,
  Shield,
  Star,
  CheckCircle
} from 'lucide-react';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const benefits = [
    {
      icon: Star,
      title: 'Personalized Recommendations',
      description: 'Get property suggestions based on your preferences and search history.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your personal information is protected with bank-level security.'
    },
    {
      icon: CheckCircle,
      title: 'Exclusive Access',
      description: 'Early access to new listings and special offers from developers.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left Side - Benefits */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-4">
                  Welcome to PropYoulike
                </h1>
                <p className="text-xl text-muted-foreground">
                  Join thousands of property buyers and sellers who trust us for their real estate needs.
                </p>
              </div>

              <div className="space-y-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6">
                <h3 className="font-semibold mb-2">Trusted by 25,000+ Users</h3>
                <p className="text-sm text-muted-foreground">
                  "PropYoulike made my home buying journey incredibly smooth. The personalized recommendations helped me find my dream home in just 2 weeks!"
                </p>
                <div className="flex items-center mt-3 space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">- Priya Sharma, Bangalore</span>
                </div>
              </div>
            </div>

            {/* Right Side - Login/Signup Form */}
            <div className="max-w-md mx-auto w-full">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Get Started</CardTitle>
                  <CardDescription>
                    Sign in to your account or create a new one
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Sign In</TabsTrigger>
                      <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="login" className="space-y-4 mt-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="email">Email or Phone</Label>
                          <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="email" 
                              placeholder="Enter your email or phone"
                              className="pl-10"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <div className="relative mt-1">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="password" 
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Enter your password"
                              className="pl-10 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember" className="text-sm">Remember me</Label>
                          </div>
                          <Button variant="link" className="p-0 h-auto text-sm">
                            Forgot Password?
                          </Button>
                        </div>

                        <Button className="w-full">
                          Sign In
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>

                      <div className="relative my-6">
                        <Separator />
                        <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-sm text-muted-foreground">
                          or continue with
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline">
                          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                          </svg>
                          Google
                        </Button>
                        <Button variant="outline">
                          <Phone className="h-4 w-4 mr-2" />
                          Phone
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="signup" className="space-y-4 mt-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <div className="relative mt-1">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input 
                                id="firstName" 
                                placeholder="First name"
                                className="pl-10"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                              id="lastName" 
                              placeholder="Last name"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="signupEmail">Email</Label>
                          <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="signupEmail" 
                              type="email"
                              placeholder="Enter your email"
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <div className="relative mt-1">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="phone" 
                              placeholder="+91 98765 43210"
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="signupPassword">Password</Label>
                          <div className="relative mt-1">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="signupPassword" 
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Create a password"
                              className="pl-10 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <div className="relative mt-1">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="confirmPassword" 
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="Confirm your password"
                              className="pl-10 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                            >
                              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-start space-x-2">
                          <Checkbox id="terms" className="mt-1" />
                          <Label htmlFor="terms" className="text-sm leading-relaxed">
                            I agree to the{' '}
                            <Link to="#" className="text-primary hover:underline">
                              Terms of Service
                            </Link>
                            {' '}and{' '}
                            <Link to="#" className="text-primary hover:underline">
                              Privacy Policy
                            </Link>
                          </Label>
                        </div>

                        <Button className="w-full">
                          Create Account
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;