import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

import { Theme, ThemesPaginatedRes } from "@/app/interfaces";
import {
  erpAPI,
  getUrlParams,
  handleAxiosError,
  PagingPartialParams,
  UseFetchEnabledParams,
  UseMutationParams,
} from "@/shared";
import { useUiStore } from "@/store/useUiStore";

const { get, post, patch } = erpAPI();

export enum ThemeTSQEnum {
  THEMES = "themes",
  THEME = "theme",
}

///* tanStack query ---------------
export const useFetchThemes = ({
  enabled = true,
  params,
}: UseFetchEnabledParams<GetThemesParams>) => {
  return useQuery({
    queryKey: [ThemeTSQEnum.THEMES, ...Object.values(params || {})],
    queryFn: () => getThemes(params),
    enabled: enabled,
  });
};

export const useGetTheme = (uuid: string) => {
  return useQuery({
    queryKey: [ThemeTSQEnum.THEME, uuid],
    queryFn: () => getTheme(uuid),
    retry: false,
  });
};

export const useCreateTheme = <T>({
  navigate,
  returnUrl,
  returnErrorUrl,
  customMessageToast,
  customMessageErrorToast,
  enableNavigate = true,
  enableErrorNavigate = false,
  enableToast = true,
}: UseMutationParams) => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: CreateThemeParams<T>) => createTheme(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ThemeTSQEnum.THEMES] });
      enableNavigate && navigate && returnUrl && console.log(returnUrl);
      enableToast &&
        Toast.show({
          type: "success",
          text1: "Theme creada correctamente",
        });
    },
    onError: (error) => {
      enableErrorNavigate &&
        navigate &&
        returnUrl &&
        console.log(returnErrorUrl || returnUrl || "");

      handleAxiosError(error, customMessageErrorToast);
    },
    onSettled: () => {
      setIsGlobalLoading(false);
    },
  });
};

export const useUpdateTheme = <T>({
  navigate,
  returnUrl,
  returnErrorUrl,
  customMessageToast,
  customMessageErrorToast,
  enableNavigate = true,
  enableErrorNavigate = false,
  enableToast = true,
}: UseMutationParams) => {
  const queryClient = useQueryClient();
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;

  return useMutation({
    mutationFn: (params: UpdateThemeParams<T>) => updateTheme(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ThemeTSQEnum.THEMES] });
      enableNavigate && navigate && returnUrl && console.log(returnUrl);
      enableToast &&
        Toast.show({
          type: "success",
          text1: customMessageToast || "Theme actualizada correctamente",
        });
    },
    onError: (error) => {
      enableErrorNavigate &&
        navigate &&
        returnUrl &&
        console.log(returnErrorUrl || returnUrl || "");

      handleAxiosError(error, customMessageErrorToast);
    },
    onSettled: () => {
      setIsGlobalLoading(false);
    },
  });
};

///* axios ---------------
export type GetThemesParams = Partial<Theme> & PagingPartialParams;
export type CreateThemeParams<T> = T;
export type CreateThemeParamsBase = Omit<Theme, "id">;
export interface UpdateThemeParams<T> {
  id: number;
  data: T;
}

export const getThemes = async (params?: GetThemesParams) => {
  const stateParams = { ...params };

  // filter by state
  if (stateParams.filterByState === false && stateParams.state === undefined) {
    delete stateParams.state;
  } else if (stateParams.filterByState !== false) {
    stateParams.state = true;
  }
  delete stateParams.filterByState;

  const queryParams = getUrlParams(stateParams);
  return get<ThemesPaginatedRes>(`/theme/?${queryParams}`);
};

export const getTheme = async (uuid: string) => {
  try {
    return await get<Theme>(`/theme/${uuid}`);
  } catch (error) {
    console.log(error);
  }
};

export const createTheme = async <T>(data: CreateThemeParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return post<Theme>("/theme/", data);
};

export const updateTheme = async <T>({ id, data }: UpdateThemeParams<T>) => {
  const setIsGlobalLoading = useUiStore.getState().setIsGlobalLoading;
  setIsGlobalLoading(true);

  return patch<Theme>(`/theme/${id}/`, data);
};
