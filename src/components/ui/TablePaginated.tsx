"use client";
import { Button } from "@nextui-org/button";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import React, { useEffect, useState } from "react";

interface Event {
}

interface EventFilter {
}

type EventInfo<E extends Event> = {
  id: number;
  event: E;
}

type TableInfo<E extends Event> = {
  eventName: string;
  baseFilter: EventFilter;
  customFilter: EventFilter;
  columns: { [columnId: string]: Column<E> };
  entriesPerPage?: number;
}

type Column<E extends Event> = {
  label: React.ReactNode;
  getValue: (event: E) => React.ReactNode;
}

export default function TablePaginated<E extends Event>({
  eventName,
  baseFilter,
  customFilter,
  columns,
  entriesPerPage = 20,
}: TableInfo<E>) {
  const [indexOfFirstEntryOnPage, setIndexFirstEntry] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(true);
  const [tableRows, setTableRows] = useState<EventInfo<E>[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (initialized) return;
    initializeTable();
  });

  function getIdFirstEntry() {
    return tableRows[0].id;
  }

  function getIdLastEntry() {
    return tableRows[tableRows.length - 1].id;
  }

  async function initializeTable() {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(baseFilter)) {
      query.append(key, value);
    }
    for (const [key, value] of Object.entries(customFilter)) {
      query.append(key, value);
    }
    query.append("pagination_by", "Newest");
    query.append("limit", entriesPerPage.toString());
    const url = `https://events.intear.tech/query/${eventName}?${query.toString()}`;
    const entries = await fetch(url)
      .then((response) => response.json())
    if (entries.length === 0) {
      console.log("Transaction array is empty");
      return;
    }
    setIsLastPage(entries.length < entriesPerPage);
    setTableRows(entries);
    setInitialized(true);
  }

  async function nextPage() {
    console.log("next");
    if (tableRows.length === 0) return;

    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(baseFilter)) {
      query.append(key, value);
    }
    for (const [key, value] of Object.entries(customFilter)) {
      query.append(key, value);
    }
    query.append("pagination_by", "BeforeId");
    query.append("id", getIdLastEntry().toString());
    query.append("limit", entriesPerPage.toString());
    const url = `https://events.intear.tech/query/${eventName}?${query.toString()}`;
    const entries = await fetch(url)
      .then((response) => response.json())

    if (entries.length < entriesPerPage) {
      setIsLastPage(true);
      if (entries.length === 0) return;
    }
    setIndexFirstEntry((prev) => prev + entriesPerPage);
    setIsFirstPage(false);
    setTableRows(entries);
  }

  async function previousPage() {
    if (tableRows.length === 0) return;

    let afterId = getIdFirstEntry();
    if (indexOfFirstEntryOnPage <= entriesPerPage) {
      afterId = tableRows[entriesPerPage - indexOfFirstEntryOnPage].id;
      setIndexFirstEntry(0);
      setIsFirstPage(true);
    } else {
      setIndexFirstEntry((prev) => prev - entriesPerPage);
    }
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(baseFilter)) {
      query.append(key, value);
    }
    for (const [key, value] of Object.entries(customFilter)) {
      query.append(key, value);
    }
    query.append("pagination_by", "AfterId");
    query.append("id", afterId.toString());
    query.append("limit", entriesPerPage.toString());
    const url = `https://events.intear.tech/query/${eventName}?${query.toString()}`;
    const entries = await fetch(url)
      .then((response) => response.json())
      .then((response) => response.reverse())
    setIsLastPage(false);
    setTableRows(entries);
  }

  return (
    <div>
      {tableRows && (
        <div>
          <div className="flex flex-col justify-center">
            <Table>
              <TableHeader columns={Object.entries(columns)}>
                {([columnId, column]) => (
                  <TableColumn key={columnId}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={tableRows}>
                {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => (
                      <TableCell>{columns[columnKey].getValue(item.event)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-2 my-4">
            <div className="flex gap-2">
              <Button isDisabled={isFirstPage} onClick={previousPage}>
                Previous
              </Button>
              <Button isDisabled={isLastPage} onClick={nextPage}>
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
