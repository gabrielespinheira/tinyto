import { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { AiOutlineGooglePlus } from 'react-icons/ai'
import { useColorModeValue, Flex, Heading, Button } from '@chakra-ui/react'
import { login, isLogged } from 'sdk/auth'

const LOGGED_ROUTE = '/admin'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (isLogged()) {
      router.push(LOGGED_ROUTE)
    }
  }, [])

  const handleSignIn = () => {
    login()
      .then(() => {
        router.push(LOGGED_ROUTE)
      })
      .catch((err) => {
        console.warn(err)
      })
  }

  return (
    <Flex
      maxW="900px"
      ml="auto"
      mr="auto"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      p={12}
    >
      <Image
        src={useColorModeValue('/link.svg', '/link-white.svg')}
        width="70"
        height="70"
        color="red"
      />

      <Heading mt="16" mb="7">
        {process.env.NEXT_PUBLIC_PROJECT_NAME}
      </Heading>

      <Button
        onClick={handleSignIn}
        size="lg"
        colorScheme="teal"
        leftIcon={<AiOutlineGooglePlus size="26" />}
        name="Login com Google"
      >
        Login com Google
      </Button>
    </Flex>
  )
}
