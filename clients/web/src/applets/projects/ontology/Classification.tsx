import React, { memo, useState } from 'react'
import { VscRegex } from 'react-icons/vsc'
import {
  Button,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Select,
  SelectProps,
  Switch,
  useBreakpointValue,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import update from 'immutability-helper'
import {
  LabelError,
  LabelNameInput,
  LabelRow,
  LabelRowMoveIcon,
  LabelRowSettings
} from './Label'
import { FormControlInline } from '@/common/forms/FormControlInline'
import { FaPlus, FaTrash } from 'react-icons/fa'

export enum ClassificationType {
  Text = 'text',
  Checkbox = 'checkbox',
  Radio = 'radio',
  Checklist = 'checklist',
  Dropdown = 'dropdown'
}

export const ClassificationOption: React.FC<
  { onDelete?(): void } & InputProps
> = ({ onDelete, ...inputProps }) => {
  return (
    <InputGroup size="sm">
      <Input
        pr="32px"
        variant="filled"
        placeholder="New option"
        {...inputProps}
      />
      <InputRightElement>
        <IconButton
          variant="ghost"
          aria-label="delete option"
          onClick={onDelete}
          icon={<Icon as={FaTrash}></Icon>}
          h="1.75rem"
          size="sm"
        />
      </InputRightElement>
    </InputGroup>
  )
}

export const ClassificationConfigOptions: React.FC<{
  values: string[]
  onChange: (newValues: string[]) => void
}> = memo(({ values, onChange }) => {
  const addOption = () => {
    onChange(update(values, { $push: [''] }))
  }
  const updateValue = (idx: number, newValue: string) => {
    onChange(update(values, { [idx]: { $set: newValue } }))
  }
  const deleteValue = (idx: number) => {
    onChange(update(values, { $splice: [[idx, 1]] }))
  }
  return (
    <FormControl marginTop={1}>
      <FormLabel size="sm" mb="1">
        Options
      </FormLabel>
      <VStack align="stretch" spacing={1}>
        {values.map((value, idx) => (
          <ClassificationOption
            key={idx}
            value={value}
            onChange={e => updateValue(idx, e.target.value)}
            onDelete={() => deleteValue(idx)}
          />
        ))}
      </VStack>
      <Button
        isFullWidth
        size="sm"
        variant="ghost"
        colorScheme="blue"
        marginTop={1}
        onClick={addOption}
        leftIcon={<Icon as={FaPlus} />}
      >
        Add option
      </Button>
    </FormControl>
  )
})

export const ClassificationTypeConfig: Record<ClassificationType, React.FC> = {
  [ClassificationType.Text]: () => {
    const [options, setOptions] = useState<string[]>([])
    return (
      <FormControl marginTop={1}>
        <FormLabel htmlFor="regex-string" mb="1" size="sm">
          Regex validation string
        </FormLabel>
        <InputGroup size="sm">
          <InputLeftElement pointerEvents="none">
            <Icon as={VscRegex} color="gray.400" />
          </InputLeftElement>
          <Input variant="filled" />
        </InputGroup>
        <ClassificationConfigOptions values={options} onChange={setOptions} />
      </FormControl>
    )
  },
  [ClassificationType.Radio]: () => null,
  [ClassificationType.Checklist]: () => null,
  [ClassificationType.Checkbox]: () => null,
  [ClassificationType.Dropdown]: () => null
}

export const ClassificationConfig: React.FC = () => {
  const TypeConfig = ClassificationTypeConfig[ClassificationType.Text]
  return (
    <>
      <FormControlInline>
        <FormLabel htmlFor="required" mb="0" size="sm">
          Required
        </FormLabel>
        <Switch id="required" size="sm" />
      </FormControlInline>
      <TypeConfig />
    </>
  )
}

export const ClassificationTypeSelector: React.FC<SelectProps> = props => (
  <Select size="sm" maxWidth={120} variant="filled" {...props}>
    {Object.entries(ClassificationType).map(([name, value]) => (
      <option key={value} value={value}>
        {name}
      </option>
    ))}
  </Select>
)

export const Classification: React.FC = () => {
  const disclosure = useDisclosure()
  const { isOpen } = disclosure
  const isGteSm = useBreakpointValue({ base: false, sm: true })

  return (
    <LabelRow isActive={isOpen}>
      <LabelRowMoveIcon />
      <LabelNameInput />
      <LabelError error="Missing x option" />
      {isGteSm && <ClassificationTypeSelector />}
      <LabelRowSettings {...disclosure}>
        <FormControlInline>
          <FormLabel mb="0">Type</FormLabel>
          <ClassificationTypeSelector />
        </FormControlInline>
        <ClassificationConfig />
      </LabelRowSettings>
    </LabelRow>
  )
}
