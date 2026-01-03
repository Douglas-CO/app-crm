import { PagingMetaResponse } from "@/shared";

export interface ThemesPaginatedRes {
  status: number;
  message: string;
  meta: PagingMetaResponse;
  items: Theme[];
}

export interface Theme {
  id?: number;
  uuid?: string;

  name: string;
  state: boolean;
  code: string;
  description: string;
  palette: string[];

  created_at?: string;
  modified_at?: string;
}
