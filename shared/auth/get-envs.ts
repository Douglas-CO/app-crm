import Constants from 'expo-constants';

const BACKEND_API_URL =
  Constants.expoConfig?.extra?.BACKEND_API_URL ?? 'http://127.0.0.1:8000/api/';

export const getEnvs = () => ({
  BACKEND_API_URL,
});
