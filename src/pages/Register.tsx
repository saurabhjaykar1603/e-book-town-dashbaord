import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useRef } from "react";
import { register } from "../api/api";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import useTokenStore from "../store/store";
import { Helmet } from "react-helmet";

function Register() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const setToken = useTokenStore((state) => state.setToken);

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      setToken(data?.accessToken);
      // console.log("register successfully", data);
      navigate("/dashboard/home");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      if (error.response) {
        // console.log("login failed", error.response.data.message);
      } else {
        // console.log("login failed", error.message);
      }
    },
  });

  const handleRegisterSubmit = () => {
    if (
      emailRef.current?.value &&
      passwordRef.current?.value &&
      nameRef.current?.value
    ) {
      const name = nameRef.current?.value;
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      mutation.mutate({
        name,
        email,
        password,
      });
    } else {
      alert("Please fill all the fields");
    }
  };
  return (
    <section className="flex justify-center items-center h-screen">
        <Helmet>
            <title>Register</title>
            <meta name="description" content="Register" />
        </Helmet>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account <br />
            {mutation.isError && (
              <span className="text-red-500 mt-2">
                {mutation.error?.response?.data?.message}
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">Name</Label>
                <Input
                  id="first-name"
                  placeholder="Name"
                  required
                  ref={nameRef}
                />
              </div>
            </div>
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
              <Input
                id="password"
                type="password"
                placeholder="Password"
                required
                ref={passwordRef}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={handleRegisterSubmit}
            >
              {mutation.isPending ? (
                <Loader className={"animate-spin"} />
              ) : (
                <span> Create an account </span>
              )}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default Register;
