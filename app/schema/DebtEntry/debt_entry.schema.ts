import { DEBT_ENTRY_TYPE_ARRAY_CHOICES } from '@/app/shared';
import * as yup from 'yup';

export const debtentry_FormSchema = yup.object({
  name: yup
    .string()
    .required('El campo nombre es requerido')
    .max(200, 'El campo nombre no debe pasar los 200 caracteres'),
  value: yup
    .number()
    .required('El campo value es requerido'),
  state: yup
    .boolean()
    .typeError('El estado es Requerido')
    .required('El estado es Requerido'),
  code: yup
    .mixed()
    .oneOf(DEBT_ENTRY_TYPE_ARRAY_CHOICES, 'El codigo debe ser elegido')
    .required('El campo codigo es requerido'),
});