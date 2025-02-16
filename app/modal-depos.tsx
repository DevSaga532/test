import { StyleSheet, Text, View, Modal } from "react-native";
import React from "react";
import { useWallet } from "@/context/WalletContext";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Typo } from "@/components/Typo";

const ModalDepos = () => {
  const { deposit, balance } = useWallet();
  return (
    <ScreenWrapper>
      <Typo size={20}> {balance} </Typo>
    </ScreenWrapper>
  );
};

export default ModalDepos;

const styles = StyleSheet.create({});
