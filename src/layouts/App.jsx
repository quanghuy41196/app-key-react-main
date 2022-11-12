import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthInit } from '../contexts'
import { LayoutInit } from './LayoutInit'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthInit>
      <Outlet />
      <LayoutInit />
    </AuthInit>
  )
}

export default App
