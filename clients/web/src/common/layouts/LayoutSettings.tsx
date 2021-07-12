import React from 'react'
import {
  Box,
  Button,
  Text,
  Container,
  ContainerProps,
  Flex,
  Heading,
  TextProps,
  VStack
} from '@chakra-ui/react'
import Link from 'next/link'

interface ButtonProps {
  href?: string
}

/**
 * Buttons for the settings navigation sidebar.
 */
export const SettingsButton: React.FC<ButtonProps> = ({
  children,
  href = '/settings'
}) => {
  return (
    <Link href={href}>
      <Button
        isFullWidth
        variant="ghost"
        flexDirection="column"
        alignItems="flex-start"
      >
        {children}
      </Button>
    </Link>
  )
}

export const SettingsSection: React.FC<TextProps> = ({
  children,
  ...props
}) => {
  return (
    <Text color="gray.300" letterSpacing="wide" marginBottom={1} {...props}>
      {children}
    </Text>
  )
}

export const SettingsHeader: React.FC = ({ children }) => {
  return (
    <Heading as="h2" marginBottom={4} fontSize="2xl">
      {children}
    </Heading>
  )
}

export const LayoutSettings: React.FC<
  {
    header?: React.ReactNode
    sidebar?: React.ReactNode
    footer?: React.ReactNode
  } & ContainerProps
> = ({ children, sidebar, header, footer, ...containerProps }) => {
  return (
    <Container maxW="4xl" {...containerProps}>
      {header}

      <Flex>
        <VStack
          flexShrink={0}
          width={170}
          spacing={0.5}
          alignItems="flex-start"
        >
          {sidebar}
        </VStack>
        <Box flexGrow={1} marginLeft={5}>
          {children}
        </Box>
      </Flex>

      {footer}
    </Container>
  )
}
