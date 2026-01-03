import { DebtEntry } from "@/app/interfaces";
import { useUiStore } from "@/store/useUiStore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";

export type GetDebtEntryParams = Partial<DebtEntry>;
export type CreateDebtEntryParams<T> = T;
export type CreateDebtEntryParamsBase = Omit<DebtEntry, 'id'>;
export interface UpdateDebtEntryParams<T> {
  id: number;
  data: T;
}

// NO CAMBIAR
export const getDebtEntrys = async (
  filters: Record<string, any> = {}
): Promise<{ data: DebtEntry[]; isLoading: boolean }> => {
  let isLoading = true;

  const ingresoStr = await AsyncStorage.getItem('debt_entry');
  if (!ingresoStr) return { data: [], isLoading: false };

  const ingresoObj: DebtEntry[] = JSON.parse(ingresoStr);

  const filtered = ingresoObj.filter((entry) =>
    Object.entries(filters).every(([key, value]) => {
      const entryValue = entry[key as keyof DebtEntry];

      if (entryValue === undefined || value === undefined) return false;

      if (typeof entryValue === 'string') {
        return entryValue.toLowerCase() === String(value).toLowerCase();
      }

      if (typeof entryValue === 'number') {
        const numValue = parseFloat(value);
        return !isNaN(numValue) && entryValue === numValue;
      }

      if (typeof entryValue === 'boolean') {
        const boolValue = value === true || value === 'true' || value === '1';
        return entryValue === boolValue;
      }

      return entryValue === value;
    })
  );

  isLoading = false;
  return { data: filtered, isLoading };
};

export const getDebtEntry = async (id: number): Promise<{ data: any | null; error: Error | null }> => {
  try {
    const data = await AsyncStorage.getItem('debt_entry');
    if (!data) return { data: null, error: null };

    const parsedData = JSON.parse(data);
    const result = parsedData.find((entry: any) => entry.id === id);

    return { data: result || null, error: null };
  } catch (error: any) {
    Toast.show({
      type: 'error',
      text1: 'Ocurrió un error al obtener la deuda',
    });
    return { data: null, error };
  }
};


export const createDebtEntry = async (data: Omit<DebtEntry, 'id'>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  try {
    if (!data || typeof data !== 'object') {
      throw new Error('Datos inválidos para debt_entry');
    }

    const storedData = await AsyncStorage.getItem('debt_entry');
    let parsedData: DebtEntry[] = [];

    if (storedData) {
      parsedData = JSON.parse(storedData);

      if (!Array.isArray(parsedData)) {
        throw new Error('Datos corruptos o mal formateados en debt_entry');
      }
    }

    // Como el array está ordenado de mayor a menor, el mayor id está en [0]
    const lastId = parsedData.length > 0 ? (parsedData[0].id ?? 0) : 0;
    const newEntry: DebtEntry = { ...data, id: lastId + 1 };

    parsedData.push(newEntry);

    // Ordenar descendente por id para mantener la lógica
    const orderedData = parsedData.slice().sort((a, b) => (b.id ?? 0) - (a.id ?? 0));

    await AsyncStorage.setItem('debt_entry', JSON.stringify(orderedData));

    Toast.show({
      type: 'success',
      text1: 'Se creó el balance entry',
    });

    return { success: true, data: newEntry };

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


export const updateDebtEntry = async <T>({ id, data }: { id: number; data: T }) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  setIsGlobalLoading(true);

  try {
    const storedEntries = await AsyncStorage.getItem('debt_entry');
    let entries = storedEntries ? JSON.parse(storedEntries) : [];

    const index = entries.findIndex((entry: any) => entry.id === id);
    if (index === -1) throw new Error("ID no encontrado");

    entries[index] = {
      ...entries[index],
      ...data,
    };

    await AsyncStorage.setItem('debt_entry', JSON.stringify(entries));

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