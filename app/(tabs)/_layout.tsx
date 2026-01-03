import { usePathname, useRouter } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { InputTextField } from "@/components";
import { usePaletteStore } from "@/store/usePaletteStore";
import { Ionicons } from "@expo/vector-icons";
import { modules } from "../routes";
import { useLayoutStyles } from "./tabs.style";

function CustomDrawerContent(props: any) {
  const router = useRouter();
  const pathname = usePathname();

  const LayoutStyles = useLayoutStyles();
  const { selectedPalette } = usePaletteStore();

  // Configurar react-hook-form
  const { control, setValue } = useForm({
    defaultValues: {
      search: "",
    },
  });

  // Observar cambios en el campo de búsqueda
  const searchValue = useWatch({
    control,
    name: "search",
  });

  // Filtrar módulos basado en el texto de búsqueda
  const filteredModules = modules.filter((module) =>
    module.title.toLowerCase().includes((searchValue || "").toLowerCase())
  );

  const handleModulePress = (route: string) => {
    router.push(route as any);
    // Cerrar el drawer después de navegar
    props.navigation.closeDrawer();
  };

  const handleClearSearch = () => {
    setValue("search", "");
  };

  const isActiveRoute = (route: string) => {
    if (route === "/" && pathname === "/") return true;
    if (route !== "/" && pathname.startsWith(route)) return true;
    return false;
  };

  return (
    <SafeAreaView style={LayoutStyles.drawerContainer}>
      <View style={LayoutStyles.drawerHeader}>
        <Text style={LayoutStyles.drawerTitle}>Mi App</Text>
      </View>

      <View style={LayoutStyles.searchContainer}>
        <InputTextField
          name="search"
          control={control}
          placeholder="Buscar módulos..."
          onSearch={true}
          onClear={handleClearSearch}
        />
      </View>
      <ScrollView style={LayoutStyles.modulesList}>
        {filteredModules.length > 0 ? (
          filteredModules.map((module) => (
            <TouchableOpacity
              key={module.name}
              style={[
                LayoutStyles.moduleItem,
                isActiveRoute(module.route) && LayoutStyles.activeModuleItem,
              ]}
              onPress={() => handleModulePress(module.route)}
            >
              <Ionicons
                name={module.icon as any}
                size={24}
                color={
                  isActiveRoute(module.route)
                    ? selectedPalette.additional_second
                    : selectedPalette.additional_first
                }
              />
              <Text
                style={[
                  LayoutStyles.moduleText,
                  isActiveRoute(module.route)
                    ? LayoutStyles.activeModuleText
                    : LayoutStyles.activeModuleText2,
                ]}
              >
                {module.title}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <View style={LayoutStyles.noResultsContainer}>
            <Ionicons name="search" size={48} color={selectedPalette.additional_third} />
            <Text style={LayoutStyles.noResultsText}>
              No se encontraron módulos para {searchValue}
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={LayoutStyles.drawerFooter}>
        <Text style={LayoutStyles.footerText}>Versión 1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}

export default function DrawerLayout() {
  const { selectedPalette } = usePaletteStore();
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitle: "",
        headerStyle: {
          backgroundColor: selectedPalette.primary,
        },
        headerTintColor: selectedPalette.additional_third,
        drawerStyle: {
          width: 280,
        },
      }}
    >
      <Drawer.Screen
        name="main"
        options={{
          title: "Inicio",
          headerTitle: "Inicio",
        }}
      />
      <Drawer.Screen
        name="index"
        options={{
          title: "Salario",
          headerTitle: "Salario",
        }}
      />
      <Drawer.Screen
        name="deuda"
        options={{
          title: "Deuda",
          headerTitle: "Deuda",
        }}
      />
      <Drawer.Screen
        name="configuracion"
        options={{
          title: "Configuración",
          headerTitle: "Configuración",
        }}
      />
    </Drawer>
  );
}
