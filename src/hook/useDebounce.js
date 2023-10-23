import { debounce } from 'lodash';

/** 디바운싱을 위한 커스텀 훅 */
const useDebounce = () => {
  const debouncing = (func) => debounce(func, 800);
  return debouncing;
}

export default useDebounce;
