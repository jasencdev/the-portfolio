import { Container } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Index from './components/main/index';
import Portfolio from './components/portfolio/portfolio';
import Blog from './components/blog/blog';
import About from './components/about/about';
import Posts from './components/blog/posts';
import Projects from './components/portfolio/projects-page';

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
          <Route path="/Blog/:postId" element={<Posts />} />
          <Route path="/Portfolio/:postId" element={<Projects />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      </Container>
  )
}

export default App
