import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { http, publicHttp } from "@/utils/axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { ImageIcon, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export default function PaymentForm({ appointmentNo }) {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [formErrors, setFormErrors] = useState([]);
  const navigate = useNavigate();

  const fetchBanks = async () => {
    setLoading(true);
    try {
      const response = await publicHttp.get("/api/banks-list");
      setBanks(response.data.data);
    } catch (err) {
      console.log("failed to fetch", err);
    } finally {
      setLoading(false);
    }
  };

  const schema = yup
    .object({
      paymentype: yup.number().required("Choose Payment Type."),
      transaction_no: yup.string().nullable(),
      transaction_img: yup
        .mixed()
        .nullable()
        .test("fileSize", "File size is too large (max 5MB)", (value) => {
          if (!value || !value[0]) return true;
          return value[0].size <= MAX_FILE_SIZE;
        })
        .test("fileType", "Unsupported file format", (value) => {
          if (!value || !value[0]) return true;
          return ACCEPTED_IMAGE_TYPES.includes(value[0].type);
        }),
    })
    .test(
      "transaction-required",
      "Either Transaction Number or Transaction Image is required.",
      function (values) {
        const { transaction_no, transaction_img } = values;
        if (
          !transaction_no &&
          (!transaction_img || transaction_img.length === 0)
        ) {
          return this.createError({
            path: "transaction_no",
            message:
              "Either Transaction Number or Transaction Image is required.",
          });
        }
        return true;
      }
    );

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      paymentype: null,
      transaction_no: "",
      transaction_img: null,
    },
  });

  useEffect(() => {
    fetchBanks();
  }, []);

  const handleImageChange = (e, onChange) => {
    const file = e.target.files[0];
    onChange(e.target.files); // Update form value

    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("paymentype", data.paymentype);

      if (data.transaction_no) {
        formData.append("transaction_no", data.transaction_no);
      }

      if (data.transaction_img?.[0]) {
        formData.append("transaction_img", data.transaction_img[0]);
      }

      // Replace with your API endpoint
      await http.post(
        `/api/auth/appointments/${appointmentNo}/payment/store`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFormErrors([]);
      navigate(`/appointment/${appointmentNo}/booking/slip`);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setFormErrors(error.response.data.errors);
      }
    }
  };

  return (
    <>
      <h3 className="text-xl font-semibold mb-4">Billing Details</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 lg:space-y-6"
        >
          <FormField
            control={form.control}
            name="paymentype"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Select Payment</FormLabel>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex flex-wrap gap-4"
                >
                  {loading ? (
                    <div className="flex justify-center w-full">
                      <Loader className="w-6 h-6 animate-spin text-gray-500" />
                    </div>
                  ) : (
                    banks.map((bank) => (
                      <label
                        key={bank.id}
                        className={`border-[1.5px] p-3 cursor-pointer text-center transition ${
                          field.value === bank.id
                            ? "border-primary-500"
                            : "border-gray-600"
                        }`}
                      >
                        <RadioGroupItem value={bank.id} className="hidden" />
                        <div className="max-h-[120px] xl:max-h-36 flex flex-col justify-center items-center">
                          <img
                            src={bank.image}
                            className="h-[120px] w-[120px] xl:h-36 xl:w-36 object-cover"
                            alt={bank.name}
                            loading="lazy"
                          />
                        </div>
                      </label>
                    ))
                  )}
                </RadioGroup>
                {formErrors["paymentype"] && (
                  <p className="text-red-500 text-sm">
                    {formErrors["paymentype"]}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="transaction_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Transaction No.
                  <small className="text-gray-400 ml-1">
                    (Transaction Image ထည့်ပြီးပါက ထည့်စရာမလိုပါ)
                  </small>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Transaction No." />
                </FormControl>
                {formErrors["transaction_no"] && (
                  <p className="text-red-500 text-sm">
                    {formErrors["transaction_no"]}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="transaction_img"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel>
                  Transaction Image
                  <small className="text-gray-400 ml-1">
                    (Transaction No. ထည့်ပြီးပါက ထည့်စရာမလိုပါ)
                  </small>
                </FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <div
                      className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors"
                      onClick={() =>
                        document.getElementById("file-input").click()
                      }
                    >
                      {preview ? (
                        <img
                          src={preview}
                          alt="Preview"
                          className="max-h-64 mx-auto rounded-lg"
                          loading="lazy"
                        />
                      ) : (
                        <div className="py-8">
                          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-500">
                            Click to upload transaction image
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                      )}
                    </div>
                    <Input
                      id="file-input"
                      type="file"
                      accept={ACCEPTED_IMAGE_TYPES.join(",")}
                      className="hidden"
                      onChange={(e) => handleImageChange(e, onChange)}
                      {...field}
                    />
                  </div>
                </FormControl>
                {formErrors["transaction_img"] && (
                  <p className="text-red-500 text-sm">
                    {formErrors["transaction_img"]}
                  </p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="shadow-lg">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
