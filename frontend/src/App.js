import JanitorsList from './pages/JanitorsList'
import MCPsList from './pages/MCPsList'
import {Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <>
    <Routes>
      <Route path='/route/:id' element={<MCPsList/>}/>
      <Route path='/mcp/:id' element={<JanitorsList/>}/>
    </Routes>
    </>
  );
}

export default App;
