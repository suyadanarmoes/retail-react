import { SaleReport } from "@/api/sale/types";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { format } from "date-fns";

export const salecolumns: ColumnDef<SaleReport>[] = [
  {
    accessorKey: "No",
    header: () => <div className="text-black text-center">No</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.index + 1}</div>;
    },
  },

  {
    accessorKey: "productId",
    header: () => <div className="text-black text-center">Product ID</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("productId")}</div>;
    },
  },
  
  {
    accessorKey: "quantitySold",
    header: () => <div className="text-black text-center">Quantity Sold</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("quantitySold")}</div>;
    },
  },
  {
    accessorKey: "totalPrice",
    header: () => <div className="text-black text-center">Total Price</div>,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div className="text-center">{formatted}</div>;
    },
  },
  {
    accessorKey: "totalProfit",
    header: () => <div className="text-black text-center">Total Profit</div>,
    cell: ({ row }) => {
      const profit = parseFloat(row.getValue("totalProfit"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(profit);

      return <div className="text-center">{formatted}</div>;
    },
  },
  {
    accessorKey: "salesDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className=" text-black hover:bg-blue-200 text-center ml-10"
          onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}
        >
          Sale Date
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("salesDate"));
       const formatted = format(date, "yyyy-MM-dd   HH:mm:ss");
      return <div className="ml-10 ">{formatted}</div>;
    
    },
  },
];

export const columnVisibility = {
  createdAt: false,
};