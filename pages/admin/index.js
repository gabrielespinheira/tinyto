import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import axios from 'axios'
import { Flex, Box, useColorModeValue } from '@chakra-ui/react'

import { Loading, Topbar, Table } from 'components'
import { logout } from 'sdk/auth'

export default function Admin() {
  const router = useRouter()
  const { data: shortcuts, error } = useSWR('/shortcuts/list')

  const handleSignOut = () => {
    logout().then(() => {
      return router.push('/')
    })
  }

  if (!shortcuts) return <Loading />
  if (error) return <div>Error: {error}</div>

  return (
    <>
      <Head>
        <title>URL Shortener</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex maxW="900px" ml="auto" mr="auto" flexDirection="column">
        <Topbar handleSignOut={handleSignOut} />

        <Box bg={useColorModeValue('white', 'gray.700')} borderRadius="md">
          <Table shortcuts={shortcuts} />
        </Box>
      </Flex>
    </>
  )
}
