import React from "react";
import { render, fireEvent, getByText } from "@testing-library/react";
import { LanguageSelector } from "./LanguageSelector";
import { BrowserRouter } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "../../../i18n";

describe("LanguageSelector", () => {
  it("should render successfully", async () => {
    const { baseElement } = render(
      <I18nextProvider i18n={i18next}>
        <BrowserRouter>
          <LanguageSelector />
        </BrowserRouter>
      </I18nextProvider>
    );
    expect(baseElement).toBeTruthy();
  });

  it("Should change language", async () => {
    const { container } = render(
      <I18nextProvider i18n={i18next}>
        <BrowserRouter>
          <LanguageSelector />
        </BrowserRouter>
      </I18nextProvider>
    );
  
    const dropDown = container.querySelector('[data-testid="language-selector-dropDown"]');
  
    if (dropDown) {
      fireEvent.click(dropDown);
  
      setTimeout(() => {
        const englishOption = dropDown.querySelector('div:nth-child(1)');
        const portugueseOption = dropDown.querySelector('div:nth-child(2)');
  
        if (portugueseOption) {
          fireEvent.click(portugueseOption);
  
          setTimeout(() => {
            expect(document.documentElement.lang).toBe("pt");
  
            if (englishOption) {
              fireEvent.click(dropDown);
              fireEvent.click(englishOption);
  
              setTimeout(() => {
                expect(document.documentElement.lang).toBe("en");
              }, 100);
            }
          }, 100);
        } 
      }, 100);
    }
  });
  
});
