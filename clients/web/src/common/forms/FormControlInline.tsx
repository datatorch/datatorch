import { FormControl, FormControlProps } from '@chakra-ui/react'
import React from 'react'

export const FormControlInline: React.FC<FormControlProps> = ({
  children,
  ...props
}) => (
  <FormControl marginTop={2} display="flex" alignItems="center" {...props}>
    {children}
  </FormControl>
)
