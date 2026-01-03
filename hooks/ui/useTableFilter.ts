import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

type SearchByDateForm = {
  fecha: string;
  fechaFin: string;
};

export const useTableFilter = () => {
  // Debouncer
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Paginación (índice y tamaño de página)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Estados de búsqueda
  const [globalFilter, setGlobalFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDesde, setSearchDesde] = useState('');
  const [searchHasta, setSearchHasta] = useState('');

  const onChangeFilter = (term: string) => {
    setGlobalFilter(term);

    // Debounce del filtro
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setSearchTerm(term);
    }, 600);
  };

  // Formulario con react-hook-form
  const form = useForm<SearchByDateForm>({
    defaultValues: {
      fecha: '',
      fechaFin: '',
    },
  });

  return {
    // valores
    searchTerm,
    pagination,
    globalFilter,
    searchDesde,
    searchHasta,

    // setters
    setPagination,
    setGlobalFilter,
    setSearchTerm,
    onChangeFilter,
    setSearchDesde,
    setSearchHasta,

    // react-hook-form
    form,
  };
};
