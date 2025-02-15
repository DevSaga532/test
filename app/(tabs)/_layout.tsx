import TabBar from "@/components/ui/TabBar";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs 
     tabBar={(props) => <TabBar {...props} />}
    
    screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="porfolio" />
      <Tabs.Screen name="actions" />
      <Tabs.Screen name="prices" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
};

export default TabsLayout;
