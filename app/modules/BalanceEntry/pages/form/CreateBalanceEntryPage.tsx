import { getBalanceEntrys } from "@/app/actions";
import React, { useEffect, useState } from "react";
import { SaveBalanceEntryPage } from "../../shared";

export type CreateBalanceEntryPageProps = {};

const CreateBalanceEntryPage: React.FC<CreateBalanceEntryPageProps> = () => {
  const [balances, setBalances] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getBalanceEntrys();
      setBalances(result);
    };
    fetchData();
  }, []);

  return <SaveBalanceEntryPage title="Salario" balance_entry={balances} />;
};

export default CreateBalanceEntryPage;
