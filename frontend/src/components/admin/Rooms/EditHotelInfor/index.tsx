import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import environment from "../../../../config";
import { PhongContext } from "../../../../contexts/context";
import { useQueryURL } from "../../../../hooks/use-query-url";
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

export const EditHotelInfor = () => {
  const location = useLocation();
  const history = useNavigate();
  const query = useQueryURL();
  const [isOpen, setOpen] = useState(false);
  const [isFirst, setFirst] = useState(false);
  const [indexStatus, setIndexStatus] = useState(false);
  const { khus, editKhu } = useContext(PhongContext);
  console.log(khus);
  const update = query.get("cap-nhat-thong-tin-nha");

  const { hotelId } = useParams();
  const [hotelInfor, setHotelInfor] = useState<any>();

  useEffect(() => {
    setHotelInfor(
      khus.filter((el: any) => {
        return `${el.id}` === hotelId;
      })[0] || khus[0]
    );
  }, [hotelId, khus]);

  useEffect(() => {
    if (update) {
      setFirst(true);
      if (
        khus.filter((el: any) => {
          return `${el.id}` === hotelId;
        })[0]?.ten_nha ||
        khus[0]?.ten_nha ||
        ""
      ) {
        formik.setFieldValue("ten_nha", hotelInfor.ten_nha);
        formik.setFieldValue("loai_nha", hotelInfor.loai_nha);
        formik.setFieldValue("dia_chi", hotelInfor.dia_chi);
        formik.setFieldValue("hinh_thuc", hotelInfor.hinh_thuc);
        formik.setFieldValue("ngay_ghi_chi_so", hotelInfor.ngay_ghi_chi_so);
        formik.setFieldValue("ngay_chot_so", hotelInfor.ngay_chot_so);
      }
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
  }, [update, khus, hotelInfor]);

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
        editKhu({ khu: { ...hotelInfor, ...values } });
        addToast(`Update success`, {
          appearance: "success",
          autoDismiss: true,
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
            query.delete("cap-nhat-thong-tin-nha");
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
                  C???p nh???t th??ng tin{" "}
                  {hotelInfor?.ten_nha !== undefined
                    ? hotelInfor.ten_nha
                    : khus[0].ten_nha || ""}
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
                          label="T??n nh??"
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
                          <InputLabel id="loai-nha-label">Lo???i nh??</InputLabel>
                          <Select
                            labelId="loai-nha-label"
                            id="loai-nha-select"
                            label="H??nh th???c cho thu??"
                            value={formik.values.loai_nha}
                            onChange={(event: SelectChangeEvent) => {
                              formik.setFieldValue(
                                "loai_nha",
                                event.target.value
                              );
                            }}
                          >
                            <MenuItem value={"Nh?? tr???"}>Nh?? tr???</MenuItem>
                            <MenuItem value={"K?? t??c x??"}>K?? t??c x??</MenuItem>
                            <MenuItem value={"Nh?? nguy??n c??n"}>
                              Nh?? nguy??n c??n
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                    <div className="sm:col-span-6">
                      <div>
                        <TextField
                          label="?????a ch???"
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
                            H??nh th???c cho thu??
                          </InputLabel>
                          <Select
                            labelId="hinh-thuc-label"
                            id="hinh-thuc-select"
                            label="H??nh th???c cho thu??"
                            value={formik.values.hinh_thuc || ""}
                            onChange={(event: SelectChangeEvent) => {
                              formik.setFieldValue(
                                "hinh_thuc",
                                event.target.value
                              );
                            }}
                          >
                            <MenuItem value={"Bao ph??ng"}>Bao ph??ng</MenuItem>
                            <MenuItem value={"T???ng ng?????i"}>T???ng ng?????i</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                    <div className="sm:col-span-6">
                      <Box className="max-h-20">
                        <FormControl fullWidth required className="max-h-20">
                          <InputLabel id="ngay_ghi_chi_so-label">
                            Ng??y ghi ch??? s??? ??i???n n?????c
                          </InputLabel>
                          <Select
                            labelId="ngay_ghi_chi_so-label"
                            id="ngay_ghi_chi_so-select"
                            label="Ng??y ghi ch??? s??? ??i???n n?????c"
                            value={formik.values.ngay_ghi_chi_so || ""}
                            onChange={(event: SelectChangeEvent) => {
                              formik.setFieldValue(
                                "ngay_ghi_chi_so",
                                event.target.value
                              );
                            }}
                          >
                            {[...Array(31).keys()].map((el) => {
                              return <MenuItem value={el}>{el}</MenuItem>;
                            })}
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                    <div className="sm:col-span-6">
                      <Box className="max-h-20">
                        <FormControl fullWidth required className="max-h-20">
                          <InputLabel id="ngay_chot_so-label">
                            Ng??y ch???t s??? - t??nh ph??
                          </InputLabel>
                          <Select
                            labelId="ngay_chot_so-label"
                            id="ngay_chot_so-select"
                            label="Ng??y ch???t s??? - t??nh ph??"
                            value={formik.values.ngay_chot_so || ""}
                            onChange={(event: SelectChangeEvent) => {
                              formik.setFieldValue(
                                "ngay_chot_so",
                                event.target.value
                              );
                            }}
                          >
                            {[...Array(31).keys()].map((el) => {
                              return <MenuItem value={el}>{el}</MenuItem>;
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
                  X??c nh???n
                </button>
                <button
                  onClick={() => {
                    query.delete("cap-nhat-thong-tin-nha");
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
