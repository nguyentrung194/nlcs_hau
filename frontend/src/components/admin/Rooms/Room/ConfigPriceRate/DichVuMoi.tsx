import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

export const DichVuMoi = ({
  element: ele,
  index: idx,
  updateFunction: { setNewItems, newItems },
}: any) => {
  return (
    <tr onClick={() => {}} className="hover:bg-slate-100" key={`${1}+ttpt`}>
      <td className="text-xs font-medium text-left border border-gray-200 p-2"></td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        <div>
          <TextField
            label="Tên"
            className="w-full"
            required
            type="text"
            name="name"
            value={ele.name}
            onChange={(event) => {
              setNewItems([
                ...newItems.map((element: any, id: any) => {
                  if (idx === id) {
                    return {
                      ...element,
                      name: event.target.value,
                    };
                  }
                  return element;
                }),
              ]);
            }}
          />
        </div>
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        <Box>
          <FormControl fullWidth>
            <InputLabel id="type_name-label">Loại phí</InputLabel>
            <Select
              labelId="type_name-label"
              id="type_name-select"
              label="Loại phí"
              value={ele.type_name}
              onChange={(event: SelectChangeEvent) => {
                setNewItems([
                  ...newItems.map((element: any, id: any) => {
                    if (idx === id) {
                      return {
                        ...element,
                        type_name: event.target.value,
                      };
                    }
                    return element;
                  }),
                ]);
              }}
            >
              <MenuItem value={"Điện cố định theo đồng hồ"}>
                Điện cố định theo đồng hồ
              </MenuItem>
              <MenuItem value={"Điện lũy tiến"}>Điện lũy tiến</MenuItem>
              <MenuItem value={"Nước cố định theo đồng hồ"}>
                Nước cố định theo đồng hồ
              </MenuItem>
              <MenuItem value={"Nước lũy tiến"}>Nước lũy tiến</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        <div>
          <TextField
            label="Đơn giá"
            className="w-full"
            required
            type="number"
            name="price"
            value={ele.price}
            onChange={(event) => {
              setNewItems([
                ...newItems.map((element: any, id: any) => {
                  if (idx === id) {
                    return {
                      ...element,
                      price: event.target.value,
                    };
                  }
                  return element;
                }),
              ]);
            }}
          />
        </div>
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        <div>
          <TextField
            label="Đơn vị"
            className="w-full"
            required
            type="text"
            name="unit"
            value={ele.unit}
            onChange={(event) => {
              setNewItems([
                ...newItems.map((element: any, id: any) => {
                  if (idx === id) {
                    return {
                      ...element,
                      unit: event.target.value,
                    };
                  }
                  return element;
                }),
              ]);
            }}
          />
        </div>
      </td>
      <td className="text-xs font-medium text-left border border-gray-200 p-2">
        <div className="flex justify-around">
          <Button
            onClick={() => {
              setNewItems([
                ...newItems.filter((element: any, id: any) => {
                  if (idx === id) {
                    return false;
                  }
                  return true;
                }),
              ]);
            }}
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
};
