import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react'

const Dialog = ({ ref, title, message, isOpen, onClose, handleSubmit }) => {
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={ref} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button size="sm" ref={ref} onClick={onClose}>
              Cancelar
            </Button>
            <Button size="sm" colorScheme="red" onClick={handleSubmit} ml={3}>
              Excluir
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default Dialog
