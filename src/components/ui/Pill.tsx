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
        active ? "text-white bg-[#042f2e]" : "bg-gray-200"
      } rounded-lg text-xs px-2 py-2`}
      onClick={setActive}
    >
      {children}
    </button>
  );
}
