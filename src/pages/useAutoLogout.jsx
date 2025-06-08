import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AUTO_LOGOUT_TIME = 5 * 60 * 1000;

function useAutoLogout() {

  console.log("useAutoLogout hook initialized");
  const navigate = useNavigate();
  const timerRef = useRef();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(logout, AUTO_LOGOUT_TIME);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];

    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      clearTimeout(timerRef.current);
    };
  }, []);
}

export default useAutoLogout;
