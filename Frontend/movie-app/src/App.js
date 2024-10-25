import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SignUp from './Components/SignUp/SignUp';
import SignIn from './Components/SignIn/SignIn';
import CreateMovie from './Components/CreateMovie/CreateMovie';
import MovieList from "./Components/MovieList/MovieList";
import EditMovie from "./Components/EditMovie/EditMovie";


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/movielist" element={<MovieList />} />
        <Route path="/createmovie" element={<CreateMovie />} />
        <Route path="/editmovie/:id" element={<EditMovie />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
