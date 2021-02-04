import { Flex, Heading } from '@chakra-ui/react'

const Error = ({ white = false, message }) => {
  return (
    <Flex
      position="fixed"
      left="0"
      right="0"
      top="0"
      bottom="0"
      height="100%"
      justifyContent="center"
      alignItems="center"
      bg={white && 'white'}
    >
      <Heading size="md">{message}</Heading>
    </Flex>
  )
}

export default Error
