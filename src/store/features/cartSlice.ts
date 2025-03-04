import { Cart } from "@/api/product/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ProductType } from "@/shared/types";
import { toast } from "@/hooks/use-toast";

interface CartState {
  cartItems: Cart[];
}

const initialState: CartState = {
  cartItems: [],
};

export const selectTotalQuantity = (state: RootState): number => {
  return state.cart.cartItems.reduce(
    (total: number, item: Cart) => total + item.quantitySold,
    0
  );
};

export const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const product = action.payload;

      if (product.stock === 0) {
        toast({
          title: "Product is out of stock!",
          variant: "destructive",
          duration: 600,
        });
        return;
      }

      const existingItem = state.cartItems.find(
        (item) => item.productId === product.productId
      );

      if (existingItem) {
        const checkQty = existingItem.quantitySold + 1;
        if (existingItem.quantitySold < product.stock) {
          existingItem.quantitySold += 1;
        } else if (product.stock < checkQty) {
          toast({
            title: "Remaining Stock is not enough!",
            variant: "destructive",
            duration: 600,
          });
          return;
        }
      } else {
        const cartItems: Cart = {
          ...product,
          quantitySold: 1,
        };
        state.cartItems.push(cartItems);
      }
      toast({
        title: "Successfully added to cart!",
        duration: 600,
      });
    },

    reduceCartItems: (state, action: PayloadAction<string>) => {
      const existingItem = state.cartItems.find(
        (item) => item.productId === action.payload
      );

      if (existingItem) {
        if (existingItem.quantitySold > 1) {
          existingItem.quantitySold -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item.productId !== action.payload
          );
          toast({
            title: "Remaining Stock is not enough!",
            variant: "destructive",
            duration: 600,
          });
          return;
        }
        toast({
          title: "Successfully removed from cart!",
          duration: 600,
        });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
    },

    increaseItem: (state, action: PayloadAction<Cart>) => {
      const product = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === product.productId
      );

      if (existingItem && existingItem.quantitySold < product.stock) {
        existingItem.quantitySold += 1;
      } else if (existingItem?.quantitySold === product.stock) {
        toast({
          title: "Remaining Stock is not enough!",
          variant: "destructive",
          duration: 600,
        });
        return;
      } else {
        const cartItems: Cart = {
          ...product,
          quantitySold: 1,
        };
        state.cartItems.push(cartItems);
      }
      toast({
        title: "Successfully added to cart!",
        duration: 600,
      });
    },

    reduceItem: (state, action: PayloadAction<string>) => {
      const existingItem = state.cartItems.find(
        (item) => item.productId === action.payload
      );

      if (existingItem && existingItem.quantitySold > 1) {
        existingItem.quantitySold -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item.productId != action.payload
        );
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  reduceCartItems,
  increaseItem,
  reduceItem,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;