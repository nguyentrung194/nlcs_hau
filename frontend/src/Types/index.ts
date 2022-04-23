export const TrangThai = {
  CON_TRONG: { name: "còn trống", color: "emerald" },
  DANG_O: { name: "đang ở", color: "sky" },
  DANG_COC: { name: "đang cọc", color: "amber" },
};

export interface Phongs {
  id: string;
  hotel_id: string;
  ten_phong: string;
  trang_thai: {
    name: string;
    color: string;
  };
  don_gia: number;
  dien_tich: number;
  so_nguoi_phu_hop: number;
  so_nguoi_khach_dang_thue: number;
  link_hop_dong: string;
  khach_thue: string;
  thong_tin_giu_cho: string;
  so_tien_chua_thanh_toan: number;
  ngay_trong: any;
  hinh_thuc: string;
  tang: string;
}
