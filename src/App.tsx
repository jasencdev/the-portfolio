import { Container } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Index from './components/pages/index';
import Portfolio from './components/pages/portfolio';
import Blog from './components/pages/blog';
import About from './components/pages/about';
import './App.css'


function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/Portfolio' element={<Portfolio />} />
          <Route path='/Blog' element={<Blog />} />
          <Route path='/About' element={<About />} />
          <Route path="/posts/:postId" element={<BlogPost />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      </Container>
  )
}

export default App
