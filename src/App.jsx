import { Route, Routes } from 'react-router-dom'
import Connection from './components/connection/connection'
import Home from './components/home/home'

const App = (props) => {

    return <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/:id' element={<Connection />}></Route>
    </Routes>
}

export default App
