"use client";
import { ExecutionOutcomeWithId } from "near-api-js/lib/providers";
import CopyButton from "./ui/CopyButton";
import { utils } from "near-api-js";

export default function Receipt({ outcome, receipt }: {
    outcome: ExecutionOutcomeWithId, receipt: {
        predecessor_id: string;
        receipt: {
            Action: {
                actions: any[];
                gas_price: string;
                input_data_ids: string[];
                output_data_receivers: string[];
                signer_id: string;
                signer_public_key: string;
            };
        };
        receipt_id: string;
        receiver_id: string;
    } | undefined
}) {
    if (receipt === undefined) return <div>Error fetching receipt {outcome.id}</div>;
    return <div>
        <div className="flex">Receipt: {outcome.id} <CopyButton text={outcome.id} /></div>
        <div className="flex">Predecessor: {receipt.predecessor_id}</div>
        <div className="flex">Receiver: {receipt.receiver_id}</div>
        <div className="flex">Block Hash: {(outcome as any)["block_hash"]} <CopyButton text={(outcome as any)["block_hash"]} /></div>
        <div className="flex">Actions:
            <ol>
                {receipt.receipt.Action.actions.map((action: any) => <li>{displayAction(action)}</li>)}
                <hr />
            </ol>
        </div>
        <div>
            Logs
            <pre>
                {outcome.outcome.logs.map((log: any) => <div>{log}</div>)}
            </pre>
        </div>
        <div className="flex">
            Gas burnt: {displayGas(outcome.outcome.gas_burnt)}
        </div>
    </div>;
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
