import React, { useCallback, useMemo } from 'react';
import { Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { TRANSLATION } from '../../../utils/const/translation';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { TNSOButton, Variants } from '@tnso/ui-components/dist';
import './SelectFilter.scss';
import Text from 'i18n-module/i18nModule';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any[];
  keyFilter: string;
  defaultValue: CheckboxValueType[];
  onSearch: (value: string, keyFilter: string) => void;
}

export function TNSOSelectFilter({
  options,
  keyFilter,
  onSearch,
  defaultValue,
}: Props): JSX.Element {
  const { t } = useTranslation();
  const [optionsSelected, setOptionsSelected] =
    React.useState<CheckboxValueType[]>(defaultValue);
  const optionsAvailable = useMemo(
    () =>
      options.map((option, index) => (
        <Checkbox key={option + index} value={option.value}>
          <Text
            text={
              TRANSLATION.SHARED.DATATABLE[
                option.label as keyof typeof TRANSLATION.SHARED.DATATABLE
              ]
            }
          />
        </Checkbox>
      )),
    [options, onSearch, keyFilter, t]
  );

  const handleSearch = useCallback(
    (value: CheckboxValueType[]) => {
      // there is always the last value
      setOptionsSelected([value[value.length - 1]]);
    },
    [onSearch, keyFilter]
  );

  const resetValues = useCallback(() => {
    setOptionsSelected([]);
    onSearch('', keyFilter);
  }, []);

  const handleClick = useCallback(
    (searchValue: string, keyFilter: string): void => {
      onSearch(searchValue, keyFilter);
      const dropdown = document.querySelector('.ant-dropdown');
      if (dropdown) {
        dropdown.classList.add('ant-dropdown-hidden');
      }
    },
    [onSearch]
  );

  return (
    <div
      className="d-flex flex-column gap-2 p-2 tnso-select-filter"
      data-testid="select-filter"
    >
      <Checkbox.Group
        onChange={handleSearch}
        value={optionsSelected}
        className="d-flex flex-column"
      >
        {optionsAvailable}
      </Checkbox.Group>
      <div className="d-flex justify-content-between gap-4">
        <TNSOButton
          variant={Variants.Link}
          onClick={resetValues}
          data-testid="button-ok"
        >
          Reset
        </TNSOButton>
        {/* eslint-disable-next-line */}
        <TNSOButton
          variant={Variants.Primary}
          onClick={() => handleClick(optionsSelected.toString(), keyFilter)}
          data-testid="button-ok"
        >
          Ok
        </TNSOButton>
      </div>
    </div>
  );
}
