import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  createDebtEntry,
  CreateDebtEntryParamsBase,
  updateDebtEntry
} from "@/app/actions";
import { DebtEntry } from "@/app/interfaces";
import { ROUTER_PATHS } from "@/app/routes";
import { debtentry_FormSchema } from "@/app/schema";
import { DEBT_ENTRY_TYPE_ARRAY_CHOICES } from "@/app/shared";
import {
  InputTextField,
  SingleFormBoxScene,
} from "@/components";
import { CustomAutocompleteArrString, SampleCheckbox } from "@/shared";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "expo-router";

interface SaveDebtEntryProps {
  title: string;
  debt_entry?: DebtEntry;
}

const returnUrlSaveDebtEntryPages = ROUTER_PATHS.debt_entry;

type SaveFormData = CreateDebtEntryParamsBase & {};

const SaveDebtEntry: React.FC<SaveDebtEntryProps> = ({ title, debt_entry }) => {
  const navigation = useNavigation();
  
  ///* form
  const form = useForm<SaveFormData>({
    resolver: yupResolver(debtentry_FormSchema) as any,
    defaultValues: {
      state: true,
    },
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

    if (debt_entry?.id) {
      await updateDebtEntry({ id: debt_entry.id, data });
    } else {
      await createDebtEntry(data);
    }
    reset()
    navigation.navigate(returnUrlSaveDebtEntryPages.debtentry as never);
  };

  const onCancel = async () => {
    navigation.navigate(returnUrlSaveDebtEntryPages.debtentry as never);
  };

  ///* effects
  useEffect(() => {
    if (!debt_entry?.id) return;
    reset(debt_entry);
  }, [debt_entry, reset]);

  return (
      <SingleFormBoxScene
        titlePage={title}
        onSave={handleSubmit(onSave, () => {})}
        onCancel={() => onCancel()}
        cancelTextBtn="Atras"
      >
        <InputTextField
          label="Nombre"
          name="name"
          control={control}
          defaultValue={getValues().name}
          error={errors.name?.message}
        />
        <InputTextField
          label="Valor"
          name="value"
          control={control}
          defaultValue={getValues().value}
          error={errors.value?.message}
          onNumber
        />
        <CustomAutocompleteArrString
          label="Codigo"
          name="code"
          control={form.control}
          defaultValue={form.getValues("code")}
          options={DEBT_ENTRY_TYPE_ARRAY_CHOICES}
          isLoadingData={false}
          error={errors.code}
          helperText={errors.code?.message}
        />

        <SampleCheckbox
          label="Estado"
          name="state"
          control={control}
          defaultValue={form.getValues().state}
          isState
        />
      </SingleFormBoxScene>
  );
};

export default SaveDebtEntry;
