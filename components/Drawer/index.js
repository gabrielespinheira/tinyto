import {
  Drawer as ChakraDrawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Box,
  Button,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  DrawerFooter,
} from '@chakra-ui/react'

const Drawer = ({
  title,
  isOpen,
  onClose,
  handleSubmit,
  ref,
  inputValue,
  setInputValue,
}) => {
  return (
    <ChakraDrawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={ref}
    >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton name="Fechar" />
          <DrawerHeader>{title}</DrawerHeader>

          <DrawerBody>
            <Box>
              <FormLabel htmlFor="url">URL</FormLabel>
              <InputGroup>
                <InputLeftAddon>http://</InputLeftAddon>
                <Input
                  type="url"
                  id="url"
                  placeholder="google.com"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </InputGroup>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button
              size="sm"
              mr={3}
              variant="outline"
              onClick={onClose}
              name="Cancelar"
            >
              Cancelar
            </Button>
            <Button
              size="sm"
              colorScheme="cyan"
              onClick={handleSubmit}
              name="Salvar"
            >
              Salvar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </ChakraDrawer>
  )
}

export default Drawer
