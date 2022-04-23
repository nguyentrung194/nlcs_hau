import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useQueryURL } from "../../../../hooks/use-query-url";
import { Phongs, TrangThai } from "../../../../Types";
import { EditRoomInfor } from "./EditRoomInfor";
import { LapHoaDonDichVu } from "./LapHoaDonDichVu";
import { ThemPhong } from "./ThemPhong";
import { ThongTinGiuCho } from "./ThongTinGiuCho";
import { ThongTinPhong } from "./ThongTinPhong";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { PhongContext } from "../../../../contexts/context";
import { ConfigPriceRate } from "./ConfigPriceRate";

export const Room = () => {
  const [search, setSearch] = useState(false);
  const query = useQueryURL();
  const history = useNavigate();
  const location = useLocation();

  const { hotelId } = useParams();
  console.log(hotelId);

  const { setPhong, phongs, khus, users } = useContext(PhongContext);

  const [hotel, setHotel] = useState<any>({});

  const id_phong = query.get("thong-tin-phong");

  useEffect(() => {
    setHotel(
      khus.filter((el: any) => {
        return `${el.id}` === hotelId;
      })[0] || khus[0]
    );
  }, [hotelId, khus]);

  useEffect(() => {
    if (id_phong) {
      setPhong({
        phong: phongs.filter((el: any) => {
          if (`${el.ten_phong}` === id_phong) return true;
          else return false;
        })[0],
      });
    }
  }, [id_phong]);

  const id_phong_cn = query.get("cap-nhat-thong-tin-phong");

  useEffect(() => {
    if (id_phong_cn) {
      setPhong({
        phong: phongs.filter((el: any) => {
          if (`${el.ten_phong}` === id_phong_cn) return true;
          else return false;
        })[0],
      });
    }
  }, [id_phong_cn]);

  return (
    <div>
      <ThongTinPhong />
      <ThongTinGiuCho />
      <LapHoaDonDichVu />
      <EditRoomInfor />
      <ConfigPriceRate />
      <ThemPhong />
      <div className="mx-2 my-3">
        <div className="flex justify-between items-center bg-slate-200 mb-2">
          <div className="flex items-center pl-3">
            <Box className="max-h-20 max-w-xs w-28 my-4">
              <FormControl fullWidth required className="max-h-20">
                <InputLabel id="khu-label">Khu</InputLabel>
                <Select
                  labelId="khu-label"
                  id="khu-select"
                  label="Khu"
                  value={
                    khus.filter((el: any) => {
                      return `${el.id}` === hotelId;
                    })[0]?.ten_nha ||
                    khus[0]?.ten_nha ||
                    ""
                  }
                  onChange={(event: SelectChangeEvent) => {}}
                >
                  {khus.map((el: any, index: any) => {
                    return (
                      <MenuItem
                        onClick={() => {
                          history(`/admin/room/${el.id}`);
                        }}
                        value={el.ten_nha}
                      >
                        {el.ten_nha}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="text-white px-1">
            <button
              onClick={() => {
                query.set("them-phong", `true`);
                history(
                  `${
                    location.pathname +
                    `${query.toString() ? "?" : ""}` +
                    query.toString()
                  }`
                );
              }}
              className="hover:bg-sky-600 font-medium text-xs rounded-sm px-3.5 py-2 bg-sky-500 mr-2 my-1"
            >
              Them phong
            </button>
            <button
              onClick={() => {
                query.set("cau-hinh-bang-gia", `true`);
                history(
                  `${
                    location.pathname +
                    `${query.toString() ? "?" : ""}` +
                    query.toString()
                  }`
                );
              }}
              className="hover:bg-red-600 font-medium text-xs rounded-sm px-3.5 py-2 bg-red-500 mr-2 my-1"
            >
              Cau hinh bang gia
            </button>
          </div>
        </div>
        <div className="border-sky-700 border">
          <div className="flex justify-between items-center bg-sky-600 text-white py-1 px-3">
            <div className="text-sm font-medium">Thong tin chung</div>
            <div>
              <button
                onClick={() => {
                  query.set("cap-nhat-thong-tin-nha", `${hotelId}`);
                  history(
                    `${
                      location.pathname +
                      `${query.toString() ? "?" : ""}` +
                      query.toString()
                    }`
                  );
                }}
                className="hover:bg-sky-700 border border-gray-300 rounded-sm text-xs text-gray-300 mr-2 px-2 py-1"
              >
                Cap nhat thong tin
              </button>
              <button className="hover:bg-white hover:text-black text-xs text-white px-2 py-1">
                v
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-7">
            <div className="mx-3 my-6 md:col-span-6">
              <table className="w-full">
                <tbody>
                  <tr onClick={() => {}} className="hover:bg-slate-100">
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      Tên
                    </td>
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      <strong>{hotel.ten_nha}</strong>
                    </td>
                  </tr>
                  <tr onClick={() => {}} className="hover:bg-slate-100">
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      Loại nhà
                    </td>
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      <strong>{hotel.loai_nha}</strong>
                    </td>
                  </tr>
                  <tr onClick={() => {}} className="hover:bg-slate-100">
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      Hình thức cho thuê
                    </td>
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      <strong>{hotel.hinh_thuc}</strong>
                    </td>
                  </tr>
                  <tr onClick={() => {}} className="hover:bg-slate-100">
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      Địa chỉ
                    </td>
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      <strong>{hotel.dia_chi}</strong>
                    </td>
                  </tr>
                  <tr onClick={() => {}} className="hover:bg-slate-100">
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      Chủ sở hữu
                    </td>
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      <strong>{hotel.chu_so_huu}</strong>
                    </td>
                  </tr>
                  <tr onClick={() => {}} className="hover:bg-slate-100">
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      Ngày chốt điện nước
                    </td>
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      <strong>{hotel.ngay_chot_so}</strong>
                    </td>
                  </tr>
                  <tr onClick={() => {}} className="hover:bg-slate-100">
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      Ngày chốt sổ tính phí
                    </td>
                    <td className="text-xs font-medium text-left border border-gray-200 p-2">
                      <strong>{hotel.ngay_ghi_chi_so}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="md:col-span-1 my-6 mr-1">
              <div className="flex flex-col h-24 items-center justify-center">
                <span>
                  {users.filter((el: any) => el.hotel === hotel.ten_nha).length}
                </span>
                <span>Khách thuê</span>
              </div>
              <div className="flex flex-col h-24 items-center justify-center">
                <span>
                  {phongs.filter((el: any) => el.hotel_id === hotel.id).length}
                </span>
                <span>Phòng</span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-1">
          {[...Array(hotel.so_tang).keys()].map((el) => {
            return (
              <>
                <Button variant="contained" type="button" className="w-12">
                  Tầng {el + 1}
                </Button>{" "}
              </>
            );
          })}
        </div>
        <div className="text-sm py-1">
          <input
            className=""
            onChange={(e) => {
              setSearch(e.target.checked);
            }}
            type="checkbox"
            name="phong_trong"
            id="phong_trong"
          />
          <span className="ml-3">Chỉ hiện phòng trống</span>
        </div>
      </div>
      {phongs
        .filter((el: any) => el.hotel_id === (hotelId || "1"))
        .filter((el: Phongs) => {
          if (!search) {
            return true;
          } else if (search && el.trang_thai.name === TrangThai.CON_TRONG.name)
            return true;
          else return false;
        })
        .map((el: Phongs, index: number) => {
          return (
            <div
              key={`${index}-phong`}
              className={`mx-2 my-3 border-${el.trang_thai.color}-700 border rounded-sm font-mono`}
            >
              <div
                className={`flex justify-between items-center bg-${el.trang_thai.color}-700 text-white py-1 px-3`}
              >
                <div className="text-sm">
                  <span className="px-1 py-1">Phòng: {el.ten_phong}</span>
                  <span className="px-1">-</span>
                  <span className="px-1">{el.trang_thai.name}</span>
                </div>
                <div>
                  <button
                    onClick={() => {
                      query.set("cap-nhat-thong-tin-phong", `${el.ten_phong}`);
                      history(
                        `${
                          location.pathname +
                          `${query.toString() ? "?" : ""}` +
                          query.toString()
                        }`
                      );
                    }}
                    className="hover:bg-gray-100 rounded-sm text-xs bg-white text-black font-thin mr-2 px-2 py-1"
                  >
                    Cập nhật thông tin
                  </button>
                  <button className="hover:bg-gray-100 rounded-sm text-xs bg-white text-black font-thin mr-2 px-2 py-1">
                    Xóa phòng
                  </button>
                  <button className="hover:bg-gray-100 hover:text-gray-700 rounded-sm text-xs text-white font-thin px-2 py-1">
                    v
                  </button>
                </div>
              </div>
              <div>
                <div className="mx-3 my-6 overflow-x-auto">
                  <table className="w-full">
                    <thead className="">
                      <tr>
                        <th className="text-xs font-medium text-left border border-gray-200 p-2">
                          Giá (Bao phòng)
                        </th>
                        <th className="text-xs font-medium text-left border border-gray-200 p-2">
                          Diện tích (m2)
                        </th>
                        <th className="text-xs font-medium text-left border border-gray-200 p-2">
                          Số người tối đa
                        </th>
                        <th className="text-xs font-medium text-left border border-gray-200 p-2">
                          Số người hiện tại
                        </th>
                        {el.khach_thue ? (
                          <th className="text-xs font-medium text-left border border-gray-200 p-2">
                            Hợp đồng đang có
                          </th>
                        ) : null}
                        {el.thong_tin_giu_cho ? (
                          <th className="text-xs font-medium text-left border border-gray-200 p-2">
                            Thông tin giữ chỗ
                          </th>
                        ) : null}
                        <th className="text-xs font-medium text-left border border-gray-200 p-2">
                          Số tiền chưa thanh toán
                        </th>
                        <th className="text-xs font-medium text-left border border-gray-200 p-2">
                          Ngày trống
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        onClick={() => {}}
                        className="hover:bg-slate-100"
                        key={`${1}+ttpt`}
                      >
                        <td className="text-xs font-medium text-left border border-gray-200 p-2">
                          {el.don_gia}
                        </td>
                        <td className="text-xs font-medium text-left border border-gray-200 p-2">
                          {el.dien_tich}
                        </td>
                        <td className="text-xs font-medium text-left border border-gray-200 p-2">
                          {el.so_nguoi_phu_hop}
                        </td>
                        <td className="text-xs font-medium text-left border border-gray-200 p-2">
                          {el.so_nguoi_khach_dang_thue}
                        </td>
                        {el.khach_thue ? (
                          <td className="text-xs font-medium text-left border border-gray-200 p-2">
                            <a
                              className="text-blue-500"
                              href={`${el.link_hop_dong}`}
                            >
                              Hợp đồng: {el.khach_thue}
                            </a>
                          </td>
                        ) : null}
                        {el.thong_tin_giu_cho ? (
                          <td className="text-xs font-medium text-left border border-gray-200 p-2">
                            <a
                              className="text-blue-500"
                              href={`${el.link_hop_dong}`}
                            >
                              Giữ chỗ: {el.thong_tin_giu_cho}
                            </a>
                          </td>
                        ) : null}
                        <td className="text-xs font-medium text-left border border-gray-200 p-2">
                          {el.so_tien_chua_thanh_toan}
                        </td>
                        <td className="text-xs font-medium text-left border border-gray-200 p-2">
                          {el.ngay_trong ? el.ngay_trong : "Không xác định"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-white px-1">
                  <button
                    onClick={() => {
                      query.set("thong-tin-phong", `${el.ten_phong}`);
                      history(
                        `${
                          location.pathname +
                          `${query.toString() ? "?" : ""}` +
                          query.toString()
                        }`
                      );
                    }}
                    className="hover:bg-blue-600 font-thin text-xs rounded-sm px-3 py-1.5 bg-blue-500 mx-2 my-1"
                  >
                    Thông tin phòng
                  </button>
                  <button
                    onClick={() => {
                      query.set("thong-tin-phong", `${el.ten_phong}`);
                      query.set("them-khach", `${el.ten_phong}`);
                      history(
                        `${
                          location.pathname +
                          `${query.toString() ? "?" : ""}` +
                          query.toString()
                        }`
                      );
                    }}
                    className="hover:bg-red-600 font-thin text-xs rounded-sm px-3 py-1.5 bg-red-500 mr-2 my-1"
                  >
                    {el.so_nguoi_khach_dang_thue
                      ? "Thêm người phụ thuộc"
                      : "Tạo hợp đồng"}
                  </button>
                  <button
                    onClick={() => {
                      query.set("tt-giu-cho", `${el.ten_phong}`);
                      history(
                        `${
                          location.pathname +
                          `${query.toString() ? "?" : ""}` +
                          query.toString()
                        }`
                      );
                    }}
                    className="hover:bg-emerald-600 font-thin text-xs rounded-sm px-3 py-1.5 bg-emerald-500 mr-2 my-1"
                  >
                    Giữ chỗ
                  </button>
                  {el.so_nguoi_khach_dang_thue ? (
                    <button
                      onClick={() => {
                        query.set("lap-hoa-don-dv", `${el.ten_phong}`);
                        history(
                          `${
                            location.pathname +
                            `${query.toString() ? "?" : ""}` +
                            query.toString()
                          }`
                        );
                      }}
                      className="hover:bg-yellow-600 font-thin text-xs rounded-sm px-3 py-1.5 bg-yellow-500 mr-2 my-1"
                    >
                      Lập hóa đơn dịch vụ
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
