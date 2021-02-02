import { SWRConfig } from 'swr'
import { ChakraProvider } from '@chakra-ui/react'

import theme from 'styles/theme'
import fetcher from 'services/fetcher'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
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
