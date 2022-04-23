import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import environment from "../../../../../config";
import { useQueryURL } from "../../../../../hooks/use-query-url";
import nhatro from "../../../../../assets/images/nhatro.jpg";

import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import viLocale from "date-fns/locale/vi";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

export const ThemPhong = () => {
  const location = useLocation();
  const history = useNavigate();
  const query = useQueryURL();
  const [isOpen, setOpen] = useState(false);
  const [isFirst, setFirst] = useState(false);
  const [indexStatus, setIndexStatus] = useState(false);

  const update = query.get("them-phong");

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
      ten_phong: "",
      tang: "",
      don_gia: "",
      dien_tich: "",
      so_nguoi_phu_hop: 0,
      tien_coc: "",
      ngay_trong: "",
      tien_ich: [
        { name: "1", isChecked: false },
        { name: "2", isChecked: false },
        { name: "3", isChecked: false },
        { name: "4", isChecked: false },
        { name: "5", isChecked: false },
        { name: "6", isChecked: false },
        { name: "7", isChecked: false },
        { name: "8", isChecked: false },
        { name: "9", isChecked: false },
      ],
      loai_anh: "",
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
            query.delete("them-phong");
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
            query.delete("them-phong");
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
                  Thêm phòng
                </h3>
              </div>
            </div>
          </div>
          <div className="">
            <form onSubmit={formik.handleSubmit}>
              <div className="my-3">
                <div className="mx-3">
                  <div
                    className="mt-3 text-center sm:mt-0 sm:text-left
                  grid grid-cols-1 sm:grid-cols-12 gap-4"
                  >
                    <div className="sm:col-span-6">
                      <div>
                        <TextField
                          label="Tên phòng"
                          className="w-full"
                          required
                          type="text"
                          name="ten_phong"
                          value={formik.values.ten_phong}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <div>
                        <TextField
                          label="Tầng / khu / dãy"
                          className="w-full"
                          required
                          type="text"
                          name="tang"
                          value={formik.values.tang}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-4">
                      <div>
                        <TextField
                          label="Giá phòng"
                          className="w-full"
                          required
                          type="number"
                          name="don_gia"
                          value={formik.values.don_gia}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-4">
                      <div>
                        <TextField
                          label="Diện tích (m2)"
                          className="w-full"
                          required
                          type="number"
                          name="dien_tich"
                          value={formik.values.dien_tich}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-4">
                      <div>
                        <TextField
                          label="Số người phù hợp"
                          className="w-full"
                          required
                          type="number"
                          name="so_nguoi_phu_hop"
                          value={formik.values.so_nguoi_phu_hop}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <div>
                        <TextField
                          label="Tiền cọc"
                          className="w-full"
                          type="number"
                          name="tien_coc"
                          value={formik.values.tien_coc}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <LocalizationProvider
                        locale={viLocale}
                        dateAdapter={AdapterDateFns}
                      >
                        <DatePicker
                          mask="__/__/____"
                          views={["day", "month"]}
                          className=""
                          label="Ngày phòng sẽ trống"
                          value={formik.values.ngay_trong}
                          onChange={(value) =>
                            formik.setFieldValue("ngay_trong", value)
                          }
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </div>
                    <div className="sm:col-span-12">
                      <div className="mt-1 pt-2">
                        <div>
                          Hinh anh:
                          <div className="flex justify-around items-center">
                            {[1, 2, 3].map((el) => {
                              return (
                                <div
                                  key={`hinh_anh${el}`}
                                  className="my-4 boder border-2
                                hover:border-gray-400 p-1 relative"
                                >
                                  <button
                                    type="button"
                                    className="absolute right-0 top-0 w-10 
                                  h-10 bg-red-500 hover:bg-red-700 flex 
                                  justify-center items-center"
                                  >
                                    <span>Xóa</span>
                                  </button>
                                  <img width={200} src={nhatro} alt="nha tro" />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <Box className="max-h-20 max-w-xs w-full">
                          <FormControl fullWidth required className="max-h-20">
                            <InputLabel id="loai_anh-label">
                              Loại ảnh
                            </InputLabel>
                            <Select
                              labelId="loai_anh-label"
                              id="loai_anh-select"
                              label="Loại ảnh"
                              value={formik.values.loai_anh || ""}
                              onChange={(event: SelectChangeEvent) => {
                                formik.setFieldValue(
                                  "loai_anh",
                                  event.target.value
                                );
                              }}
                            >
                              <MenuItem value={"Ảnh phòng khách"}>
                                Ảnh phòng khách
                              </MenuItem>
                              <MenuItem value={"Ảnh phòng khách"}>
                                Ảnh phòng ngủ
                              </MenuItem>
                              <MenuItem value={"Ảnh phòng khách"}>
                                Ảnh nhà bếp
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </div>
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
                    query.delete("them-phong");
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
