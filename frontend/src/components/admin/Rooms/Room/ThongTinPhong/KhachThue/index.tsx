import { useLocation, useNavigate } from "react-router-dom";
import { useQueryURL } from "../../../../../../hooks/use-query-url";
import { ThongTinHopDong } from "./thong-tin-hop-dong";

export const KhachThue = () => {
  const location = useLocation();
  const history = useNavigate();
  const query = useQueryURL();
  const update = query.get("thong-tin-phong");

  return (
    <div className={`w-full relative sm:h-auto`} key={``}>
      <ThongTinHopDong />
      <button
        onClick={() => {
          query.set("them-khach", `${update}`);
          history(
            `${
              location.pathname +
              `${query.toString() ? "?" : ""}` +
              query.toString()
            }`
          );
        }}
        className="p-2 text-white border bg-teal-600 border-black hover:bg-teal-700"
        type="button"
      >
        Thêm khách thuê
      </button>
    </div>
  );
};
