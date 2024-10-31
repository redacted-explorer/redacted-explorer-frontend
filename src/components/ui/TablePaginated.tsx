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
import useWebSocket from "react-use-websocket";

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
  realtimeUpdates?: boolean;
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
  realtimeUpdates = true,
}: TableInfo<E>) {
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(true);
  const [tableRows, setTableRows] = useState<EventInfo<E>[]>([]);
  const [cachedTableRows, setCachedTableRows] = useState<EventInfo<E>[]>([]);
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
    setCachedTableRows([...entries]);
    setInitialized(true);
  }

  async function nextPage() {
    console.log("next");
    if (tableRows.length === 0) return;

    setIsFirstPage(false);
    let lastIdOnCurrentPage = getIdLastEntry();
    let indexOfLastEntryOnCurrentPage = cachedTableRows.findIndex((row) => row.id === lastIdOnCurrentPage);
    if (indexOfLastEntryOnCurrentPage !== -1 && lastIdOnCurrentPage < 0) {
      const entriesOnThisPage = cachedTableRows.slice(indexOfLastEntryOnCurrentPage, indexOfLastEntryOnCurrentPage + entriesPerPage);
      setTableRows(entriesOnThisPage);
      if (indexOfLastEntryOnCurrentPage + entriesPerPage === cachedTableRows.length) {
        setIsLastPage(true);
      }
      return;
    }

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
    setCachedTableRows([...cachedTableRows, ...entries]);
    setTableRows(entries);
  }

  async function previousPage() {
    if (tableRows.length === 0) return;

    let afterId = getIdFirstEntry();
    let indexOfFirstEntryOnCurrentPage = cachedTableRows.findIndex((row) => row.id === afterId);
    if (indexOfFirstEntryOnCurrentPage !== -1) {
      indexOfFirstEntryOnCurrentPage = Math.max(entriesPerPage, indexOfFirstEntryOnCurrentPage);
      const entriesOnThisPage = cachedTableRows.slice(indexOfFirstEntryOnCurrentPage - entriesPerPage, indexOfFirstEntryOnCurrentPage);
      setTableRows(entriesOnThisPage);
      if (indexOfFirstEntryOnCurrentPage === entriesPerPage) {
        setIsFirstPage(true);
      }
      return;
    }

    // This should never happen but handle it anyway
    console.error("Could not find the previous page in the cached table rows");

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

  if (realtimeUpdates) {
    const ws = useWebSocket(`wss://ws-events.intear.tech/events/${eventName}`, {
      onOpen: () => {
        console.log("opened");
      },
      onMessage: (event) => {
        let eventData = JSON.parse(event.data);
        let firstId = cachedTableRows[0]?.id ?? 0;
        let id;
        if (firstId >= 0) {
          id = -1;
        } else {
          id = firstId - 1;
        }
        cachedTableRows.unshift({ id, event: eventData });
        setCachedTableRows(cachedTableRows);
        if (isFirstPage) {
          tableRows.unshift({ id, event: eventData });
          tableRows.pop();
          setTableRows(tableRows);
        }
      },
      reconnectAttempts: 10,
      reconnectInterval: 1000,
    });

    useEffect(() => {
      if (initialized) return;
      const filter = {};
      Object.assign(filter, baseFilter);
      Object.assign(filter, customFilter);
      ws.sendMessage(JSON.stringify(filter));
    }, [initialized]);
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
