"use client";

import Receipt from "@/components/Receipt";
import TableElementAccountId from "@/components/tables/ui-tables/TableElementAccountId";
import CopyButton from "@/components/ui/CopyButton";
import { getNear } from "@/utils";
import { utils } from "near-api-js";
import { ExecutionOutcomeWithId, FinalExecutionOutcome } from "near-api-js/lib/providers";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { hash: string } }) {
  const [tx, setTx] = useState<FinalExecutionOutcome | null>(null);

  const updateTxData = async () => {
    try {
      const near = await getNear();
      const txData = await near.connection.provider.txStatusReceipts(params.hash, "root.near", "NONE");
      setTx(txData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateTxData();
  }, []);

  return (
    <div>
      {tx !== null ? <div>
        <div>Finality: {tx.final_execution_status} (TODO icon)</div>
        <div>Actions:
          <ol>
            {tx.transaction.actions.map((action: any) => <li>{displayAction(action)}</li>)}
          </ol>
        </div>
        <div className="flex">Gas: {displayGas(tx.transaction_outcome.outcome.gas_burnt)}</div>
        <div className="flex">
          Signer: <TableElementAccountId accountId={tx.transaction.signer_id} />
        </div>
        <div className="flex">
          Receiver: <TableElementAccountId accountId={tx.transaction.receiver_id} />
        </div>
        <div className="flex">
          Signed with key: {tx.transaction.public_key} <CopyButton text={tx.transaction.public_key} />
        </div>
        <div className="flex">
          Nonce: {tx.transaction.nonce} <CopyButton text={tx.transaction.nonce.toString()} />
        </div>
        <div className="flex">
          Signature: {tx.transaction.signature} <CopyButton text={tx.transaction.signature} />
        </div>

        <h2 className="mt-4 font-bold">Receipts</h2>
        <ol>
          {tx.receipts_outcome.map((outcome: ExecutionOutcomeWithId) => <li>
            <Receipt outcome={outcome} receipt={tx.receipts?.find((receipt) => receipt.receipt_id === outcome.id)} />
          </li>)}
        </ol>
      </div> : <div>Loading...</div>}
    </div>
  );
}

export function displayAction(action: any): React.ReactNode {
  if (action["Delegate"]) {
    return <div>
      <div>Delegate:</div>
      <ol>
        {action["Delegate"]["delegate_action"]["actions"].map((action: any) => <li>{displayAction(action)}</li>)}
      </ol>
    </div>;
  } else if (action["FunctionCall"]) {
    return <div className="flex">
      Call {action["FunctionCall"]["method_name"]}
      <CopyButton text={action["FunctionCall"]["method_name"]} />
      {" "}
      with args
      {JSON.stringify(JSON.parse(atob(action["FunctionCall"]["args"])), null, 4)}
      <CopyButton text={atob(action["FunctionCall"]["args"])} />
    </div>;
  } else if (action["Transfer"]) {
    return <div className="flex">
      Transfer {utils.format.formatNearAmount(action["Transfer"]["deposit"])} NEAR
      <CopyButton text={action["Transfer"]["deposit"]} />
    </div>;
  } else {
    return JSON.stringify(action);
  }
}

export function displayGas(gas: number): React.ReactNode {
  const formatter = Intl.NumberFormat("en-US", {
    maximumFractionDigits: 3,
  });
  if (gas < 1_000_000_000_000) {
    return <div className="flex">{formatter.format(gas / 10 ** 9)} Ggas <CopyButton text={gas.toString()} /></div>;
  } else {
    return <div className="flex">{formatter.format(gas / 10 ** 12)} Tgas <CopyButton text={gas.toString()} /></div>;
  }
}
