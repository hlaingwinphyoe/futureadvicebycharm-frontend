import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import * as yup from "yup";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AccountSidebar from "./Sidebar";
import { yupResolver } from "@hookform/resolvers/yup";
import UpdatePassword from "./UpdatePassword";
import CustomDatePicker from "@/components/CustomDatePicker";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { http, publicHttp } from "@/utils/axios";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

// Validation schemas
const profileSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  phone: yup.string().required("Phone number is required"),
  gender: yup.number().required("Gender is required."),
  birthday: yup.number().required("Birthday is required."),
  dob: yup.string().required("Date of Birth is required."),
});

export default function Profile() {
  const { user } = useSelector((state) => state.user);
  const [formErrors, setFormErrors] = useState([]);
  const [genders, setGenders] = useState([]);
  const [weekdays, setWeekdays] = useState([]);
  const { toast } = useToast();

  const fetchGenders = async () => {
    try {
      const response = await publicHttp.get("/api/genders-list");
      setGenders(response.data.data);
    } catch (err) {
      console.log("failed to fetch", err);
    }
  };

  const fetchWeekdays = async () => {
    try {
      const response = await publicHttp.get("/api/weekdays-list");
      setWeekdays(response.data.data);
    } catch (err) {
      console.log("failed to fetch", err);
    }
  };

  useEffect(() => {
    fetchGenders();
    fetchWeekdays();
  }, []);

  const profileForm = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      username: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      dob: user?.dob ?? "",
      gender: user?.gender_id ?? "",
      birthday: user?.weekday_id ?? "",
    },
  });

  async function onProfileSubmit(data) {
    const formattedData = {
      ...data,
      dob: format(new Date(data.dob), "yyyy-MM-dd"), // Ensure proper format
    };
    try {
      await http.patch(`/api/auth/users/info/update`, formattedData);
      toast({
        description: "✅ Successfully Updated.",
      });

      setFormErrors([]);
    } catch (error) {
      setFormErrors(error.response.data.errors);
    }
  }

  return (
    <div className="container mx-auto mt-24 mb-20 px-6 md:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <AccountSidebar />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-3"
        >
          <div className="grid grid-cols-1 gap-6">
            {/* Profile Information Card */}
            <Card className="bg-black/20 backdrop-blur-md border-primary-500/20">
              <CardHeader>
                <CardTitle className="text-2xl font-serif text-primary-200">
                  Profile Information
                </CardTitle>
                <CardDescription className="text-primary-400/80">
                  Update your personal information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form
                    onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
                  >
                    <FormField
                      control={profileForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary-200">
                            Username
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          {formErrors["username"] && (
                            <p className="text-red-500 text-sm">
                              {formErrors["username"]}
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <CustomDatePicker name="dob" label="Date of Birth" />
                      {formErrors["dob"] && (
                        <p className="text-red-500 text-sm">
                          {formErrors["dob"]}
                        </p>
                      )}
                    </div>

                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary-200">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
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
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary-200">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          {formErrors["phone"] && (
                            <p className="text-red-500 text-sm">
                              {formErrors["phone"]}
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Genders</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Gender">
                                  {field.value
                                    ? genders.find(
                                        (gender) => gender.id == field.value
                                      )?.name || ""
                                    : "Select Gender"}
                                </SelectValue>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {genders.map((gender) => (
                                <SelectItem key={gender.id} value={gender.id}>
                                  {gender.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {formErrors["gender"] && (
                            <p className="text-red-500 text-sm">
                              {formErrors["gender"]}
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="birthday"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Birthday</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Birthday">
                                  {field.value
                                    ? weekdays.find(
                                        (weekday) => weekday.id == field.value
                                      )?.name || ""
                                    : "Select Birthday"}
                                </SelectValue>
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {weekdays.map((weekday) => (
                                <SelectItem key={weekday.id} value={weekday.id}>
                                  {weekday.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {formErrors["birthday"] && (
                            <p className="text-red-500 text-sm">
                              {formErrors["birthday"]}
                            </p>
                          )}
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-fit">
                      Update
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Change Password Card */}
            <UpdatePassword />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
