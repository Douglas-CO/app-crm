import type { NavigationProp } from "@react-navigation/native"

// Tipo genérico para la navegación - puedes especificar tu stack de navegación
export type NavigateFunction = NavigationProp<any>

export type ToastSeverityType = "success" | "error" | "warning" | "info"

export type UseMutationParams = {
  navigate?: NavigateFunction
  returnUrl?: string
  returnErrorUrl?: string
  enableNavigate?: boolean
  enableErrorNavigate?: boolean
  enableToast?: boolean
  customMessageToast?: string
  customMessageErrorToast?: string
  customOnSuccess?: (resData: unknown) => void
  customOnError?: (error: unknown) => void
  overrideOnError?: boolean
  customMessageErrorSeverityToast?: ToastSeverityType
  customMessageSuccessSeverityToast?: ToastSeverityType
  customOnSettled?: () => void
}

export interface UseFetchEnabledParams<T> {
  enabled?: boolean
  params?: T
  refetchInterval?: number
}

export type PhotosDBJSONType = {
  photoUrl: string
  photoName: string
  photoId: number
}

export type ChangeModelStateData = {
  state: boolean
}

export type PagingPartialParamsOnly = {
  page?: number
  page_size?: number
}

export type PagingPartialParams = PagingPartialParamsOnly & {
  filterByState?: boolean
  order_by?: string
  order_by_asc?: boolean
}
