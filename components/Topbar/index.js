import React, { useState } from 'react'
import cookie from 'js-cookie'
import axios from 'axios'
import {
  Grid,
  Flex,
  Heading,
  Button,
  ButtonGroup,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import { FiLogOut, FiSun, FiMoon, FiPlus } from 'react-icons/fi'

import { Drawer } from 'components'

const Topbar = ({ handleSignOut }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const [origin, setOrigin] = useState('')
  const drawerNewRef = React.useRef()

  const handleNewShortcut = async () => {
    // TODO: validação http/https

    const token = cookie.get('token')

    const shortcut = await axios.post(
      `/api/shortcuts`,
      {
        origin: 'http://' + origin,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    onClose()

    // TODO: mudate and update state
  }

  return (
    <Grid templateColumns="repeat(2, 1fr)" alignItems="center" mt="7" mb="10">
      <Heading>URL Shortener</Heading>

      <Flex justifyContent="flex-end">
        <ButtonGroup>
          <Button
            ref={drawerNewRef}
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
        title="Criar novo"
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleNewShortcut}
        ref={drawerNewRef}
        inputValue={origin}
        setInputValue={setOrigin}
      />
    </Grid>
  )
}

export default Topbar
