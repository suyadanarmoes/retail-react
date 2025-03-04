import { Button } from "@/components/ui/button";
import { ProductType } from "@/shared/types";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { addToCart, reduceCartItems } from "@/store/features/cartSlice";
import { EditIcon, MinusIcon, PlusIcon, Trash2 } from "lucide-react";
import { DotLottiePlayer } from "@dotlottie/react-player";
import { Cart } from "@/api/product/types";
import ProductAddEditDialog from "./productDialog";
import ProductDelete from "./productDelete";

const productAction = ({ product }: { product: ProductType }) => {
  const cartItems = useAppSelector(
    (state: RootState) => state.cart.cartItems || []
  );
  const dispatch = useAppDispatch();

  return (
    <div className="flex justify-evenly space-x-2">
      {/* <div className="flex justify-evenly"> */}
      {!cartItems.find(
        (item: Cart) => item.productId === product.productId
      ) ? (
        <Button
          className="bg-white text-green-950 border-bg-green-950 hover:bg-blue-600 rounded-lg flex justify-center items-center "
          onClick={() => dispatch(addToCart(product))}
        >
           <DotLottiePlayer
        src="https://lottie.host/02f9da7c-088c-43e5-93c5-6eb500e97282/i3DY8moiIW.lottie"
        autoplay
        loop
        className="w-10 h-10"
      />Add to Cart
        </Button>
      ) : (
        <div className="flex justify-evenly items-center">
          <span
            className=" rounded-full px-2 font-semibold text-red-600 cursor-pointer hover:bg-gray-200 select-none"
            onClick={() => dispatch(reduceCartItems(product.productId))}
          >
            <MinusIcon />
          </span>
          <span className="w-[30px] text-black text-center">
            {
              cartItems.find(
                (item: Cart) => item.productId === product.productId
              )?.quantitySold
            }
          </span>
          <span
            className="rounded-full align-middle px-2 font-semibold text-green-600 cursor-pointer hover:bg-gray-200 select-none"
            onClick={() => dispatch(addToCart(product))}
          >
            <PlusIcon />
          </span>
        </div>
      )}
      {/* </div> */}
      <ProductAddEditDialog isEdit={true} editproduct={product}>
        <Button className="bg-white text-green-950 hover:bg-yellow-600 rounded-lg p-2 px-4 shadow-md">
          <EditIcon /> Edit
        </Button>
      </ProductAddEditDialog>
      <ProductDelete product={product} isDelete={true}>
        <Button className="bg-white text-green-950  hover:bg-red-700 rounded-lg p-2 px-4 shadow-md">
          <Trash2 /> Delete
        </Button>
      </ProductDelete>
    </div>
  );
};

export default productAction;