//initial state
const INIT_TOPBAR_STATE = {
  left: "",
  center: { title: "", data: "" },
  right: "",
  lfunc: null,
  rfunc: null,
  size: "",
};

//action type
const CHANGEBAR = "CHANGEBAR";

/** 상단바 변경 */
export const changeBar = ({ left, center, right, lfunc, rfunc, size }) => ({
  type: CHANGEBAR,
  left,
  center,
  right,
  lfunc,
  rfunc,
  size,
});

/** reducer */
const topbar = (state = INIT_TOPBAR_STATE, action) => {
  const { type, left, center, right, lfunc, rfunc, size } = action;

  switch (type) {
    case CHANGEBAR:
      return {
        ...state,
        left,
        center,
        right,
        lfunc,
        rfunc,
        size,
      };

    default:
      return state;
  }
};

export default topbar;
