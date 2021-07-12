import React from 'react'
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Switch,
  Input,
  Textarea
} from '@chakra-ui/react'
import { FormControlInline } from './FormControlInline'
import { FieldError, UseFormRegister } from 'react-hook-form'

export interface FormFieldProps {
  displayName: string
  register?: UseFormRegister<any>
  field: string
  type?: string
  error?: FieldError
  required?: boolean
  isSubmitting?: boolean
}

/**
 * A modified version of FormInput that allows for greater control over the input by passing in a child.
 */
export const FormInputWrapper: React.FC<FormFieldProps> = ({
  field,
  displayName,
  error,
  children
}) => {
  return (
    <FormControl isInvalid={error?.message.length > 0} mt={3}>
      <FormLabel htmlFor={field}>{displayName}</FormLabel>
      {children}
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}

/**
 * A component that uses react-hook-form to implement a form input in Chakra UI.
 */
export const FormInput: React.FC<FormFieldProps> = ({
  type,
  required,
  field,
  displayName,
  register,
  error
}) => {
  return (
    <FormControl isInvalid={error?.message.length > 0} mt={3}>
      <FormLabel htmlFor={field}>{displayName}</FormLabel>
      <Input
        type={type}
        {...register(field, {
          required: required && `${displayName} Required`
        })}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}

/**
 * A component that uses react-hook-form to implement a form textarea in Chakra UI.
 */
export const FormTextarea: React.FC<FormFieldProps> = ({
  field,
  displayName,
  error,
  register
}) => {
  return (
    <FormControl mt={3}>
      <FormLabel htmlFor={field}>{displayName}</FormLabel>
      <Textarea {...register(field)} />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}

/**
 * A component that uses react-hook-form to implement a form toggle in Chakra UI.
 */
export const FormToggle: React.FC<FormFieldProps> = ({
  field,
  displayName,
  register,
  isSubmitting
}) => {
  return (
    <FormControlInline>
      <FormLabel htmlFor={field}>{displayName}</FormLabel>
      <Switch isDisabled={isSubmitting} {...register(field)} />
    </FormControlInline>
  )
}
