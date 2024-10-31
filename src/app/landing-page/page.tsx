"use client";
import SearchField from "@/components/SearchField";
import RubensSearchBar from "@/components/ui/RubensSearchBar";

export default function Page() {
  return (
    <div className="">
      <div className="text-5xl text-zinc-400 font-bold mt-32">
        For devs and degens alike
      </div>
      <div className="text-xl mt-4 font-semibold text-zinc-500">
        Because NEAR is for all of us
      </div>
      <div className="mt-24">
        <SearchField className="w-full text-white rounded-lg px-4 py-3 text-xl bg-zinc-800" />
      </div>
      <div>
        <RubensSearchBar />
      </div>
      <div className="grid mt-32 gap-6 grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div className="border border-zinc-600 h-48 bg-zinc-800 rounded-lg"></div>
        ))}
      </div>
    </div>
  );
}
