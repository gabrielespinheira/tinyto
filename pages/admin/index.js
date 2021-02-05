import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Flex, Box, useColorModeValue } from '@chakra-ui/react'

import { Loading, Topbar, Table } from 'components'
import { logout } from 'sdk/auth'

export default function Admin() {
  const drawerNewRef = useRef()
  const drawerEditRef = useRef()
  const confirmDialogRef = useRef()
  const router = useRouter()
  const { data: shortcuts, error } = useSWR('/shortcuts/list')

  const handleSignOut = () => {
    logout().then(() => {
      return router.push('/')
    })
  }

  return (
    <Flex maxW="900px" ml="auto" mr="auto" flexDirection="column">
      <Topbar handleSignOut={handleSignOut} drawerNewRef={drawerNewRef} />

      <Box bg={useColorModeValue('white', 'gray.700')} borderRadius="md">
        {!shortcuts || error ? (
          <Loading />
        ) : (
          <Table
            shortcuts={shortcuts}
            drawerEditRef={drawerEditRef}
            confirmDialogRef={confirmDialogRef}
          />
        )}
      </Box>
    </Flex>
  )
}
