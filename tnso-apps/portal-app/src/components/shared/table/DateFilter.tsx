import React, { useMemo, useRef } from "react";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { DateHelper } from "../../../helpers/shared/DateHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import { store } from "../../../store/StoreMobx";
import es from "antd/es/date-picker/locale/es_ES";
import pt from "antd/es/date-picker/locale/pt_PT";
import en from "antd/es/date-picker/locale/en_GB";
import fr from "antd/es/date-picker/locale/fr_FR";
import nl from "antd/es/date-picker/locale/nl_NL";
import de from "antd/es/date-picker/locale/de_DE";
import it from "antd/es/date-picker/locale/it_IT";
import tlPh from "../../../translations/Releases/4.2.0/ph/tl-ph";
import { Language } from "../language/LanguageSelector";

import { observer } from "mobx-react";
import { PickerLocale } from "antd/es/date-picker/generatePicker";

interface Props {
  onSearch: (value: string, key: string) => void;
  keyFilter: string;
  handleDefaultValue?: (key: string) => string;
}

const localeMap: Record<Language, PickerLocale> = {
  [Language.es]: es,
  [Language.pt]: pt,
  [Language.en]: en,
  [Language.fr]: fr,
  [Language.nl]: nl,
  [Language.de]: de,
  [Language.it]: it,
  [Language.ph]: tlPh
};

export const DateFilter: React.FC<Props> = observer(({ onSearch, keyFilter, handleDefaultValue }): JSX.Element => {
  const [searchText, setSearchText] = useState<Dayjs | null>();
  const [openCalendar, setOpenCalendar] = useState(false);
  const { currentLanguage } = store.shared;
  const { userInfo } = store.auth;
  const dateFilterRef = useRef<HTMLDivElement>(null);

  const currentLocale = useMemo(() => {
    if (currentLanguage === Language.ph) {
      moment.defineLocale("tl-ph", {
        months: ["Enero", "Pebrero", "Marso", "Abril", "Mayo", "Hunyo", "Hulyo", "Agosto", "Setyembre", "Oktubre", "Nobyembre", "Disyembre"]
      });
    }
    return localeMap[currentLanguage as keyof typeof Language];
  }, [currentLanguage]);

  const [locale, setLocale] = useState(currentLocale);

  const handleSearch = useCallback(
    (value: Dayjs | null, dateString: string): void => {
      if (value) {
        const momentValue = moment(value.valueOf());
        const valueWithTimeZone = DateHelper.getDateFromMomentWithTimeZone(momentValue, userInfo?.timeZone);
        const dayjsValue = dayjs(valueWithTimeZone.valueOf());
        setSearchText(dayjsValue);
      }
      const dateTimestamp = DateHelper.convertStringToTimestamp(dateString, userInfo?.timeZone).toString();
      setSearchText(value);
      onSearch(dateTimestamp, keyFilter);
      setOpenCalendar(false);
    },
    [onSearch, keyFilter]
  );

  useEffect(() => {
    const defaultValue = handleDefaultValue ? handleDefaultValue(keyFilter) : "";
    if (defaultValue) {
      const momentValue = DateHelper.getDateMoment(Number(defaultValue), userInfo?.timeZone);
      const dayjsValue = dayjs(momentValue.valueOf());
      setSearchText(dayjsValue);
    }
  }, []);

  useEffect(() => {
    setLocale(currentLocale);
    setOpenCalendar(true);
  }, [currentLanguage]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dateFilterRef.current && !dateFilterRef.current.contains(event.target as Node)) {
        setOpenCalendar(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="filter-datepicker-search" ref={dateFilterRef} data-testid="date-filter-component">
      <DatePicker
        locale={locale}
        onChange={handleSearch}
        placeholder=""
        // eslint-disable-next-line react/jsx-no-bind
        onClick={(): void => setOpenCalendar(true)}
        showTime={{ format: "HH:mm A" }}
        open={openCalendar}
        format="DD/MM/YYYY hh:mm A"
        value={searchText}
        suffixIcon={!searchText && <FontAwesomeIcon icon={faCalendarWeek} color="#ffffff" />}
      />
    </div>
  );
});
