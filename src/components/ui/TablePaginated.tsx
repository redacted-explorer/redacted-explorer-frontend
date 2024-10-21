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

type Column = {
  key: string;
  label: string;
};

type Row = {
  id: string | number;
  [key: string]: any;
};

export default function TablePaginated({
  columns,
  rows,
  firstPage,
  lastPage,
  entriesPerPageList,
  updateEntriesPerPage,
  nextPage,
  previousPage,
}: {
  columns: Column[];
  rows: Row[];
  firstPage: boolean;
  lastPage: boolean;
  entriesPerPageList: number[];
  updateEntriesPerPage: (n: number) => void;
  nextPage: () => void;
  previousPage: () => void;
}) {
  return (
    <div>
      <div className="flex flex-col justify-center">
        <Table>
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
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

      <div className="flex flex-col gap-2 ml-4 my-2">
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
            <Button key={amount} onClick={() => updateEntriesPerPage(amount)}>
              {amount}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
