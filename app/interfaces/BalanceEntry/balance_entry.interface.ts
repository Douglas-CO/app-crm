export interface BalanceEntry {
  id?: number
  salary: string;
}

export type BalanceEntryLimitData = Pick<
  BalanceEntry,
  'id' 
>;