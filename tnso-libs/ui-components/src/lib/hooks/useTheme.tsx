import { useEffect, useMemo, useState } from "react";

export const useTheme = (dark: any, light: any, themeSelected: "dark" | "light" = "dark") => {
  const [theme, setTheme] = useState(dark);

  useEffect(() => {
    setTheme(themeSelected === "dark" ? dark : light);
  }, [themeSelected, dark, light, setTheme]);

  return theme;
};
