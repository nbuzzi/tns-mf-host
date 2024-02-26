/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-no-bind */
import React, { useCallback, useMemo, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import flagUk from '../../../assets/images/flagsLanguage/flag-UK.png';
import flagSpain from '../../../assets/images/flagsLanguage/flag-Spain.png';
import flagPortugal from '../../../assets/images/flagsLanguage/flag-Portugal.png';
import flagFrench from '../../../assets/images/flagsLanguage/flag-French.png';
import flagItalian from '../../../assets/images/flagsLanguage/flag-Italian.png';
import flagGerman from '../../../assets/images/flagsLanguage/flag-German.png';
import flagDutch from '../../../assets/images/flagsLanguage/flag-Dutch.png';
import flagFilipino from '../../../assets/images/flagsLanguage/flag-Filipino.png';
import { TRANSLATION } from '../../../utils/const/translation';
import { store } from '../../../store/StoreMobx';
import { useAsyncCall } from '../../../hooks/useAsyncCall';
import Text from 'i18n-module/i18nModule';
import i18n from 'i18n-module/i18n';

export enum Language {
  en = 'en',
  es = 'es',
  pt = 'pt',
  fr = 'fr',
  de = 'de',
  it = 'it',
  nl = 'nl',
  ph = 'ph',
}

export const LanguageSelector = (): JSX.Element => {
  const { currentLanguage, setLanguage } = store.shared;
  const { t } = useTranslation();
  const [flagLanguage, setFlagLanguage] = useState(currentLanguage as Language);

  const flags = useMemo(
    () => ({
      [Language.en]: flagUk,
      [Language.es]: flagSpain,
      [Language.pt]: flagPortugal,
      [Language.fr]: flagFrench,
      [Language.de]: flagGerman,
      [Language.it]: flagItalian,
      [Language.nl]: flagDutch,
      [Language.ph]: flagFilipino,
    }),
    [
      flagUk,
      flagSpain,
      flagPortugal,
      flagFrench,
      flagGerman,
      flagItalian,
      flagDutch,
      flagFilipino,
    ]
  );

  const onChangeLanguage = useCallback(
    async (lng: string | null): Promise<void> => {
      if (lng) {
        await i18n.changeLanguage(lng);
        setLanguage(lng as Language);
        setFlagLanguage(lng as Language);
      }
    },
    [i18n, t]
  );

  const defaultLanguage = useCallback(async () => {
    await i18n.changeLanguage(flagLanguage);
  }, [flagLanguage]);

  useAsyncCall(defaultLanguage, []);

  return (
    <NavDropdown
      title={<img src={flags[flagLanguage]} className="nav-dropdown" />}
      className="translate nav-dropdown"
      onSelect={onChangeLanguage}
      data-testid="dropDown"
    >
      {Object.values(Language).map((languageCode) => (
        <NavDropdown.Item
          key={languageCode}
          eventKey={languageCode}
          data-testid={`${languageCode}-option`}
        >
          <div className="item-text">
            <img src={flags[languageCode as Language]} className="item mx-2" />
            <Text
              text={
                TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.LAN[
                  languageCode as keyof typeof TRANSLATION.SIDEBAR.MONITORING.DEVICES.DEVICEDETAIL.LAN
                ]
              }
            />
          </div>
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
};
