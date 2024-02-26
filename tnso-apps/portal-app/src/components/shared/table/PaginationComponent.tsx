import React from 'react';
import { TRANSLATION } from '../../../utils/const/translation';
import Text from 'i18n-module/i18nModule';

interface Props {
  children: JSX.Element;
  totalRecords?: number;
  start?: number;
  end?: number;
}

export const PaginationComponent: React.FC<Props> = ({
  children,
  start,
  end,
  totalRecords,
}) => {
  return (
    <div
      className="d-flex justify-content-center p-2"
      data-testid="pagination-component"
    >
      <div className="d-flex align-items-center justify-content-between w-100 flex-column flex-md-row gap-2 mt-2">
        <div className="d-flex pages-table align-items-center justify-content-center">
          <span>
            <strong>
              <Text text={TRANSLATION.TNSDEVICES.records} />
              {start} - {end} <Text text={TRANSLATION.TNSDEVICES.of} />{' '}
              {totalRecords}
            </strong>
          </span>
        </div>
        <div className="container-paginator">{children}</div>
      </div>
    </div>
  );
};
