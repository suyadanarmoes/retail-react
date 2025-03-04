import { addsellProduct } from "@/api/sale";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { RootState, useAppDispatch, useAppSelector } from "@/store";
import { clearCart } from "@/store/features/cartSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CashierView = () => {
  const CartItems = useAppSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useAppDispatch();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { mutate } = addsellProduct.useMutation({});
  const navigate = useNavigate();

  // Calculate total price
  useEffect(() => {
    setTotalPrice(
      CartItems.reduce(
        (total: number, item: { price: number; quantitySold: number }) =>
          total + item.price * item.quantitySold,
        0
      )
    );
  }, [CartItems]);

  const cashProcess = () => {
    if (CartItems.length === 0) {
      toast({
        title: "No items in the cart...",
        variant: "destructive",
        duration: 600,
      });
      return;
    }

    // Prepare sale data as an array of objects matching the API structure
    const saleData = CartItems.map(
      (item: { productId: string; productName: string; quantitySold: number }) => ({
        productId: item.productId,
        productName: item.productName,
        quantitySold: item.quantitySold,
      })
    );

    // Send sale data in a batch (as an array)
    try {
      mutate(saleData); // Pass the array to mutate function
      toast({
        title: "Transaction completed",
        description: "Thanks For Shopping With Us!",
        duration: 1500,
      });
      dispatch(clearCart());
      navigate("/product");
    } catch (error) {
      console.error("Error processing transaction: ", error);
      toast({
        title: "Transaction failed",
        description: "There was an error processing your transaction.",
        variant: "destructive",
        duration: 1500,
      });
    }
  };

  return (
    <div>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-2xl rounded-lg border border-green-300 mt-10">
        <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Receipt
        </h1>

        <div className="space-y-4 text-gray-700">
          {CartItems.map((item) => (
            <div key={item.productId} className="border-b border-dashed py-3">
              <div className="flex justify-between">
                <span className="font-medium">{item.productName}</span>
                <span>${item.price * item.quantitySold}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Quantity: {item.quantitySold}</span>
                <span className="text-right">${item.price}</span>
              </div>
            </div>
          ))}

          <div className="flex justify-between text-xl font-bold mt-4 border-t pt-4 text-gray-700">
            <span>Total:</span>
            <span>
              ${CartItems.reduce(
                (total, item) => total + item.price * item.quantitySold,
                0
              )}
            </span>
          </div>
        </div>

        <Button
          className="mt-8 w-full bg-gradient-to-r from-green-400 to-green-900 text-white py-3 rounded-lg hover:from-green-500 hover:to-blue-600 transform transition-transform duration-200 ease-in-out"
          onClick={cashProcess}
        >
          Cash Out
        </Button>
      </div>
    </div>
  );
};

export default CashierView;
