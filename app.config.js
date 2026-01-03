import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    BACKEND_API_URL: process.env.BACKEND_API_URL || 'http://127.0.0.1:8000/api/',
    // puedes agregar más variables si quieres
  },
});
