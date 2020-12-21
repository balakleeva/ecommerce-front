import * as Yup from 'yup'

export const stringValidator = Yup.string().required('Это обязательное поле')

export const numberValidator = Yup.number().required(
  'Это обязательное числовое поле'
)
