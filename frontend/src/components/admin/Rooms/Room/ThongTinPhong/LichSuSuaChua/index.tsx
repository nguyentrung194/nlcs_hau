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
import { useToasts } from "react-toast-notifications";
import environment from "../../../../../../config";
import { useQueryURL } from "../../../../../../hooks/use-query-url";
export const LichSuSuaChua = () => {
  const query = useQueryURL();
  const { addToast } = useToasts();
  const update = query.get("thong-tin-phong");
  const sua_chua = [
    {
      noi_dung: "Tiền điện theo đồng hồ",
      chi_phi: 12000,
      nguoi_sua: "Nguyen Van A",
      ngay_sua: null,
      hinh_anh: "/assets/images/download.jpeg",
      tai_san: "abc",
      trang_thai: "abc",
    },
    {
      noi_dung: "Tiền điện theo đồng hồ",
      chi_phi: 12000,
      nguoi_sua: "Nguyen Van A",
      ngay_sua: null,
      hinh_anh: "/assets/images/download.jpeg",
      tai_san: "abc",
      trang_thai: "abc",
    },
  ];
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
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="">
          <Button type="button" variant="outlined" color="primary">
            Thêm lịch sử sửa chữa
          </Button>
        </div>
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
                  Nội dung
                </th>
                <th
                  style={{
                    minWidth: 140,
                  }}
                  className="text-xs font-medium text-left border border-gray-200 p-2"
                >
                  Chi phí
                </th>
                <th
                  style={{
                    minWidth: 140,
                  }}
                  className="text-xs font-medium text-left border border-gray-200 p-2"
                >
                  Người sửa chữa
                </th>
                <th className="text-xs font-medium text-left border border-gray-200 p-2">
                  Ngày sửa chữa
                </th>
                <th
                  style={{
                    minWidth: 90,
                  }}
                  className="text-xs font-medium text-left border border-gray-200 p-2"
                >
                  Hình ảnh
                </th>
                <th
                  style={{
                    minWidth: 140,
                  }}
                  className="text-xs font-medium text-left border border-gray-200 p-2"
                >
                  Tài sản
                </th>
                <th className="text-xs font-medium text-left border border-gray-200 p-2">
                  Trạng thái
                </th>
                <th
                  style={{
                    minWidth: 180,
                  }}
                  className="text-xs font-medium text-left border border-gray-200 p-2"
                >
                  Thao tác
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
                    type="text"
                    name="tien_coc"
                    value={""}
                    onChange={formik.handleChange}
                  />
                </td>
                <td className="text-xs font-medium text-left border border-gray-200 p-2">
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      className=""
                      label="Ngày sửa chữa"
                      value={formik.values.ngay_khach_vao}
                      onChange={(value) => {
                        console.log(value);
                        return formik.setFieldValue("ngay_khach_vao", value);
                      }}
                      renderInput={(params) => (
                        <TextField className="w-40" {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </td>
                <td className="text-xs font-medium text-left border border-gray-200 p-2"></td>
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
                  <Box className="w-40">
                    <FormControl fullWidth>
                      <InputLabel id="trang-thai-label">Trạng thái</InputLabel>
                      <Select
                        labelId="trang-thai-label"
                        id="trang-thai-select"
                        label="Chon Trạng thái"
                        value={formik.values.chu_ki_thanh_toan || ""}
                        onChange={(event: SelectChangeEvent) => {
                          formik.setFieldValue(
                            "chu_ki_thanh_toan",
                            event.target.value
                          );
                        }}
                      >
                        <MenuItem value={1}>Chưa thực hiện</MenuItem>
                        <MenuItem value={2}>Đã thực hiện</MenuItem>
                        <MenuItem value={3}>Đã hoàn thành</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </td>
                <td className="text-xs font-medium text-left border border-gray-200 p-2"></td>
              </tr>
              {sua_chua.map((el, idx) => {
                return (
                  <tr
                    onClick={() => {}}
                    className="hover:bg-slate-100"
                    key={`${1}+ttpt`}
                  >
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      {idx + 1}
                    </td>
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      {el.noi_dung}
                    </td>
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      {el.chi_phi}
                    </td>
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      {el.nguoi_sua}
                    </td>
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      {el.ngay_sua}
                    </td>
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      <a href={`${el.hinh_anh}`}>nhấn vào để xem</a>
                    </td>
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      {el.tai_san}
                    </td>
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      {el.trang_thai}
                    </td>
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      <div className="flex justify-around">
                        <Button
                          type="button"
                          variant="outlined"
                          color="primary"
                        >
                          Sửa
                        </Button>
                        <Button
                          type="button"
                          variant="outlined"
                          color="secondary"
                        >
                          Xóa
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
};
