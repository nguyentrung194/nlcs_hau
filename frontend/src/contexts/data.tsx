export const STATUS_ROOM = {
  EMPTY: { name: "còn trống", color: "emerald" },
  LIVE_IN: { name: "đang ở", color: "sky" },
  DEPOSITING: { name: "đang cọc", color: "amber" },
};

export enum FORM_HOTEL {
  ROOM_COVER = "Bao phòng",
  EACH_ONE = "Từng người",
}

export const rooms = [
  {
    id: "101",
    clients_id: [],
    deposit_id: "",
    hotel_id: "",
    name: "101",
    price: 2500000,
    acreage: 22,
    unit_acreage: "m2",
    suitable_number_of_people: 3,
    number_of_clients: 0,
    url_contract: "/",
    unpaid_amount: 0,
    empty_day: null,
    floor: "1",
  },
];

export const price_list = [
  {
    id: "1",
    name: "Tiền điện theo đồng hồ",
    type_name: "Điện cố định theo đồng hồ",
    price: 12000,
    unit: "m3",
  },
];

export const hotels = [
  {
    id: "1",
    owner_id: "",
    price_list_id: "",
    name: "Nha tro 1",
    type: "Nhà trọ",
    address: "Can Tho",
    form: FORM_HOTEL.ROOM_COVER,
    index_date: 11,
    closing_date: 11,
    num_of_floors: 2,
  },
];

export const owners = [
  {
    id: "1",
    hotel_id: "1",
    name: "Hau",
    email: "hau@gmail.com",
    id_card: "366273845",
    phone_number: "0378637294",
  },
];

export const users = [
  {
    id: "1",
    hotel_id: "Nha tro 1",
    room_id: "101",
    url_image: "",
    name: "Nguyen Van A",
    date_of_birth: null,
    home_town: "Can Tho",
    url_id_card_front: "",
    url_id_card_back_side: "",
    phone_number: "0868327485",
    day_in: null,
    status_staying: "Chưa khai báo",
    temporary_stay_period: null,
    note: "",
    status: "Đang ở",
  },
];
