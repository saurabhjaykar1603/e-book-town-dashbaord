import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { cn } from "../lib/utils";
import { AxiosError } from "axios";

const LoginPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      navigate("/dashboard/home");
      console.log("login successfully", data);
    },
    onError: (error: AxiosError<{ message: string }>) => {
      if (error.response) {
        // console.log("login failed", error.response.data.message);
      } else {
        // console.log("login failed", error.message);
      }
    },
  });

  const handleLoginSubmit = () => {
    if (emailRef.current?.value && passwordRef.current?.value) {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      mutation.mutate({
        email,
        password,
      });
    } else {
      alert("Please fill all the fields");
    }
  };

  return (
    <section className="flex h-screen justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account. <br />
            {mutation.isError && (
              <span className="text-red-500 mt-2">
                {mutation.error?.response?.data?.message}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              ref={emailRef}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required ref={passwordRef} />
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-center flex-col items-center w-full">
            <Button
              onClick={handleLoginSubmit}
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <Loader
                  className={cn(mutation.isPending ? "animate-spin" : "")}
                />
              ) : (
                <span> Sign In</span>
              )}
            </Button>
            <div className="mt-4 text-center text-sm">
              Dont have an account?{" "}
              <Link to="/auth/register" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default LoginPage;
