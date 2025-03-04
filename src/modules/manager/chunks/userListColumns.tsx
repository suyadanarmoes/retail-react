import { GetAllUserType } from "@/api/user/types";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown } from "lucide-react";

export const userlistcolumns: ColumnDef<GetAllUserType>[] = [
  {
    accessorKey: "No",
    header: () => <div className="text-center text-black">No</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.index + 1}</div>;
    },
  },

  {
    accessorKey: "UserName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="hover:bg-blue-200 ml-20 text-center text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          User Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="ml-20">{row.getValue("userName")}</div>,
  },

  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-left text-black">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"));
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount);

  //     return <div className="text-left">{formatted}</div>;
  //   },
  // },

  // {
  //   accessorKey: "userRole",
  //   header: () => <div className="text-right text-black">User Role</div>,
  //   cell: ({ row }) => {
  //     return <div className="text-right">{row.getValue("userRole")}</div>;
  //   },
  // },

  {
    accessorKey: "createddate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className=" text-black hover:bg-blue-200 text-center ml-40 text-black"
          onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
        >
          Created Date
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createddate"));
      const formatted = format(date, "yyyy-MM-dd   HH:mm:ss");
      return <div className="ml-40 ">{formatted}</div>;
    },
  },
];