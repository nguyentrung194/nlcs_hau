import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import environment from "../../../../../config";
import { useQueryURL } from "../../../../../hooks/use-query-url";
import { PhongContext } from "../../../../../contexts/context";
import { DichVu } from "./DichVu";
import { DichVuMoi } from "./DichVuMoi";

export const ConfigPriceRate = () => {
  const location = useLocation();
  const history = useNavigate();
  const query = useQueryURL();
  const [isOpen, setOpen] = useState(false);
  const [isFirst, setFirst] = useState(false);
  const [indexStatus, setIndexStatus] = useState(false);
  const { hotelId } = useParams();

  // put and post to server 2 array bellow
  const [newItems, setNewItems] = useState<Array<any>>([]);
  const [editItems, setEditItems] = useState<Array<any>>([]);

  const update = query.get("cau-hinh-bang-gia");
  const { phong, khus, price_list } = useContext(PhongContext);
  console.log(phong);

  useEffect(() => {
    if (update) {
      setFirst(true);
      setTimeout(() => {
        setOpen(true);
      }, 300);
      setIndexStatus(true);
    } else {
      setFirst(false);
      setTimeout(() => {
        setOpen(false);
        setIndexStatus(false);
      }, 300);
    }
  }, [update]);

  const { addToast } = useToasts();
  const formik = useFormik({
    initialValues: {
      chi_phi: [],
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);

        // code there

        axios({
          url: `${environment.api}books`,
          method: "POST",
          data: {
            ...values,
          },
          withCredentials: true,
        })
          .then((res) => {
            console.log(res);
            // setBooks({
            //   books: [...books, res.data.data],
            // });
            query.delete("cau-hinh-bang-gia");
            history(location.pathname);
            addToast(`Them thanh cong`, {
              appearance: "success",
              autoDismiss: true,
            });
          })
          .catch((err) => {
            console.log(err);
            addToast("Ma so da ton tai!", {
              appearance: "error",
              autoDismiss: true,
            });
          });
        formik.setSubmitting(false);
      } catch (error) {
        addToast("Ban hay thu kiem tra lai duong truyen!", {
          appearance: "error",
          autoDismiss: true,
        });
        console.log(error);
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <div
      className={`${
        indexStatus ? "z-10 overflow-y-auto" : "-z-10 overflow-hidden"
      } fixed inset-0`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          onClick={() => {
            query.delete("cau-hinh-bang-gia");
            history(location.pathname);
          }}
          className={`${isFirst ? "opacity-100" : "opacity-0"} ${
            isOpen ? "ease-in duration-200" : "ease-out duration-300"
          } fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={`${
            isFirst
              ? "opacity-100 translate-y-0 sm:scale-100"
              : "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          } ${
            isOpen ? "ease-in duration-200" : "ease-out duration-300"
          } inline-block align-bottom bg-white rounded-lg text-left 
          overflow-hidden shadow-2xl shadow-black/40 transform transition-all sm:my-8 sm:align-middle
           w-11/12 max-w-5xl`}
        >
          <div className="bg-blue-800 p-2 sm:p-3">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-white"
                  id="modal-title"
                >
                  Khu:{" "}
                  {khus.filter((el: any) => {
                    return `${el.id}` === hotelId;
                  })[0]?.ten_nha ||
                    khus[0]?.ten_nha ||
                    ""}
                </h3>
              </div>
            </div>
          </div>
          <div className="m-3">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <div className="mx-3 my-6 overflow-x-auto">
                  <table className="w-full">
                    <thead className="">
                      <tr>
                        <th
                          style={{
                            minWidth: 30,
                          }}
                          className="text-xs font-medium text-left border border-gray-200 p-2"
                        >
                          STT
                        </th>
                        <th
                          style={{
                            minWidth: 140,
                          }}
                          className="text-xs font-medium text-left border border-gray-200 p-2"
                        >
                          Tên
                        </th>
                        <th
                          style={{
                            minWidth: 140,
                          }}
                          className="text-xs font-medium text-left border border-gray-200 p-2"
                        >
                          Loại phí
                        </th>
                        <th
                          style={{
                            minWidth: 120,
                          }}
                          className="text-xs font-medium text-left border border-gray-200 p-2"
                        >
                          Đơn giá
                        </th>
                        <th
                          style={{
                            minWidth: 140,
                          }}
                          className="text-xs font-medium text-left border border-gray-200 p-2"
                        >
                          Đơn vị
                        </th>
                        <th
                          style={{
                            minWidth: 160,
                          }}
                          className="text-xs font-medium text-left border border-gray-200 p-2"
                        >
                          Thao tác
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {price_list
                        .filter((el: any) => el.hotel_id === (hotelId || "1"))
                        .map((el: any, idx: any) => {
                          console.log(el);
                          return (
                            <DichVu
                              item={el}
                              idx={idx + 1}
                              updateFunction={{ editItems, setEditItems }}
                            />
                          );
                        })}
                      {newItems.map((ele, idx) => {
                        return (
                          <DichVuMoi
                            element={ele}
                            index={idx}
                            updateFunction={{ newItems, setNewItems }}
                          />
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="mx-3 my-6">
                <Button
                  onClick={() => {
                    setNewItems([
                      ...newItems,
                      {
                        name: "",
                        type_name: "",
                        price: 0,
                        unit: "",
                      },
                    ]);
                  }}
                  type="button"
                  variant="outlined"
                  color="primary"
                >
                  Thêm chi phí
                </Button>
              </div>
              <div className="bg-gray-50 border border-b-0 border-r-0 border-l-0 border-gray-200 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Xac nhan
                </button>
                <button
                  onClick={() => {
                    query.delete("cau-hinh-bang-gia");
                    history(location.pathname);
                  }}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border 
              border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium
               text-gray-700 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3
                 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
