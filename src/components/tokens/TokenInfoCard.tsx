export default function TokenInfoCard({
  label,
  value,
  size,
  textColor,
}: {
  label: string;
  value: string;
  size?: "lg" | "sm";
  textColor?: string;
}) {
  return (
    <div className="w-full h-full border-1 border-zinc-400 rounded-lg flex flex-col justify-center items-center pb-2">
      <div className={`flex-shrink-0 text-xs p-1 text-zinc-400`}>{label}</div>
      <div
        className={`flex-grow font-bold ${
          textColor ? textColor : "text-zinc-200"
        }  ${size === "sm" ? "text-sm" : ""}`}
      >
        {value}
      </div>
    </div>
  );
}
