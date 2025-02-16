import { RefreshControl } from "react-native";
import { useState } from "react";

const CustomRefreshControl = ({ onRefresh }: any) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    onRefresh();
    setTimeout(() => setRefreshing(false), 2000);
  };

  return <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />;
};

export default CustomRefreshControl;
