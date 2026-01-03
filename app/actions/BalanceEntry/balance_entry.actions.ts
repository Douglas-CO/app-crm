import { BalanceEntry } from "@/app/interfaces";
import { useUiStore } from "@/store/useUiStore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";

export type GetBalanceEntryParams = Partial<BalanceEntry>;
export type CreateBalanceEntryParams<T> = T;
export type CreateBalanceEntryParamsBase = Omit<BalanceEntry, 'id'>;
export interface UpdateBalanceEntryParams<T> {
    id: number;
    data: T;
}

export const getBalanceEntrys = async () => {
    const ingresoStr = await AsyncStorage.getItem('data');
    if (ingresoStr) {
        const ingresoObj = JSON.parse(ingresoStr);
       return ingresoObj.balance_entry;
    }
};

export const getBalanceEntry = async (id: string) => {
    try {
        return console.log(id);
    } catch (error) {
        Toast.show({
            type: 'error',
            text1: 'Nah ha',
        })
    }
};
export const createBalanceEntry = async <T extends object>(data: T) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);
  try {
    if (!data || typeof data !== 'object') {
      throw new Error('Datos inválidos para balance_entry');
    }
    const nuevoObjeto = { balance_entry: data };
    await AsyncStorage.setItem('data', JSON.stringify(nuevoObjeto));
    Toast.show({
      type: "success",
      text1: "Se creó el balance entry",
    });
    return { success: true, data: nuevoObjeto };
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Error al crear balance entry',
    });

    return { success: false, error };
  } finally {
    setIsGlobalLoading(false);
  }
};


export const updateBalanceEntry = async <T>({ id, data }: { id: number; data: T }) => {
    const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
    setIsGlobalLoading(true);
    try {
        console.log('Actualizar balance entry:', id, data);
        await new Promise((r) => setTimeout(r, 1500));
        return { success: true };
    } catch (error) {
        Toast.show({
            type: "error",
            text1: "Error al actualizar balance entry",
        });
        return { success: false, error };
    } finally {
        setIsGlobalLoading(false);
    }
};
