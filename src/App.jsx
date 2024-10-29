import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './Header'
import Table from './Table'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <Table />
      </div>
    </>
  )
}

export default App
