import './App.css'
import Header from './components/Header'
import HeroCards from './components/HeroCards'
import Table from './components/Table'
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom'
import View from './components/View'

function App () {
  return (
    <div className='App-header'>
      <Header/>
      <HeroCards/>
      <Router>
        <Routes>
					<Route path="/" element={<Navigate replace to="/home" />} />
          <Route path='/home' element={<Table/>} />
          <Route exact path='/view' element={<View/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
