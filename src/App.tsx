import { CssVarsProvider } from '@mui/joy';
import './App.css';
import { AppRouter } from './router/Router';

function App() {

  return (
    <CssVarsProvider>
      <AppRouter/>
    </CssVarsProvider>
  )
}

export default App
