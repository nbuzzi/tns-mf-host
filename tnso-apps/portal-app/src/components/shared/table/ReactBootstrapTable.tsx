/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { SyntheticEvent, useCallback, useEffect, useMemo, useState } from "react";
import { BoxTable } from "./BoxTable";
import { Pagination } from "antd";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { PaginationComponent } from "./PaginationComponent";
import { TRANSLATION } from "../../../utils/const/translation";
import i18n from 'i18n-module/i18n';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any[];
  returnedRecords?: number;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  totalRecords?: number;
  exportCSV?: () => void;
  service?: () => Promise<void>;
  fetchData?: () => Promise<void>;
  handlePagination?: (page: number, recordPerPage: number) => Promise<void>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSelectRow?: (row: any) => void;
  isPagination?: boolean;
  isExport?: boolean;
  emptyMessage?: string;
  isButton?: boolean;
  textAlign?: string;
}

/**
 * This component renders a Bootstrap table with pagination and export to CSV functionality.
 * @param totalRecords - Total number of records in the table.
 * @param columns - Array of objects representing the columns of the table.
 * @param data - Array of objects representing the data rows of the table.
 * @param exportCSV - Function to export the table data to CSV.
 * @param handlePagination - Function to handle pagination.
 * @param returnedRecords - Number of records returned from the server.
 * @param handleSelectRow - Function to handle when a row is selected.
 */
// eslint-disable-next-line @typescript-eslint/no-empty-function
const ReactBootstrapTable: React.FC<Props> = ({
  totalRecords,
  columns,
  data,
  exportCSV,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
  handlePagination = (): any => {},
  returnedRecords = 0,
  handleSelectRow,
  currentPage = 0,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-empty-function
  setCurrentPage = (): any => {},
  isPagination,
  isExport,
  emptyMessage,
  isButton,
  textAlign = "text-center"
}) => {
  // Set the width of each column.
  document.documentElement.style.setProperty("--column-width", `${100 / columns.length}%`);
  document.documentElement.style.setProperty("--first-column-width", `${isButton ? "5" : 100 / columns.length}%`);

  // Retrieve translation function.
  const { t } = useTranslation();

  // Set up pagination state.
  // const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const recordPerPage = 10;

  // Calculate start and end records for the current page.
  const start = useMemo(() => (currentPage - 1) * pageSize + 1, [currentPage, pageSize]);
  const end = useMemo(() => {
    if (returnedRecords === recordPerPage) {
      return currentPage * pageSize;
    } else {
      return totalRecords;
    }
  }, [currentPage, pageSize, returnedRecords, totalRecords]);

  /**
   * Function to handle changing the current page.
   * @param page - The new current page.
   */
  const handleChangePage = useCallback(
    async (page: number) => {
      const startAtRecord = page - 1;
      await handlePagination(startAtRecord, recordPerPage);
      setCurrentPage(page);
    },
    [handlePagination]
  );

  useEffect(() => {
    if (data.length > 0) {
      const tbodyFilter = document.querySelector("table");
      if (tbodyFilter) {
        tbodyFilter.classList.remove("table");
      }
      const table = document.querySelector(".next-table");
      if (table) {
        const tdList = table.getElementsByTagName("td");

        Array.from(tdList).forEach((td) => {
          const content = td.innerText;
          td.setAttribute("title", content);
        });
      }
    }
  }, [data]);

  return (
    <>
      <BoxTable>test</BoxTable>
      {isPagination && returnedRecords && returnedRecords > 0 ? (
        <PaginationComponent totalRecords={totalRecords} start={start} end={end}>
          <Pagination
            locale={{ prev_page: i18n.t(TRANSLATION.TOOLTIP.prevPage), next_page: i18n.t(TRANSLATION.TOOLTIP.nextPage) }}
            defaultCurrent={currentPage}
            total={totalRecords}
            // eslint-disable-next-line react/jsx-no-bind
            onChange={async (e): Promise<void> => handleChangePage(e)}
            current={currentPage}
          />
        </PaginationComponent>
      ) : null}
      {isExport && totalRecords ? (
        <Button
          variant="outline-primary"
          onClick={exportCSV}
          title={i18n.t(TRANSLATION.TOOLTIP.export)}
          className={`mt-${isPagination && returnedRecords && returnedRecords > 0 ? 0 : 3}`}>
          <FontAwesomeIcon icon={faFileExport} size="sm" />
        </Button>
      ) : null}
    </>
  );
};

export default ReactBootstrapTable;
