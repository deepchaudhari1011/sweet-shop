import { Toaster } from 'react-hot-toast'
import 'bootstrap/dist/css/bootstrap.min.css';
import Itempage from './components/itempage';
import Home from './components/home';
import { Routes , Route } from 'react-router-dom';
import AdminPage from './components/adminpage';

function App() {
  return (
    <>

<Toaster position='top-center'></Toaster>

 <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/adminpage" element={<AdminPage />} />
      <Route path="/itempage" element={<Itempage />} />
    </Routes>
    </>
  )
}

export default App
