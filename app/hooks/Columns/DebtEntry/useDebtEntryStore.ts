import { createDebtEntry, getDebtEntrys, updateDebtEntry } from '@/app/actions';
import { DebtEntry } from '@/app/interfaces';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// ✅ Adaptación del hook de lectura
export const useDebtEntries = (filters: Record<string, any> = {}) => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["debt_entries"] });
  return useQuery({
    queryKey: ['debt_entries', filters],
    queryFn: async () => {
      const { data } = await getDebtEntrys(filters); // reutilizamos tu función original
      return data;
    },
  });
};


// ✅ Crear entry
export const useCreateDebtEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDebtEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debt_entries'] });
    },
  });
};

export const useUpdateDebtEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDebtEntry as (variables: { id: number; data: DebtEntry }) => Promise<any>,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['debt_entries'] });
    },
  });
};
