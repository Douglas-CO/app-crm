import { SaveDebtEntry } from "@/app/modules";
import { CustomScrollView } from "@/components";
import React from "react";

const DebtEntryCrearPage = () => {
  return (
    <CustomScrollView>
      <SaveDebtEntry title="Crear Deuda" />
    </CustomScrollView>
  );
};

export default DebtEntryCrearPage;
