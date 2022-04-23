export const PhongReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_KHU":
      return {
        ...state,
        khus: [
          ...state.khus,
          { ...action.payload.khu, id: `${state.khus.length + 1}` },
        ],
      };
    case "EDIT_KHU":
      return {
        ...state,
        khus: [
          ...state.khus.map((el: any) => {
            if (action.payload.khu.id === el.id) {
              return { ...el, ...action.payload.khu };
            } else return el;
          }),
        ],
      };
    case "SET_PHONG":
      return {
        ...state,
        phong: action.payload.phong,
      };
    case "SET_PHONGS":
      return {
        ...state,
        phongs: action.payload.phongs,
      };
    case "FIND_HOTELS":
      return {
        ...state,
        hotels_filter: state.khus.filter(function (item: any) {
          for (var key in action.payload.filter) {
            if (action.payload.filter[key]) {
              if (
                item[key] === undefined ||
                !item[key].match(new RegExp(action.payload.filter[key] + "*"))
              )
                return false;
            }
          }
          return true;
        }),
      };
    default:
      return state;
  }
};
