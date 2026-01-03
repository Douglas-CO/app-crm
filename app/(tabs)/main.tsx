import { CustomScrollView } from "@/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useDebtEntries } from "../hooks";

// Asegúrate de tener el tipo correcto si lo necesitas en tu app
type DataItem = {
  id: number;
  nombre: string;
  code: string;
  value: number;
  color: string;
};

export default function MainPage() {
  const [dataBalance, setDataBalance] = useState<number | null>(null);
  const { data: dataDebt } = useDebtEntries({});

  useEffect(() => {
    const dataLocalStorage = async () => {
      const data = await AsyncStorage.getItem("data");

      if (data) {
        const parsed = JSON.parse(data);
        setDataBalance(Number(parsed?.balance_entry?.salary ?? 0));
      } else {
        setDataBalance(0);
      }
    };
    dataLocalStorage();
  }, []);

  const safeDataDebt = dataDebt ?? [];
  const safeDataBalance = dataBalance ?? 0;

  const totalDebt = safeDataDebt.reduce(
    (sum, item) => sum + Number(item.value ?? 0),
    0
  );

  const remainder = Math.max(safeDataBalance - totalDebt, 0);

  const codeColors: Record<string, string> = {
    HOUSE: "#4A90E2",
    COMMERCIAL_HOUSE: "#F5A623",
    REMAINDER: "#7ED321",
  };

  const ringData: DataItem[] = [
    ...safeDataDebt.map((item, index) => ({
      id: item.id ?? index, // asegura id numérico
      nombre: item.name,
      code: item.code,
      value: Number(item.value ?? 0),
      color: codeColors[item.code] || "#ccc",
    })),
    {
      id: 9999,
      nombre: "Resto",
      code: "REMAINDER",
      value: remainder,
      color: codeColors["REMAINDER"],
    },
  ];

  return (
    <CustomScrollView>
     hola
    </CustomScrollView>
  );
}
