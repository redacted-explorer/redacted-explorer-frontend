"use client";
import { Button } from "@nextui-org/button";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { useEffect, useState } from "react";
import { TokenData } from "../../../types";

type Column = {
  key: string;
  label: string;
};

type Row = {
  id: number;
  [key: string]: any;
};

export default function TablePaginated({
  fetchRows,
  columns,
  entriesPerPageList,
  getInitializeTableUrl,
  getUpdateEntriesPerPageUrl,
  getNextPageUrl,
  getPreviousPageUrl,
}: {
  fetchRows: (
    url: string,
    allTokensMetadata: Record<string, TokenData> | null,
    sort?: boolean
  ) => Promise<Row[]>;
  columns: Column[];
  entriesPerPageList: number[];
  getInitializeTableUrl: (entriesPerPage: number) => string;
  getUpdateEntriesPerPageUrl: (id: number, entriesPerPage: number) => string;
  getNextPageUrl: (id: number, entriesPerPage: number) => string;
  getPreviousPageUrl: (id: number, entriesPerPage: number) => string;
}) {
  const [indexFirstEntry, setIndexFirstEntry] = useState(0);
  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(true);
  const [entriesPerPage, setEntriesPerPage] = useState(entriesPerPageList[0]);
  const [tableRows, setTableRows] = useState<Row[] | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [metadataInitialized, setMetadataInitialized] = useState(false);
  const [allTokensMetadata, setAllTokensMetadata] = useState<Record<
    string,
    TokenData
  > | null>(null);

  useEffect(() => {
    if (initialized || !metadataInitialized) return;
    initializeTable();
  }, [metadataInitialized]);

  useEffect(() => {
    if (metadataInitialized) return;
    try {
      fetch("https://prices.intear.tech/tokens", { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          setAllTokensMetadata(data);
          setMetadataInitialized(true);
        });
    } catch (e) {
      console.log(e);
    }
  });

  function getIdFirstEntry() {
    return tableRows![0].id;
  }

  function getIdLastEntry() {
    return tableRows![tableRows!.length - 1].id;
  }

  async function initializeTable() {
    const entries = await fetchRows(
      getInitializeTableUrl(entriesPerPage),
      allTokensMetadata
    );
    if (entries.length === 0) {
      console.log("Transaction array is empty");
      return;
    }
    setLastPage(entries.length < entriesPerPage);
    setTableRows(entries);
    setInitialized(true);
  }

  async function nextPage() {
    console.log("next");
    if (!tableRows || tableRows.length === 0) return;

    const entries = await fetchRows(
      getNextPageUrl(getIdLastEntry(), entriesPerPage),
      allTokensMetadata
    );
    if (entries.length < entriesPerPage) {
      setLastPage(true);
      if (entries.length === 0) return;
    }
    setIndexFirstEntry((prev) => prev + entriesPerPage);
    setFirstPage(false);
    setTableRows(entries);
  }

  async function previousPage() {
    if (!tableRows || tableRows.length === 0) return;

    let id = getIdFirstEntry();
    if (indexFirstEntry <= entriesPerPage) {
      id = tableRows![entriesPerPage - indexFirstEntry].id;
      setIndexFirstEntry(0);
      setFirstPage(true);
    } else {
      setIndexFirstEntry((prev) => prev - entriesPerPage);
    }
    const entries = await fetchRows(
      getPreviousPageUrl(id, entriesPerPage),
      allTokensMetadata,
      true
    );
    if (entries.length === entriesPerPage) setLastPage(false);
    setTableRows(entries);
  }

  async function updateEntriesPerPage(n: number) {
    setEntriesPerPage(n);
    if (!tableRows || tableRows.length === 0) return;
    const entries = await fetchRows(
      getUpdateEntriesPerPageUrl(getIdFirstEntry(), n),
      allTokensMetadata
    );
    if (entries.length < entriesPerPage) setLastPage(true);
    setTableRows(entries);
  }

  return (
    <div>
      {tableRows && (
        <div>
          <div className="flex flex-col justify-center">
            <Table>
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={tableRows}>
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-2 my-4">
            <div className="flex gap-2">
              <Button isDisabled={firstPage} onClick={previousPage}>
                Previous
              </Button>
              <Button isDisabled={lastPage} onClick={nextPage}>
                Next
              </Button>
            </div>
            <div>Results Per Page</div>
            <div className="flex gap-2">
              {entriesPerPageList.map((amount) => (
                <Button
                  key={amount}
                  onClick={() => updateEntriesPerPage(amount)}
                >
                  {amount}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
