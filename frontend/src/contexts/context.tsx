import React, { createContext, useReducer } from "react";
import { TrangThai } from "../Types";
import { PhongReducer } from "./reducer";

const phongs: Array<any> = [
  {
    id: "1",
    hotel_id: "1",
    ten_phong: "101",
    trang_thai: TrangThai.CON_TRONG,
    don_gia: 2500000,
    dien_tich: 22,
    so_nguoi_phu_hop: 3,
    so_nguoi_khach_dang_thue: 0,
    link_hop_dong: "/",
    khach_thue: "",
    thong_tin_giu_cho: "",
    so_tien_chua_thanh_toan: 0,
    ngay_trong: null,
    hinh_thuc: "Bao phòng",
    tang: "1",
  },
  {
    id: "2",
    hotel_id: "1",
    ten_phong: "102",
    trang_thai: TrangThai.DANG_O,
    don_gia: 2500000,
    dien_tich: 22,
    so_nguoi_phu_hop: 3,
    so_nguoi_khach_dang_thue: 1,
    link_hop_dong: "/",
    khach_thue: "Bui Van Luyen",
    thong_tin_giu_cho: "",
    so_tien_chua_thanh_toan: 3540000,
    ngay_trong: null,
    hinh_thuc: "Bao phòng",
    tang: "1",
  },
  {
    id: "3",
    hotel_id: "1",
    ten_phong: "103",
    trang_thai: TrangThai.DANG_O,
    don_gia: 2500000,
    dien_tich: 22,
    so_nguoi_phu_hop: 3,
    so_nguoi_khach_dang_thue: 1,
    link_hop_dong: "/",
    khach_thue: "Bui Van Luyen",
    thong_tin_giu_cho: "",
    so_tien_chua_thanh_toan: 3540000,
    ngay_trong: null,
    hinh_thuc: "Bao phòng",
    tang: "1",
  },
  {
    id: "4",
    hotel_id: "1",
    ten_phong: "104",
    trang_thai: TrangThai.DANG_COC,
    don_gia: 2500000,
    dien_tich: 22,
    so_nguoi_phu_hop: 3,
    so_nguoi_khach_dang_thue: 0,
    link_hop_dong: "/",
    khach_thue: "",
    thong_tin_giu_cho: "Nguyen Van C",
    so_tien_chua_thanh_toan: 0,
    ngay_trong: null,
    hinh_thuc: "Bao phòng",
    tang: "1",
  },
  {
    id: "5",
    hotel_id: "1",
    ten_phong: "105",
    trang_thai: TrangThai.DANG_O,
    don_gia: 2500000,
    dien_tich: 22,
    so_nguoi_phu_hop: 3,
    so_nguoi_khach_dang_thue: 1,
    link_hop_dong: "/",
    khach_thue: "Bui Van Luyen",
    thong_tin_giu_cho: "",
    so_tien_chua_thanh_toan: 3540000,
    ngay_trong: null,
    hinh_thuc: "Bao phòng",
    tang: "1",
  },
];

export const stateLogin = {
  name: "Hau",
  email: "hau@gmail.com",
  cmnd: "366273845",
  so_dien_thoai: "0378637294",
};

export const users = [
  {
    id: "1",
    url_image: "",
    ten: "Nguyen Van A",
    ngay_sinh: null,
    que_quan: "Can Tho",
    url_cmnd: "",
    sdt: "0868327485",
    hotel: "nha tro 1",
    room: "101",
    ngay_vao: null,
    tam_tru: "Chưa khai báo",
    thoi_han_tam_tru: null,
    ghi_tru: "",
    tinh_trang: "Đang ở",
  },
  {
    id: "2",
    url_image: "",
    ten: "Nguyen Van A",
    ngay_sinh: null,
    que_quan: "Can Tho",
    url_cmnd: "",
    sdt: "0868327485",
    hotel: "nha tro 1",
    room: "102",
    ngay_vao: null,
    tam_tru: "Có thời hạn",
    thoi_han_tam_tru: null,
    ghi_tru: "",
    tinh_trang: "Đang ở",
  },
  {
    id: "3",
    url_image: "",
    ten: "Nguyen Van A",
    ngay_sinh: null,
    que_quan: "Can Tho",
    url_cmnd: "",
    sdt: "0868327485",
    hotel: "Nha tro 1",
    room: "101",
    ngay_vao: null,
    tam_tru: "Không thời hạn",
    thoi_han_tam_tru: null,
    ghi_tru: "",
    tinh_trang: "Đã chuyển đi",
  },
];

export const price_list = [
  {
    id: "1",
    hotel_id: "1",
    name: "Tiền điện theo đồng hồ",
    type_name: "Điện cố định theo đồng hồ",
    price: 12000,
    unit: "unit",
  },
  {
    id: "2",
    hotel_id: "1",
    name: "Tiền điện theo đồng hồ",
    type_name: "Điện cố định theo đồng hồ",
    price: 13000,
    unit: "unit",
  },
  {
    id: "3",
    hotel_id: "2",
    name: "Tiền điện theo đồng hồ",
    type_name: "Điện cố định theo đồng hồ",
    price: 12000,
    unit: "unit",
  },
];

export const khus: any = [
  {
    id: "1",
    ten_nha: "nha tro 1",
    loai_nha: "Nhà trọ",
    dia_chi: "Can Tho",
    hinh_thuc: "Bao phòng",
    ngay_ghi_chi_so: 11,
    ngay_chot_so: 11,
    so_phong: 0,
    cho_trong: 0,
    so_tang: 1,
    chu_so_huu: "Hau",
    cmnd: "366273845",
    so_dien_thoai: "0378637294",
    email: "hau@gmail.com",
  },
  {
    id: "2",
    ten_nha: "nha tro 2",
    loai_nha: "Nhà trọ",
    dia_chi: "Can Tho",
    hinh_thuc: "Bao phòng",
    ngay_ghi_chi_so: 11,
    ngay_chot_so: 11,
    so_phong: 0,
    cho_trong: 0,
    so_tang: 2,
    chu_so_huu: "Hau",
    cmnd: "366273845",
    so_dien_thoai: "0378637294",
    email: "hau@gmail.com",
  },
];

export const PhongContext = createContext<any>({
  khus: [],
  phong: {},
  phongs: [],
  hotels_filter: [],
  users: [],
  price_list: [],
});

const initialState = {
  khus: khus,
  users: users,
  phong: {},
  phongs: phongs,
  hotels_filter: [],
  price_list: price_list,
};

export const PhongContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(PhongReducer, initialState);

  const addKhu = (payload: any) => {
    dispatch({ type: "ADD_KHU", payload });
  };

  const editKhu = (payload: any) => {
    dispatch({ type: "EDIT_KHU", payload });
  };

  const setPhong = (payload: any) => {
    dispatch({ type: "SET_PHONG", payload });
  };

  const setPhongs = (payload: any) => {
    dispatch({ type: "SET_PHONGS", payload });
  };

  const findHotels = (payload: any) => {
    dispatch({ type: "FIND_HOTELS", payload });
  };
  const contextValues = {
    findHotels,
    editKhu,
    addKhu,
    setPhong,
    setPhongs,
    ...state,
  };

  return (
    <PhongContext.Provider value={contextValues}>
      {children}
    </PhongContext.Provider>
  );
};

export const root: any = {
  hotels: [
    {
      id: "1",
      ten_nha: "nha tro 1",
      loai_nha: "Nhà trọ",
      dia_chi: "Can Tho",
      hinh_thuc: "Bao phòng",
      ngay_ghi_chi_so: 11,
      ngay_chot_so: 11,
      so_phong: phongs.length,
      cho_trong: phongs.filter((el) => el.trang_thai === TrangThai.CON_TRONG)
        .length,
      chu_so_huu: {
        ...stateLogin,
      },
      rooms: [...phongs],
      so_tang: 2,
    },
    {
      id: "2",
      ten_nha: "nha tro 2",
      loai_nha: "Nhà trọ",
      dia_chi: "Can Tho",
      hinh_thuc: "Bao phòng",
      ngay_ghi_chi_so: 11,
      ngay_chot_so: 11,
      so_phong: phongs.length,
      cho_trong: phongs.filter((el) => el.trang_thai === TrangThai.CON_TRONG)
        .length,
      chu_so_huu: {
        ...stateLogin,
      },
      rooms: [...phongs],
      so_tang: 2,
    },
  ],
};