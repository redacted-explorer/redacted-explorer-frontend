"use client";
import { useEffect, useState } from "react";
import { ExecutionOutcomeWithId, FinalExecutionOutcome } from "near-api-js/lib/providers";
import Receipt, { displayGas } from "@/components/Receipt";
import TableElementAccountId from "@/components/tables/ui-tables/TableElementAccountId";
import CopyButton from "@/components/ui/CopyButton";
import { getNear } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ChevronDown, ChevronRight, Clock } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Action } from "@/components/Action";

const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "successvalue":
        return "bg-green-100 text-green-800";
      case "failure":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

const InfoRow = ({ label, value, copyable = false, tooltip = "" }: { label: string, value: React.ReactNode, copyable?: boolean, tooltip?: string }) => {
  const content = (
    <div className="flex items-center gap-2 py-2">
      <span className="text-gray-500 min-w-32">{label}:</span>
      <span className="font-mono text-sm break-all">{value}</span>
      {copyable && <CopyButton text={value?.toString() ?? ""} />}
    </div>
  );

  return tooltip ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    content
  );
};

const TransactionActions = ({ actions }: { actions: any[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex items-center gap-2 w-full py-2 hover:bg-gray-800 rounded">
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        <span className="font-medium">Actions ({actions.length})</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pl-6 mt-2 space-y-2">
          {actions.map((action: any, index: number) => (
            <div key={index} className="p-2 rounded">
              <Action action={action} />
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default function Page({ params }: { params: { hash: string } }) {
  const [tx, setTx] = useState<FinalExecutionOutcome | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateTxData = async () => {
    try {
      const near = await getNear();
      const txData = await near.connection.provider.txStatusReceipts(
        params.hash,
        "root.near",
        "NONE"
      );
      setTx(txData);
    } catch (error) {
      setError("Failed to load transaction data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateTxData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <Clock className="w-6 h-6 text-near-green animate-spin" />
        <span className="ml-2">Loading transaction details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!tx) return null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Transaction Details</span>
            <StatusBadge status={tx.final_execution_status} />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoRow
              label="Signer"
              value={<TableElementAccountId accountId={tx.transaction.signer_id} />}
            />
            <InfoRow
              label="Receiver"
              value={<TableElementAccountId accountId={tx.transaction.receiver_id} />}
            />
          </div>

          <InfoRow
            label="Gas Used"
            value={displayGas(tx.transaction_outcome.outcome.gas_burnt)}
            tooltip="Total amount of gas used in the transaction"
          />

          <TransactionActions actions={tx.transaction.actions} />

          <Collapsible>
            <CollapsibleTrigger className="flex items-center gap-2 w-full py-2 hover:bg-gray-800 rounded">
              <ChevronRight className="w-4 h-4" />
              <span className="font-medium">Technical Details</span>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mt-2">
              <InfoRow
                label="Public Key"
                value={tx.transaction.public_key}
                copyable
                tooltip="Public key used to sign the transaction"
              />
              <InfoRow
                label="Nonce"
                value={tx.transaction.nonce}
                copyable
                tooltip="Unique number to ensure transaction uniqueness"
              />
              <InfoRow
                label="Signature"
                value={tx.transaction.signature}
                copyable
                tooltip="Cryptographic signature of the transaction"
              />
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Receipts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tx.receipts_outcome.map((outcome: ExecutionOutcomeWithId, index) => (
              <Card key={index}>
                <CardContent className="pt-4">
                  <Receipt
                    outcome={outcome}
                    receipt={tx.receipts?.find(
                      (receipt) => receipt.receipt_id === outcome.id
                    )}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
