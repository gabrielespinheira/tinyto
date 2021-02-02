import { SWRConfig } from 'swr'
import { ChakraProvider } from '@chakra-ui/react'

import fetcher from 'services/fetcher'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <SWRConfig
        value={{
          refreshInterval: 0,
          revalidateOnFocus: false,
          revalidateOnReconnect: true,
          refreshWhenHidden: false,
          refreshWhenOffline: false,
          fetcher: fetcher,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </ChakraProvider>
  )
}

export default MyApp
