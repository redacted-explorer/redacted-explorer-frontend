"use client";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useState } from "react";

export default function HeaderMenuDropdown({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  const [hidden, setHidden] = useState(true);
  return (
    <div>
      <div>
        <button
          className="flex justify-between py-2 hover:text-slate-500 w-full"
          onClick={() => {
            setHidden((prev) => !prev);
          }}
        >
          {text}
          {hidden ? <FaAngleDown /> : <FaAngleUp />}
        </button>
      </div>
      <div className="border-l-2 border-black pl-2">{!hidden && children}</div>
    </div>
  );
}
