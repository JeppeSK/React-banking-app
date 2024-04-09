import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Account from './pages/Account';
import Transactions from './pages/Transactions';
import Register_Card from './pages/Register_Card';
import Signup from './pages/Signup';
import SomethingWentWrong from './pages/SomethingWentWrong';
import { Route, Routes } from 'react-router-dom';

function App() {
    return (
      <>
        <Navbar />
        <div className="container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Signup" element={<Signup />} />
                <Route path="/Account" element={<Account />} />
                <Route path="/Account/Transactions" element={<Transactions />} />
                <Route path="/Account/Register_Card" element={<Register_Card />} />
                <Route path="/SomethingWentWrong" element={<SomethingWentWrong />} />
            </Routes>
        </div>
      </>
    )
}

export default App;