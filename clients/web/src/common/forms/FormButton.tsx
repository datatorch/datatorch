import { Button } from '@chakra-ui/button'

interface FormButtonProps {
  name: string
  isSubmitting: boolean
}

export const FormButton: React.FC<FormButtonProps> = ({
  isSubmitting,
  name
}) => {
  return (
    <Button type="submit" mt={3} colorScheme="teal" isLoading={isSubmitting}>
      {name}
    </Button>
  )
}