export enum DebtEntryTypeEnumChoice {
  HOUSE = 'HOUSE',
  COMMERCIAL_HOUSE = 'COMMERCIAL_HOUSE',
}
export const DEBT_ENTRY_TYPE_ARRAY_CHOICES = [
  DebtEntryTypeEnumChoice.HOUSE,
  DebtEntryTypeEnumChoice.COMMERCIAL_HOUSE,
];
export const DEBT_ENTRY_TYPE_JSON_CHOICES = [
  {
    label: 'HOGAR',
    value: DebtEntryTypeEnumChoice.HOUSE,
  },
  {
    label: 'CASA COMERCIAL',
    value: DebtEntryTypeEnumChoice.COMMERCIAL_HOUSE,
  },
];