import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/userContext.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <UserProvider>
            <ToastContainer theme="dark" />
            <App />
        </UserProvider>
    </QueryClientProvider>

)
