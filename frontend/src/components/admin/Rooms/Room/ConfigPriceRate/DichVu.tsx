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
import environment from "../../../../../config";

export const DichVu = ({
  item,
  idx,
  updateFunction: { editItems, setEditItems },
}: any) => {
  const { addToast } = useToasts();

  const formik = useFormik({
    initialValues: {
      name: "",
      type_name: "",
      price: null,
      unit: "",
    },
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        // code there
        if (
          item.name !== values.name ||
          item.type_name !== values.type_name ||
          item.price !== values.price ||
          item.unit!== values.unit
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
    if (item.name) {
      formik.setFieldValue("name", item.name);
      formik.setFieldValue("type_name", item.type_name);
      formik.setFieldValue("price", item.price);
      formik.setFieldValue("unit", item.unit);
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
          {item.name}
        </td>
        <td className="text-xs font-medium text-left border border-gray-200 p-2">
          {item.type_name}
        </td>
        <td className="text-xs font-medium text-left border border-gray-200 p-2">
          {item.price}
        </td>
        <td className="text-xs font-medium text-left border border-gray-200 p-2">
          {item.unit}
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
              S???a
            </Button>
            <Button type="button" variant="outlined" color="secondary">
              X??a
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
            label="T??n"
            className="w-full"
            required
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        <Box>
          <FormControl fullWidth>
            <InputLabel id="loai-phi-label">Lo???i ph??</InputLabel>
            <Select
              labelId="loai-phi-label"
              id="loai-phi-select"
              label="Lo???i ph??"
              value={formik.values.type_name}
              onChange={(event: SelectChangeEvent) => {
                formik.setFieldValue("type_name", event.target.value);
              }}
            >
              <MenuItem value={"??i???n c??? ?????nh theo ?????ng h???"}>
                ??i???n c??? ?????nh theo ?????ng h???
              </MenuItem>
              <MenuItem value={"??i???n l??y ti???n"}>??i???n l??y ti???n</MenuItem>
              <MenuItem value={"N?????c c??? ?????nh theo ?????ng h???"}>
                N?????c c??? ?????nh theo ?????ng h???
              </MenuItem>
              <MenuItem value={"N?????c l??y ti???n"}>N?????c l??y ti???n</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        <div>
          <TextField
            label="????n gi??"
            className="w-full"
            required
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
        </div>
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        <div>
          <TextField
            label="????n v???"
            className="w-full"
            required
            type="text"
            name="unit"
            value={formik.values.unit}
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
            X??a
          </Button>
        </div>
      </td>
    </tr>
  );
};
