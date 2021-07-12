import React from 'react'
import {
  LayoutSettings,
  SettingsButton,
  SettingsSection
} from '@/common/layouts/LayoutSettings'
import { Avatar, Button, Flex, Heading, VStack } from '@chakra-ui/react'
import { LayoutNavbar } from '@/common/layouts/LayoutNavbar'
import { AppNavbar } from '@/common/navbar/AppNavbar'

const SettingsHeader: React.FC = () => {
  return (
    <Flex marginBottom={8} alignItems="center">
      <Avatar size="md" />
      <Heading
        marginX={8}
        fontSize={{ base: 'lg', sm: '3xl' }}
        as="h1"
        flexGrow={1}
      >
        Justin Brooks
      </Heading>
      <Button>Profile</Button>
    </Flex>
  )
}

const SettingsSidebar: React.FC = () => {
  return (
    <>
      <SettingsSection>Account</SettingsSection>

      <SettingsButton href="">Profile</SettingsButton>
      <SettingsButton href="/settings/customization">
        Customization
      </SettingsButton>
      <SettingsButton href="/settings/notifications">
        Notifications
      </SettingsButton>
      <SettingsButton href="/settings/account">Account</SettingsButton>
      <SettingsButton href="/settings/billing">Billing</SettingsButton>
      <SettingsButton href="/settings/keys">API Keys</SettingsButton>

      <SettingsSection paddingTop={8}>Admin</SettingsSection>
      <SettingsButton>System</SettingsButton>
      <SettingsButton>Theming</SettingsButton>
      <SettingsButton>Metrics</SettingsButton>
      <SettingsButton>Data</SettingsButton>
      <SettingsButton>Users</SettingsButton>
      <SettingsButton>Logs</SettingsButton>

      <SettingsSection paddingTop={8}>Resources</SettingsSection>
      <SettingsButton>Documentation</SettingsButton>
      <SettingsButton>Release Notes</SettingsButton>
      <SettingsButton>Terms of Service</SettingsButton>
      <SettingsButton>Status</SettingsButton>
    </>
  )
}

export const SettingsLayout: React.FC = ({ children }) => {
  return (
    <LayoutNavbar navbar={<AppNavbar />} containerProps={{ overflow: 'auto' }}>
      <LayoutSettings
        header={<SettingsHeader />}
        sidebar={<SettingsSidebar />}
        marginTop={10}
      >
        <VStack spacing={5} align="stretch">
          {children}
        </VStack>
      </LayoutSettings>
    </LayoutNavbar>
  )
}
