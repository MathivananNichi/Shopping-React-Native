import "reflect-metadata";
import "./src/di/container";
import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import "./src/localization/i18n";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { Provider } from "react-redux";
import { persistor, store } from "./src/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppToastContainer } from "./src/components/AppToast";
import Config from "react-native-config";
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    console.log("========== FLAVOR CONFIG ==========");
    console.log("API_URL:", Config.API_URL);
    console.log("API_KEY:", Config.API_KEY);
    console.log("All Config:", JSON.stringify(Config, null, 2));
    console.log("===================================");
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          {/* PersistGate waits for SecureStore to load: replaces the old hasHydrated flag */}
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
      <AppToastContainer />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
