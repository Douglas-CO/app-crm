import { isAxiosError } from "axios";

import Toast from "react-native-toast-message";
import { ToastSeverityType } from "../interfaces";

export interface ErrorResponse {
  code: number;
  status: string;
  message: string;
  data: ErrorData;
}

export interface ErrorData {
  invalid_fields: string[];
}

export const handleAxiosError = (
  error: any,
  customMessageErrorToast?: string | null,
  customMessageErrorSeverityToast: ToastSeverityType = "error"
) => {
  ///* axios errror handler
  if (isAxiosError(error)) {
    // custom message error
    if (customMessageErrorToast) {
      return Toast.show({
        type: customMessageErrorSeverityToast,
        text1: customMessageErrorToast,
      });
    }

    // handle ErrorData from response
    const respAxiosData = error.response?.data || {};
    const { invalid_fields } = (respAxiosData as ErrorData) || {};

    // handle error as normal message
    if (!invalid_fields) {
      if (error?.response?.data?.message)
        return Toast.show({
          type: "error",
          text1: customMessageErrorToast || error.response?.data?.message,
        });

      // errors obj + arr
      if ((error as any)?.response?.data?.errors?.length) {
        return Toast.show({
          type: "error",
          text1: (error as any)?.response?.data?.errors[0],
        });
      }

      return Toast.show({
        type: "error",
        text1:
          error?.message ||
          "Error no controlado, contacte al administrador del sistema",
      });
    }

    // handle invalid fields
    for (const field of invalid_fields) {
      Toast.show({
        type: "error",
        text1: field,
      });
    }

    return;
  }

  Toast.show({
    type: "error",
    text1: "Error no controlado, contacte al administrador del sistema",
  });
};
