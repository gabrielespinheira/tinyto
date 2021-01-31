import { SWRConfig } from 'swr'
import fetcher from 'services/fetcher'

function MyApp({ Component, pageProps }) {
  return (
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
  )
}

export default MyApp
