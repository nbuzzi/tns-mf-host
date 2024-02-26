import { useState, useEffect, useCallback } from "react";
import { SIZE } from "../utils/const/sizesDefinition";

export function useScreenSize(): Record<string, boolean> {
  const width = window.innerWidth;
  const [isMobileXs, setIsMobileXs] = useState(width <= SIZE.MOBILE_XS);
  const [isMobile, setIsMobile] = useState(width <= SIZE.MOBILE);
  const [isTabletXs, setIsTabletXs] = useState(width <= SIZE.TABLET_XS);
  const [isTablet, setIsTablet] = useState(width <= SIZE.TABLET);
  const [isDesktop, setIsDesktop] = useState(width > SIZE.MOBILE_XS && width > SIZE.MOBILE && width > SIZE.TABLET_XS && width > SIZE.TABLET);

  const handleResize = useCallback((): void => {
    const mobileXs = width <= SIZE.MOBILE_XS;
    const mobile = width <= SIZE.MOBILE;
    const tabletXs = width <= SIZE.TABLET_XS;
    const tablet = width <= SIZE.TABLET;
    const desktop = !mobileXs && !mobile && !tabletXs && !tablet;

    setIsMobileXs(mobileXs);
    setIsMobile(mobile);
    setIsTabletXs(tabletXs);
    setIsTablet(tablet);
    setIsDesktop(desktop);
  }, [width]);

  useEffect(() => {
    if (!isMobile && !isTablet && !isDesktop && !isMobileXs && !isTabletXs) {
      handleResize();
    } else {
      window.addEventListener("resize", handleResize);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize, isMobile, isTablet, isDesktop, isMobileXs, isTabletXs]);

  return { isMobileXs, isMobile, isTabletXs, isTablet, isDesktop };
}
