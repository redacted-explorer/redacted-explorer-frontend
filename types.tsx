import React from "react";

export type TransactionData = {
  event: {
    block_height: number;
    block_timestamp_nanosec: number;
    nonce: number;
    priority_fee: number | null;
    public_key: string;
    signer_id: string;
    receiver_id: string;
    signature: string;
    transaction_id: string;
  };
  id: number;
};

export type TransactionTableRow = {
  id: number;
  transactionId: React.ReactNode;
  blockHeight: number;
  time: React.ReactNode;
  signer: React.ReactNode;
  receiver: React.ReactNode;
};

export type TokenTransferData = {
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

export type TokenTransferTableRow = {
  id: number;
  time: React.ReactNode;
  blockHeight: string;
  transfer: string;
  sender: React.ReactNode;
  receiver: React.ReactNode;
  amount: string;
  price: string;
  txn: React.ReactNode;
};

export type TradeTableRow = {
  id?: number;
  key: string;
  blockHeight: number;
  time: React.ReactNode;
  type: React.ReactNode;
  fromAmount: string;
  swappedFor: string;
  price: string;
  maker: React.ReactNode;
  txn: React.ReactNode;
};

export type PriceData = {
  price_usd: string;
  timestamp_nanosec: string;
  token: string;
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
