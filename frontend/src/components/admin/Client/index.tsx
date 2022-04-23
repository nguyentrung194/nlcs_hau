import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  SelectChangeEvent,
  Checkbox,
} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import environment from "../../../config";
import { useQueryURL } from "../../../hooks/use-query-url";
import { PhongContext } from "../../../contexts/context";
import { Client } from "./Client";

export const Clients = () => {
  const location = useLocation();
  const history = useNavigate();
  const query = useQueryURL();
  const { hotelId } = useParams();
  console.log(hotelId);

  const { khus, users } = useContext(PhongContext);

  const { addToast } = useToasts();
  const formik = useFormik({
    initialValues: {
      ten: "",
      ngay_sinh: null,
      que_quan: "",
      sdt: "",
      hotel: "",
      room: "",
      ngay_vao: null,
      tam_tru: "",
      thoi_han_tam_tru: null,
      ghi_tru: "",
      tinh_trang: "",
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
    <div className="m-3">
      <div className="flex justify-between items-center bg-slate-200 mb-2 mx-3">
        <div className="flex items-center pl-3">
          <Box className="max-h-20 max-w-xs w-28 my-4">
            <FormControl fullWidth required className="max-h-20">
              <InputLabel id="khu-label">Khu</InputLabel>
              <Select
                labelId="khu-label"
                id="khu-select"
                label="Khu"
                value={
                  khus.filter((el: any) => {
                    return `${el.id - 1}` === hotelId;
                  })[0]?.ten_nha ||
                  khus[0]?.ten_nha ||
                  ""
                }
                onChange={(event: SelectChangeEvent) => {}}
              >
                {khus.map((el: any) => {
                  return <MenuItem value={el.ten_nha}>{el.ten_nha}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="text-white px-1">
          <button className="hover:bg-emerald-600 font-medium text-xs rounded-sm px-3.5 py-2 bg-emerald-500 mx-2 my-1">
            Export excel
          </button>
        </div>
      </div>
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
                    Hinh anh
                  </th>
                  <th
                    style={{
                      minWidth: 140,
                    }}
                    className="text-xs font-medium text-left border border-gray-200 p-2"
                  >
                    Ten
                  </th>
                  <th
                    style={{
                      minWidth: 180,
                    }}
                    className="text-xs font-medium text-left border border-gray-200 p-2"
                  >
                    Ngay sinh
                  </th>
                  <th
                    style={{
                      minWidth: 140,
                    }}
                    className="text-xs font-medium text-left border border-gray-200 p-2"
                  >
                    Que quan
                  </th>
                  <th
                    style={{
                      minWidth: 160,
                    }}
                    className="text-xs font-medium text-left border border-gray-200 p-2"
                  >
                    Anh cmnd
                  </th>
                  <th
                    style={{
                      minWidth: 160,
                    }}
                    className="text-xs font-medium text-left border border-gray-200 p-2"
                  >
                    Số điện thoại
                  </th>
                  <th
                    style={{
                      minWidth: 160,
                    }}
                    className="text-xs font-medium text-left border border-gray-200 p-2"
                  >
                    Hotel
                  </th>
                  <th
                    style={{
                      minWidth: 160,
                    }}
                    className="text-xs font-medium text-left border border-gray-200 p-2"
                  >
                    Room
                  </th>
                  <th
                    style={{
                      minWidth: 180,
                    }}
                    className="text-xs font-medium text-left border border-gray-200 p-2"
                  >
                    Ngay vao
                  </th>
                  <th
                    style={{
                      minWidth: 160,
                    }}
                    className="text-xs font-medium text-left border border-gray-200 p-2"
                  >
                    Tam tru
                  </th>
                  <th
                    style={{
                      minWidth: 180,
                    }}
                    className="text-xs font-medium text-left border border-gray-200 p-2"
                  >
                    Thoi han tam tru
                  </th>
                  <th
                    style={{
                      minWidth: 160,
                    }}
                    className="text-xs font-medium text-left border border-gray-200 p-2"
                  >
                    Ghi chu
                  </th>
                  <th
                    style={{
                      minWidth: 160,
                    }}
                    className="text-xs font-medium text-left border border-gray-200 p-2"
                  >
                    Tinh trang
                  </th>
                  <th
                    style={{
                      minWidth: 160,
                    }}
                    className="text-xs font-medium text-left border border-gray-200 p-2"
                  >
                    Thao tac
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  onClick={() => {}}
                  className="hover:bg-slate-100"
                  key={`${0}+ttpt`}
                >
                  <td className="text-xs font-medium text-left border border-gray-200 p-2"></td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2"></td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="text"
                      name="ten"
                      value={formik.values.ten}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        views={["day", "month", "year"]}
                        className=""
                        label="Ngày sinh"
                        value={formik.values.ngay_sinh}
                        onChange={(value) =>
                          formik.setFieldValue("ngay_sinh", value)
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="text"
                      name="que_quan"
                      value={formik.values.que_quan}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2"></td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="number"
                      name="sdt"
                      value={formik.values.sdt}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="text"
                      name="hotel"
                      value={formik.values.hotel}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="text"
                      name="room"
                      value={formik.values.room}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        views={["day", "month", "year"]}
                        className=""
                        label="Ngày sinh"
                        value={formik.values.ngay_vao}
                        onChange={(value) =>
                          formik.setFieldValue("ngay_vao", value)
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <Box>
                      <FormControl fullWidth>
                        <InputLabel id="chon-label">Chọn</InputLabel>
                        <Select
                          labelId="chon-label"
                          id="chon-select"
                          label="Chọn"
                          value={formik.values.tam_tru || ""}
                          onChange={(event: SelectChangeEvent) => {
                            formik.setFieldValue("tam_tru", event.target.value);
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={"Có thời hạn"}>Có thời hạn</MenuItem>
                          <MenuItem value={"Không thời hạn"}>
                            Không thời hạn
                          </MenuItem>
                          <MenuItem value={"Chưa khai báo"}>
                            Chưa khai báo
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        views={["day", "month", "year"]}
                        className=""
                        label="Ngày sinh"
                        value={formik.values.thoi_han_tam_tru}
                        onChange={(value) =>
                          formik.setFieldValue("thoi_han_tam_tru", value)
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="text"
                      name="ghi_tru"
                      value={formik.values.ghi_tru}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <Box>
                      <FormControl fullWidth>
                        <InputLabel id="chon-label">Chọn</InputLabel>
                        <Select
                          labelId="chon-label"
                          id="chon-select"
                          label="Chọn"
                          value={formik.values.tinh_trang || ""}
                          onChange={(event: SelectChangeEvent) => {
                            formik.setFieldValue(
                              "tinh_trang",
                              event.target.value
                            );
                          }}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={"Đang ở"}>Đang ở</MenuItem>
                          <MenuItem value={"Đã chuyển đi"}>
                            Đã chuyển đi
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <Button
                      onClick={() => {}}
                      type="submit"
                      variant="outlined"
                      color="primary"
                      fullWidth
                    >
                      Search
                    </Button>
                  </td>
                </tr>
                {users.map((el: any, idx: any) => {
                  return <Client item={el} idx={idx + 1} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </form>
    </div>
  );
};
