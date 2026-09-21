import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ShowcaseFeed from './pages/ShowcaseFeed'
import ProjectDetail from './pages/ProjectDetail'
import ContributorDashboard from './pages/ContributorDashboard'
import Bookmarks from './pages/Bookmarks'
import AbandonedProjects from './pages/AbandonedProjects'
import AddProject from './pages/AddProject'

export default function App() {
  return (
    <div className="app min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<ShowcaseFeed />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/dashboard" element={<ContributorDashboard />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/abandoned" element={<AbandonedProjects />} />
          <Route path="/add" element={<AddProject />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
