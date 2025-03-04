import { ReactNode, useState } from "react";
import { z } from "zod";
import { toast } from "../../../hooks/use-toast";
import { useAppDispatch } from "../../../store";
import { hideLoader, openLoader } from "../../../store/features/loaderSlice";
import api from "../../../api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { ProductType } from "@/shared/types";

const formSchema = z.object({
  productName: z
    .string({ required_error: "Title is required!" })
    .min(3, { message: "Title must be at least 3 characters long!" }),
  stock: z.coerce.number({ required_error: "Stock is required!" }),
  profit: z.coerce.number({ required_error: "Profit is required!" }),
  price: z.coerce.number({ required_error: "Price is required!" }),
  actiflag: z.number().int().min(0).max(1).optional(),
});

type ProductAddEditDialog = {
  children: ReactNode;
  isEdit: boolean;
  editproduct?: ProductType;
};

const ProductAddEditDialog = ({
  children,
  isEdit,
  editproduct,
}: ProductAddEditDialog) => {
  const dispatch = useAppDispatch();

  const addproducts = api.product?.addProduct?.useMutation
    ? api.product.addProduct.useMutation({
        onMutate: () => dispatch(openLoader()),
        onError: () =>
          toast({
            title: "Error",
            description: "Error while adding product",
            variant: "destructive",
          }),
        onSettled: () => {
          setIsDialogOpen(false);
          form.reset();
          dispatch(hideLoader());
          toast({
            title: "Successfully Product Added!",
            duration: 600,
          });
        },
      })
    : { mutate: () => {} }; // Fallback to prevent errors

    if (isEdit && editproduct?.activeflag === false) {
      // If product is inactive (actiflag = 0), do not allow editing
      toast({
        title: "Error",
        description: "Cannot update deleted product.",
        variant: "destructive",
      });
      return null; // or you can just return here to avoid showing the dialog
    }

  const { mutate: updateProduct } = api.product?.updateProduct?.useMutation
    ? api.product.updateProduct.useMutation({
        onMutate: () => dispatch(openLoader()),
        onError: () =>
          toast({
            title: "Error",
            description: "Error while updating product",
            variant: "destructive",
          }),
        onSettled: () => {
          setIsDialogOpen(false);
          form.reset();
          dispatch(hideLoader());
          toast({
            title: "Successfully Product Updated!",
            duration: 600,
          });
        },
      })
    : { mutate: () => {} }; // Ensure it's always a callable function

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: isEdit ? editproduct?.productName : "",
      stock: isEdit ? editproduct?.stock : undefined,
      price: isEdit ? editproduct?.price : undefined,
      profit: isEdit ? editproduct?.profit : undefined,
    },
  });

  console.log("isEdit:", isEdit);
  console.log("editproduct:", editproduct);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEdit && editproduct) {
      updateProduct?.(Object.assign(editproduct, values) as ProductType);
    } else {
      addproducts?.mutate?.(values);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={(e) => setIsDialogOpen(e)}>
      <DialogTrigger asChild={true}>{children}</DialogTrigger>
      <DialogContent className={"w-[95vw] sm:w-[400px] max-w-[400px]"}>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Product" : "Create Product"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Stock..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Price..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profit</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Profit..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className={"flex justify-between items-center mt-4 gap-3"}>
              <Button
                className={"w-full"}
                type={"button"}
                variant={"destructive"}
                onClick={() => setIsDialogOpen(false)}
              >
                {" "}
                Close{" "}
              </Button>
              <Button className={"w-full"} type={"submit"}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductAddEditDialog;