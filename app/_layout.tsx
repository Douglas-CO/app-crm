import { LoadingOverlay } from "@/components";
import { CustomConfirmDialog } from "@/shared";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
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
