"use client";
import { ExecutionOutcomeWithId } from "near-api-js/lib/providers";
import CopyButton from "./ui/CopyButton";
import { displayAction, displayGas } from "@/app/tx/[hash]/page";

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
