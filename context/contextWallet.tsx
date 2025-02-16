import { createOrUpdateWallet } from "@/services/walletService";
import React, { createContext, useContext, useState } from "react";

// Definir el tipo del contexto
interface WalletContextType {
  balance: number;
  deposit: (amount: number) => Promise<void>;
  withdraw: (amount: number) => Promise<void>;
}

// Crear el contexto
const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<number>(0);

  // Función para realizar el depósito
  const deposit = async (amount: number) => {
    try {
      const response = await createOrUpdateWallet({ amount });
      if (response.success) {
        setBalance(prevBalance => prevBalance + amount);
      } else {
        console.error("Error en el depósito:", response.msg);
      }
    } catch (error) {
      console.error("Error en la transacción:", error);
    }
  };

  // Función para realizar el retiro
  const withdraw = async (amount: number) => {
    try {
      if (amount > balance) {
        console.error("Fondos insuficientes");
        return;
      }

      const response = await createOrUpdateWallet({ amount: -amount }); // Se envía un valor negativo para retirar
      if (response.success) {
        setBalance(prevBalance => prevBalance - amount);
      } else {
        console.error("Error en el retiro:", response.msg);
      }
    } catch (error) {
      console.error("Error en la transacción:", error);
    }
  };

  return (
    <WalletContext.Provider value={{ balance, deposit, withdraw }}>
      {children}
    </WalletContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet debe usarse dentro de un WalletProvider");
  }
  return context;
};
