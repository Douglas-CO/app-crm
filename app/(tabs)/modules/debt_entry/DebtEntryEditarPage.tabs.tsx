import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useCallback, useState } from "react";
import { View } from "react-native";

import { getDebtEntry } from "@/app/actions";
import { SaveDebtEntry } from "@/app/modules";
import { ROUTER_PATHS } from "@/app/routes";
import { CustomScrollView, LoadingSpinner } from "@/components";

const returnUrlDebtEntryEditarPage = ROUTER_PATHS.debt_entry;

const DebtEntryEditarPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        if (id) {
          setIsLoading(true);
          const parsedId = parseInt(id, 10);
          const { data } = await getDebtEntry(parsedId);
          setData(data);
          setIsLoading(false);
        }
      };
      fetchData();
    }, [id])
  );

  if (isLoading)
    return (
      <View>
        <CustomScrollView>
          <LoadingSpinner message="Cargando entrada de deuda..." />
        </CustomScrollView>
      </View>
    );

  if (!data?.id) {
    navigation.navigate(returnUrlDebtEntryEditarPage.debtentry as never);
    return null;
  }

  return (
    <View>
      <CustomScrollView>
        <SaveDebtEntry title="Actualizar" debt_entry={data} />
      </CustomScrollView>
    </View>
  );
};

export default DebtEntryEditarPage;
