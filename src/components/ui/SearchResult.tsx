import Link from "next/link";

type SearchResult = {
  id: string;
  display: React.ReactNode;
};

export default function SearchResult({
  header,
  results,
  link,
}: {
  header: string;
  results: SearchResult[];
  link: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="bg-zinc-600 rounded px-3 py-2 font-semibold">
        {header}
      </div>
      {results.map((token) => (
        <Link href={`${link}${token.id}`}>
          <div
            className="px-3 py-2 rounded hover:bg-zinc-700 text-sm"
            key={token.id}
          >
            {token.display}
          </div>
        </Link>
      ))}
    </div>
  );
}
