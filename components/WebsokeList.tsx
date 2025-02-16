import React, { useState } from "react";
import { FlatList, Modal, View, Text, Button } from "react-native";
import WebsokeItem from "./WebsokeItem";
import { router } from "expo-router";
import ModalDepos from "@/app/modal-depos";

type CryptoData = {
  symbol: string;
  price: string;
  change: string;
  priceSmall: string;
};

type Props = {
  data: CryptoData[];
  onSelect: (item: CryptoData) => void;
};

const WebsokeList: React.FC<Props> = ({ data }) => {
  const [selectedItem, setSelectedItem] = useState<CryptoData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Función para manejar la selección
  const handleSelect = (item: CryptoData) => {
    setSelectedItem(item); // Guarda el ítem seleccionado
    router.push("/modal-depos");
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => (
          <WebsokeItem item={item} onPress={() => handleSelect(item)} />
        )}
      />
    
    </View>
  );
};

export default WebsokeList;
