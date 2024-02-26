import { renderHook, act } from "@testing-library/react-hooks";
import { useScreenSize } from "./useScreenSize"; // Ajusta la ruta según tu estructura de archivos
import { SIZE } from "../utils/const/sizesDefinition";

// Mock del window para simular el entorno del navegador
const mockWindow = (width: number) => {
  global.innerWidth = width;
  global.dispatchEvent(new Event("resize"));
};

describe("useScreenSize", () => {
  it("should update size states on window resize", async () => {
    const { result } = renderHook(() => useScreenSize());

    expect(result.current.isMobileXs).toBe(false);
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTabletXs).toBe(false);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(true);
    await act(async () => {
      mockWindow(SIZE.DESKTOP + 1);
    });
    expect(result.current.isMobileXs).toBe(false);
    expect(result.current.isMobile).toBe(false);
    expect(result.current.isTabletXs).toBe(false);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isDesktop).toBe(true);
  });
});