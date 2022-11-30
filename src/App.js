import JanitorsList from './pages/JanitorsList/JanitorsList'
import MCPsList from './pages/MCPsList/MCPsList'
import {Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <>
    <Routes>
      <Route path='/route' element={<MCPsList/>}/>
      <Route path='/route/:mcpId' element={<JanitorsList/>}/>
    </Routes>
    </>
  );
}

export default App;
