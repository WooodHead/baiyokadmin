import '../styles/styles.scss'
import 'react-day-picker/lib/style.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import Page from '../components/Page'
import Sidebar from '../components/sidebar/Sidebar'
function MyApp({ Component, pageProps }) {
  return (
    <Page>
      {/* <Sidebar /> */}
      <Component {...pageProps} />
    </Page>
  )
}

export default MyApp
