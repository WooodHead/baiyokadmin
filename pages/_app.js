import '../styles/styles.scss'
import 'react-day-picker/lib/style.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import Page from '../components/Page'
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Page>
        <Component {...pageProps} />
      </Page>
    </QueryClientProvider>
  )
}

export default MyApp
