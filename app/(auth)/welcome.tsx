import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Typo } from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { useRouter } from "expo-router";
import { Button } from "@/components/Button";
import { verticalScale } from "@/types/styling";
import { icons } from "@/constants/icons";
import { Ionicons } from "@expo/vector-icons";

const Welcome = () => {
  const router = useRouter();

  const FormCont = () => {
    router.push("/form");
  };

  const handleRegister = () => {
    router.push("/(auth)/register");
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* Login Button & Image */}
        <View>
          <TouchableOpacity
            onPress={FormCont}
            activeOpacity={0.7}
            style={styles.loginButton}
            accessibilityLabel="Iniciar sesión"
            accessibilityHint="Toca para iniciar sesión en tu cuenta"
          >
            <Ionicons
              name="logo-skype"
              size={verticalScale(30)}
              color={colors.neutral500}
            />
          </TouchableOpacity>
          <Animated.Image
            entering={FadeIn.duration(3000)}
            resizeMode="contain"
            source={icons.logo}
            style={styles.welcomeImage} // Corregido el nombre
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Animated.View
            entering={FadeInDown.duration(1000).springify().damping(14)}
            style={{ alignItems: "center" }}
          >
            <Typo fontWeight={"800"} size={30}>
              Master Your Wealth
            </Typo>
            <Typo fontWeight={"600"} size={20}>
              Seize Control of Your
            </Typo>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(2000)
              .delay(1000)
              .springify()
              .damping(12)}
            style={{
              alignItems: "center",
              marginVertical: 5,
              marginTop: spacingY._10,
            }} // Cambiado gap por marginVertical
          >
            <Typo size={17} color={colors.textLight}>
              Cryptocurrencies and
            </Typo>
            <Typo size={17} color={colors.textLight}>
              Navigate the Crypto World!
            </Typo>
          </Animated.View>

          {/* Button */}
          <Animated.View
            entering={FadeInDown.duration(2000)
              .delay(2000)
              .springify()
              .damping(12)}
            style={styles.buttonContainer}
          >
            <Button
              style={{ marginTop: spacingY._20 }}
              onPress={handleRegister}
            >
              <Typo fontWeight={"600"} size={22} color={colors.neutral600}>
                Get Started
              </Typo>
            </Button>
          </Animated.View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: spacingX._7,
  },
  welcomeImage: {
    // Corregido el nombre
    width: "90%",
    height: verticalScale(200),
    alignSelf: "center",
    marginTop: verticalScale(100),
  },
  loginButton: {
    alignSelf: "flex-end",
    marginRight: spacingX._20,
  },
  footer: {
    backgroundColor: colors.neutral900,
    alignItems: "center",
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(45),
    marginVertical: spacingY._30, // Cambiado gap por marginVertical
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: -15,
    },
    borderRadius: 40,
    shadowOpacity: 0.17,
    shadowRadius: 25,
    elevation: 10,
  },
  buttonContainer: {
    width: "80%",
    paddingHorizontal: spacingX._25,
  },
});

export default Welcome;
