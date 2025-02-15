import { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Icons from "@expo/vector-icons";
import Input from "@/components/Input";
import { authFormSchema } from "@/constants";
import { signIn, signUp } from "@/constants/user-action";
import { Typo } from "./Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { Button } from "./Button";
import { verticalScale } from "@/types/styling";

const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = authFormSchema(type);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:
      type === "sign-up"
        ? { username: "", email: "", password: "" }
        : { email: "", password: "" },
  });

  const onSubmit = async (data: {
    username?: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      if (type === "sign-up") {
        await signUp(data.username!, data.email, data.password);
      } else {
        const response = await signIn(data.email, data.password);
        if (response) router.push("/");
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Typo style={{ textAlign: "center", marginBottom: spacingY._20 }} size={30} fontWeight={"800"}>
            {type === "sign-in" ? "Login" : "Register"}
          </Typo>

          {errorMessage ? <Typo color={colors.rose}>{errorMessage}</Typo> : null}

          <View style={styles.form}>
            {type === "sign-up" && (
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, value } }) => (
                  <Input
                    icon={<Icons.MaterialCommunityIcons name="account" size={verticalScale(26)} color={colors.neutral300} />}
                    placeholder="Username"
                    value={value}
                    onChangeText={onChange} rightIcon={undefined}                  />
                )}
              />
            )}

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  icon={<Icons.MaterialCommunityIcons name="email" size={verticalScale(26)} color={colors.neutral300} />}
                  placeholder="Email"
                  value={value}
                  onChangeText={onChange} rightIcon={undefined}                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  icon={<Icons.MaterialCommunityIcons name="lock" size={verticalScale(26)} color={colors.neutral300} />}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={value}
                  onChangeText={onChange}
                  rightIcon={
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Icons.MaterialCommunityIcons name={showPassword ? "eye" : "eye-off"} size={verticalScale(26)} color={colors.neutral300} />
                    </TouchableOpacity>
                  }
                />
              )}
            />
          </View>

          <Button onPress={handleSubmit(onSubmit)} loading={isLoading}>
            <Typo size={18} fontWeight={"600"}>{type === "sign-in" ? "Sign In" : "Sign Up"}</Typo>
          </Button>

          <View style={styles.footer}>
            <Typo size={14} color={colors.text}>
              {type === "sign-in" ? "Don't have an account?" : "Already have an account?"}
            </Typo>
            <Link href={type === "sign-in" ? "/register" : "/login"} style={styles.footerText}>
              <Typo fontWeight={"700"} size={15} color={colors.primary}>
                {type === "sign-in" ? "Register" : "Login"}
              </Typo>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  container: {
    flex: 1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20,
  },
  form: {
    gap: spacingY._20,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    fontSize: verticalScale(15),
  },
});
