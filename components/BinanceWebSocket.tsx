import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import WebsokeList from "./WebsokeList";
import { verticalScale } from "@/types/styling";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Typo } from "./Typo";

type CryptoData = {
  symbol: string;
  price: string;
  change: string;
  volume: string;
  marketCap: string;
};

const BinanceWebSocket: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

    ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      const filteredData: CryptoData[] = data.map((crypto: any) => ({
        symbol: crypto.s,
        price: parseFloat(crypto.c).toFixed(2),
        change: parseFloat(crypto.P).toFixed(2),
        volume: parseFloat(crypto.v).toFixed(2),
        marketCap: (parseFloat(crypto.c) * parseFloat(crypto.v)).toFixed(2),
      }));
      setCryptoData(filteredData);
    };

    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => console.log("WebSocket closed, reconnecting...");

    return () => ws.close();
  }, []);

  return (
    <Animated.View entering={FadeInDown.delay(100).springify().damping(14)}>
      <TouchableOpacity
        onPress={() => console.log("selectedCrypto", selectedCrypto)}
        activeOpacity={0.7}
        style={styles.row}
      >
        <View style={styles.categorieDes}>
          <Typo size={17} fontWeight={"500"} style={styles.amoutData}>
            {"Favorites"}
          </Typo>

          <WebsokeList
            data={cryptoData}
            onSelect={(item) => {
              setSelectedCrypto(item as CryptoData);
              setModalVisible(true);
            }}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  // row uso
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacingX._12,
    marginBottom: spacingY._12,
    backgroundColor: colors.neutral900,
    padding: spacingX._10,
    paddingHorizontal: spacingY._10,
    borderRadius: radius._17,
  },
  //uso  icon
  icon: {
    height: verticalScale(44),
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius._12,
    borderCurve: "continuous",
  },
  // uso
  categorieDes: {
    flex: 1,
    gap: 2.5,
  },
  // uso
  amoutData: {
    alignItems: "flex-end",
    gap: 3,
  },
});

export default BinanceWebSocket;
