import nhatro from "../../../../../../assets/images/nhatro.jpg";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useContext, useState } from "react";
import { PhongContext } from "../../../../../../contexts/context";

export const ThongTinChung = () => {
  const [loaiAnh, setLoaiAnh] = useState("");
  const { phong } = useContext(PhongContext);
  console.log(phong);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-1 pt-2">
        <div>Loại: </div>
        <div>Diện tích: {phong.dien_tich}</div>
        <div>Tầng: {phong.tang}</div>
        <div>Đơn giá: {phong.don_gia}</div>
        <div>Số người phù hợp: {phong.so_nguoi_phu_hop}</div>
        <div>Số khách đang thuê: {phong.so_nguoi_khach_dang_thue}</div>
        <div>Tình trạng: {phong.trang_thai?.name}</div>
        <div>Hình thức thuê phòng: {phong.hinh_thuc}</div>
      </div>
      <div className="mt-1 pt-2">
        <div>
          Hình ảnh:
          <div className="flex justify-around items-center">
            {[1, 2, 3].map((el) => {
              return (
                <div key={`hinh_anh${el}`} className="my-4">
                  <img width={200} src={nhatro} alt="nha tro" />
                </div>
              );
            })}
          </div>
        </div>
        <Box className="max-h-20 max-w-xs w-full">
          <FormControl fullWidth required className="max-h-20">
            <InputLabel id="loai_anh-label">Loại ảnh</InputLabel>
            <Select
              labelId="loai_anh-label"
              id="loai_anh-select"
              label="Loại ảnh"
              value={loaiAnh}
              onChange={(event: SelectChangeEvent) => {
                setLoaiAnh(event.target.value);
              }}
            >
              <MenuItem value={"Ảnh phòng khách"}>Ảnh phòng khách</MenuItem>
              <MenuItem value={"Ảnh phòng khách"}>Ảnh phòng ngủ</MenuItem>
              <MenuItem value={"Ảnh phòng khách"}>Ảnh nhà bếp</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  );
};
