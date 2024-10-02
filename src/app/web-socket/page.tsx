"use client";
import "./page.css";
import { Button } from "@nextui-org/button";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import useWebSocket from "react-use-websocket";
import { useEffect, useState } from "react";
/* 
1. Animation
2. Web socket connection
3. updating the array accordingly
*/

export default function Page() {
  const WEBSOCKET_URL = "wss://ws-events.intear.tech/events/trade_swap";
  const [trades, setTrades] = useState([]);
  const [initialized, setInitialized] = useState(true);
  const columns = [
    { key: "first", label: "FIRST" },
    { key: "second", label: "SECOND" },
    { key: "third", label: "THIRD" },
  ];
  const [counter, setCounter] = useState(3);
  const [rows, setRows] = useState([
    { id: 2, first: 2, second: 3, third: 4 },
    { id: 1, first: 1, second: 2, third: 3 },
    { id: 0, first: 0, second: 1, third: 2 },
  ]);
  const [fadeInRow, setFadeInRow] = useState<number | null>(null);

  function add() {
    const newElement = {
      id: counter,
      first: counter,
      second: counter + 1,
      third: counter + 2,
    };
    setCounter((prev) => prev + 1);
    setRows((previousRows) => {
      const copy = [...previousRows];
      copy.pop();
      return [newElement].concat(copy);
    });
    setFadeInRow(newElement.id);
  }

  useEffect(() => {
    if (fadeInRow !== null) {
      // Remove the fade-in marker after the animation duration (500ms)
      const timeout = setTimeout(() => {
        setFadeInRow(null);
      }, 500); // Matches the CSS animation duration
      return () => clearTimeout(timeout);
    }
  }, [fadeInRow]);

  const { sendMessage } = useWebSocket(`${WEBSOCKET_URL}`, {
    onOpen: () => {
      console.log("opened");
      setInitialized(false);
    },
    onMessage: (event) => {
      let trade = JSON.parse(event.data);
      console.log(trade);
    },
  });

  useEffect(() => {
    if (initialized) return;
    sendMessage(JSON.stringify({}));
    setInitialized(true);
  }, [initialized]);

  return (
    <div className="flex flex-col gap-2 mt-2 justify-center items-center">
      <Button onClick={add}>Add</Button>
      <div className="flex flex-col justify-center">
        <Table>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow
                key={item.id}
                className={item.id === fadeInRow ? "fade-in" : ""}
              >
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
