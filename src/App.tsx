import { CssVarsProvider } from '@mui/joy';
import './App.css';
import { AppRouter } from './router/Router';
import { BrowserRouter } from 'react-router';

function App() {

  return (
    <CssVarsProvider>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </CssVarsProvider>
  )
}

export default App
