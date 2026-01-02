import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import { astroSign, fullLogo, moon, star, sun, sunBg } from "@/assets";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff, Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { register } from "@/redux/reducers/UserSlice";
import { setTokens } from "@/utils/axios";
import SEO from "@/components/SEO";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const { updateUser } = useAuth();
  const { status, error } = useSelector((state) => state.user);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object({
    username: yup
      .string()
      .required("Username is required.")
      .min(3, "Username must be at least 3 characters long.")
      .max(50, "Username is too long."),
    email: yup
      .string()
      .required("Email address is required.")
      .email("Invalid email address."),
    password: yup
      .string()
      .required("Password is required.")
      .min(6, "Password must be at least 6 characters long."),
    password_confirmation: yup
      .string()
      .required("Password confirmation is required.")
      .oneOf([yup.ref("password")], "Passwords must match."),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      device_name: navigator.userAgent,
    },
  });

  const { setError } = form;

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(register(data));
      if (result.meta && result.meta.requestStatus === "fulfilled") {
        const { user, access_token, refresh_token } = result.payload;
        setTokens(access_token, refresh_token);
        updateUser(user);
        form.reset();
        navigate("/");
      } else {
        // result.payload may be the whole error response
        const errors = result.payload?.errors;
        if (errors && typeof errors === "object") {
          Object.entries(errors).forEach(([field, messages]) => {
            setError(field, { type: "manual", message: messages[0] });
          });
        }
        // Show the general message at the top if present
        if (result.payload?.message) {
          setError("root", { type: "manual", message: result.payload.message });
        }
      }
    } catch (e) {
      setError("root", {
        type: "manual",
        message: e?.message || "Registration failed. Please try again.",
      });
    }
  };

  const onError = (errors) => {
    console.log("errors", errors);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Register - Future Advice by Charm",
    description:
      "Create your Future Advice by Charm account to access personalized tarot reading services, book appointments, and receive spiritual guidance tailored to your needs.",
    url: "https://futureadvicebycharm.com/register",
    mainEntity: {
      "@type": "WebApplication",
      name: "Future Advice by Charm Registration",
      applicationCategory: "LifestyleApplication",
      operatingSystem: "Web Browser",
    },
  };

  return (
    <>
      <SEO
        title="Register"
        description="Create your Future Advice by Charm account to access personalized tarot reading services, book appointments, and receive spiritual guidance tailored to your needs."
        keywords="tarot register, future Advice by Charm register, spiritual guidance account, tarot reading signup, tarot consultation register, tarot reader account"
        url="/register"
        structuredData={structuredData}
      />
      <div className="grid md:grid-cols-2 gap-4 min-h-screen overflow-hidden md:divide-x md:divide-white z-10">
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
              <h2 className="mt-5 text-3xl">
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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit, onError)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Username" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Email" />
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
                    name="password_confirmation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm Password"
                            {...field}
                          />
                        </FormControl>
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
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
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
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary-500 hover:underline font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
