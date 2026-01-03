import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import {
  createBalanceEntry,
  CreateBalanceEntryParamsBase,
  updateBalanceEntry,
} from "@/app/actions";
import { BalanceEntry } from "@/app/interfaces";
import { balanceentry_FormSchema } from "@/app/schema";
import { InputTextField, SingleFormBoxScene } from "@/components";

interface SaveBalanceEntryPageProps {
  title: string;
  balance_entry?: BalanceEntry;
}

type SaveFormData = CreateBalanceEntryParamsBase & {};

const SaveBalanceEntryPage: React.FC<SaveBalanceEntryPageProps> = ({
  title,
  balance_entry,
}) => {
  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(balanceentry_FormSchema) as any,
    defaultValues: {},
  });

  const {
    handleSubmit,
    getValues,
    reset,
    control,
    formState: { errors, isValid },
  } = form;

  ///* handlers
  const onSave = async (data: SaveFormData) => {
    if (!isValid) return;

    if (balance_entry?.id) {
      await updateBalanceEntry({ id: balance_entry.id, data });
    } else {
      await createBalanceEntry(data);
    }
  };

  ///* effects
  useEffect(() => {
    if (!balance_entry?.salary) return;
    reset(balance_entry);
  }, [balance_entry, reset]);

  return (
    <View>
      <SingleFormBoxScene
        titlePage={title}
        onSave={handleSubmit(onSave, () => {})}
      >
        <InputTextField
          label="Valor mensual de tu trabajo"
          name="salary"
          control={control}
          defaultValue={getValues().salary}
          error={errors.salary?.message}
          onNumber
        />
      </SingleFormBoxScene>
    </View>
  );
};

export default SaveBalanceEntryPage;
