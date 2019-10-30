import Assets from './Assets'
import Header from './Header'

export default ({ children }) => (
  <main>
    <Assets />
    <Header />
    <main>
      <div className="container py-5">
        {children}
      </div>
    </main>
  </main>
)
