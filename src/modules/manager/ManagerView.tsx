import api from "@/api";
import { SaleDataTable } from "./chunks/managerData-table";
import { salecolumns } from "./chunks/managerColumns";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { DotLottiePlayer } from "@dotlottie/react-player";

const ManagerView = () => {
  const { data: sale } = api.sale?.getallsale.useQuery() ?? {};
  const { data: summary } = api.sale?.getsalereport.useQuery() ?? {};
  const exportClick = () => {
    if (!sale || sale.length === 0) {
      console.error("No data available to export.");
      return;
    }
    const formattedProducts = sale.map((sale) => ({
      "Product ID": sale.productId,
      Price: sale.totalPrice,
      QuantitySold: sale.quantitySold,
      "Product Total Price": sale.totalPrice,
      "Product Total Profit": sale.totalProfit,
    }));                                                                         
    const worksheet = XLSX.utils.json_to_sheet(formattedProducts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "ExportData.xlsx");
  };

  return (
    <div>
      <div className="flex items-center ml-10 mb-5">
        <div className="mr-4">
          <h1 className="text-3xl font-extrabold text-center text-green-950 flex justify-center mb-7">Manager Page 
          <DotLottiePlayer
            src="https://lottie.host/6577a975-729e-4734-9afb-529349235737/oAuRestRcM.lottie"
            autoplay
            loop
            className="w-12 h-12"
          />
          </h1>
        </div>
        <Button
          onClick={exportClick}
          className="ml-auto p-6 mt-7 hover:bg-blue-200 hover:text-black"
        >
          Export excel Sale List
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3 ml-20 mr-20">
        <div className="border border-gray-300 rounded-lg p-4 shadow-sm bg-gradient-to-r bg-slate-400">
          <h2 className="text-sm font-semibold text-black-500">
            Total Sale Profit💸{" "}
          </h2>
          <p className="text-xl font-bold text-black-800">
            ${summary?.totalProfit}
          </p>
        </div>

        <div className="border border-black-300 rounded-lg p-4 shadow-sm bg-gradient-to-r bg-slate-400">
          <h2 className="text-sm font-semibold text-black-500">
            Total Sale Revenue💰
          </h2>
          <p className="text-xl font-bold text-black-800">
            ${summary?.totalPrice}
          </p>
        </div>

        <div className="border border-black-300 rounded-lg p-4 shadow-sm bg-gradient-to-r bg-slate-400">
          <h2 className="text-sm font-semibold text-black-500">
            Total Sale Count🎫
          </h2>
          <p className="text-xl font-bold text-black-800">{sale?.length}</p>
        </div>
      </div>

      <SaleDataTable columns={salecolumns} data={sale ?? []} />
    </div>
  );
};

export default ManagerView;