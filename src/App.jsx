import Community from "./pages/Community/Community"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import New from "./pages/Community/New"

const hello = 'Hi';
console.log(hello)

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Community />} />
        <Route path="/new" element={<New />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
