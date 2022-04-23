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
import { useLocation, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import environment from "../../../../config";
import { useQueryURL } from "../../../../hooks/use-query-url";
import { PhongContext } from "../../../../contexts/context";
import { EditContract } from "./EditContract";

export const Contract = () => {
  const location = useLocation();
  const history = useNavigate();
  const query = useQueryURL();

  // put and post to server 2 array bellow
  const [editItems, setEditItems] = useState<Array<any>>([]);

  const { phong, khu } = useContext(PhongContext);
  console.log(phong);
  const bang_gia = [
    {
      id: 1,
      ten_nha: "Tiền điện theo đồng hồ",
      so_phong: 3,
      so_giuong: 3,
      cho_trong: 3,
      dia_chi: "Can Tho",
      chu_so_huu: "Nguyen Van A",
      cmnd: "366382934",
      so_dien_thoai: "0793847563",
      email: "nguyenvana@gmail.com",
      loai_phi: "Điện cố định theo đồng hồ",
      don_gia: 12000,
      don_vi: "unit",
    },
    {
      id: 2,
      ten_nha: "Tiền điện theo đồng hồ",
      so_phong: 3,
      so_giuong: 3,
      cho_trong: 3,
      dia_chi: "Can Tho",
      chu_so_huu: "Nguyen Van A",
      cmnd: "366382934",
      so_dien_thoai: "0793847563",
      email: "nguyenvana@gmail.com",
      loai_phi: "Điện cố định theo đồng hồ",
      don_gia: 12000,
      don_vi: "unit",
    },
    {
      id: 3,
      ten_nha: "Tiền điện theo đồng hồ",
      so_phong: 3,
      so_giuong: 3,
      cho_trong: 3,
      dia_chi: "Can Tho",
      chu_so_huu: "Nguyen Van A",
      cmnd: "366382934",
      so_dien_thoai: "0793847563",
      email: "nguyenvana@gmail.com",
    },
  ];

  const { addToast } = useToasts();
  const formik = useFormik({
    initialValues: {
      da_dong_tien_phong_den_ngay: null,
      da_thu_tien_phong: false,
      chu_ki_thanh_toan: null,
      ngay_khach_vao: null,
      thoi_han_hop_dong: null,
      ma_hop_dong: null,
      tien_coc: "",
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
                    Tên nha
                  </th>
                  <th
                    style={{
                      minWidth: 140,
                    }}
                    className="text-xs font-medium text-left border border-gray-200 p-2"
                  >
                    So phong
                  </th>
                  <th
                    style={{
                      minWidth: 120,
                    }}
                    className="text-xs font-medium text-left border border-gray-200 p-2"
                  >
                    So giuong
                  </th>
                  <th
                    style={{
                      minWidth: 140,
                    }}
                    className="text-xs font-medium text-left border border-gray-200 p-2"
                  >
                    Cho trong
                  </th>
                  <th
                    style={{
                      minWidth: 160,
                    }}
                    className="text-xs font-medium text-left border border-gray-200 p-2"
                  >
                    Dia chi
                  </th>
                  <th
                    style={{
                      minWidth: 160,
                    }}
                    className="text-xs font-medium text-left border border-gray-200 p-2"
                  >
                    Chu so huu
                  </th>
                  <th
                    style={{
                      minWidth: 160,
                    }}
                    className="text-xs font-medium text-left border border-gray-200 p-2"
                  >
                    CMND
                  </th>
                  <th
                    style={{
                      minWidth: 160,
                    }}
                    className="text-xs font-medium text-left border border-gray-200 p-2"
                  >
                    So dien thoai
                  </th>
                  <th
                    style={{
                      minWidth: 160,
                    }}
                    className="text-xs font-medium text-left border border-gray-200 p-2"
                  >
                    Email
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
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="text"
                      name="tien_coc"
                      value={formik.values.tien_coc}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="number"
                      name="tien_coc"
                      value={null}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="number"
                      name="tien_coc"
                      value={""}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="number"
                      name="tien_coc"
                      value={""}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="text"
                      name="tien_coc"
                      value={""}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="text"
                      name="tien_coc"
                      value={""}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="text"
                      name="tien_coc"
                      value={""}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="text"
                      name="tien_coc"
                      value={""}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="email"
                      name="tien_coc"
                      value={""}
                      onChange={formik.handleChange}
                    />
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
                {bang_gia.map((el, idx) => {
                  return (
                    <EditContract
                      item={el}
                      idx={idx + 1}
                      updateFunction={{ editItems, setEditItems }}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* <div className="mx-3 my-6">
          <Button
            onClick={() => {
              query.set("them-nha", `${true}`);
              history(
                `${
                  location.pathname +
                  `${query.toString() ? "?" : ""}` +
                  query.toString()
                }`
              );
            }}
            type="button"
            variant="outlined"
            color="primary"
          >
            Thêm nha
          </Button>
        </div> */}
      </form>
    </div>
  );
};
