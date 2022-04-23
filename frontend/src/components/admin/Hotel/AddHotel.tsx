import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import environment from "../../../config";
import { PhongContext, stateLogin } from "../../../contexts/context";
import { useQueryURL } from "../../../hooks/use-query-url";
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

export const AddHotel = () => {
  const location = useLocation();
  const history = useNavigate();
  const query = useQueryURL();
  const [isOpen, setOpen] = useState(false);
  const [isFirst, setFirst] = useState(false);
  const [indexStatus, setIndexStatus] = useState(false);
  const { addKhu, khus } = useContext(PhongContext);

  const addHotel = query.get("them-nha");

  useEffect(() => {
    if (addHotel) {
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
  }, [addHotel]);

  const { addToast } = useToasts();
  const formik = useFormik({
    initialValues: {
      ten_nha: "",
      loai_nha: "",
      dia_chi: "",
      hinh_thuc: "",
      ngay_ghi_chi_so: undefined,
      ngay_chot_so: undefined,
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);

        // code there
        addKhu({
          khu: {
            id: `${khus.length + 1}`,
            ...values,
            email: stateLogin.email,
            cmnd: stateLogin.cmnd,
            so_dien_thoai: stateLogin.so_dien_thoai,
            chu_so_huu: stateLogin.name,
            so_phong: 0,
            cho_trong: 0,
          },
        });
        addToast(`Them thanh cong`, {
          appearance: "success",
          autoDismiss: true,
        });
        query.delete("them-nha");
        history(location.pathname);
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
            query.delete("them-nha");
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
                  Thêm nhà trọ
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
                          label="Tên nhà"
                          className="w-full"
                          required
                          type="text"
                          name="ten_nha"
                          value={formik.values.ten_nha}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <Box>
                        <FormControl fullWidth required>
                          <InputLabel id="loai-nha-label">Loại nhà</InputLabel>
                          <Select
                            labelId="loai-nha-label"
                            id="loai-nha-select"
                            label="Hình thức cho thuê"
                            value={formik.values.loai_nha}
                            onChange={(event: SelectChangeEvent) => {
                              formik.setFieldValue(
                                "loai_nha",
                                event.target.value
                              );
                            }}
                          >
                            <MenuItem value={"Nhà trọ"}>Nhà trọ</MenuItem>
                            <MenuItem value={"Kí túc xá"}>Kí túc xá</MenuItem>
                            <MenuItem value={"Nhà nguyên căn"}>
                              Nhà nguyên căn
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                    <div className="sm:col-span-6">
                      <div>
                        <TextField
                          label="Địa chỉ"
                          className="w-full"
                          required
                          type="text"
                          name="dia_chi"
                          value={formik.values.dia_chi}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-6">
                      <Box>
                        <FormControl fullWidth required>
                          <InputLabel id="hinh-thuc-label">
                            Hình thức cho thuê
                          </InputLabel>
                          <Select
                            labelId="hinh-thuc-label"
                            id="hinh-thuc-select"
                            label="Hình thức cho thuê"
                            value={formik.values.hinh_thuc || ""}
                            onChange={(event: SelectChangeEvent) => {
                              formik.setFieldValue(
                                "hinh_thuc",
                                event.target.value
                              );
                            }}
                          >
                            <MenuItem value={"Bao phòng"}>Bao phòng</MenuItem>
                            <MenuItem value={"Từng người"}>Từng người</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                    <div className="sm:col-span-6">
                      <Box className="max-h-20">
                        <FormControl fullWidth required className="max-h-20">
                          <InputLabel id="ngay_ghi_chi_so-label">
                            Ngày ghi chỉ số điện nước
                          </InputLabel>
                          <Select
                            labelId="ngay_ghi_chi_so-label"
                            id="ngay_ghi_chi_so-select"
                            label="Ngày ghi chỉ số điện nước"
                            value={formik.values.ngay_ghi_chi_so || ""}
                            onChange={(event: SelectChangeEvent) => {
                              formik.setFieldValue(
                                "ngay_ghi_chi_so",
                                event.target.value
                              );
                            }}
                          >
                            {[...Array(31).keys()].map((el, index) => {
                              return (
                                <MenuItem key={index} value={el}>
                                  {el}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                    <div className="sm:col-span-6">
                      <Box className="max-h-20">
                        <FormControl fullWidth required className="max-h-20">
                          <InputLabel id="ngay_chot_so-label">
                            Ngày chốt sổ - tính phí
                          </InputLabel>
                          <Select
                            labelId="ngay_chot_so-label"
                            id="ngay_chot_so-select"
                            label="Ngày chốt sổ - tính phí"
                            value={formik.values.ngay_chot_so || ""}
                            onChange={(event: SelectChangeEvent) => {
                              formik.setFieldValue(
                                "ngay_chot_so",
                                event.target.value
                              );
                            }}
                          >
                            {[...Array(31).keys()].map((el, index) => {
                              return (
                                <MenuItem key={index} value={el}>
                                  {el}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Box>
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
                  Xác nhận
                </button>
                <button
                  onClick={() => {
                    query.delete("them-nha");
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
