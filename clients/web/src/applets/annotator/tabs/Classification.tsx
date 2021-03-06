import { Box, Text } from '@chakra-ui/react'
import React from 'react'

export const Classification: React.FC = () => {
  return (
    <Box>
      <Text
        fontWeight="semibold"
        color="gray.400"
        letterSpacing="wider"
        fontSize="sm"
        casing="uppercase"
      >
        Classification
      </Text>
    </Box>
  )
}
