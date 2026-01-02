import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Receipt,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import AccountSidebar from "./Sidebar";
import { useSelector } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { http } from "@/utils/axios";
import PageLoading from "@/components/PageLoading";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function BookingList() {
  const { user } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookings, setBookings] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    fetchBookings();
  }, [user?.id]);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await http.get(
        `/api/auth/appointments/users/${user?.id}/bookings`
      );
      setBookings(response.data.data);
    } catch (err) {
      console.log("fetch error", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setGlobalFilter(searchQuery);
  }, [searchQuery]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "appointment_no",
        header: "Book No.",
        filterFn: "includesString",
      },
      { accessorKey: "packageNames", header: "Packages" },
      {
        accessorKey: "total_price",
        header: "Total Price",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <Badge
              variant="secondary"
              className="bg-primary/40 whitespace-nowrap"
            >
              {row.original.total_price} Ks
            </Badge>
            <Badge
              variant="secondary"
              className="bg-primary/40 whitespace-nowrap"
            >
              {row.original.th_total_price} THB
            </Badge>
          </div>
        ),
      },
      { accessorKey: "date", header: "Booked Date" },
      { accessorKey: "is_paid", header: "Payment" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge
            className={cn(
              "bg-opacity-20 border-opacity-30",
              row.original.status === "Booked"
                ? "bg-green-500 border-green-500 text-green-200"
                : "bg-yellow-500 border-yellow-500 text-yellow-200"
            )}
          >
            {row.original.status}
          </Badge>
        ),
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  to={`/appointment/${row.original.appointment_no}/booking/slip`}
                  className={buttonVariants({
                    variant: "secondary",
                    size: "sm",
                  })}
                >
                  <Receipt className="h-4 w-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>See Bill</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: bookings,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination,
      globalFilter,
    },
    onPaginationChange: setPagination,
    globalFilterFn: "includesString",
    enableGlobalFilter: true,
  });

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
          <div className="bg-black/20 backdrop-blur-md border border-primary-500/20 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-primary-200 mb-2">
                Appointments
              </h2>
              <Input
                placeholder="Search by Booking No..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </div>

            <div className="overflow-x-auto relative">
              {isLoading && <PageLoading />}

              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.column.columnDef.header}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between px-2 mt-4">
              <div className="flex items-center space-x-2">
                <p className="text-sm text-primary-200">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to last page</span>
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
