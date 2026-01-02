import CustomDatePicker from "@/components/CustomDatePicker";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { http } from "@/utils/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { format } from "date-fns";
import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { updateUserInfo } from "@/redux/reducers/UserSlice";

export default function AppointmentForm({
  genders,
  weekdays,
  packages,
  selectedDate,
}) {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState([]);

  const schema = yup.object({
    email: yup.string().email("Must be a valid email"),
    dob: yup.string().required("Date of Birth is required."),
    gender: yup.number().required("Gender is required."),
    birthday: yup.number().required("Birthday is required."),
    social_link: yup.string().required("Social Acc is required."),
    desc: yup.string().required("Description is required."),
    packages: yup.array().min(1, "Select at least one package"),
  });

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: user?.email ?? "",
      dob: user?.dob ?? "",
      gender: user?.gender_id ?? "",
      birthday: user?.weekday_id ?? "",
      social_link: user?.social_link ?? "",
      desc: "",
      packages: [],
      appointment_date: selectedDate ?? null,
    },
  });

  const selectedPackages = form.watch("packages");

  const handleCheckboxChange = (packageId) => {
    const newSelected = selectedPackages.includes(packageId)
      ? selectedPackages.filter((id) => id !== packageId)
      : [...selectedPackages, packageId];

    form.setValue("packages", newSelected);
  };

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      dob: format(new Date(data.dob), "yyyy-MM-dd"),
    };

    // Handle appointment_date properly
    if (data.appointment_date) {
      formattedData.appointment_date = format(
        new Date(data.appointment_date),
        "yyyy-MM-dd"
      );
    } else if (selectedDate) {
      // If no appointment_date in form data, use the selectedDate prop
      formattedData.appointment_date = format(
        new Date(selectedDate),
        "yyyy-MM-dd"
      );
    }

    try {
      const response = await http.post(
        `/api/auth/appointments/store`,
        formattedData
      );
      const { appointment_no } = response.data.data;
      setFormErrors([]);

      try {
        await dispatch(updateUserInfo());
      } catch (e) {
        // Optionally show a toast or log the error
        console.error("Failed to update user info:", e);
      }

      navigate(`/appointment/${appointment_no}/payment`);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setFormErrors(error.response.data.errors);
      }
    }
  };

  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true });

  return (
    <motion.div
      ref={formRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="py-16 ss:py-10"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-[35%] "
          >
            <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
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

              <div>
                <CustomDatePicker name="dob" label="Date of Birth" />
                {formErrors["dob"] && (
                  <p className="text-red-500 text-sm">{formErrors["dob"]}</p>
                )}
              </div>

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genders</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
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
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birthday</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
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

              <FormField
                control={form.control}
                name="social_link"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Social Acc</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="eg: fb,telegram,viber link"
                      />
                    </FormControl>
                    {formErrors["social_link"] && (
                      <p className="text-red-500 text-sm">
                        {formErrors["social_link"]}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="desc"
                render={({ field }) => (
                  <FormItem className="col-span-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us what you want to know"
                        {...field}
                      />
                    </FormControl>
                    {formErrors["desc"] && (
                      <p className="text-red-500 text-sm">
                        {formErrors["desc"]}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-fit">
                Book Now
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-[65%]"
          >
            <FormField
              control={form.control}
              name="packages"
              render={() => (
                <FormItem className="col-span-full">
                  <FormLabel>Select Packages</FormLabel>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {packages.map((pkg) => (
                      <label
                        key={pkg.id}
                        className={`border p-4 rounded-lg cursor-pointer text-center transition ${
                          selectedPackages.includes(pkg.id)
                            ? "border-primary-900 bg-gradient-to-r from-primary-900/30 to-primary-800/30"
                            : "border-primary-500/20 bg-primary-950/5"
                        }`}
                      >
                        <Controller
                          name="packages"
                          control={form.control}
                          render={() => (
                            <Checkbox
                              checked={selectedPackages.includes(pkg.id)}
                              onCheckedChange={() =>
                                handleCheckboxChange(pkg.id)
                              }
                              className="hidden"
                            />
                          )}
                        />
                        <div className="h-24 xl:h-28 flex flex-col justify-center items-center">
                          <h6 className="text-primary-200 text-xs xl:text-sm font-semibold mb-2">
                            {pkg.name}
                          </h6>
                          <div className="text-xs xl:text-sm">
                            {pkg.discount_percent > 0 ? (
                              <>
                                <span className="line-through text-gray-400 mr-2">
                                  {pkg.price} {pkg.currency ?? "Ks"}
                                </span>
                                <span className="text-red-500 font-bold">
                                  {pkg.final_price} {pkg.currency ?? "Ks"}
                                </span>
                              </>
                            ) : (
                              <span>
                                {pkg.price} {pkg.currency ?? "Ks"}
                              </span>
                            )}
                          </div>
                          <div className="text-xs xl:text-sm bg-gray-800 text-white px-2 py-px mt-1">
                            {pkg.discount_percent > 0 ? (
                              <>
                                <span className="line-through text-gray-400 mr-2">
                                  {pkg.th_price} {pkg.th_currency ?? "฿"}
                                </span>
                                <span className="text-red-400 font-bold">
                                  {pkg.th_final_price} {pkg.th_currency ?? "฿"}
                                </span>
                              </>
                            ) : (
                              <span>
                                {pkg.th_price} {pkg.th_currency ?? "฿"}
                              </span>
                            )}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  {formErrors["packages"] && (
                    <p className="text-red-500 text-sm">
                      {formErrors["packages"]}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
}

// PropTypes validation
AppointmentForm.propTypes = {
  genders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  weekdays: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  packages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      currency: PropTypes.string,
      th_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      th_currency: PropTypes.string,
    })
  ).isRequired,
  selectedDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
};
