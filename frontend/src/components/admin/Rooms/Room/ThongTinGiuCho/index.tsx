import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import environment from "../../../../../config";
// import { UserContext } from "../../../../../contexts/reducer";
import { useQueryURL } from "../../../../../hooks/use-query-url";

import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

export const ThongTinGiuCho = () => {
  const location = useLocation();
  const history = useNavigate();
  const query = useQueryURL();
  const [isOpen, setOpen] = useState(false);
  const [isFirst, setFirst] = useState(false);
  const [indexStatus, setIndexStatus] = useState(false);
  // const { setBooks, books } = useContext(UserContext);

  const update = query.get("tt-giu-cho");

  useEffect(() => {
    if (update) {
      setFirst(true);
      setTimeout(() => {
        setOpen(true);
        // formik.setValues({
        // ...items
        //   });
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
      da_dong_tien_phong_den_ngay: null,
      da_thu_tien_phong: false,
      chu_ki_thanh_toan: null,
      ngay_khach_vao: null,
      thoi_han_hop_dong: null,
      ma_hop_dong: null,
      tien_coc: 0,
      tien_phong: null,
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
            query.delete("tt-giu-cho");
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
            query.delete("tt-giu-cho");
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
           w-11/12 max-w-2xl`}
        >
          <div className="bg-blue-800 p-2 sm:p-3">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-white"
                  id="modal-title"
                >
                  Giu cho phong {101}, nha {"Nha khach"}
                </h3>
              </div>
            </div>
          </div>
          <div className="">
            <form onSubmit={formik.handleSubmit}>
              <div
                className="m-3"
              >
                <div className="mt-1 pt-2">
                  <h3 className="text-lg text-center py-3">
                    Thông tin khách hàng
                  </h3>
                </div>
                <div className="">
                  <div className="grid grid-cols-1 gap-y-3 gap-x-1 mb-3">
                    <div>
                      <TextField
                        className="w-full"
                        label="SĐT"
                        required
                        name="ma_hop_dong"
                        type="text"
                        value={formik.values.ma_hop_dong}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div>
                      <TextField
                        className="w-full"
                        label="Họ tên"
                        required
                        name="ma_hop_dong"
                        type="text"
                        value={formik.values.ma_hop_dong}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div>
                      <TextField
                        className="w-full"
                        label="Email"
                        name="ma_hop_dong"
                        type="text"
                        value={formik.values.ma_hop_dong}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div>
                      <TextField
                        className="w-full"
                        label="CMTND / CCCD"
                        name="ma_hop_dong"
                        type="text"
                        value={formik.values.ma_hop_dong}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        className=""
                        label="Ngày vào"
                        value={formik.values.thoi_han_hop_dong}
                        onChange={(value) =>
                          formik.setFieldValue("thoi_han_hop_dong", value)
                        }
                        renderInput={(params) => (
                          <TextField required {...params} />
                        )}
                      />
                    </LocalizationProvider>
                    <div>
                      <TextField
                        className="w-full"
                        label="Ghi chú"
                        name="ma_hop_dong"
                        type="text"
                        value={formik.values.ma_hop_dong}
                        onChange={formik.handleChange}
                      />
                    </div>
                  </div>
                </div>
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
                    query.delete("tt-giu-cho");
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
