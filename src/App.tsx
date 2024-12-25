import { Container } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Index from './components/pages/index';
import './App.css'


function App() {
  

  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      </Container>
  )
}

export default App
