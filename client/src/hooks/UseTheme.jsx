import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function useTheme() {
  const mode = useSelector((state) => state.theme.mode);

  useEffect(() => {
    const root = window.document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mode]);

  return mode;
}
