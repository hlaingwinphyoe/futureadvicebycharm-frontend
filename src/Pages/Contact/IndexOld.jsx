import { useForm } from "react-hook-form";
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
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { publicHttp } from "@/utils/axios";
import { useToast } from "@/hooks/use-toast";
import { fetchInfo } from "@/redux/reducers/InfoSlice";
import { useDispatch, useSelector } from "react-redux";
import SEO from "@/components/SEO";

const Index = () => {
  const [formErrors, setFormErrors] = useState([]);
  const dispatch = useDispatch();
  const { info, status } = useSelector((state) => state.info);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchInfo());
    }
  }, [status, dispatch]);

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    message: yup.string().required("Message is required"),
  });
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true });
  const { toast } = useToast();

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await publicHttp.post(`/api/send-message`, data);
      toast({
        description: "Thanks for your message!",
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
    name: "Contact Future Advice by Charm",
    description:
      "Get in touch with Future Advice by Charm for professional tarot reading services. Contact us via email, phone, or social media for spiritual guidance and appointments.",
    url: "https://futureadvicebycharm.com/contact",
    mainEntity: {
      "@type": "Organization",
      name: "Future Advice by Charm",
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: info?.email || "shinthant234223@gmail.com",
          telephone: "+959753472946",
        },
      ],
      sameAs: [
        "https://www.facebook.com/profile.php?id=61567142620648",
        "https://www.tiktok.com/@fabc153",
        "https://t.me/Tarot_by_Charm",
      ],
    },
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Future Advice by Charm for professional tarot reading services. Contact us via email, phone, or social media for spiritual guidance and appointments."
        keywords="contact future Advice by Charm, tarot reading contact, spiritual guidance contact, tarot consultation contact, tarot reader contact, tarot services contact"
        url="/contact"
        structuredData={structuredData}
      />
      <div className="my-20 max-w-5xl mx-auto bg-gradient-to-r from-[#141122] to-secondary-500 text-gray-200">
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="py-8 border-b border-gray-700 mb-12"
        >
          <h1 className="text-4xl font-bold text-primary-200">Contact Us</h1>
          <p className="text-gray-400 mt-2">
            We had love to hear from you. Send us a message!
          </p>
        </motion.header>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="col-span-2 border bg-primary-950/5 border-primary-600/20 p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-primary-200 mb-6">
              Send a Message
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
                          <Input {...field} placeholder="Name" />
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
                          <Input {...field} placeholder="Email" type="email" />
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
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="col-span-full">
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us what you want us to change"
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
                    Send Message
                  </Button>
                </div>
              </form>
            </Form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="p-2"
          >
            <h2 className="text-2xl font-semibold text-primary-200 mb-6">
              Get In Touch
            </h2>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-purple-400 mb-3">
                Email Us
              </h3>
              <a
                href={`mailto:${info?.email || "shinthant234223@gmail.com"}`}
                target="_blank"
                className="text-gray-300"
              >
                {info?.email || "shinthant234223@gmail.com"}
              </a>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-medium text-purple-400 mb-3">
                Call Us
              </h3>
              <p className="text-gray-300">
                <a href="tel:+959753472946" target="_blank">
                  +959753472946
                </a>
              </p>
            </div>

            <div className="mt-12">
              <div className="flex space-x-4">
                {/* Social Media Icons - using simple divs for placeholders */}
                <a
                  href="https://www.facebook.com/profile.php?id=61567142620648"
                  target="_blank"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M17.99 1.596a28 28 0 0 0-3.037-.156C11.59 1.44 9.5 3.582 9.5 7.03v2.341H6.675a.5.5 0 0 0-.5.5v3.85a.5.5 0 0 0 .5.5H9.5v7.72a.5.5 0 0 0 .5.5h3.978a.5.5 0 0 0 .5-.5v-7.72h2.816a.5.5 0 0 0 .496-.435l.497-3.85a.5.5 0 0 0-.496-.565h-3.313V7.412c0-.97.195-1.375 1.408-1.375h2.039a.5.5 0 0 0 .5-.5V2.092a.5.5 0 0 0-.435-.496m-.565 3.44l-1.54.001c-2.157 0-2.407 1.356-2.407 2.375v2.46a.5.5 0 0 0 .499.5h3.246l-.369 2.85h-2.876a.5.5 0 0 0-.5.5v7.718H10.5v-7.718a.5.5 0 0 0-.5-.5H7.176v-2.85H10a.5.5 0 0 0 .5-.5V7.03c0-2.874 1.665-4.59 4.453-4.59c1.009 0 1.92.055 2.472.103z"
                    />
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@fabc153?_t=ZS-8uIPQpuqaGW&_r=1"
                  target="_blank"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="currentColor"
                      d="M224 72a48.05 48.05 0 0 1-48-48a8 8 0 0 0-8-8h-40a8 8 0 0 0-8 8v132a20 20 0 1 1-28.57-18.08a8 8 0 0 0 4.57-7.23V88a8 8 0 0 0-9.4-7.88C50.91 86.48 24 119.1 24 156a76 76 0 0 0 152 0v-39.71A103.25 103.25 0 0 0 224 128a8 8 0 0 0 8-8V80a8 8 0 0 0-8-8m-8 39.64a87.2 87.2 0 0 1-43.33-16.15A8 8 0 0 0 160 102v54a60 60 0 0 1-120 0c0-25.9 16.64-49.13 40-57.6v27.67A36 36 0 1 0 136 156V32h24.5A64.14 64.14 0 0 0 216 87.5Z"
                    />
                  </svg>
                </a>
                <a
                  href="https://t.me/Tarot_by_Charm"
                  target="_blank"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M21.945 2.765a1.55 1.55 0 0 0-1.572-.244L2.456 9.754a1.543 1.543 0 0 0 .078 2.884L6.4 13.98l2.095 6.926c.004.014.017.023.023.036a.5.5 0 0 0 .093.15a.5.5 0 0 0 .226.143c.01.004.017.013.027.015h.006l.003.001a.45.45 0 0 0 .233-.012l.025-.005a.5.5 0 0 0 .191-.122c.006-.007.016-.008.022-.014l3.013-3.326l4.397 3.405c.267.209.596.322.935.322c.734 0 1.367-.514 1.518-1.231L22.469 4.25a1.53 1.53 0 0 0-.524-1.486M9.588 15.295l-.707 3.437l-1.475-4.878l7.315-3.81l-4.997 4.998a.5.5 0 0 0-.136.253m8.639 4.772a.54.54 0 0 1-.347.399a.53.53 0 0 1-.514-.078l-4.763-3.689a.5.5 0 0 0-.676.06L9.83 19.07l.706-3.427l7.189-7.19a.5.5 0 0 0-.584-.797L6.778 13.054l-3.917-1.362A.53.53 0 0 1 2.5 11.2a.53.53 0 0 1 .334-.518l17.914-7.233a.54.54 0 0 1 .558.086a.52.52 0 0 1 .182.518z"
                    />
                  </svg>
                </a>
                <a
                  href="viber://chat?number=+959753472946"
                  target="_blank"
                  className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-200 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M7.965 6.202a.82.82 0 0 0-.537.106h-.014c-.375.22-.713.497-1.001.823c-.24.277-.37.557-.404.827c-.02.16-.006.322.041.475l.018.01c.27.793.622 1.556 1.052 2.274a13.4 13.4 0 0 0 2.03 2.775l.024.034l.038.028l.023.027l.028.024a13.6 13.6 0 0 0 2.782 2.04c1.155.629 1.856.926 2.277 1.05v.006c.123.038.235.055.348.055a1.6 1.6 0 0 0 .964-.414c.325-.288.6-.627.814-1.004v-.007c.201-.38.133-.738-.157-.981A12 12 0 0 0 14.41 13c-.448-.243-.903-.096-1.087.15l-.393.496c-.202.246-.568.212-.568.212l-.01.006c-2.731-.697-3.46-3.462-3.46-3.462s-.034-.376.219-.568l.492-.396c.236-.192.4-.646.147-1.094a12 12 0 0 0-1.347-1.88a.75.75 0 0 0-.44-.263M12.58 5a.5.5 0 0 0 0 1c1.264 0 2.314.413 3.145 1.205c.427.433.76.946.978 1.508c.219.563.319 1.164.293 1.766a.5.5 0 0 0 1 .042a5.4 5.4 0 0 0-.361-2.17a5.4 5.4 0 0 0-1.204-1.854l-.01-.01C15.39 5.502 14.085 5 12.579 5"
                    />
                    <path
                      fill="currentColor"
                      d="M12.545 6.644a.5.5 0 0 0 0 1h.017c.912.065 1.576.369 2.041.868c.477.514.724 1.153.705 1.943a.5.5 0 0 0 1 .023c.024-1.037-.31-1.932-.972-2.646V7.83c-.677-.726-1.606-1.11-2.724-1.185l-.017-.002z"
                    />
                    <path
                      fill="currentColor"
                      d="M12.526 8.319a.5.5 0 1 0-.052.998c.418.022.685.148.853.317c.169.17.295.443.318.87a.5.5 0 1 0 .998-.053c-.032-.6-.22-1.13-.605-1.52c-.387-.39-.914-.58-1.512-.612"
                    />
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M7.067 2.384a22.15 22.15 0 0 1 9.664 0l.339.075a5.16 5.16 0 0 1 3.872 3.763a19.7 19.7 0 0 1 0 9.7a5.16 5.16 0 0 1-3.872 3.763l-.34.075a22.2 22.2 0 0 1-6.077.499L8 22.633a.75.75 0 0 1-1.24-.435l-.439-2.622a5.16 5.16 0 0 1-3.465-3.654a19.7 19.7 0 0 1 0-9.7a5.16 5.16 0 0 1 3.872-3.763zm9.337 1.463a20.65 20.65 0 0 0-9.01 0l-.34.076A3.66 3.66 0 0 0 4.31 6.591a18.2 18.2 0 0 0 0 8.962a3.66 3.66 0 0 0 2.745 2.668l.09.02a.75.75 0 0 1 .576.608l.294 1.758l1.872-1.675a.75.75 0 0 1 .553-.19a20.7 20.7 0 0 0 5.964-.445l.339-.076a3.66 3.66 0 0 0 2.745-2.668c.746-2.94.746-6.021 0-8.962a3.66 3.66 0 0 0-2.745-2.668z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Index;
