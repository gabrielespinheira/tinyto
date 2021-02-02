import { Spinner, Flex } from '@chakra-ui/react'

const Loading = () => {
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
    >
      <Spinner size="xl" />
    </Flex>
  )
}

export default Loading
