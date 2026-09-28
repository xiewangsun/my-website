import { useEffect } from 'react'
import HeroSection from './components/hero/HeroSection'
import Navbar from './components/navigation/Navbar'
import AboutSection from './components/sections/AboutSection'
import ContactSection from './components/sections/ContactSection'
import ProjectsSection from './components/sections/ProjectsSection'
import { profile } from './content/profile'

function App() {
  // 运行时同步文档标题（OG/meta 保持静态，见 add-seo design D1）
  useEffect(() => {
    document.title = `${profile.name} · 个人品牌站`
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  )
}

export default App
