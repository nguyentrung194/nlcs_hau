import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PhongContext } from "../../../../../contexts/context";
import { useQueryURL } from "../../../../../hooks/use-query-url";
import { KhachThue } from "./KhachThue";
import { LichSuHopDong } from "./LichSuHopDong";
import { LichSuSuaChua } from "./LichSuSuaChua";
import { LichSuThanhToan } from "./LichSuThanhToan";
import { TaiSanLienQuan } from "./TaiSanLienQuan";
import { ThongTinChung } from "./ThongTinChung";

export const ThongTinPhong = () => {
  const location = useLocation();
  const history = useNavigate();
  const query = useQueryURL();
  const [isOpen, setOpen] = useState(false);
  const [isFirst, setFirst] = useState(false);
  const [indexStatus, setIndexStatus] = useState(false);
  const [tabNumber, setTabNumber] = useState(0);
  const tabs = [
    { nameTag: "Thông tin chung", component: <ThongTinChung /> },
    { nameTag: "Khách thuê", component: <KhachThue /> },
    { nameTag: "Lịch sử thanh toán", component: <LichSuThanhToan /> },
    { nameTag: "Lịch sử hợp đồng", component: <LichSuHopDong /> },
    { nameTag: "Lịch sử sửa chữa", component: <LichSuSuaChua /> },
    { nameTag: "Tài sản liên quan", component: <TaiSanLienQuan /> },
  ];

  const { khus } = useContext(PhongContext);
  console.log(khus);

  const { hotelId } = useParams();

  const soPhong = query.get("thong-tin-phong");
  const themKhach = query.get("them-khach");

  useEffect(() => {
    if (themKhach) {
      setTabNumber(1);
    }
  }, [themKhach]);

  useEffect(() => {
    if (soPhong) {
      setFirst(true);
      setTimeout(() => {
        setOpen(true);
        // formik.setValues({
        // ...items
        //   });
      }, 300);
      setIndexStatus(true);
    } else {
      setFirst(false);
      setTimeout(() => {
        setOpen(false);
        setIndexStatus(false);
      }, 300);
    }
  }, [soPhong]);

  return (
    <div
      className={`${
        indexStatus ? "z-10 overflow-y-auto" : "-z-10 overflow-hidden"
      } fixed inset-0`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-center min-h-screen sm:pt-4 sm:px-4 sm:pb-20 text-center sm:block sm:p-0">
        <div
          onClick={() => {
            query.delete("thong-tin-phong");
            history(location.pathname);
          }}
          className={`${isFirst ? "opacity-100" : "opacity-0"} ${
            isOpen ? "ease-in duration-200" : "ease-out duration-300"
          } fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className={`${
            isFirst
              ? "opacity-100 translate-y-0 sm:scale-100"
              : "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          } ${
            isOpen ? "ease-in duration-200" : "ease-out duration-300"
          } inline-block align-top bg-white rounded-lg text-left 
          overflow-hidden shadow-2xl shadow-black/40 transform transition-all sm:my-8 sm:align-middle
          w-full m-2 sm:m-0 sm:w-11/12 max-w-5xl`}
        >
          <div className="bg-blue-800 p-2 sm:p-3">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-white"
                  id="modal-title"
                >
                  Chi tiết phòng {soPhong} - {khus.filter((el: any) => {
                    return `${el.id}` === hotelId;
                  })[0]?.ten_nha ||
                    khus[0]?.ten_nha ||
                    ""}
                </h3>
              </div>
            </div>
          </div>
          <div className="m-3 overflow-x-auto">
            <div className="table w-full my-1 py-2">
              {tabs.map((el, idx) => {
                return (
                  <div
                    className={`table-cell ${
                      idx === tabNumber
                        ? "border-t border-r border-l"
                        : "border-b"
                    }`}
                    key={`tag-${idx}`}
                  >
                    <button
                      className="p-3"
                      onClick={() => {
                        setTabNumber(idx);
                      }}
                      type="button"
                    >
                      {el.nameTag}
                    </button>
                  </div>
                );
              })}
            </div>
            {tabs[tabNumber].component}
          </div>
          <div className="bg-gray-50 border border-b-0 border-r-0 border-l-0 border-gray-200 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={() => {
                query.delete("thong-tin-phong");
                history(location.pathname);
              }}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border 
              border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium
               text-gray-700 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2
                focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3
                 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
