import React, { useState } from 'react'
import { SettingsLayout } from '@/applets/settings/SettingsLayout'
import { NextPage } from 'next'
import { CardWithHeading } from '@/common/Card'
import TableRow from '@/common/tables/TableRow'
import { Table, Tbody, Checkbox, Icon, Button } from '@chakra-ui/react'
import { SubmitHandler, useForm, UseFormRegister } from 'react-hook-form'
import { FaTrash } from 'react-icons/fa'
import TableHeaderRow from '@/common/tables/TableHeaderRow'
import { useEffect } from 'react'
interface ApiRowProps {
  name: string
  lastAccessed: string
  created: string
  id: string
  isChecked: boolean
  onCheckboxChange: (event: any) => void
  register: UseFormRegister<any>
}

const testData = [
  {
    name: 'Apricot Grasshopper',
    lastAccessed: '11/9/2020, 5:09:58 PM',
    created: '11/9/2020, 5:09:58 PM',
    id: '12345'
  },
  {
    name: 'Blue Haddock',
    lastAccessed: '11/9/2020, 5:18:19 PM',
    created: '11/9/2020, 5:18:19 PM',
    id: '23456'
  },
  {
    name: 'Blue Haddock But Longer And Meant To Test The Limits of Human Potential',
    lastAccessed: '11/9/2020, 5:18:19 PM',
    created: '11/9/2020, 5:18:19 PM',
    id: '34567'
  }
]

const ApiRow: React.FC<ApiRowProps> = ({
  name,
  lastAccessed,
  created,
  id,
  isChecked,
  onCheckboxChange
}) => {
  const data = [name, lastAccessed, created]

  return (
    <TableRow
      data={data}
      prefixData={
        <Checkbox id={id} isChecked={isChecked} onChange={onCheckboxChange} />
      }
    />
  )
}
interface ApiInputs {
  [key: string]: boolean
}

const ApiCard: React.FC = () => {
  const { register, handleSubmit, setValue, formState } = useForm<ApiInputs>()
  const apiKeys = testData
  const [checkedItems, setCheckedItems] = useState(
    apiKeys.map(key => ({ id: key.id, selected: false }))
  )

  useEffect(() => {
    for (const { id, selected } of checkedItems) {
      setValue(id, selected)
    }
  }, [checkedItems, setValue, formState])

  const allChecked = checkedItems.every(item => item.selected)
  const isIndeterminate =
    checkedItems.some(item => item.selected) && !allChecked

  const headers = ['Name', 'Last Accessed', 'Created']
  const selectAllCheckbox = (
    <Checkbox
      isChecked={allChecked}
      isIndeterminate={isIndeterminate}
      onChange={e =>
        setCheckedItems(
          checkedItems.map(item => ({
            id: item.id,
            selected: e.target.checked
          }))
        )
      }
    />
  )

  // eslint-disable-next-line no-console
  const onSubmit: SubmitHandler<ApiInputs> = (data, e) => console.log(data, e)

  const onCheckboxChange = event => {
    const newCheckedItems = [...checkedItems]
    const index = newCheckedItems.findIndex(item => item.id === event.target.id)
    newCheckedItems[index].selected = !newCheckedItems[index].selected
    setCheckedItems(newCheckedItems)
  }

  return (
    <CardWithHeading name="Api Keys">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button type="submit">
          <Icon as={FaTrash} />
        </Button>
        <Table>
          <TableHeaderRow data={headers} prefixData={selectAllCheckbox} />
          <Tbody>
            {apiKeys.map((item, index) => (
              <ApiRow
                {...item}
                register={register}
                key={index}
                isChecked={checkedItems[index].selected}
                onCheckboxChange={onCheckboxChange}
              />
            ))}
          </Tbody>
        </Table>
      </form>
    </CardWithHeading>
  )
}

const SettingsApiKeys: NextPage = () => {
  return (
    <SettingsLayout>
      <ApiCard />
    </SettingsLayout>
  )
}

export default SettingsApiKeys
