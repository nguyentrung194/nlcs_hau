import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import environment from "../../../../../../config";
import { useQueryURL } from "../../../../../../hooks/use-query-url";
import khachhang from "../../../../../../assets/images/hau.jpg";

import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import {
  Avatar,
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { stringAvatar } from "../../../../../../common/lib";
import { storage } from "../../../../../../hooks/use-firebase";

export const ThongTinHopDong = () => {
  const location = useLocation();
  const history = useNavigate();
  const query = useQueryURL();
  const [isOpen, setOpen] = useState(false);
  const [isFirst, setFirst] = useState(false);
  const [indexStatus, setIndexStatus] = useState(false);

  const update = query.get("them-khach");
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
      //Thông tin hợp đồng
      ngay_khach_vao: null,
      thoi_han_hop_dong: null,
      ma_hop_dong: null,
      tien_phong: null,
      tien_coc: null,
      chu_ki_thanh_toan: null,
      ngay_chot_tien_hang_thang: null,
      da_thu_tien_phong: false,
      da_dong_tien_phong_den_ngay: null,
      //Thông tin khách hàng
      url_avatar: null,
      sdt: null,
      ho_ten: null,
      email: null,
      ngay_sinh: null,
      dia_chi: null,
      ghi_chu: null,
      tam_tru: null,
      thoi_han_tam_tru: null,
      cmnd: null,
      ngay_cap_cmnd: null,
      noi_cap_cmnd: null,
      url_cmnd_mt: null,
      url_cmnd_ms: null,
      //Thông tin dịch vụ
      
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

            query.delete("cap-nhat-thong-tin-phong");
            history(
              `${
                location.pathname +
                `${query.toString() ? "?" : ""}` +
                query.toString()
              }`
            );
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
    <div className="static">
      <div
        className={`${
          indexStatus ? "z-20 overflow-y-auto" : "hidden -z-11 overflow-hidden"
        } relative top-0 right-0`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-end justify-center sm:pt-4 sm:px-4 sm:pb-20 text-center sm:block sm:p-0">
          <div
            onClick={() => {
              query.delete("them-khach");
              history(
                `${
                  location.pathname +
                  `${query.toString() ? "?" : ""}` +
                  query.toString()
                }`
              );
            }}
            className={`${isFirst ? "opacity-100" : "opacity-0"} ${
              isOpen ? "ease-in duration-200" : "ease-out duration-300"
            } fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}
            aria-hidden="true"
          ></div>
          <span
            className="hidden sm:inline-block sm:align-middle"
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
          w-full my-3 sm:m-0 sm:w-11/12 max-w-5xl`}
          >
            <div className="bg-blue-800 p-2 sm:p-3">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h1
                    className="text-lg leading-6 font-medium text-white"
                    id="modal-title"
                  >
                    Them hop dong - Phong {update}
                  </h1>
                </div>
              </div>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="my-3">
                <div className="mx-3">
                  <div
                    className="mt-3 text-center sm:mt-0 sm:text-left
                  grid grid-cols-1 sm:grid-cols-3 gap-4"
                  >
                    <h3 className="sm:col-span-3 text-lg text-center py-3">
                      Thông tin hợp đồng
                    </h3>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        className=""
                        label="Ngày khách vào"
                        value={formik.values.ngay_khach_vao}
                        onChange={(value) =>
                          formik.setFieldValue("ngay_khach_vao", value)
                        }
                        renderInput={(params) => (
                          <TextField required {...params} />
                        )}
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        className=""
                        label="Thời hạn hợp đồng"
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
                        label="Mã hợp đồng tham chiếu"
                        name="ma_hop_dong"
                        type="text"
                        value={formik.values.ma_hop_dong}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div>
                      <TextField
                        label="Tiền phòng"
                        className="w-full"
                        required
                        type="number"
                        name="tien_phong"
                        value={formik.values.tien_phong}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div>
                      <TextField
                        label="Tiền cọc"
                        className="w-full"
                        required
                        type="number"
                        name="tien_coc"
                        value={formik.values.tien_coc}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div>
                      <Box>
                        <FormControl fullWidth>
                          <InputLabel id="chu-ki-thanh-toan-label">
                            Chu kỳ thanh toán
                          </InputLabel>
                          <Select
                            labelId="chu-ki-thanh-toan-label"
                            id="chu-ki-thanh-toan-select"
                            label="Chu kỳ thanh toán"
                            value={formik.values.chu_ki_thanh_toan || ""}
                            onChange={(event: SelectChangeEvent) => {
                              formik.setFieldValue(
                                "chu_ki_thanh_toan",
                                event.target.value
                              );
                            }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={1}>1 Thang</MenuItem>
                            <MenuItem value={3}>3 Thang</MenuItem>
                            <MenuItem value={6}>6 Thang</MenuItem>
                            <MenuItem value={12}>1 Nam</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                    <div>
                      <Box>
                        <FormControl fullWidth>
                          <InputLabel id="chu-ki-thanh-toan-label">
                            Ngày chốt tiền phòng hàng tháng
                          </InputLabel>
                          <Select
                            labelId="chu-ki-thanh-toan-label"
                            id="chu-ki-thanh-toan-select"
                            label="Ngày chốt tiền phòng hàng tháng"
                            value={formik.values.chu_ki_thanh_toan || ""}
                            onChange={(event: SelectChangeEvent) => {
                              formik.setFieldValue(
                                "chu_ki_thanh_toan",
                                event.target.value
                              );
                            }}
                          >
                            {Array.from(Array(31).keys()).map((el, ind) => (
                              <MenuItem key={el} value={ind + 1}>
                                {ind + 1}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </div>
                    <div className="w-full">
                      <InputLabel id="da-thu-tien-phong-label">
                        Đã thu tiền phòng
                      </InputLabel>
                      <Checkbox
                        checked={formik.values.da_thu_tien_phong}
                        onChange={() => {
                          formik.setFieldValue(
                            "da_thu_tien_phong",
                            !formik.values.da_thu_tien_phong
                          );
                        }}
                      />
                    </div>
                    {formik.values.da_thu_tien_phong && (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          className=""
                          label="Đến"
                          value={formik.values.da_dong_tien_phong_den_ngay}
                          onChange={(value) =>
                            formik.setFieldValue(
                              "da_dong_tien_phong_den_ngay",
                              value
                            )
                          }
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    )}
                  </div>
                  <div
                    className="border border-dashed border-black border-b-0
                        border-r-0 border-l-0"
                  >
                    <div className="mt-1 pt-2">
                      <h3 className="text-lg text-center py-3">
                        Thông tin khách hàng
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 gap-1 sm:grid-cols-12 sm:gap-3">
                      <div className="col-span-1 sm:col-span-4 flex flex-col justify-start items-center">
                        <h3>Ảnh đại diện khách hàng</h3>
                        <Avatar
                          className="my-4"
                          {...stringAvatar(
                            { name: "Khach hang", url: khachhang },
                            {
                              width: 144,
                              height: 144,
                            }
                          )}
                          variant="rounded"
                        />
                        <div className="w-36 block">
                          <label className="cursor-pointer border px-3 py-1.5 inline-block w-full text-center hover:bg-slate-100 rou custom-file-upload">
                            <input
                              aria-label="File browser example"
                              className="hidden"
                              name="URLImage"
                              type="file"
                              accept="image/png,image/jpeg,image/jpg"
                              onChange={(e) => {
                                console.log(storage);
                                formik.setSubmitting(true);
                                const uploadFiles = Array.from(
                                  e.target.files as FileList
                                ).map(async (file: File) => {
                                  const storageRef = storage.ref();
                                  const ref = storageRef.child(
                                    `assert/${file.name}`
                                  );
                                  const metadata = {
                                    size: file.size,
                                    contentType: file.type,
                                    name: file.name,
                                  };
                                  await ref.put(file, metadata);
                                  const assetUrl = await ref.getDownloadURL();
                                  formik.setSubmitting(false);
                                  return { ...metadata, assetUrl };
                                });
                                console.log(uploadFiles);
                                Promise.all(uploadFiles)
                                  .then(async (result) => {
                                    formik.setFieldValue(
                                      "URLImage",
                                      result[0].assetUrl
                                    );
                                  })
                                  .catch((error) => {
                                    console.log(error.message);
                                  });
                              }}
                            />
                            Chọn ảnh
                          </label>
                        </div>
                      </div>
                      <div className="col-span-1 sm:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-1 mb-3">
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
                            label="Ngày sinh"
                            name="ma_hop_dong"
                            type="text"
                            value={formik.values.ma_hop_dong}
                            onChange={formik.handleChange}
                          />
                        </div>
                        <div>
                          <Box>
                            <FormControl fullWidth>
                              <InputLabel id="tinh-thanh_pho-label">
                                Tỉnh / thành phố
                              </InputLabel>
                              <Select
                                labelId="tinh-thanh_pho-label"
                                id="tinh-thanh_pho-select"
                                label="Chon tỉnh / thành phố"
                                value={formik.values.chu_ki_thanh_toan || ""}
                                onChange={(event: SelectChangeEvent) => {
                                  formik.setFieldValue(
                                    "chu_ki_thanh_toan",
                                    event.target.value
                                  );
                                }}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>1 Thang</MenuItem>
                                <MenuItem value={3}>3 Thang</MenuItem>
                                <MenuItem value={6}>6 Thang</MenuItem>
                                <MenuItem value={12}>1 Nam</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </div>
                        <div>
                          <Box>
                            <FormControl fullWidth>
                              <InputLabel id="quan-huyen-label">
                                Quận / huyện
                              </InputLabel>
                              <Select
                                labelId="quan-huyen-label"
                                id="quan-huyen-select"
                                label="Chon Quận / huyện"
                                value={formik.values.chu_ki_thanh_toan || ""}
                                onChange={(event: SelectChangeEvent) => {
                                  formik.setFieldValue(
                                    "chu_ki_thanh_toan",
                                    event.target.value
                                  );
                                }}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>1 Thang</MenuItem>
                                <MenuItem value={3}>3 Thang</MenuItem>
                                <MenuItem value={6}>6 Thang</MenuItem>
                                <MenuItem value={12}>1 Nam</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </div>
                        <div>
                          <Box>
                            <FormControl fullWidth>
                              <InputLabel id="phuong-xa-label">
                                Phường / Xã
                              </InputLabel>
                              <Select
                                labelId="phuong-xa-label"
                                id="phuong-xa-select"
                                label="Chon Phường / Xã"
                                value={formik.values.chu_ki_thanh_toan || ""}
                                onChange={(event: SelectChangeEvent) => {
                                  formik.setFieldValue(
                                    "chu_ki_thanh_toan",
                                    event.target.value
                                  );
                                }}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>1 Thang</MenuItem>
                                <MenuItem value={3}>3 Thang</MenuItem>
                                <MenuItem value={6}>6 Thang</MenuItem>
                                <MenuItem value={12}>1 Nam</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </div>
                        <div>
                          <TextField
                            className="w-full"
                            label="Địa chỉ"
                            name="ma_hop_dong"
                            type="text"
                            value={formik.values.ma_hop_dong}
                            onChange={formik.handleChange}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <TextField
                            className="w-full"
                            label="Ghi chú (mã vân tay,...)"
                            name="ma_hop_dong"
                            type="text"
                            value={formik.values.ma_hop_dong}
                            onChange={formik.handleChange}
                          />
                        </div>
                        <div>
                          <Box>
                            <FormControl fullWidth>
                              <InputLabel id="tam-tru-label">
                                Tạm trú
                              </InputLabel>
                              <Select
                                labelId="tam-tru-label"
                                id="tam-tru-select"
                                label="Chon Tạm trú"
                                value={formik.values.chu_ki_thanh_toan || ""}
                                onChange={(event: SelectChangeEvent) => {
                                  formik.setFieldValue(
                                    "chu_ki_thanh_toan",
                                    event.target.value
                                  );
                                }}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>1 Thang</MenuItem>
                                <MenuItem value={3}>3 Thang</MenuItem>
                                <MenuItem value={6}>6 Thang</MenuItem>
                                <MenuItem value={12}>1 Nam</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </div>
                        <div
                          className={`w-full ${true ? "visible" : "invisible"}`}
                        >
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              className="w-full"
                              label="Thời hạn tạm trú"
                              value={formik.values.thoi_han_hop_dong}
                              onChange={(value) =>
                                formik.setFieldValue("thoi_han_hop_dong", value)
                              }
                              renderInput={(params) => (
                                <TextField className="w-full" {...params} />
                              )}
                            />
                          </LocalizationProvider>
                        </div>
                        <div>
                          <TextField
                            className="w-full"
                            label="CMTND / CCCD"
                            name="ma_hop_dong"
                            type="text"
                            required
                            value={formik.values.ma_hop_dong}
                            onChange={formik.handleChange}
                          />
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            className=""
                            label="Ngày cấp CMTND / CCCD"
                            value={formik.values.thoi_han_hop_dong}
                            onChange={(value) =>
                              formik.setFieldValue("thoi_han_hop_dong", value)
                            }
                            renderInput={(params) => (
                              <TextField required {...params} />
                            )}
                          />
                        </LocalizationProvider>
                        <div className="sm:col-span-2">
                          <TextField
                            required
                            className="w-full"
                            label="Nơi cấp CMTND / CCCD"
                            name="ma_hop_dong"
                            type="text"
                            value={formik.values.ma_hop_dong}
                            onChange={formik.handleChange}
                          />
                        </div>
                        <div className="flex flex-col justify-start items-center">
                          <h3>Ảnh CMT mặt trước</h3>
                          <Avatar
                            className="my-4"
                            {...stringAvatar(
                              { name: "Khach hang", url: khachhang },
                              {
                                width: 144,
                                height: 144,
                              }
                            )}
                            variant="rounded"
                          />
                          <div className="w-36 block">
                            <label className="cursor-pointer border px-3 py-1.5 inline-block w-full text-center hover:bg-slate-100 rou custom-file-upload">
                              <input
                                aria-label="File browser example"
                                className="hidden"
                                name="URLImage"
                                type="file"
                                accept="image/png,image/jpeg,image/jpg"
                                onChange={(e) => {
                                  console.log(storage);
                                  formik.setSubmitting(true);
                                  const uploadFiles = Array.from(
                                    e.target.files as FileList
                                  ).map(async (file: File) => {
                                    const storageRef = storage.ref();
                                    const ref = storageRef.child(
                                      `assert/${file.name}`
                                    );
                                    const metadata = {
                                      size: file.size,
                                      contentType: file.type,
                                      name: file.name,
                                    };
                                    await ref.put(file, metadata);
                                    const assetUrl = await ref.getDownloadURL();
                                    formik.setSubmitting(false);
                                    return { ...metadata, assetUrl };
                                  });
                                  console.log(uploadFiles);
                                  Promise.all(uploadFiles)
                                    .then(async (result) => {
                                      formik.setFieldValue(
                                        "URLImage",
                                        result[0].assetUrl
                                      );
                                    })
                                    .catch((error) => {
                                      console.log(error.message);
                                    });
                                }}
                              />
                              Chọn ảnh
                            </label>
                          </div>
                        </div>
                        <div className="flex flex-col justify-start items-center">
                          <h3>Ảnh CMT mặt sau</h3>
                          <Avatar
                            className="my-4"
                            {...stringAvatar(
                              { name: "Khach hang", url: khachhang },
                              {
                                width: 144,
                                height: 144,
                              }
                            )}
                            variant="rounded"
                          />
                          <div className="w-36 block">
                            <label className="cursor-pointer border px-3 py-1.5 inline-block w-full text-center hover:bg-slate-100 rou custom-file-upload">
                              <input
                                aria-label="File browser example"
                                className="hidden"
                                name="URLImage"
                                type="file"
                                accept="image/png,image/jpeg,image/jpg"
                                onChange={(e) => {
                                  console.log(storage);
                                  formik.setSubmitting(true);
                                  const uploadFiles = Array.from(
                                    e.target.files as FileList
                                  ).map(async (file: File) => {
                                    const storageRef = storage.ref();
                                    const ref = storageRef.child(
                                      `assert/${file.name}`
                                    );
                                    const metadata = {
                                      size: file.size,
                                      contentType: file.type,
                                      name: file.name,
                                    };
                                    await ref.put(file, metadata);
                                    const assetUrl = await ref.getDownloadURL();
                                    formik.setSubmitting(false);
                                    return { ...metadata, assetUrl };
                                  });
                                  console.log(uploadFiles);
                                  Promise.all(uploadFiles)
                                    .then(async (result) => {
                                      formik.setFieldValue(
                                        "URLImage",
                                        result[0].assetUrl
                                      );
                                    })
                                    .catch((error) => {
                                      console.log(error.message);
                                    });
                                }}
                              />
                              Chọn ảnh
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="border border-dashed border-black border-b-0
                        border-r-0 border-l-0"
                  >
                    <div className="mt-1 pt-2">
                      <h3 className="text-lg text-center py-3">
                        Thông tin dịch vụ
                      </h3>
                    </div>
                    <div className="mx-3 my-6 overflow-x-auto">
                      <table className="w-full">
                        <thead className="">
                          <tr>
                            <th style={{minWidth: 40}} className="text-xs font-medium text-left border border-gray-200 p-2">
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
                            <th style={{minWidth: 120}} className="text-xs font-medium text-left border border-gray-200 p-2">
                              Tên
                            </th>
                            <th style={{minWidth: 120}} className="text-xs font-medium text-left border border-gray-200 p-2">
                              Loại phí
                            </th>
                            <th style={{minWidth: 120}} className="text-xs font-medium text-left border border-gray-200 p-2">
                              Đơn giá
                            </th>
                            <th style={{minWidth: 120}} className="text-xs font-medium text-left border border-gray-200 p-2">
                              Đơn vị
                            </th>
                            <th style={{minWidth: 120}} className="text-xs font-medium text-left border border-gray-200 p-2">
                              Số lượng
                            </th>
                            <th style={{minWidth: 120}} className="text-xs font-medium text-left border border-gray-200 p-2">
                              Chỉ số đầu
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
                                    type="number"
                                    name="tien_coc"
                                    value={el.chi_so_dau}
                                    onChange={formik.handleChange}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <p>Ghi chú hợp đồng</p>
                      <TextField
                        label="Ghi chú giảm giá tiền, số lượng xe free..."
                        className="w-full"
                        type="text"
                        name="tien_coc"
                        value={""}
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
                  Xác nhận
                </button>
                <button
                  onClick={() => {
                    query.delete("them-khach");
                    history(
                      `${
                        location.pathname +
                        `${query.toString() ? "?" : ""}` +
                        query.toString()
                      }`
                    );
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
