import Hero from "./sections/Hero"
import About from "./sections/About"
import Work from "./sections/Work"
import Services from "./sections/Services"
import Clients from "./sections/Clients"
import Contact from "./sections/Contact"
import Footer from "./sections/Footer"

import Cursor from "./components/Cursor"
import Navbar from "./components/Navbar"
import FooterNav from "./components/FooterNav"

function App() {
  return (
    <>
      <Cursor />
      <Navbar />

      <Hero />
      <About />
      <Work />
      <Services />
      <Clients />
      <Contact />
      <Footer />

      <FooterNav />
    </>
  )
}

export default App