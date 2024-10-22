export type TransactionData = {
  event: {
    0?: any;
    block_height: number;
    block_timestamp_nanosec: string;
    nonce: number;
    priority_fee: number | null;
    public_key: string;
    new_owner_id: string;
    old_owner_id: string;
    signature: string;
    signer_id: string;
    transaction_id: string;
  };
  id: number;
};

export type TransactionTableRow = {
  id: number;
  transactionId: string;
  blockHeight: number;
  time: React.ReactNode;
  receiver: string;
};

export type TokenTransferData = {
  event: {
    amount: number;
    block_height: string;
    block_timestamp_nanosec: string;
    memo: string;
    new_owner_id: string;
    old_owner_id: string;
    receipt_id: string;
    token_id: string;
    transaction_id: string;
  };
  id: number;
};

export type TokenTransferTableRow = {
  id: number;
  time: string;
  transfer: string;
  sender: string;
  receiver: string;
  amount: string;
  price: string;
  txn: React.ReactNode;
};

export type TradeTableRow = {
  id?: number;
  key: string;
  time: React.ReactNode;
  timestamp: number;
  type: React.ReactNode;
  fromAmount: string;
  swappedFor: string;
  price: string;
  maker: string;
  txn: React.ReactNode;
};

export type TokenData = {
  account_id: string;
  circulating_supply: string;
  circulating_supply_excluding_team: string;
  total_supply: string;
  deleted: boolean;
  main_pool: string;
  price_usd: string;
  price_usd_raw: string;
  reputation: string;
  metadata: TokenMetadata;
};

export type TokenMetadata = {
  name: string;
  symbol: string;
  decimals: number;
};
