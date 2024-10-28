import { ReactNode } from "react";

export default function TableElementTime({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="min-w-[6rem]">{children}</div>;
}
