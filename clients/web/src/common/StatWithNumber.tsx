import { Stat, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'
import React from 'react'

interface StatWithNumberProps {
  label: string
  number: string
  helpText?: string
}

/**
 * A Chakra Stat prop with a label, number, and help text.
 */
const StatWithNumber: React.FC<StatWithNumberProps> = ({
  label,
  number,
  helpText
}) => {
  return (
    <Stat>
      <StatLabel>{label}</StatLabel>
      <StatNumber>{number}</StatNumber>
      {helpText && <StatHelpText>{helpText}</StatHelpText>}
    </Stat>
  )
}

export default StatWithNumber
