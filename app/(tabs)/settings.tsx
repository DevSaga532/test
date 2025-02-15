import { StyleSheet, Text, View } from "react-native";

import ScreenWrapper from "@/components/ScreenWrapper";
import { Typo } from "@/components/Typo";

const Settings = () => {
  return (
    <ScreenWrapper>
      <Typo size={20}>Settings</Typo>
    </ScreenWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({});
