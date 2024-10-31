"use client";
import SearchBar from "@/components/ui/SearchBar";

export default function Page() {
  return (
    <div className="">
      <div className="text-5xl text-zinc-400 font-bold mt-24">
        For devs and degens alike
      </div>
      <div className="text-xl mt-4 font-semibold text-zinc-500">
        Because NEAR is for all of us
      </div>
      <div className="mt-24">
        <SearchBar />
      </div>
      <div className="grid mt-32 gap-6 grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={1}
            className="border border-zinc-600 h-48 bg-zinc-800 rounded-lg"
          ></div>
        ))}
      </div>
    </div>
  );
}
