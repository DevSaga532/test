import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import * as Icons from "phosphor-react-native";
import { Typo } from "./Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { img } from "@/constants/img";
import { scale, verticalScale } from "@/types/styling";
import { useRouter } from "expo-router";
import { useWallet } from "@/context/WalletContext";

export const HomeCards = () => {
  const { balance, deposit } = useWallet();
  const route = useRouter();
  const handledDeposit = () => {
    route.push("/modal-depos");
  };
  const handledArrowUp = () => {
    console.log("Pressed up");
  };
  return (
    <ImageBackground
      source={img.card}
      resizeMode="stretch"
      style={styles.bgImage}
    >
      <View style={styles.container}>
        {/* Total Balance */}
        <View>
          <View style={styles.totalBalance}>
            <Typo color={colors.neutral800} size={17} fontWeight={"500"}>
              {" "}
              Total Balance (USDT) ^
            </Typo>
            <Icons.DotsThreeOutline
              size={verticalScale(23)}
              color={colors.black}
              weight="fill"
            />
          </View>
          <Typo
            style={{ marginTop: verticalScale(5) }}
            color={colors.black}
            size={30}
            fontWeight={"bold"}
          >
            $ {balance}
          </Typo>
        </View>
        {/* total  expenses and icome */}
        <View style={styles.stats}>
          {/* income */}
          <View style={{ gap: verticalScale(5) }}>
            <Pressable onPress={handledDeposit} style={styles.incomeExpense}>
              <View style={styles.statsIcons}>
                <Icons.ArrowDown
                  size={verticalScale(15)}
                  color={colors.black}
                  weight="bold"
                />
              </View>
              <Typo fontWeight={"500"} color={colors.neutral700} size={17}>
                Deposit
              </Typo>
            </Pressable>
            <View style={{ alignSelf: "center" }}>
              <Typo fontWeight={"600"} color={colors.green} size={17}>
                {" "}
                $ 2342
              </Typo>
            </View>
          </View>
          {/* expenses */}
          <View style={{ gap: verticalScale(5) }}>
            <Pressable onPress={handledArrowUp} style={styles.incomeExpense}>
              <View style={styles.statsIcons}>
                <Icons.ArrowUp
                  size={verticalScale(15)}
                  color={colors.black}
                  weight="bold"
                />
              </View>
              <Typo fontWeight={"500"} color={colors.neutral700} size={17}>
                Withdraw
              </Typo>
            </Pressable>
            <View style={{ alignSelf: "center" }}>
              <Typo fontWeight={"600"} color={colors.rose} size={17}>
                {" "}
                $ 1234
              </Typo>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    height: scale(200),
    width: "100%",
    marginTop: spacingY._20,
  },
  container: {
    height: "85%",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: scale(23),
    padding: spacingX._15,
  },
  totalBalance: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacingY._7,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsIcons: {
    backgroundColor: colors.neutral350,
    padding: spacingY._5,
    borderRadius: 50,
  },
  incomeExpense: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingY._7,
  },
});
