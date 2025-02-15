import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Typo } from "@/components/Typo";
import ScreenWrapper from "@/components/ScreenWrapper";

const Price = () => {
  return (
    <ScreenWrapper>
      <Typo size={20}>Prices </Typo>
    </ScreenWrapper>
  );
};

export default Price;

const styles = StyleSheet.create({});
