export type TransactionData = {
  event: {
    amount: number;
    block_height: string;
    block_timestamp_nanosec: number;
    memo: string;
    new_owner_id: string;
    old_owner_id: string;
    receipt_id: string;
    token_id: string;
    transaction_id: string;
  };
  id: number;
};

export type TradeTableRow = {
  id?: number;
  key: string;
  time: React.ReactNode;
  timestamp: number;
  type: string;
  fromAmount: string;
  swappedFor: string;
  price: string;
  maker: string;
  txn: React.ReactNode;
};

export type TokenMetadata = {
  name: string;
  symbol: string;
  decimals: number;
};
