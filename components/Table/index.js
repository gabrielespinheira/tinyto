import React, { useState, useRef } from 'react'
import cookie from 'js-cookie'
import axios from 'axios'
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  ButtonGroup,
  useDisclosure,
} from '@chakra-ui/react'
import { FiEdit3, FiTrash, FiSend } from 'react-icons/fi'

import { Drawer, Dialog } from 'components'

const Table = ({ shortcuts }) => {
  const [code, setCode] = useState()
  const [origin, setOrigin] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const drawerEditRef = useRef()
  const confirmDialogRef = useRef()

  const handleEdit = async () => {
    const token = cookie.get('token')

    const edited = await axios.put(
      `/api/shortcuts/${code}`,
      {
        origin: 'http://' + origin,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    if (edited.status !== 200) {
      // TODO: error
    }

    onClose()

    // TODO: mudate and update state
  }

  const handleDelete = async () => {
    const deleted = await axios.delete(`/api/shortcuts/${code}`)

    if (deleted.status !== 200) {
      // TODO: error
    }

    setIsDialogOpen(false)

    // TODO: mutate SWR list
  }

  const handleOpen = (id) => {
    return window.open(`/link/${id}`)
  }

  const originWithoutHttp = (origin) => {
    return origin.replace('http://', '').replace('https://', '')
  }

  return (
    <>
      <ChakraTable variant="simple">
        <Thead>
          <Tr>
            <Th>Links</Th>
            <Th>Acessos</Th>
            <Th>Ação</Th>
          </Tr>
        </Thead>
        <Tbody>
          {shortcuts &&
            shortcuts.map((shortcut) => (
              <Tr key={shortcut.code}>
                <Td width="100%">{shortcut.origin}</Td>
                <Td>{shortcut.count}</Td>
                <Td>
                  <ButtonGroup variant="outline" spacing="3">
                    <Button
                      size="sm"
                      ref={drawerEditRef}
                      onClick={() => {
                        setCode(shortcut.code)
                        setOrigin(originWithoutHttp(shortcut.origin))
                        onOpen()
                      }}
                      leftIcon={<FiEdit3 />}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setCode(shortcut.code)
                        setIsDialogOpen(true)
                      }}
                      leftIcon={<FiTrash />}
                    >
                      Excluir
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleOpen(shortcut.code)}
                      leftIcon={<FiSend />}
                    >
                      Acessar
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </ChakraTable>

      <Drawer
        title="Editar"
        isOpen={isOpen}
        onClose={onClose}
        handleSubmit={handleEdit}
        ref={drawerEditRef}
        inputValue={origin}
        setInputValue={setOrigin}
      />

      <Dialog
        title="Excluir"
        message="Tem certeza? Você não poderá desfazer esta ação."
        ref={confirmDialogRef}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        handleSubmit={handleDelete}
      />
    </>
  )
}

export default Table
