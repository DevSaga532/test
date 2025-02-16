import { radius } from "@/constants/theme";
import { verticalScale } from "@/types/styling";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Typo } from "./Typo";

type CryptoData = {
  symbol: string;
  price: string;
  priceSmall: string;
  change: string;

};

type Props = {
  item: CryptoData;

  onPress: () => void;
};

const WebsokeItem: React.FC<Props> = ({ item, onPress }) => {
  const isPositive = parseFloat(item.change) >= 0;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.listItem}>
        {/* Símbolo de la criptomoneda */}
        <View style={styles.symbolContainer}>
          <Typo size={14} fontWeight="500">{item.symbol}</Typo>
        </View>

        {/* Precio principal con versión pequeña debajo */}
        <View style={styles.priceContainer}>
          <Typo size={16} fontWeight="600">{item.price}</Typo>
          <Typo size={12} color="gray">${item.priceSmall}</Typo>
        </View>

        {/* Cambio de precio en 24h con fondo de color */}
        <View style={[styles.changeBox, isPositive ? styles.positive : styles.negative]}>
          <Typo size={12} color="white">{item.change}%</Typo>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#222",
  },
  symbolContainer: {
    flex: 1,
  },
  priceContainer: {
    alignItems: "flex-end",
    marginRight: 20,
    flex: 1,
  },
  changeBox: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: radius._12,
  },
  positive: {
    backgroundColor: "green",
  },
  negative: {
    backgroundColor: "red",
  },
});

export default WebsokeItem;
