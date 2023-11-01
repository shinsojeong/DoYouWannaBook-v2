import { changeBar } from "../../modules/topBar";

const obj = {
  adminHome: {
    center: { title: "홈", data: null },
  },
  adminSearchBook: {
    left: "back",
    center: { title: "도서 조회", data: null },
  },
  userHome: {
    center: { title: "홈", data: null },
  },
  userSearch: {
    left: "back",
    center: { title: "도서 검색", data: null },
  },
  userSearchDetail: {
    left: "back",
    center: { title: "도서 정보", data: null },
  },
  userSearchLocation: {
    left: "back",
    center: { title: "도서 위치", data: null },
  },
  userBarcode: {
    center: { title: "바코드 대출", data: null },
  },
  userChatList: {
    center: { title: "채팅", data: null },
  },
  userMypage: {
    center: { title: "마이페이지", data: null },
  },
  userCheckBorrow: {
    left: "back",
    center: { title: "도서 대출 조회", data: null },
  },
  userCheckStdBorrow: {
    left: "back",
    center: { title: "공유 도서 조회", data: null },
  },
  userStdMain: {
    center: { title: "공유 도서", data: null },
  },
  userStdMyList: {
    left: "back",
    center: { title: "내 도서 조회", data: null },
  },
  userStdCreate: {
    left: "back",
    center: { title: "대여 도서 등록", data: null },
    right: "create",
  },
  findPw: {
    left: "back",
    center: { title: "비밀번호 찾기", data: null },
  },
  findPwRes: {
    center: { title: "비밀번호 찾기", data: null },
  },
  join: {
    left: "back",
    center: { title: "회원가입", data: null },
  },
};

/** 헤더를 변경하는 함수 */
const ChangeHeader = ({
  title,
  lfunc = null,
  rfunc = null,
  size = "small",
  dispatch,
}) => {
  let result = JSON.parse(JSON.stringify(obj[title]));
  if (!result.left) result.left = "null";
  if (!result.right) result.right = "null";
  result.lfunc = lfunc;
  result.rfunc = rfunc;
  result.size = size;
  return dispatch(changeBar(result));
};

export default ChangeHeader;
