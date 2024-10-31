"use client";

import React, { useEffect, useState } from "react";

interface ConnectedAccount {
    accountId: string;
    privateKey: string;
}

export const WalletContext = React.createContext<[ConnectedAccount | null, React.Dispatch<React.SetStateAction<ConnectedAccount | null>>, boolean, React.Dispatch<React.SetStateAction<boolean>>]>([null, () => { }, false, () => { }]);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
    const [connectedAccount, setConnectedAccount] = useState<ConnectedAccount | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        setConnectedAccount(JSON.parse(localStorage.getItem("connectedAccount") ?? "null"));
    }, [])

    useEffect(() => {
        localStorage.setItem("connectedAccount", JSON.stringify(connectedAccount));
    }, [connectedAccount]);

    return (
        <WalletContext.Provider value={[connectedAccount, setConnectedAccount, isModalOpen, setModalOpen]}>
            {children}
        </WalletContext.Provider>
    );
};
