import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { publicHttp } from "@/utils/axios";
import { useToast } from "@/hooks/use-toast";
import { fetchInfo } from "@/redux/reducers/InfoSlice";
import { useDispatch, useSelector } from "react-redux";
import SEO from "@/components/SEO";

const FeedbackIndex = () => {
  const { user } = useSelector((state) => state.user);
  const [formErrors, setFormErrors] = useState([]);
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.info);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchInfo());
    }
  }, [status, dispatch]);

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    rating: yup.string().required("Rating is required"),
    type: yup.string().required("Feedback type is required"),
    message: yup.string().required("Feedback message is required"),
  });

  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true });
  const { toast } = useToast();

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      rating: "",
      type: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await publicHttp.post(`/api/send-feedback`, data);
      toast({
        description: "Thanks for your feedback!",
      });
      form.reset();
      setFormErrors([]);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setFormErrors(error.response.data.errors);
      }
    }
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Feedback - Future Advice by Charm",
    description:
      "Share your experience with Future Advice by Charm. Your feedback helps us improve our services and provide better spiritual guidance.",
    url: "https://futureadvicebycharm.com/feedback",
    mainEntity: {
      "@type": "Organization",
      name: "Future Advice by Charm",
    },
  };

  return (
    <>
      <SEO
        title="Feedback"
        description="Share your experience with Future Advice by Charm. Your feedback helps us improve our services and provide better spiritual guidance."
        keywords="tarot feedback, future Advice by Charm review, future Advice by Charm reviews,spiritual guidance feedback, tarot consultation review, tarot reader feedback"
        url="/feedback"
        structuredData={structuredData}
      />
      <div className="my-20 max-w-6xl mx-auto bg-gradient-to-r from-[#141122] to-secondary-500 text-gray-200">
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="py-8 border-b border-gray-700 mb-12"
        >
          <h1 className="text-4xl font-bold text-primary-200">Feedback</h1>
          <p className="text-gray-400 mt-2">
            Your feedback helps us improve our services
          </p>
        </motion.header>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Feedback Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="col-span-2 border bg-primary-950/5 border-primary-600/20 p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-primary-200 mb-6">
              Share Your Experience
            </h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Your name" />
                        </FormControl>
                        {formErrors["name"] && (
                          <p className="text-red-500 text-sm">
                            {formErrors["name"]}
                          </p>
                        )}
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
                          <Input
                            {...field}
                            placeholder="Your email"
                            type="email"
                          />
                        </FormControl>
                        {formErrors["email"] && (
                          <p className="text-red-500 text-sm">
                            {formErrors["email"]}
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Controller
                    name="rating"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select rating" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="5">
                              ⭐⭐⭐⭐⭐ Excellent
                            </SelectItem>
                            <SelectItem value="4">
                              ⭐⭐⭐⭐ Very Good
                            </SelectItem>
                            <SelectItem value="3">⭐⭐⭐ Good</SelectItem>
                            <SelectItem value="2">⭐⭐ Fair</SelectItem>
                            <SelectItem value="1">⭐ Poor</SelectItem>
                          </SelectContent>
                        </Select>
                        {formErrors["rating"] && (
                          <p className="text-red-500 text-sm">
                            {formErrors["rating"]}
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Controller
                    name="type"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feedback Type</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="general">
                              General Feedback
                            </SelectItem>
                            <SelectItem value="service">
                              Service Quality
                            </SelectItem>
                            <SelectItem value="reading">
                              Reading Accuracy
                            </SelectItem>
                            <SelectItem value="website">
                              Website Experience
                            </SelectItem>
                            <SelectItem value="suggestion">
                              Suggestion
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {formErrors["type"] && (
                          <p className="text-red-500 text-sm">
                            {formErrors["type"]}
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="col-span-full">
                        <FormLabel>Your Feedback</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Share your experience with us"
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        {formErrors["message"] && (
                          <p className="text-red-500 text-sm">
                            {formErrors["message"]}
                          </p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-fit">
                    Submit Feedback
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>

          {/* Feedback Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="p-2"
          >
            <h2 className="text-2xl font-semibold text-primary-200 mb-6">
              Why Your Feedback Matters
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-purple-400 mb-3">
                  Improve Our Services
                </h3>
                <p className="text-gray-300">
                  Your feedback helps us understand what works and what needs
                  improvement.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-purple-400 mb-3">
                  Better Experience
                </h3>
                <p className="text-gray-300">
                  We use your suggestions to enhance the quality of our readings
                  and services.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-purple-400 mb-3">
                  Connect With Us
                </h3>
                <p className="text-gray-300">
                  Your feedback helps us build a stronger connection with our
                  community.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default FeedbackIndex;
