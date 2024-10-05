import React from "react";

export default function Pill({
  active,
  setActive,
  children,
}: {
  active: boolean;
  setActive: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`${
        active ? "text-black bg-near-green-300" : "bg-near-green-800 text-near-green-100"
      } rounded-lg text-xs px-2 py-2`}
      onClick={setActive}
    >
      {children}
    </button>
  );
}
