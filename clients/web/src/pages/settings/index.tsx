import React from 'react'
import { NextPage } from 'next'
import { SubmitHandler, useForm } from 'react-hook-form'

import { FormButton } from '@/common/forms/FormButton'
import { CardWithHeading } from '@/common/Card'
import { SettingsLayout } from '@/applets/settings/SettingsLayout'
import { FormInput, FormTextarea } from '@/common/forms/FormField'
interface ProfileInputs {
  name: string
  bio: string
  company: string
  location: string
}

const ProfileCard: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ProfileInputs>()

  const onSubmit: SubmitHandler<ProfileInputs> = (data, event) =>
    // eslint-disable-next-line no-console
    console.log(data, event)
  return (
    <CardWithHeading name="Public Profile">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          field="name"
          displayName="Name"
          register={register}
          error={errors.name}
        />
        <FormTextarea
          field="bio"
          displayName="Bio"
          register={register}
          error={errors.bio}
        />
        <FormInput
          field="company"
          displayName="Company"
          register={register}
          error={errors.company}
        />
        <FormInput
          field="location"
          displayName="Location"
          register={register}
          error={errors.location}
        />
        <FormButton name="Update Profile" isSubmitting={isSubmitting} />
      </form>
    </CardWithHeading>
  )
}

const SettingsProfile: NextPage = () => {
  return (
    <SettingsLayout>
      <ProfileCard />
    </SettingsLayout>
  )
}

export default SettingsProfile
