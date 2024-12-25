import { Container } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ViteLanding from './components/ViteLanding';
import './App.css'


function App() {
  

  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ViteLanding />} />
        </Routes>
      </BrowserRouter>
    </ Container>
  )
}

export default App
