"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Spinner,
  getKeyValue,
} from "@nextui-org/react";
import { AsyncListData } from "@react-stately/data";
import GlitchText from "./LoadingGlitch";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";

type Column = {
  key: string;
  label: string;
};

type Row = {
  id: string | number;
  [key: string]: any;
};

export default function TableInfiniteScroll({
  hasMore,
  isLoading,
  list,
  columns,
}: {
  hasMore: boolean;
  isLoading: boolean;
  list: AsyncListData<any>;
  columns: Column[];
}) {
  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore,
    onLoadMore: list.loadMore,
  });
  return (
    <Table
      isHeaderSticky
      aria-label="Example table with infinite pagination"
      baseRef={scrollerRef}
      bottomContent={
        hasMore ? (
          <div className="flex w-full justify-center">
            <Spinner ref={loaderRef} color="current" />
          </div>
        ) : null
      }
      classNames={{
        base: "overflow-scroll",
        table: "min-h-[400px]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        isLoading={isLoading}
        items={list.items}
        loadingContent={
          <GlitchText isLoading={isLoading}>Loading...</GlitchText>
        }
      >
        {(item: any) => (
          <TableRow
            key={item.id}
            className={`fade-in ${
              item.type === "buy" ? "text-near-green-400" : "text-red-400"
            }`}
          >
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
