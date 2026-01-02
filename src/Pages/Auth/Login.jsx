import { useForm } from "react-hook-form";
import { astroSign, fullLogo, moon, star, sun, sunBg } from "../../assets";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/reducers/UserSlice";
import { useAuth } from "@/context/AuthContext";
import { setTokens } from "@/utils/axios";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import SEO from "@/components/SEO";

export default function Login() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const { updateUser } = useAuth();
  const { status, error } = useSelector((state) => state.user);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const schema = yup.object({
    credentials: yup.string().required("This field is required."),
    password: yup.string().required("Password is required."),
    acceptTerms: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions"),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      credentials: "",
      password: "",
      acceptTerms: true,
      device_name: navigator.userAgent,
    },
  });

  const onSubmit = (data) => {
    dispatch(login(data)).then((result) => {
      if (result.payload !== "Login failed" && result.payload.code !== 403) {
        const { user, access_token, refresh_token } = result.payload;
        setTokens(access_token, refresh_token);
        updateUser(user);
        form.reset();
        navigate("/");
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "User Not Found",
        });
      }
    });
  };

  const onError = (errors) => {
    console.log("errors", errors);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Login - Future Advice by Charm",
    description:
      "Sign in to your Future Advice by Charm account to access your personalized tarot reading services, manage appointments, and view your spiritual guidance history.",
    url: "https://futureadvicebycharm.com/login",
    mainEntity: {
      "@type": "WebApplication",
      name: "Future Advice by Charm Login",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web Browser",
    },
  };

  return (
    <>
      <SEO
        title="Login"
        description="Sign in to your Future Advice by Charm account to access your personalized tarot reading services, manage appointments, and view your spiritual guidance history."
        keywords="tarot login, future Advice by Charm login, spiritual guidance login, tarot reading account, tarot consultation login, tarot reader login"
        url="/login"
        structuredData={structuredData}
      />
      <div className="grid md:grid-cols-2 gap-4 h-screen overflow-hidden md:divide-x md:divide-white z-10">
        <div className="hidden md:block relative z-10">
          <img
            src={astroSign}
            className="absolute -top-32 xl:-top-40 h-80 xl:h-auto -right-20 xl:-right-24 opacity-40"
            alt="Astro Sign"
            loading="lazy"
          />
          <img
            src={moon}
            className="absolute top-28 xl:top-44 left-28 xl:left-36 h-56 xl:h-[20rem] opacity-10"
            alt="Moon"
            loading="lazy"
          />
          <img
            src={star}
            className="absolute right-5 top-56 xl:top-[20rem] h-44 xl:h-60 opacity-10"
            alt="Star"
            loading="lazy"
          />
          <img
            src={sunBg}
            className="absolute -bottom-72 xl:-bottom-[20rem] -left-[23rem] xl:-left-[26.5rem] h-[42rem] xl:h-[50rem] opacity-40"
            alt="Sub Background"
            loading="lazy"
          />
          <img
            src={sun}
            className="absolute -bottom-[28rem] xl:-bottom-[38rem] -right-[23.5rem] xl:-right-[31rem] h-[54rem] xl:h-auto opacity-10"
            alt="Sun"
            loading="lazy"
          />
        </div>
        <div className="relative flex items-center justify-center pt-10 bg-secondary-500 z-20">
          <div className="w-[20rem] sm:w-[28rem] md:w-[30rem]">
            {/* Back to Home Button */}
            <div className="absolute top-10">
              <Link to="/" className="astro-border-btn">
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </Link>
            </div>
            {/* Logo Animation with Framer Motion */}
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Link to="/">
                <img
                  src={fullLogo}
                  className="w-auto h-12 mx-auto"
                  alt="Logo"
                  loading="lazy"
                />
              </Link>
              <h2 className="mt-10 text-3xl">
                <span className="text-3xl lg:text-4xl mr-4">Welcome</span>
                <span className="italic">back!</span>
              </h2>
            </motion.div>

            {/* Form Animation with Framer Motion */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            >
              {error && <small className="text-red-500 mb-4">{error}</small>}
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit, onError)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="credentials"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username or Phone or Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Username" />
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
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              className="absolute inset-y-0 right-0 flex items-center px-3"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I accept the{" "}
                              <Link
                                to="/terms"
                                className="text-primary-500 hover:underline"
                              >
                                terms and conditions
                              </Link>
                            </FormLabel>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              </Form>

              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
              >
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/register"
                    className="text-primary-500 hover:underline font-medium"
                  >
                    Sign up
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
