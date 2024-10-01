"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";

type Column = {
  key: string;
  label: string;
};

type TransactionRow = {
  key: string;
  hash: string;
  block: string;
  type: string;
  from: string;
  to: string;
  quantity: string;
  timestamp: string;
};
export default function Transactions({
  columns,
  rows,
}: {
  columns: Column[];
  rows: TransactionRow[];
}) {
  return (
    <div className="flex flex-col justify-center">
      <Table>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
