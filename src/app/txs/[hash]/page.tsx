"use client";

import { div, h1 } from "framer-motion/client";
import { useEffect, useState } from "react";

type Transaction = {
  signerId: string;
  receiverId: string;
  transactionId: string;
};

export default function Page({ params }: { params: { hash: string } }) {
  const [txs, setTxs] = useState<Transaction[] | null>(null);

  const getTxData = async () => {
    try {
      const url = `https://events.intear.tech/query/tx_transaction?transaction_id=${params.hash}&pagination_by=Newest&limit=10`;
      fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          const allTxs = data.map((tx: any) => {
            return {
              signerId: tx.event.signer_id,
              receiverId: tx.event.receiver_id,
              hash: tx.event.transaction_id,
            };
          });
          console.log(allTxs);
          setTxs(allTxs);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTxData();
  }, []);

  return (
    <div>
      <h1>{params.hash}</h1>
      {txs && <div>{txs[0].signerId}</div>}
    </div>
  );
}
