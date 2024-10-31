import TokenInfoCard from "./TokenInfoCard";

type PriceChanges = {
  fiveMinutes: string;
  oneHour: string;
  sixHours: string;
  twentyFourHours: string;
  sevenDays: string;
};

export default function TokenInfo({
  name,
  ticker,
  priceChanges,
  currentPriceUsd,
  currentPriceNear,
  circulatingSupply,
}: {
  name: string;
  ticker: string;
  priceChanges: PriceChanges;
  currentPriceUsd: string;
  currentPriceNear: string;
  circulatingSupply: string;
}) {
  const priceUsd = Number(currentPriceUsd.slice(0, 10));
  const priceUsdRounded = priceUsd.toFixed(6);
  return (
    <div className="flex flex-col justify-center">
      <div className="grid grid-cols-2 gap-2 w-96">
        <div className="col-span-2 text-xl py-2 text-center font-bold border-1 border-zinc-400 rounded-lg ">
          ${ticker}
        </div>
        <TokenInfoCard label="PRICE USD" value={`${priceUsdRounded}$`} />
        <TokenInfoCard
          label="PRICE NEAR"
          value={`${Number(currentPriceNear).toFixed(8)} NEAR`}
        />
        <div className="grid grid-cols-4 col-span-2 gap-2">
          <TokenInfoCard
            label="5 MIN"
            value={priceChanges.fiveMinutes}
            size="sm"
            textColor={
              priceChanges.fiveMinutes[0] === "-"
                ? "text-red-500"
                : "text-green-500"
            }
          />
          <TokenInfoCard
            label="1 HOUR"
            value={priceChanges.oneHour}
            size="sm"
            textColor={
              priceChanges.oneHour[0] === "-"
                ? "text-red-500"
                : "text-green-500"
            }
          />
          <TokenInfoCard
            label="6 HOURS"
            value={priceChanges.sixHours}
            size="sm"
            textColor={
              priceChanges.sixHours[0] === "-"
                ? "text-red-500"
                : "text-green-500"
            }
          />{" "}
          <TokenInfoCard
            label="24 HOURS"
            value={priceChanges.twentyFourHours}
            size="sm"
            textColor={
              priceChanges.twentyFourHours[0] === "-"
                ? "text-red-500"
                : "text-green-500"
            }
          />
        </div>
      </div>
    </div>
  );
}
