import { StyleSheet } from "react-native";

import ScreenWrapper from "@/components/ScreenWrapper";
import { Typo } from "@/components/Typo";
import { useWallet } from "@/context/contextWallet";

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
