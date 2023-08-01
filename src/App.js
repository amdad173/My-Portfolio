import {Routes, Route} from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Private from './components/Route/Private';
import ErrorPage from './pages/ErrorPage';
import CreateProject from './pages/CreateProjects';
import Projects from './pages/Projects';
import UpdateProject from './pages/UpdateProject';

function App() {
  return (
    <>
     <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />

        <Route path='/admin' element={<Private/>}>
          <Route path='profile' element={<Profile/>} />
          <Route path='projects' element={<Projects/>} />
          <Route path='create-project' element={<CreateProject/>} />
          <Route path='update-project/:id' element={<UpdateProject/>} />

        </Route>

        <Route path='/*' element={<ErrorPage/>} />

     </Routes>
    </>
  );
}

export default App;
