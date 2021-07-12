import { Box, BoxProps, Heading, HeadingProps } from '@chakra-ui/react'
import React from 'react'

/**
 * A Chakra-UI Heading with some app stylings. To be used with Card.
 */
export const CardHeading: React.FC<HeadingProps> = ({ children, ...props }) => {
  return (
    <Heading fontSize="lg" {...props} marginBottom={3} marginTop={0}>
      {children}
    </Heading>
  )
}

/**
 * A Chakra-UI Box with some app stylings.
 */
export const Card: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box padding={7} rounded="md" bgColor="gray.800" {...props}>
      {children}
    </Box>
  )
}

interface CardTitleProps {
  name: string
}

/**
 * A Chakra-UI Box that has a header included inside.
 */
export const CardWithHeading: React.FC<CardTitleProps> = ({
  name,
  children
}) => {
  return (
    <Card>
      <CardHeading>{name}</CardHeading>
      {children}
    </Card>
  )
}
