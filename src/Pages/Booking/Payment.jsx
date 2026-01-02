import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAppointment,
  clearAppointment,
} from "@/redux/reducers/AppointmentSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaymentForm from "./PaymentForm";
import { Card, CardContent } from "@/components/ui/card";

// Helper for thousands separator
const formatNumber = (value) => {
  if (typeof value !== "number") {
    value = Number(value);
  }
  if (isNaN(value)) return "-";
  return new Intl.NumberFormat("en-US").format(value);
};

export default function Payment() {
  const { appointmentNo } = useParams();
  const dispatch = useDispatch();
  const { appointment } = useSelector((state) => state.appointment);

  useEffect(() => {
    dispatch(clearAppointment());
    dispatch(fetchAppointment(appointmentNo));
  }, [dispatch, appointmentNo]);

  return (
    <div className="container mx-auto mt-24 mb-20 px-6 md:px-0">
      <div className="my-10 text-center">
        <h1 className="header-title text-3xl md:text-4xl xl:text-5xl mb-4">
          Payment
        </h1>
        <h4 className="text-lg md:text-xl xl:text-2xl italic tracking-wide text-primary-200/70">
          You can pay with MMK or THB
        </h4>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 xl:gap-8 py-6">
        <div className="w-full lg:w-[45%] xl:w-[35%]">
          <PaymentForm appointmentNo={appointmentNo} />
        </div>
        <div className="w-full lg:w-[55%] xl:w-[65%]">
          <h3 className="text-xl font-semibold mb-4">Your Packages</h3>
          <Card className="bg-black/20 backdrop-blur-md border-primary-500/20">
            <CardContent>
              <Table className="table-auto mt-5">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Name</TableHead>
                    <TableHead className="text-right">Price (Ks)</TableHead>
                    <TableHead className="text-right">Price (฿)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointment?.appointment_packages?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="md:w-[300px] lg:w-[400px]">
                        {item.package ? item.package.name : "Unknown Package"}
                      </TableCell>
                      <TableCell className="text-right text-nowrap">
                        {item.discount_amt > 0 ? (
                          <>
                            <span className="line-through text-gray-400 mr-2 text-xs">
                              {formatNumber(item.price)} Ks
                            </span>
                            <span className="text-red-500 font-bold">
                              {formatNumber(item.balance)} Ks
                            </span>
                          </>
                        ) : (
                          <span>{formatNumber(item.price)} Ks</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right text-nowrap">
                        {item.discount_amt > 0 ? (
                          <>
                            <span className="line-through text-gray-400 mr-2 text-xs">
                              {formatNumber(item.th_price)} ฿
                            </span>
                            <span className="text-red-400 font-bold">
                              {formatNumber(item.th_balance)} ฿
                            </span>
                          </>
                        ) : (
                          <span>{formatNumber(item.th_price)} ฿</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell className="font-semibold uppercase text-right">
                      Total
                    </TableCell>
                    <TableCell className="font-semibold text-right text-nowrap">
                      {appointment?.discount_amt > 0 ? (
                        <span className="text-red-400 font-bold">
                          {formatNumber(appointment?.balance)} Ks
                        </span>
                      ) : (
                        <span>{formatNumber(appointment?.total_price)} Ks</span>
                      )}
                    </TableCell>
                    <TableCell className="font-semibold text-right text-nowrap">
                      {appointment?.discount_amt > 0 ? (
                        <span className="text-red-400 font-bold">
                          {formatNumber(appointment?.th_balance)} ฿
                        </span>
                      ) : (
                        <span>
                          {formatNumber(appointment?.th_total_price)} ฿
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
