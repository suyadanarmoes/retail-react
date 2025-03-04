import { MagicWandIcon, PersonIcon } from "@radix-ui/react-icons";
//import { sub } from "date-fns";
import {
  LampDeskIcon,
  ListCheckIcon,
  ListTreeIcon,
  ShoppingCart,
  //UserCog2Icon,
  // Presentation,
} from "lucide-react";

export const sidebarData = [
  {
    routeNames: ["/"],
    name: "Dashboard",
    icon: LampDeskIcon,
    subMenu: null,
  },
  {
    routeNames: ["/product"],
    name: "Product",
    icon: MagicWandIcon,
    subMenu: null,
  },
  {
    routeNames: ["/cart"],
    name: "Cart",
    icon: ShoppingCart,
    subMenu: null,
  },
  {
    routeNames: ["/cashier"],
    name: "Cashier",
    icon: ListTreeIcon,
    subMenu: null,
  },
  {
    routeNames: ["/manager-management"],
    name: "Manager ",
    icon: PersonIcon,
    subMenu:null,
    // subMenu: [
    //   {
    //     routeNames: ["/manager-management"],
    //     icon: ListCheckIcon,
    //     name: "Sale",
    //   },
    //   {
    //     routeNames: ["/user-list"],
    //     icon: UserCog2Icon,
    //     name: "Users",
    //   },
    // ],
  },
];