import Layout from '../components/Layout'
import Audios from '../components/Audios'

export default () => (
  <Layout>
    <Audios />
    <ul className="pl-3">
      <li>
        <a href="https://www.ongaqjs.com/" target="_blank">Ongaq JS</a>
      </li>
      <li>
        <a href="https://twitter.com/kero_BIRUGE" target="_blank">
          <i className="fa fab fa-twitter fa-fw" />
          Twitter (@kero_BIRUGE)
        </a>
      </li>
      <li>
        <a href="https://github.com/comorebi-notes" target="_blank">
          <i className="fa fab fa-github fa-fw" />
          GitHub (@comorebi-notes)
        </a>
      </li>
    </ul>
  </Layout>
)
