import { SettingsLayout } from '@/applets/settings/SettingsLayout'
import { CardWithHeading } from '@/common/Card'
import { FormToggle } from '@/common/forms/FormField'
import { NextPage } from 'next'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface DarkModeInputs {
  darkMode: boolean
  isSubmitting?: boolean
}

const DarkModeCard: React.FC = () => {
  const {
    register,
    handleSubmit,

    formState: { isSubmitting }
  } = useForm<DarkModeInputs>({ mode: 'onChange' })

  const onSubmit: SubmitHandler<DarkModeInputs> = (data, event) =>
    // eslint-disable-next-line no-console
    console.log(data, event)

  return (
    <CardWithHeading name="Dark Mode">
      <form onChange={handleSubmit(onSubmit)}>
        <FormToggle
          displayName="Enable dark mode?"
          field="darkMode"
          isSubmitting={isSubmitting}
          register={register}
        />
      </form>
    </CardWithHeading>
  )
}

const SettingsCustomization: NextPage = () => {
  return (
    <SettingsLayout>
      <DarkModeCard />
    </SettingsLayout>
  )
}

export default SettingsCustomization
