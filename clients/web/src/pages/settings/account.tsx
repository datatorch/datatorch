import { SettingsLayout } from '@/applets/settings/SettingsLayout'
import { CardWithHeading } from '@/common/Card'
import { FormButton } from '@/common/forms/FormButton'
import { FormInput, FormInputWrapper } from '@/common/forms/FormField'
import { NextPage } from 'next'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react'

interface PasswordInputs {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

interface DeleteAccountInputs {
  email: string
  password: string
  confirmPassword: string
}

interface DeletionModalProps {
  isOpen: boolean
  onClose: () => void
}

const DeletionModal: React.FC<DeletionModalProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
    reset,
    getValues
  } = useForm<DeleteAccountInputs>()

  // eslint-disable-next-line no-console
  const onSubmit = (data, e) => console.log('onSubmit: ', data, e)

  const {
    email: emailErrors,
    password: passwordErrors,
    confirmPassword: confirmPasswordErrors
  } = errors
  const currentPassword = getValues('password')

  const onCloseDeletion = () => {
    reset()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onCloseDeletion}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Account Deletion Confirmation</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Text>
              Please confirm your account deletion by entering your login,
              email, and password.
            </Text>
            <Text py={3}>This process cannot be reversed.</Text>
            <FormInput
              displayName="Email"
              field="email"
              type="email"
              error={emailErrors}
              register={register}
              required
            />
            <FormInput
              error={passwordErrors}
              displayName="Password"
              field="password"
              register={register}
              type="password"
              required
            />
            <FormInputWrapper
              displayName="Confirm Password"
              error={confirmPasswordErrors}
              field="confirmPassword"
            >
              <Input
                type="password"
                {...register('confirmPassword', {
                  required: 'Password confirmation is required.',
                  validate: {
                    equalToPassword: value => {
                      return (
                        currentPassword === value || 'Passwords do not match.'
                      )
                    }
                  }
                })}
              />
            </FormInputWrapper>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              type="submit"
              mr={3}
              backgroundColor="red.500"
              isDisabled={!isDirty}
            >
              Confirm Deletion
            </Button>
            <Button colorScheme="blue" onClick={onCloseDeletion}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

const DeletionCard: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <CardWithHeading name="Account Deletion">
      <Text>If you want to delete your account, click the button below.</Text>
      <Button
        onClick={onOpen}
        mt={2}
        colorScheme="red"
        backgroundColor="red.500"
      >
        Delete Account
      </Button>
      <DeletionModal isOpen={isOpen} onClose={onClose} />
    </CardWithHeading>
  )
}

const PasswordCard: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<PasswordInputs>()

  const onSubmit: SubmitHandler<PasswordInputs> = (data, event) =>
    // eslint-disable-next-line no-console
    console.log(data, event)

  return (
    <CardWithHeading name="Change Password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          field="oldPassword"
          displayName="Old Password"
          register={register}
          type="password"
          required
          error={errors.oldPassword}
        />
        <FormInput
          field="newPassword"
          displayName="New Password"
          register={register}
          type="password"
          required
          error={errors.newPassword}
        />
        <FormInput
          field="confirmPassword"
          displayName="Confirm New Password"
          register={register}
          type="password"
          required
          error={errors.confirmPassword}
        />
        <FormButton name="Update" isSubmitting={isSubmitting} />
      </form>
    </CardWithHeading>
  )
}

const SettingsAccount: NextPage = () => {
  return (
    <SettingsLayout>
      <PasswordCard />
      <DeletionCard />
    </SettingsLayout>
  )
}

export default SettingsAccount
