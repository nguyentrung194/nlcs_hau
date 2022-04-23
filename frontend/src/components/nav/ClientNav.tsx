import { Fragment, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import axios from "axios";
import environment from "../../config";
import { PhongContext } from "../../contexts/context";
import { Link, useLocation } from "react-router-dom";
import profile from "../../assets/images/hau.jpg";
import { classNames } from "../../common/lib";

export const ClientNav = () => {
  const location = useLocation();
  const {} = useContext(PhongContext);
  // useEffect(() => {
  //   if (user_id) {
  //     axios({
  //       url: `${environment.api}users/${user_id}`,
  //       method: "GET",
  //       withCredentials: true,
  //     })
  //       .then((res) => {
  //         console.log(res);
  //         return res;
  //       })
  //       .then(({ data: { data } }) => {

  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [user_id]);

  const navigation = [
    { name: "Guest", to: "/admin/client/guest", current: false },
    { name: "Contract", to: "/admin/client/contract", current: true },
  ];

  return (
    <div className="px-6 pb-1 pt-4" >
      <div className="flex space-x-2">
        {navigation.map((item, index) => {
          return (
            <Link
              key={item.name}
              to={item.to}
              className={classNames(
                location.pathname.match(new RegExp(`\\` + item.to + "*"))
                  ? "bg-blue-900 text-white"
                  : "text-blue-500 hover:bg-blue-700 hover:text-white",
                "px-2 py-2 rounded-md text-sm font-medium"
              )}
              aria-current={
                location.pathname.match(new RegExp(`\\` + item.to + "*"))
                  ? "page"
                  : undefined
              }
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
