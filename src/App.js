import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
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
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/SomethingWentWrong" element={<SomethingWentWrong />} />
            </Routes>
        </div>
      </>
    )
}

export default App;