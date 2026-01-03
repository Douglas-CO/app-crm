import { LoadingOverlay } from "@/components";
import { CustomConfirmDialog } from "@/shared";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
import { LogBox } from "react-native"; // <--- Importa LogBox
import Toast from "react-native-toast-message";
import { LoginPages } from "./modules";

// Ignora todos los warnings
LogBox.ignoreAllLogs(true);

export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <LoginPages />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <LoadingOverlay />
        <Toast />
        <CustomConfirmDialog />
      </QueryClientProvider>
    </>
  );
}
