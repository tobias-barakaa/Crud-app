import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

import TaskList from './components/TaskList';

function App() {
  return (
    <div className="app">
      <div className='task-container'>
        <TaskList />
      </div>
     <ToastContainer />
    </div> 
  );
}

export default App;
