import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  SelectChangeEvent,
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
export const LichSuThanhToan = () => {
  const query = useQueryURL();
  const { addToast } = useToasts();
  const update = query.get("thong-tin-phong");
  const formik = useFormik({
    initialValues: {
      da_dong_tien_phong_den_ngay: null,
      da_thu_tien_phong: false,
      chu_ki_thanh_toan: null,
      ngay_khach_vao: null,
      thoi_han_hop_dong: null,
      ma_hop_dong: null,
      tien_coc: 0,
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
    <div className="">
      <div className="text-center my-3">
        <h1 className="text-xl">Danh sách hóa đơn</h1>
        <p>
          Phòng {update} - {"Nha khach"}
        </p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-3">
          <div>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="chon-label">Chọn</InputLabel>
                <Select
                  labelId="chon-label"
                  id="chon-select"
                  label="Chọn"
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={["year", "month"]}
              className=""
              label="Từ tháng"
              value={formik.values.thoi_han_hop_dong}
              onChange={(value) =>
                formik.setFieldValue("thoi_han_hop_dong", value)
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={["year", "month"]}
              className=""
              label="Đến tháng"
              value={formik.values.thoi_han_hop_dong}
              onChange={(value) =>
                formik.setFieldValue("thoi_han_hop_dong", value)
              }
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <div>
            <TextField
              label="Số hóa đơn"
              className="w-full"
              required
              type="text"
              name="tien_phong"
              value={formik.values.tien_phong}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <Box>
              <FormControl fullWidth>
                <InputLabel id="hop-dong-label">Hợp đồng</InputLabel>
                <Select
                  labelId="hop-dong-label"
                  id="hop-dong-select"
                  label="Hợp đồng"
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
        </div>
        <div className="m-3">
          <Button variant="contained" type="submit" className="w-36">
            Tìm kiếm
          </Button>
        </div>
      </form>
      <div className="">
        <p className="my-1">
          Tổng số: 0 hóa đơn (Đã thanh toán: 0 hóa đơn. Chưa thanh toán xong: 0
          hóa đơn)
        </p>
        <p className="my-1">
          Tổng tiền: 0 (Đã thanh toán: 0. Số tiền còn lại: 0)
        </p>
      </div>
    </div>
  );
};
