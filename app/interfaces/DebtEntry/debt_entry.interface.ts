import { DebtEntryTypeEnumChoice } from "@/app/shared";

export interface DebtEntry {
  id?: number
  name: string;
  value: string;
  state: boolean;
  code: DebtEntryTypeEnumChoice
}

export type DebtEntryLimitData = Pick<
  DebtEntry,
  'id'  | 'name'
>;