
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";
import AppRoutes from "./Router";
function App() {

  return (
    <>
      <AppRoutes />
      <ToastContainer />
    </>

  )
}

export default App
