import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  ButtonGroup,
} from '@chakra-ui/react'
import { FiEdit3, FiTrash, FiSend } from 'react-icons/fi'

const Table = ({ shortcuts, handleEdit, handleDelete, handleOpen }) => {
  return (
    <ChakraTable variant="simple">
      <Thead>
        <Tr>
          <Th>Link</Th>
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
                    onClick={() => handleEdit(shortcut.code)}
                    leftIcon={<FiEdit3 />}
                  >
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDelete(shortcut.code)}
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
  )
}

export default Table
