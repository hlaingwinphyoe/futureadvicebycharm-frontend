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
import * as yup from "yup";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { http } from "@/utils/axios";

const passwordSchema = yup.object({
  currentPassword: yup
    .string()
    .required("Current password is required")
    .min(6, "Password must be at least 6 characters"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

export default function UpdatePassword() {
  const { toast } = useToast();
  const [formErrors, setFormErrors] = useState([]);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordForm = useForm({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onPasswordSubmit(data) {
    try {
      await http.patch(`/api/auth/users/password/update`, data);
      toast({
        description: "✅ Password Updated.",
      });
      setFormErrors([]);
    } catch (error) {
      setFormErrors(error.response.data.errors);
    }
    passwordForm.reset();
  }

  const togglePassword = (field) => {
    switch (field) {
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
    }
  };
  return (
    <Card className="bg-black/20 backdrop-blur-md border-primary-500/20">
      <CardHeader>
        <CardTitle className="text-2xl font-serif text-primary-200">
          Change Password
        </CardTitle>
        <CardDescription className="text-primary-400/80">
          Update your password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
            className="space-y-6"
          >
            <FormField
              control={passwordForm.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-200">
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showCurrentPassword ? "text" : "password"}
                        className="pr-10"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => togglePassword("current")}
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4 text-primary-200" />
                        ) : (
                          <Eye className="h-4 w-4 text-primary-200" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  {formErrors["currentPassword"] && (
                    <p className="text-red-500 text-sm">
                      {formErrors["currentPassword"]}
                    </p>
                  )}
                  {formErrors["message"] && (
                    <p className="text-red-500 text-sm">
                      {formErrors["message"]}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-200">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        className="pr-10"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => togglePassword("new")}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4 text-primary-200" />
                        ) : (
                          <Eye className="h-4 w-4 text-primary-200" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                  {formErrors["newPassword"] && (
                    <p className="text-red-500 text-sm">
                      {formErrors["newPassword"]}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-primary-200">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        className="pr-10"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => togglePassword("confirm")}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-primary-200" />
                        ) : (
                          <Eye className="h-4 w-4 text-primary-200" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  {formErrors["confirmPassword"] && (
                    <p className="text-red-500 text-sm">
                      {formErrors["confirmPassword"]}
                    </p>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-fit">
              Change Password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
