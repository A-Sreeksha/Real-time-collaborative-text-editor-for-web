import TextEditor  from "./TextEditor";
import HomePage from "./HomePage";
import RoomPage from "./RoomPage";
import {
  BrowserRouter  as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'

//import {v4 as uuidV4} from 'uuid'
const { v4: uuidv4 } = require('uuid');
function App() {
  const id=uuidv4();
  return (
    <Router>
      <Routes>
        {/* <Route path="/" exact element={<Navigate to={`/documents/${id}`}/>}/> */}
        <Route path="/" element={<HomePage/>}></Route>
        {/* <Route path="/documents/:id" element={<TextEditor />}></Route> */}
        <Route path="/room/:roomId" element={[<RoomPage/>,<TextEditor/>]}></Route>
  </Routes>
  </Router>  
  )
}

export default App;
