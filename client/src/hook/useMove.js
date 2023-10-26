import { useCallback } from 'react';
import { useNavigate } from 'react-router';

/** 페이지 이동을 위한 커스텀 훅 */
const useMove = () => {
  const move = useNavigate();
  /** 페이지 이동 함수
   * path: 목적지
   * state: 이동 여부 (ex. confirm 결과 활용)
   * callback: 페이지 이동 후 실행할 함수
   */
  const navigate = useCallback((path, state = true, callback = null) => {
    if(state) {
      move(path);
      if(callback) callback();
    };
  }, [move]);
  return navigate;
}

export default useMove;
