import { CryptoData } from "@/types/type";
import { useEffect, useMemo, useState } from "react";

export const useWebSocket = (binanceWebSocket: string) => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout;

    const connectWebSocket = () => {
      if (ws) ws.close(); // Cerrar conexiones previas
      ws = new WebSocket(binanceWebSocket);

      ws.onopen = () => console.log("WebSocket conectado");

      ws.onmessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);

        console.log("Datos recibidos:", data); // 👈 Agregar este log para depuración

        if (Array.isArray(data)) {
          setCryptoData(
            data.map((crypto: any) => ({
              symbol: crypto.s || crypto.symbol || "N/A", // 👈 Corrección aquí
              price: parseFloat(crypto.c).toFixed(2),
              change: parseFloat(crypto.P).toFixed(2),
              volume: parseFloat(crypto.v).toFixed(2),
              marketCap: (parseFloat(crypto.c) * parseFloat(crypto.v)).toFixed(2),
            }))
          );
        } else {
          console.warn("Formato inesperado de datos:", data);
        }
      };

      ws.onerror = (error) => console.error("WebSocket error:", error);

      ws.onclose = () => {
        console.log("WebSocket desconectado. Reintentando en 3 segundos...");
        reconnectTimeout = setTimeout(connectWebSocket, 3000);
      };
    };

    connectWebSocket();

    return () => {
      if (ws) ws.close();
      clearTimeout(reconnectTimeout);
    };
  }, [binanceWebSocket]);

  // Memoiza los datos para evitar renders innecesarios
  const memoizedCryptoData = useMemo(() => cryptoData, [cryptoData]);

  return {
    cryptoData: memoizedCryptoData,
    selectedCrypto,
    setSelectedCrypto,
    modalVisible,
    setModalVisible,
  };
};
