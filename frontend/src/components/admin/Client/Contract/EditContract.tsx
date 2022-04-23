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
import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import environment from "../../../../config";

export const EditContract = ({
  item,
  idx,
  updateFunction: { editItems, setEditItems },
}: any) => {
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
        if (
          item.ten_nha !== values.ten_nha ||
          item.so_phong !== values.so_phong ||
          item.so_giuong !== values.so_giuong ||
          item.cho_trong !== values.cho_trong ||
          item.dia_chi !== values.dia_chi ||
          item.chu_so_huu !== values.chu_so_huu ||
          item.cmnd !== values.cmnd ||
          item.so_dien_thoai !== values.so_dien_thoai ||
          item.email !== values.email
        ) {
          setEditItems([...editItems, { ...item, ...values }]);
        }
        console.log(editItems);
        formik.setSubmitting(false);
        setIsEdit(false);
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
    if (item.ten_nha) {
      formik.setFieldValue("ten_nha", item.ten_nha);
      formik.setFieldValue("so_phong", item.so_phong);
      formik.setFieldValue("so_giuong", item.so_giuong);
      formik.setFieldValue("cho_trong", item.cho_trong);
      formik.setFieldValue("dia_chi", item.dia_chi);
      formik.setFieldValue("chu_so_huu", item.chu_so_huu);
      formik.setFieldValue("cmnd", item.cmnd);
      formik.setFieldValue("so_dien_thoai", item.so_dien_thoai);
      formik.setFieldValue("email", item.email);
    }
  }, [item]);
  const [isEdit, setIsEdit] = useState(false);
  if (!isEdit)
    return (
      <tr onClick={() => {}} className="hover:bg-slate-100" key={`${1}+ttpt`}>
        <td className="text-xs font-medium text-left border border-gray-200 p-2">
          {idx}
        </td>
        <td className="text-xs font-medium text-left border border-gray-200 p-2">
          {item.ten_nha}
        </td>
        <td className="text-xs font-medium text-left border border-gray-200 p-2">
          {item.so_phong}
        </td>
        <td className="text-xs font-medium text-left border border-gray-200 p-2">
          {item.so_giuong}
        </td>
        <td className="text-xs font-medium text-left border border-gray-200 p-2">
          {item.cho_trong}
        </td>
        <td className="text-xs font-medium text-left border border-gray-200 p-2">
          {item.dia_chi}
        </td>
        <td className="text-xs font-medium text-left border border-gray-200 p-2">
          {item.chu_so_huu}
        </td>
        <td className="text-xs font-medium text-left border border-gray-200 p-2">
          {item.cmnd}
        </td>
        <td className="text-xs font-medium text-left border border-gray-200 p-2">
          {item.so_dien_thoai}
        </td>
        <td className="text-xs font-medium text-left border border-gray-200 p-2">
          {item.email}
        </td>

        <td className="text-xs font-medium text-left border border-gray-200 p-2">
          <div className="flex justify-around">
            <Button
              onClick={() => {
                setIsEdit(true);
              }}
              type="button"
              variant="outlined"
              color="primary"
            >
              Sửa
            </Button>
            <Button type="button" variant="outlined" color="secondary">
              Xóa
            </Button>
          </div>
        </td>
      </tr>
    );
  return (
    <tr onClick={() => {}} className="hover:bg-slate-100" key={`${1}+ttpt`}>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        {idx}
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        <div>
          <TextField
            label="Tên phong"
            className="w-full"
            type="text"
            name="ten_phong"
            value={formik.values.ten_nha}
            onChange={formik.handleChange}
          />
        </div>
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        <div>
          <TextField
            label="So phong"
            className="w-full"
            type="number"
            name="so_phong"
            value={formik.values.so_phong}
            onChange={formik.handleChange}
          />
        </div>
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        <div>
          <TextField
            label="So giuong"
            className="w-full"
            type="number"
            name="so_giuong"
            value={formik.values.so_giuong}
            onChange={formik.handleChange}
          />
        </div>
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        <div>
          <TextField
            label="Cho trong"
            className="w-full"
            type="number"
            name="cho_trong"
            value={formik.values.cho_trong}
            onChange={formik.handleChange}
          />
        </div>
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        <div>
          <TextField
            label="Dia chi"
            className="w-full"
            type="number"
            name="dia_chi"
            value={formik.values.dia_chi}
            onChange={formik.handleChange}
          />
        </div>
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        <div>
          <TextField
            label="Chu so huu"
            className="w-full"
            type="text"
            name="chu_so_huu"
            value={formik.values.chu_so_huu}
            onChange={formik.handleChange}
          />
        </div>
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        <div>
          <TextField
            label="Chung minh nhan dan"
            className="w-full"
            type="text"
            name="cmnd"
            value={formik.values.cmnd}
            onChange={formik.handleChange}
          />
        </div>
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        <div>
          <TextField
            label="So dien thoai"
            className="w-full"
            type="text"
            name="so_dien_thoai"
            value={formik.values.so_dien_thoai}
            onChange={formik.handleChange}
          />
        </div>
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        <div>
          <TextField
            label="Email"
            className="w-full"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        <div className="flex justify-around">
          <Button
            type="button"
            onClick={() => {
              formik.handleSubmit();
            }}
            variant="outlined"
            color="primary"
          >
            Save
          </Button>

          <Button type="button" variant="outlined" color="secondary">
            Xóa
          </Button>
        </div>
      </td>
    </tr>
  );
};
