import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export const useTableServerSideFiltering = () => {
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [filterObject, setFilterObject] = useState<any>({});

  useEffect(() => {
    setFilterObject(
      columnFilters.reduce((obj: any, item: any) => {
        obj[item.id] = item?.value;

        // Date handling
        if (item.id.includes('fecha') || item.id.includes('date')) {
          obj[item.id] = dayjs(item?.value).format('YYYY-MM-DD');
        }

        // Boolean handling
        if (item.value === 'true' || item.value === 'false') {
          obj[item.id] = item.value === 'true';
        }

        return obj;
      }, {})
    );
  }, [columnFilters]);

  return {
    columnFilters,
    setColumnFilters,
    filterObject,
    setFilterObject,
  };
};
