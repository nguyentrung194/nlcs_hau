import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";

import axios from "axios";
import { useFormik } from "formik";
import { useToasts } from "react-toast-notifications";
import environment from "../../../../../../config";
import { useQueryURL } from "../../../../../../hooks/use-query-url";

export const TaiSanLienQuan = () => {
  const query = useQueryURL();
  const { addToast } = useToasts();
  const update = query.get("thong-tin-phong");
  const sua_chua = [
    {
      ten: "Tiền điện theo đồng hồ",
      so_luong: 12000,
      ma_tai_san: "Nguyen Van A",
      ma_tham_chieu: "abc",
      nguoi_giao: "Nguyen Van A",
      nguoi_nhan: "Nguyen Van B",
    },
    {
      ten: "Tiền điện theo đồng hồ",
      so_luong: 12000,
      ma_tai_san: "Nguyen Van A",
      ma_tham_chieu: "abc",
      nguoi_giao: "Nguyen Van A",
      nguoi_nhan: "Nguyen Van B",
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
            Thêm tài sản
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
                  Tên
                </th>
                <th
                  style={{
                    minWidth: 140,
                  }}
                  className="text-xs font-medium text-left border border-gray-200 p-2"
                >
                  Số lượng
                </th>
                <th
                  style={{
                    minWidth: 140,
                  }}
                  className="text-xs font-medium text-left border border-gray-200 p-2"
                >
                  Mã tài sản
                </th>
                <th
                  style={{
                    minWidth: 140,
                  }}
                  className="text-xs font-medium text-left border border-gray-200 p-2"
                >
                  Mã tham chiếu
                </th>
                <th
                  style={{
                    minWidth: 140,
                  }}
                  className="text-xs font-medium text-left border border-gray-200 p-2"
                >
                  Người giao
                </th>
                <th
                  style={{
                    minWidth: 140,
                  }}
                  className="text-xs font-medium text-left border border-gray-200 p-2"
                >
                  Người nhận
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
                      {el.ten}
                    </td>
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      {el.so_luong}
                    </td>
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      {el.ma_tai_san}
                    </td>
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      {el.ma_tham_chieu}
                    </td>
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      {el.nguoi_giao}
                    </td>
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      {el.nguoi_nhan}
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
