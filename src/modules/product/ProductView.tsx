import api from "@/api";
import { productcolumns } from "./chunks/productColumns";
import { ProductDataTable } from "./chunks/productData-table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LucideShoppingBag } from "lucide-react";
import { useAppSelector } from "@/store";
import { selectTotalQuantity } from "@/store/features/cartSlice";
import ProductAddEditDialog from "./chunks/productDialog";

const ProductView = () => {
  const { data: product } = api.product?.fetchStocks?.useQuery() ?? {};
  const navigate = useNavigate();
  const totalQuantity = useAppSelector(selectTotalQuantity);
  return (
    <div className="py-3 m-4 bg-white rounded-lg shadow-md">
      <h3 className="text-3xl font-extrabold text-center text-green-950 flex justify-center mb-7">
      🍒Available Products🍒
      </h3>

      <div className="flex justify-end mb-2 ">
        <ProductAddEditDialog isEdit={false} editproduct={undefined}>
          <Button className="text-sm items-center justify-center mr-5 pb-5 pt-5">
            Add New Product
          </Button>
        </ProductAddEditDialog>

        <div className="relative flex  mr-7">
          <span className="absolute top-0 right-0 bg-blue-200  rounded-full px-2 py-1 text-xs font-semibold transform translate-x-1/2 -translate-y-1/2">
            {totalQuantity}
          </span>
          <LucideShoppingBag
            className="h-6 w-6"
            onClick={() => navigate("/cart")}
          />
        </div>
      </div>

      <ProductDataTable columns={productcolumns} data={product ?? []} />
    </div>
  );
};

export default ProductView;