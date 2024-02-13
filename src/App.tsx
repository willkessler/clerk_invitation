import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { ClerkProvider } from '@clerk/clerk-react'
import { MantineProvider } from '@mantine/core';
import { dark } from '@clerk/themes';
import UserAuthentication from './components/UserAuthentication';
import './App.css'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';


// Import your publishable key for Clerk
const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
 
if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MantineProvider>
    <ClerkProvider 
      publishableKey={CLERK_PUBLISHABLE_KEY}
      appearance={{
        baseTheme: dark,
        signIn: { baseTheme: 'neobrutalism' }
      }}
    >
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <UserAuthentication />
      </ClerkProvider>    
    </MantineProvider>
    </>
  )
}

export default App
