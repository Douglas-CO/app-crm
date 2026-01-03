import * as yup from 'yup';

export const balanceentry_FormSchema = yup.object({
  salary: yup
    .number()
    .required('El campo salario es requerido'),
});