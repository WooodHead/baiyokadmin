import '../styles/styles.scss'
import 'react-day-picker/lib/style.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import Page from '../components/Page'

function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  )
}

export default MyApp
