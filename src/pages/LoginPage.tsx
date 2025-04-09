
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Layout from '@/components/Layout';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." })
});

const LoginPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, this would connect to a backend authentication service
    // For now, we'll just show a success toast and redirect
    toast({
      title: "Login successful",
      description: "Welcome back to Mahesh Hotels!",
    });
    
    // Simulate successful login after 1 second
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <Layout>
      <div className="min-h-full py-16 flex flex-col items-center">
        <div className="w-full max-w-md px-8 py-10 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Login to Mahesh Hotels</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input 
                          placeholder="Enter your email" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input 
                          type="password" 
                          placeholder="Enter your password" 
                          className="pl-10" 
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="w-full bg-hotel-700 hover:bg-hotel-800">
                Login
              </Button>
            </form>
          </Form>
          
          <div className="mt-6 text-center text-gray-600">
            <p>Don't have an account? <Button variant="link" className="p-0 text-hotel-700" onClick={() => {
              toast({
                title: "Registration",
                description: "Registration functionality will be implemented in future updates"
              });
            }}>Sign up</Button>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
