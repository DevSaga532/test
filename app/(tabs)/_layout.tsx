import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="intercambio" />
      <Tabs.Screen name="earn" />
      <Tabs.Screen name="explore" />
    </Tabs>
  );
};

export default TabsLayout;
