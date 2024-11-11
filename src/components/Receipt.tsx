"use client";
import { ExecutionOutcomeWithId } from "near-api-js/lib/providers";
import { ChevronDown, ChevronUp } from "lucide-react";
import CopyButton from "./ui/CopyButton";
import { Action, JsonView } from "./Action";
import { useState } from "react";

type LogData = {
  standard: string;
  version: string;
  event: string;
  data: any;
};

const LogEntry = ({ log }: { log: string }) => {
  if (!log.startsWith("EVENT_JSON:")) {
    return <div className="text-sm text-gray-300 py-1">{log}</div>;
  }

  try {
    const jsonStr = log.replace("EVENT_JSON:", "");
    const parsed = JSON.parse(jsonStr) as LogData;
    
    if (!parsed.standard || !parsed.version || !parsed.event || !parsed.data) {
      return <div className="text-sm text-gray-300 py-1">{log}</div>;
    }

    return (
      <JsonView 
        data={parsed} 
        copy={`EVENT_JSON:${JSON.stringify(parsed)}`} 
      />
    );
  } catch (e) {
    return <div className="text-sm text-gray-300 py-1">{log}</div>;
  }
};

const InfoRow = ({ label, value, copyable = false }: { 
  label: string; 
  value: string; 
  copyable?: boolean;
}) => (
  <div className="flex items-center space-x-2 py-2 border-b border-gray-100">
    <span className="text-gray-200 min-w-32">{label}:</span>
    <span className="font-mono text-sm">{value}</span>
    {copyable && <CopyButton text={value} />}
  </div>
);

const Section = ({ 
  title, 
  children, 
  defaultOpen = true 
}: { 
  title: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border rounded-lg shadow-sm mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-800"
      >
        <h3 className="font-medium text-gray-400">{title}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-100" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-100" />
        )}
      </button>
      {isOpen && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
};

export function displayGas(gas: number): React.ReactNode {
  const formatter = Intl.NumberFormat("en-US", {
    maximumFractionDigits: 3,
  });
  
  const value = gas < 1_000_000_000_000
    ? `${formatter.format(gas / 10 ** 9)} Ggas`
    : `${formatter.format(gas / 10 ** 12)} Tgas`;

  return (
    <div className="flex items-center space-x-2">
      <span>{value}</span>
      <CopyButton text={gas.toString()} />
    </div>
  );
}

export default function Receipt({ 
  outcome, 
  receipt 
}: {
  outcome: ExecutionOutcomeWithId;
  receipt: {
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
  } | undefined;
}) {
  if (receipt === undefined) {
    return (
      <div className="p-4 bg-red-700 text-red-200 rounded-lg">
        Error fetching receipt {outcome.id}
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-3xl">
      <Section title="Receipt Details">
        <InfoRow label="Receipt ID" value={outcome.id} copyable />
        <InfoRow label="Predecessor" value={receipt.predecessor_id} />
        <InfoRow label="Receiver" value={receipt.receiver_id} />
        <InfoRow 
          label="Block Hash" 
          value={(outcome as any)["block_hash"]} 
          copyable 
        />
      </Section>

      <Section title="Actions">
        <div className="space-y-2">
          {receipt.receipt.Action.actions.map((action: any, index: number) => (
            <Action key={index} action={action} />
          ))}
        </div>
      </Section>

      <Section title="Logs" defaultOpen={false}>
        <div className="rounded-lg p-4 font-mono">
          {outcome.outcome.logs.map((log: any, index: number) => (
            <LogEntry key={index} log={log} />
          ))}
        </div>
      </Section>

      <Section title="Gas Usage">
        <div className="font-mono">
          {displayGas(outcome.outcome.gas_burnt)}
        </div>
      </Section>
    </div>
  );
}