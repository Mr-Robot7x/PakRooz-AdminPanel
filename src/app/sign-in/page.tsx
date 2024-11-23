"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoaderCircle, LogIn } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FormSchema = z.object({
  password: z.string().min(2, {
    message: "enter valid password",
  }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const response = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (response?.error) {
      if (response.error === "CredentialsSignin") {
        toast({
          title: "Login Failed",
          description: "Incorrect email or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
        });
      }
    }
    if (response?.url) {
      toast({
        title: "Login Successfully",
        description: "Welcome to PakRooz!",
        variant: "default",
      });
      form.reset();
      router.replace("/dashboard");
    }

    setLoading(false);
  }

  return (
    <section className="w-full min-h-screen flex justify-center pt-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" space-y-5 p-10 md:w-[400px] bg-card z-50 rounded-3xl border-primary border shadow-2xl shadow-primary/30 h-max"
        >
          <h2 className="text-center">
            Login Into <span className="text-red-500 ">PakRooz</span>
          </h2>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="your email" {...field} />
                </FormControl>
                <FormDescription>vaild admin email</FormDescription>
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
                  <Input placeholder="your password" {...field} />
                </FormControl>
                <FormDescription>admin password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            size={"lg"}
            disabled={loading}
            type="submit"
            className="w-full"
          >
            {!loading ? <LogIn /> : <LoaderCircle className="animate-spin" />}{" "}
            {loading ? "Checking..." : "Login"}
          </Button>
        </form>
      </Form>
      <svg
        className="absolute left-0 -z-30 bottom-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#dc2626"
          fillOpacity="1"
          d="M0,128L48,154.7C96,181,192,235,288,218.7C384,203,480,117,576,112C672,107,768,181,864,213.3C960,245,1056,235,1152,202.7C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </section>
  );
}

export default SignInForm;
