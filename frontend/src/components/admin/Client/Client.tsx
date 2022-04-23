import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  SelectChangeEvent,
  TextField,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import environment from "../../../config";
import { stringAvatar } from "../../../common/lib";

export const Client = ({ item, idx }: any) => {
  return (
    <tr onClick={() => {}} className="hover:bg-slate-100" key={`${1}+ttpt`}>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        {idx}
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        <Avatar
          className="my-4"
          {...stringAvatar(
            { name: "Khach hang", url: "" },
            {
              width: 144,
              height: 144,
            }
          )}
          variant="rounded"
        />
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        {item.ten}
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        {item.ngay_sinh}
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        {item.que_quan}
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        {item.url_cmnd}
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        {item.sdt}
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        {item.hotel}
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        {item.room}
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        {item.ngay_vao}
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        {item.tam_tru}
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        {item.thoi_han_tam_tru}
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        {item.ghi_tru}
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        {item.tinh_trang}
      </td>

      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        <div className="flex justify-around">
          <Button
            onClick={() => {}}
            type="button"
            variant="outlined"
            color="primary"
          >
            Ho so tam tru
          </Button>
        </div>
      </td>
    </tr>
  );
};
