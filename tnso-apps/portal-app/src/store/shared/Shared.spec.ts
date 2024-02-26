import { MenuKeys } from "../../layouts/sidebars/vertical/Sidebar";
import { store } from "../StoreMobx";

describe("Shared", () => {
  // Setting menuItemSelected to a string value
  it("should set menuItemSelected to a string value when called with a valid menuItem object", () => {
    const shared = store.shared;
    const menuItem = MenuKeys.ChangeManagement;
    shared.setMenuItemSelected(menuItem);
    expect(shared.menuItemSelected).toBe(MenuKeys.ChangeManagement);
  });

  // Setting inlineCollapsed to true or false
  it("should set inlineCollapsed to true when called with true", () => {
    const shared = store.shared;
    shared.setInlineCollapsed(true);
    expect(shared.inlineCollapsed).toBe(true);
  });

  // Setting inlineCollapsed to true or false
  it("should set inlineCollapsed to false when called with false", () => {
    const shared = store.shared;
    shared.setInlineCollapsed(false);
    expect(shared.inlineCollapsed).toBe(false);
  });

  // Calling setMenuItemSelected with a menuItem object
  it("should set menuItemSelected to the key of the menuItem object when called with a valid menuItem object", () => {
    const shared = store.shared;
    const menuItem = MenuKeys.Administration;
    shared.setMenuItemSelected(menuItem);
    expect(shared.menuItemSelected).toBe(MenuKeys.Administration);
  });

  // Calling setMenuItemSelected with undefined
  it("should set menuItemSelected to undefined and inlineCollapsed to true when called with undefined", () => {
    const shared = store.shared;
    shared.setMenuItemSelected(undefined);
    expect(shared.menuItemSelected).toBe(undefined);
    expect(shared.inlineCollapsed).toBe(true);
  });

  // Calling setMenuItemSelected with a menuItem object that has no key property
  it("should set menuItemSelected to undefined when called with a menuItem object that has no key property", () => {
    const shared = store.shared;
    shared.setMenuItemSelected();
    expect(shared.menuItemSelected).toBe(undefined);
  });

  // Calling setMenuItemSelected with a menuItem object that has a key property that is not a string
  it("should set menuItemSelected to the string representation of the key property when called with a menuItem object that has a non-string key property", () => {
    const shared = store.shared;
    const menuItem = MenuKeys.UserAdministration;
    shared.setMenuItemSelected(menuItem);
    expect(shared.menuItemSelected).toBe(MenuKeys.UserAdministration);
  });
});
