import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { Link } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";
import { Typo } from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";

import { BackButton } from "@/components/BackButton";
import Input from "@/components/Input";
import * as Icons from "phosphor-react-native";

import { useAuth } from "@/context/authContext";
import { verticalScale } from "@/types/styling";
import { Button } from "@/components/Button";
const Login = () => {
  const { login: loginUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Please fill all the fields");
      return;
    }

    // Validación básica de correo
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const res = await loginUser(email, password);
      if (!res.success) {
        Alert.alert("Login", res.msg);
      }
    } catch (error) {
      Alert.alert("Login", "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      {/* Oculta el teclado al tocar fuera */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <BackButton iconSize={28} />

              <View style={{ gap: 5, marginTop: spacingY._20 }}>
                <Typo size={30} fontWeight={"800"}>
                  Hey,
                </Typo>
                <Typo size={30} fontWeight={"800"}>
                  Welcome Back
                </Typo>
              </View>

              {/* Formulario */}
              <View style={styles.form}>
                <Typo size={16} color={colors.textLight} fontWeight={"500"}>
                  Login now to wallet all your expenses
                </Typo>

                {/* Inputs */}
                <Input
                  onChangeText={setEmail}
                  placeholder="Email"
                  icon={<Icons.At
                    weight="fill"
                    size={verticalScale(26)}
                    color={colors.neutral300} />}
                  accessibilityLabel="Correo electrónico"
                  accessibilityHint="Introduce tu correo electrónico" rightIcon={undefined}                />
                <Input
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholder="Password"
                  icon={<Icons.Lock
                    weight="fill"
                    size={verticalScale(26)}
                    color={colors.neutral300} />}
                  accessibilityLabel="Contraseña"
                  accessibilityHint="Introduce tu contraseña" rightIcon={undefined}                />

                <Link href={"/"} style={styles.forgotPassword}>
                  <Typo size={14} color={colors.text}>
                    Forgot Password
                  </Typo>
                </Link>

                {/* Botón */}
                <Button loading={isLoading} onPress={handleSubmit}>
                  <Typo size={21} fontWeight={"700"} color={colors.black}>
                    Login
                  </Typo>
                </Button>
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Typo size={14} color={colors.text}>
                  Don't have an account?
                </Typo>
                <Link href={"/register"} style={styles.footerText}>
                  <Typo fontWeight={"700"} size={15} color={colors.primary}>
                    Sign Up
                  </Typo>
                </Link>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center", // Centra los inputs
    paddingBottom: 10, // Espacio para el teclado
  },
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  form: {
    gap: spacingY._20,
  },
  forgotPassword: {
    textAlign: "right",
    color: colors.text,
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: colors.text,
    fontSize: verticalScale(15),
  },
});

export default Login;
