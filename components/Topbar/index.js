import React from 'react'
import {
  Grid,
  Flex,
  Heading,
  Button,
  ButtonGroup,
  useColorMode,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  FormLabel,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react'
import { FiLogOut, FiSun, FiMoon, FiPlus } from 'react-icons/fi'

const Topbar = ({ handleNew, handleSignOut }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const btnRef = React.useRef()

  return (
    <Grid templateColumns="repeat(2, 1fr)" alignItems="center" mt="7" mb="10">
      <Heading>URL Shortener</Heading>

      <Flex justifyContent="flex-end">
        <ButtonGroup>
          <Button
            ref={btnRef}
            size="sm"
            onClick={onOpen}
            leftIcon={<FiPlus />}
            colorScheme="teal"
          >
            Novo
          </Button>
          <Button size="sm" onClick={toggleColorMode}>
            {colorMode === 'light' ? <FiMoon /> : <FiSun />}
          </Button>
          <Button size="sm" onClick={handleSignOut} leftIcon={<FiLogOut />}>
            Sair
          </Button>
        </ButtonGroup>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Criar novo link</DrawerHeader>

            <DrawerBody>
              <Box>
                <FormLabel htmlFor="url">Url</FormLabel>
                <InputGroup>
                  <InputLeftAddon>http://</InputLeftAddon>
                  <Input type="url" id="url" placeholder="google.com" />
                </InputGroup>
              </Box>
            </DrawerBody>

            <DrawerFooter>
              <Button mr={3} variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="teal" onClick={handleNew}>
                Criar
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Grid>
  )
}

export default Topbar
