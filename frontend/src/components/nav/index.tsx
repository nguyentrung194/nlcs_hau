import { Fragment, useContext } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import axios from "axios";
import environment from "../../config";
import { PhongContext } from "../../contexts/context";
import { Link, useLocation } from "react-router-dom";
import profile from "../../assets/images/hau.jpg";
import { classNames } from "../../common/lib";

const KHACH_THUE = "Client";
const navigation = [
  { name: "Hotel", to: "/admin/hotel/list", current: false },
  { name: "Room", to: "/admin/room", current: false },
  { name: KHACH_THUE, to: "/admin/client", current: false },
];

export const Nav = () => {
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
  return (
    <Disclosure as="nav" className="bg-blue-800">
      {({ open }: any) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button
                  className="inline-flex items-center justify-center p-2 
                rounded-md text-gray-400 hover:text-white hover:bg-blue-700
                 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center text-white">
                  LG
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-2">
                    {navigation.map((item, index) => {
                      return (
                        <Link
                          key={item.name}
                          to={item.to}
                          className={classNames(
                            location.pathname.match(
                              new RegExp(`\\` + item.to + "*")
                            )
                              ? "bg-blue-900 text-white"
                              : "text-blue-300 hover:bg-blue-700 hover:text-white",
                            "px-2 py-2 rounded-md text-sm font-medium"
                          )}
                          aria-current={
                            location.pathname.match(
                              new RegExp(`\\` + item.to + "*")
                            )
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
              </div>
              <div
                className="absolute inset-y-0 right-0 flex items-center 
              pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
              >
                <button
                  type="button"
                  className="bg-blue-800 p-1 rounded-full text-gray-400 
                  hover:text-white focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-offset-blue-800 
                  focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3 z-10">
                  <div>
                    <Menu.Button
                      className="bg-blue-800 flex text-sm 
                    rounded-full focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-offset-blue-800 
                    focus:ring-white"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={profile}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="settings"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="logout"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                            onClick={async () => {
                              await axios({
                                url: `${environment.api}logout`,
                                method: "POST",
                                withCredentials: true,
                              })
                                .then((res) => {
                                  console.log(res);
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                              // logout();
                            }}
                          >
                            Đăng xuất
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                return (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.to}
                    className={classNames(
                      location.pathname.match(new RegExp(`\\` + item.to + "*"))
                        ? "bg-blue-900 text-white"
                        : "text-blue-300 hover:bg-blue-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={
                      location.pathname.match(new RegExp(`\\` + item.to + "*"))
                        ? "page"
                        : undefined
                    }
                  >
                    {item.name}
                  </Disclosure.Button>
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
