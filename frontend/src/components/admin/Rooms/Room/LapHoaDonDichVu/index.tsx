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
import { Button, Checkbox } from "@mui/material";

export const LapHoaDonDichVu = () => {
  const location = useLocation();
  const history = useNavigate();
  const query = useQueryURL();
  const [isOpen, setOpen] = useState(false);
  const [isFirst, setFirst] = useState(false);
  const [indexStatus, setIndexStatus] = useState(false);
  // const { setBooks, books } = useContext(UserContext);

  const dich_vu = [
    {
      ten: "Tiền điện theo đồng hồ",
      loai_phi: "Điện cố định theo đồng hồ",
      don_gia: 4000,
      don_vi: "đ/Kwh",
      so_luong: 0,
      chi_so_dau: 1,
    },
    {
      ten: "Tiền nước theo đồng hồ",
      loai_phi: "Nước cố định theo đồng hồ",
      don_gia: 15000,
      don_vi: "đ/Khối",
      so_luong: 0,
      chi_so_dau: 1,
    },
  ];

  const update = query.get("lap-hoa-don-dv");

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
            query.delete("lap-hoa-don-dv");
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
            query.delete("lap-hoa-don-dv");
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
                  Lập hóa đơn dịch vụ phong {update}, {"Nha khach"}
                </h3>
              </div>
            </div>
          </div>
          <div className="">
            <form onSubmit={formik.handleSubmit}>
              <div className="m-3">
                <div className="my-4">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      className=""
                      label="Tháng"
                      value={formik.values.thoi_han_hop_dong}
                      onChange={(value) =>
                        formik.setFieldValue("thoi_han_hop_dong", value)
                      }
                      renderInput={(params) => (
                        <TextField required {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </div>
                <div className="my-4 p-4 bg-red-300/75 text-red-600">
                  <div>
                    <span>Ghi chú hợp đồng: </span>
                    {"ghi chu hop dong"}
                  </div>
                </div>
                <div className="my-4 border-blue-700 border rounded-sm">
                  <div className="bg-blue-700 p-2">
                    <h1>
                      Phòng {update}, {"Nha khach"}
                    </h1>
                  </div>
                  <div className="p-2">
                    <div className="mx-3 my-6 overflow-x-auto">
                      <table className="w-full">
                        <thead className="">
                          <tr>
                            <th
                              style={{ minWidth: 40 }}
                              className="text-xs font-medium text-left border border-gray-200 p-2"
                            >
                              <Checkbox
                                checked={formik.values.da_thu_tien_phong}
                                onChange={() => {
                                  formik.setFieldValue(
                                    "da_thu_tien_phong",
                                    !formik.values.da_thu_tien_phong
                                  );
                                }}
                              />
                            </th>
                            <th
                              style={{ minWidth: 120 }}
                              className="text-xs font-medium text-left border border-gray-200 p-2"
                            >
                              Tên
                            </th>
                            <th
                              style={{ minWidth: 120 }}
                              className="text-xs font-medium text-left border border-gray-200 p-2"
                            >
                              Loại phí
                            </th>
                            <th
                              style={{ minWidth: 64 }}
                              className="text-xs font-medium text-left border border-gray-200 p-2"
                            >
                              Đơn giá
                            </th>
                            <th
                              style={{ minWidth: 64 }}
                              className="text-xs font-medium text-left border border-gray-200 p-2"
                            >
                              Đơn vị
                            </th>
                            <th
                              style={{ minWidth: 120 }}
                              className="text-xs font-medium text-left border border-gray-200 p-2"
                            >
                              Chỉ số đầu
                            </th>
                            <th
                              style={{ minWidth: 120 }}
                              className="text-xs font-medium text-left border border-gray-200 p-2"
                            >
                              Chỉ số cuối
                            </th>
                            <th
                              style={{ minWidth: 120 }}
                              className="text-xs font-medium text-left border border-gray-200 p-2"
                            >
                              Số lượng
                            </th>
                            <th
                              style={{ minWidth: 120 }}
                              className="text-xs font-medium text-left border border-gray-200 p-2"
                            >
                              Thành tiền
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {dich_vu.map((el) => {
                            return (
                              <tr
                                onClick={() => {}}
                                className="hover:bg-slate-100"
                                key={`${1}+ttpt`}
                              >
                                <td className="text-xs font-medium text-left border border-gray-200 p-2">
                                  <Checkbox
                                    checked={formik.values.da_thu_tien_phong}
                                    onChange={() => {
                                      formik.setFieldValue(
                                        "da_thu_tien_phong",
                                        !formik.values.da_thu_tien_phong
                                      );
                                    }}
                                  />
                                </td>
                                <td className="text-xs font-medium text-left border border-gray-200 p-2">
                                  {el.ten}
                                </td>
                                <td className="text-xs font-medium text-left border border-gray-200 p-2">
                                  {el.loai_phi}
                                </td>
                                <td className="text-xs font-medium text-left border border-gray-200 p-2">
                                  {el.don_gia}
                                </td>
                                <td className="text-xs font-medium text-left border border-gray-200 p-2">
                                  {el.don_vi}
                                </td>
                                <td className="text-xs font-medium text-left border border-gray-200 p-2">
                                  <TextField
                                    className="w-full"
                                    required
                                    type="number"
                                    name="tien_coc"
                                    value={el.chi_so_dau}
                                    onChange={formik.handleChange}
                                  />
                                </td>
                                <td className="text-xs font-medium text-left border border-gray-200 p-2">
                                  <TextField
                                    className="w-full"
                                    required
                                    type="number"
                                    name="tien_coc"
                                    value={el.chi_so_dau}
                                    onChange={formik.handleChange}
                                  />
                                </td>
                                <td className="text-xs font-medium text-left border border-gray-200 p-2">
                                  <TextField
                                    className="w-full"
                                    required
                                    disabled
                                    type="number"
                                    name="tien_coc"
                                    value={el.so_luong}
                                    onChange={formik.handleChange}
                                  />
                                </td>
                                <td className="text-xs font-medium text-left border border-gray-200 p-2">
                                  <TextField
                                    className="w-full"
                                    required
                                    disabled
                                    type="number"
                                    name="tien_coc"
                                    value={el.so_luong}
                                    onChange={formik.handleChange}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                          <tr
                            onClick={() => {}}
                            className="hover:bg-slate-100"
                            key={`${1}+ttpt`}
                          >
                            <td
                              colSpan={8}
                              className="text-xs font-medium text-left border border-gray-200 p-2"
                            >
                              Tổng tiền
                            </td>
                            <td className="text-xs font-medium text-left border border-gray-200 p-2">
                              {0}
                            </td>
                          </tr>
                          <tr
                            onClick={() => {}}
                            className="hover:bg-slate-100"
                            key={`${1}+ttpt`}
                          >
                            <td
                              colSpan={8}
                              className="text-xs font-medium text-left border border-gray-200 p-2"
                            >
                              Giảm giá
                            </td>
                            <td className="text-xs font-medium text-left border border-gray-200 p-2">
                              <TextField
                                className="w-full"
                                required
                                disabled
                                type="number"
                                name="tien_coc"
                                value={formik.values.tien_coc}
                                onChange={formik.handleChange}
                              />
                            </td>
                          </tr>
                          <tr
                            onClick={() => {}}
                            className="hover:bg-slate-100"
                            key={`${1}+ttpt`}
                          >
                            <td
                              colSpan={8}
                              className="text-xs font-medium text-left border border-gray-200 p-2"
                            >
                              Tổng cộng
                            </td>
                            <td className="text-xs font-medium text-left border border-gray-200 p-2">
                              {0}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="my-4">
                  <TextField
                    className="w-full"
                    label="Nhập ghi chú"
                    required
                    name="ma_hop_dong"
                    type="text"
                    value={formik.values.ma_hop_dong}
                    onChange={formik.handleChange}
                  />
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
                    query.delete("lap-hoa-don-dv");
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
