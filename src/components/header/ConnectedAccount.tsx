"use client";

import "@solana/wallet-adapter-react-ui/styles.css";
import React, { useState } from "react";
import {
    useWallet,
} from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { KeyPair } from "near-api-js";
import { WalletContext } from "../Wallet";
import CopyButton from "../ui/CopyButton";

export default function ConnectedAccount() {
    const solana = useWallet();
    const [connectedAccount, setConnectedAccount, isModalOpen, setModalOpen] = React.useContext(WalletContext);
    const [isLoading, setIsLoading] = useState(false);
    console.log(solana, connectedAccount)

    function logInWithSolana() {
        const keyPair = KeyPair.fromRandom("ED25519");
        const name = solana.publicKey!.toString().slice(0, 46).toLowerCase();
        const recoveryKey = solana.publicKey!.toBuffer();
        solana.signMessage!(Buffer.from(`I want to log in to [REDACTED] Explorer and add key ${keyPair.getPublicKey().toString()} for quick trading without confirmation in wallet`)).then((signature) => {
            console.log(signature);
            setIsLoading(true);
            fetch("https://recoverable-accounts-relay.intear.tech/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    recovery_chain_type: "Solana",
                    recovery_key: [...recoveryKey],
                    public_key: keyPair.getPublicKey().toString(),
                    signature: [...signature],
                    name,
                }),
            }).then(res => res.json()).then(res => {
                setIsLoading(false);
                if (res.error) {
                    console.error("Error creating recoverable account", res.error);
                }
                if (res.account_id) {
                    setConnectedAccount({
                        accountId: res.account_id,
                        privateKey: (keyPair as any).extendedSecretKey,
                    })
                    setModalOpen(false);
                }
            })
        });
    }

    return (
        <div>
            <button className="bg-near-green-200 text-black px-4 py-1 rounded-full hover:bg-near-green-300 hover:text-black" onClick={() => setModalOpen(!isModalOpen)}>
                {
                    connectedAccount === null ? ((solana.connected) ? "Log In" : "Connect") : connectedAccount.accountId
                }
            </button>
            {isModalOpen && (
                <div className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-75 transition-opacity" aria-hidden="true" onClick={() => setModalOpen(false)}></div>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden z-50 min-w-[300px] min-h-[350px] max-h-[80%] max-w-xl max-h-xl">
                        <div className="bg-near-green-200 text-black w-full min-h-[350px] h-full p-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold">{connectedAccount === null ? "Connect Wallet" : "Connected Account"}</h2>
                                <button className="text-black hover:text-near-green-700 focus:outline-none" onClick={() => setModalOpen(!isModalOpen)}>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>
                            {connectedAccount === null && <div className="mt-4">
                                <WalletMultiButton>Solana</WalletMultiButton>
                            </div>}
                            {connectedAccount === null && !solana.connected && connectedAccount === null && <div className="mt-4">
                                <button className="bg-[#512da8] text-white flex items-center font-['DM_Sans'] text-[16px] font-bold h-[48px] leading-[48px] px-[24px] border-r-[4px]">Ethereum</button>
                            </div>}
                            {connectedAccount === null && !solana.connected && connectedAccount === null && <div className="mt-4">
                                <button className="bg-[#512da8] text-white flex items-center font-['DM_Sans'] text-[16px] font-bold h-[48px] leading-[48px] px-[24px] border-r-[4px]">NEAR</button>
                            </div>}
                            {solana.connected && connectedAccount === null && !isLoading && (
                                <div className="mt-4">
                                    <button className="bg-near-green-200 text-black px-4 py-2 rounded-full hover:bg-near-green-300 hover:text-black" onClick={logInWithSolana}>
                                        Log In
                                    </button>
                                </div>
                            )}
                            {isLoading && "Loading..."}
                            {connectedAccount !== null && (
                                <div>
                                    <div className="mt-4">
                                        {connectedAccount.accountId}
                                        <CopyButton text={connectedAccount.accountId} />
                                    </div>
                                    <div className="mt-4">
                                        <button className="bg-near-green-200 text-black px-4 py-2 rounded-full hover:bg-near-green-300 hover:text-black" onClick={() => setConnectedAccount(null)}>
                                            Disconnect
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
