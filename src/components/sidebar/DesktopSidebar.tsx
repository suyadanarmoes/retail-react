import { NavLink, useLocation } from "react-router-dom";
//import { useState } from "react";
import { sidebarData } from "./sidebarData";
import { CherryIcon } from "lucide-react";

const DesktopSidebar = () => {
  // const [showSubMenu, setShowSubMenu] = useState<{ [key: string]: boolean }>(
  //   {}
  // );
  const location = useLocation();
  const checkLocation = (paths: string[]): string => {
    if (paths.includes(location.pathname))
      return "bg-green-950 hover:bg-primary/90 text-primary-foreground font-medium shadow";
    return "";
  };

  return (
    <aside className={'lg:flex flex-col hidden min-h-svh min-w-[220px] lg:min-w-[240px] bg-white h-screen'}>
      <div className="flex flex-col items-center justify-center h-20 ">
        <h5 className="flex text-xl font-bold leading-4 cursor-pointer bg  text-green-950">
          <CherryIcon className="h- w-6 mr-2" /> FRUITOPIA
        </h5>
      </div>

      <ul className={"px-3"}>
        {sidebarData.map((item) => (
          <div key={item.name}>
            <NavLink to={item.routeNames[0]}>
              <li
                className={
                  "hover:bg-accent flex items-center justify-between p-2 mb-3 rounded-sm cursor-pointer " +
                  checkLocation(item.routeNames)
                }
              >
                <div className={"flex items-center gap-3 text-lg"}>
                  {item.icon && <item.icon className="w-4 h-4" />}
                  <p className={"text-[13px]"}>{item.name}</p>
                  {/* {item.subMenu && (
                    <button
                      onClick={() =>
                        setShowSubMenu((prev) => ({
                          ...prev,
                          [item.name]: !prev[item.name],
                        }))
                      }
                      className="ml-auto text-lg"
                    >
                      {showSubMenu[item.name] ? "⏫" : "⏬"}
                    </button>
                  )} */}
                </div>
              </li>
            </NavLink>
            {/* {item.subMenu && showSubMenu[item.name] && (
              <ul className="pl-5">
                {item.subMenu.map((submenu) => (
                  <NavLink to={submenu.routeNames[0]} key={submenu.name}>
                    <li
                      className={
                        "hover:bg-accent flex items-center justify-between p-2 mb-3 rounded-sm cursor-pointer " +
                        checkLocation(submenu.routeNames)
                      }
                    >
                      <div className={"flex items-center gap-3 text-lg"}>
                        {submenu.icon && <submenu.icon className="w-4 h-4" />}
                        <p className={"text-[13px]"}>{submenu.name}</p>
                      </div>
                    </li>
                  </NavLink>
                ))}
              </ul>
            )} */}
          </div>
        ))}
      </ul>
    </aside>
  );
};
export default DesktopSidebar;