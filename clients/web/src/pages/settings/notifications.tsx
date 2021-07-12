import React from 'react'
import { NextPage } from 'next'
import { CardWithHeading } from '@/common/Card'
import { SettingsLayout } from '@/applets/settings/SettingsLayout'

const NotificationsCard: React.FC = () => {
  return (
    <CardWithHeading name="Notification Settings">
      Notifications Settings
    </CardWithHeading>
  )
}

const SettingsNotifications: NextPage = () => {
  return (
    <SettingsLayout>
      <NotificationsCard />
    </SettingsLayout>
  )
}

export default SettingsNotifications
