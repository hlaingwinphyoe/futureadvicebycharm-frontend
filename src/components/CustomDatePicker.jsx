import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

const CustomDatePicker = ({ name = "dob", label = "Date of Birth" }) => {
  const { control, setValue } = useFormContext();
  const fromYear = 1900;
  const toYear = new Date().getFullYear();

  // Handle Date Selection
  const handleDateSelect = (date) => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd"); // Ensure YYYY-MM-DD format
      setValue(name, formattedDate, { shouldValidate: true }); // Set formatted date in form
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium">{label}</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "bg-primary-950/5 border-primary-600/20 !text-primary-200 justify-start text-left rounded-lg p-3 text-sm w-full",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-5 w-5 opacity-60" />
                  {field.value
                    ? format(new Date(field.value), "yyyy-MM-dd")
                    : "YYYY-MM-dd"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-auto p-0 min-w-[250px] sm:min-w-[300px]"
              >
                <Calendar
                  mode="single"
                  selected={field.value ? new Date(field.value) : undefined}
                  defaultMonth={field.value ? new Date(field.value) : undefined}
                  onSelect={handleDateSelect} // Ensure selection formats date
                  initialFocus
                  fromYear={fromYear}
                  toYear={toYear}
                  captionLayout="dropdown-buttons"
                  className="rounded-md border shadow-lg"
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormMessage className="text-xs text-red-500 mt-1" />
        </FormItem>
      )}
    />
  );
};

// PropTypes validation
CustomDatePicker.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
};

export default CustomDatePicker;
