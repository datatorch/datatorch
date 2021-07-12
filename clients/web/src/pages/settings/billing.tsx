import { SettingsLayout } from '@/applets/settings/SettingsLayout'
import { CardWithHeading } from '@/common/Card'
import StatWithNumber from '@/common/StatWithNumber'
import TableRow from '@/common/tables/TableRow'
import { HStack, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import { NextPage } from 'next'
import React, { useState } from 'react'

interface BillingHistoryItem {
  id: string
  invoiceDate: string
  type: string
  billingPeriod: string
  amount: string
  status: string
}

type BillingHistoryProps = Omit<BillingHistoryItem, 'id'>

interface BillStatProps {
  cost: string
  date: string
}

const testData: BillingHistoryItem[] = [
  {
    id: '12345',
    invoiceDate: '06/08/2021',
    type: 'Professional',
    billingPeriod: '06/10/2021 – 07/08/2021',
    amount: '$10.00',
    status: 'Processed'
  },
  {
    id: '23456',
    invoiceDate: '06/02/2021',
    type: 'Professional',
    billingPeriod: '06/02/2021 – 06/02/22',
    amount: '$10.00',
    status: 'Pending'
  },
  {
    id: '34567',
    invoiceDate: '05/05/2021',
    type: 'Professional',
    billingPeriod: '06/06/21 – 12/12/12',
    amount: '$10.00',
    status: 'Unpaid'
  }
]

const testMonthlyStats = {
  cost: '$10.00',
  date: '06/10/2021 – 07/08/2021'
}

const testNextStats = {
  cost: '$10.00',
  date: '06/10/2021 – 07/08/2021'
}

const CurrentMonthlyBillStat: React.FC<BillStatProps> = ({ cost, date }) => {
  return <StatWithNumber label="Monthly Costs" number={cost} helpText={date} />
}

const NextMonthlyBillStat: React.FC<BillStatProps> = ({ cost, date }) => {
  return (
    <StatWithNumber label="Next Month's Costs" number={cost} helpText={date} />
  )
}

const BillingInfoCard: React.FC = () => {
  const [monthlyCosts] = useState(testMonthlyStats)
  const [nextCosts] = useState(testNextStats)
  return (
    <CardWithHeading name="Billing Info">
      <HStack>
        <CurrentMonthlyBillStat {...monthlyCosts} />
        <NextMonthlyBillStat {...nextCosts} />
      </HStack>
    </CardWithHeading>
  )
}

const BillingHistoryRow: React.FC<BillingHistoryProps> = ({
  invoiceDate,
  type,
  billingPeriod,
  amount,
  status
}) => {
  const dataArray = [invoiceDate, type, billingPeriod, amount, status]
  return <TableRow data={dataArray} />
}

const BillingHistoryCard: React.FC = () => {
  const [billingHistory] = useState(testData)
  const headers = ['Invoice Date', 'Type', 'Billing Period', 'Amount', 'Status']
  return (
    <CardWithHeading name="Billing History">
      <Table>
        <Thead>
          <Tr>
            {headers.map((d, i) => (
              <Th key={i}>{d}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {billingHistory.map(({ id, ...rest }) => {
            return <BillingHistoryRow key={id} {...rest} />
          })}
        </Tbody>
      </Table>
    </CardWithHeading>
  )
}

const SettingsBilling: NextPage = () => {
  return (
    <SettingsLayout>
      <BillingInfoCard />
      <BillingHistoryCard />
    </SettingsLayout>
  )
}

export default SettingsBilling
