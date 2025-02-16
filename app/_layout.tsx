import { AuthProvider } from "@/context/authContext";
import { WalletProvider } from "@/context/WalletContext";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <WalletProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="modal-depos"
            options={{ presentation: "modal" }}
          />
        </Stack>
      </WalletProvider>
    </AuthProvider>
  );
}
