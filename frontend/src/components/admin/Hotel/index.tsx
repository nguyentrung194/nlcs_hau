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
import environment from "../../../config";
import { useQueryURL } from "../../../hooks/use-query-url";
import { PhongContext } from "../../../contexts/context";
import { EditHotel } from "./EditHotel";
import { AddHotel } from "./AddHotel";

export const DanhSachNha = () => {
  const location = useLocation();
  const history = useNavigate();
  const query = useQueryURL();

  // put and post to server 2 array bellow

  const { phong, findHotels, khus, hotels_filter } = useContext(PhongContext);
  const [search, setSearch] = useState(false);

  const { addToast } = useToasts();
  const formik = useFormik({
    initialValues: {
      ten_nha: "",
      so_phong: 0,
      so_giuong: 0,
      cho_trong: 0,
      dia_chi: "",
      chu_so_huu: "",
      cmnd: "",
      so_dien_thoai: "",
      email: "",
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);

        // code there
        findHotels({ filter: { ...values } });
        setSearch(true);

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

  useEffect(() => {
    if (
      !(
        formik.values.ten_nha ||
        formik.values.so_phong ||
        formik.values.so_giuong ||
        formik.values.cho_trong ||
        formik.values.dia_chi ||
        formik.values.chu_so_huu ||
        formik.values.cmnd ||
        formik.values.so_dien_thoai ||
        formik.values.email
      )
    ) {
      setSearch(false);
    }
  }, [formik.values]);

  return (
    <div className="m-3 min-h-screen">
      <AddHotel />
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
                      name="ten_nha"
                      value={formik.values.ten_nha}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="number"
                      name="so_phong"
                      value={formik.values.so_phong}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="number"
                      name="cho_trong"
                      value={formik.values.cho_trong}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="text"
                      name="dia_chi"
                      value={formik.values.dia_chi}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="text"
                      name="chu_so_huu"
                      value={formik.values.chu_so_huu}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="text"
                      name="cmnd"
                      value={formik.values.cmnd}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="text"
                      name="so_dien_thoai"
                      value={formik.values.so_dien_thoai}
                      onChange={formik.handleChange}
                    />
                  </td>
                  <td className="text-xs font-medium text-left border border-gray-200 p-2">
                    <TextField
                      className="w-full"
                      type="email"
                      name="email"
                      value={formik.values.email}
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
                {search
                  ? hotels_filter.map((el: any, idx: any) => {
                      return <EditHotel key={idx} item={el} idx={idx + 1} />;
                    })
                  : khus.map((el: any, idx: any) => {
                      return <EditHotel key={idx} item={el} idx={idx + 1} />;
                    })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mx-3 my-6">
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
        </div>
      </form>
    </div>
  );
};
