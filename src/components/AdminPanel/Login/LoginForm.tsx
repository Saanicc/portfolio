import { BackgroundGradient } from "@/components/BackgroundGradient";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/firebase/init";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const translatedErrorMsg = (errorMsg: string) => {
    if (
      errorMsg.includes("auth/wrong-password") ||
      errorMsg.includes("auth/invalid-email") ||
      errorMsg.includes("auth/invalid-credential")
    ) {
      return "Invalid email or password";
    } else if (errorMsg.includes("auth/too-many-requests")) {
      return "Too many failed attempts. Please try again later";
    } else if (errorMsg.includes("auth/network-request-failed")) {
      return "Network error. Please check your connection";
    } else {
      return "Login failed. Please try again";
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoginError("");
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      onLogin();
    } catch (err) {
      if (err instanceof Error) {
        setLoginError(translatedErrorMsg(err.message));
      } else {
        console.log("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-0">
      <BackgroundGradient />
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary-foreground">
            Admin Panel Login
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-8 space-y-6">
            <div className="flex flex-col rounded-md gap-1">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
                  className="relative block w-full px-3 py-2 border border-white/30 placeholder-gray-500 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="relative block w-full px-3 py-2 border border-white/30 placeholder-gray-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            {loginError && (
              <div className="text-red-600 text-sm text-center">
                {loginError}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
