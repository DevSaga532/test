import React from 'react';
import { FlatList } from 'react-native';
import WebsokeItem from './WebsokeItem';


type CryptoData = {
  symbol: string;
  price: string;
  change: string;
};

type Props = {
  data: CryptoData[];
  onSelect: (item: CryptoData) => void;
};

const WebsokeList: React.FC<Props> = ({ data, onSelect }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.symbol}
      renderItem={({ item }) => <WebsokeItem item={item} onPress={() => onSelect(item)} />}
    />
  );
};

export default WebsokeList;
