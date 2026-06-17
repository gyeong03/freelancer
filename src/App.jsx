import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Feed from './pages/Feed'
import MyPage from './pages/MyPage'
import Education from './pages/Education'
import './index.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <Link to="/" className="logo">DesignConnect</Link>
          <nav>
            <Link to="/education" className="btn-secondary" style={{ marginRight: '1rem', border: 'none' }}>교육 센터</Link>
            <Link to="/feed" className="btn-secondary" style={{ marginRight: '1rem' }}>피드 보기</Link>
            <Link to="/mypage" className="btn-secondary" style={{ marginRight: '1rem' }}>마이페이지</Link>
            <Link to="/login" className="btn-primary">로그인 / 가입</Link>
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/education" element={<Education />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
