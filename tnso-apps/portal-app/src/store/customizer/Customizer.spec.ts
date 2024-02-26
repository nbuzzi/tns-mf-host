import { store } from "../StoreMobx";

describe("Customizer", () => {
  // Customizer initializes with default values
  it("should initialize with default values", () => {
    const customizer = store.customizer;
    expect(customizer.isDark).toBe(true);
    expect(customizer.isMiniSidebar).toBe(false);
    expect(customizer.isMobileSidebar).toBe(false);
    expect(customizer.isTopbarFixed).toBe(true);
    expect(customizer.isRTL).toBe(false);
    expect(customizer.isTreeMenuMobile).toBe(false);
  });

  // ChangeDarkMode method updates isDark property
  it("should update isDark property when ChangeDarkMode is called", () => {
    const customizer = store.customizer;
    customizer.ChangeDarkMode(false);
    expect(customizer.isDark).toBe(false);
  });

  // ToggleMiniSidebar method toggles isMiniSidebar property
  it("should toggle isMiniSidebar property when ToggleMiniSidebar is called", () => {
    const customizer = store.customizer;
    customizer.ToggleMiniSidebar();
    expect(customizer.isMiniSidebar).toBe(true);
    customizer.ToggleMiniSidebar();
    expect(customizer.isMiniSidebar).toBe(false);
  });

  // ChangeDarkMode method updates isDark property with false value
  it("should update isDark property with false value when ChangeDarkMode is called", () => {
    const customizer = store.customizer;
    customizer.ChangeDarkMode(false);
    expect(customizer.isDark).toBe(false);
  });

  // ToggleMiniSidebar method toggles isMiniSidebar property from true to false
  it("should toggle isMiniSidebar property from true to false when ToggleMiniSidebar is called", () => {
    const customizer = store.customizer;
    customizer.isMiniSidebar = true;
    customizer.ToggleMiniSidebar();
    expect(customizer.isMiniSidebar).toBe(false);
  });

  // ToggleMobileSidebar method toggles isMobileSidebar property from true to false
  it("should toggle isMobileSidebar property from true to false when ToggleMobileSidebar is called", () => {
    const customizer = store.customizer;
    customizer.isMobileSidebar = true;
    customizer.ToggleMobileSidebar();
    expect(customizer.isMobileSidebar).toBe(false);
  });
});