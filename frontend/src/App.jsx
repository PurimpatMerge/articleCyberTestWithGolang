import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ArticleContent from "./pages/ArticleContent";
import AddArticle from "./pages/AddArticle";
import EditArticle from "./pages/EditArticle";
import EditUsers from "./pages/EditUsers"
import Editarticlebody from "./components/editarticle/Editarticlebody";
import Register from "./pages/Register";
const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/articlecontent/:id" element={<ArticleContent />} />
        <Route path="/addarticle" element={<AddArticle />} />
        <Route path="/editarticle" element={<EditArticle />} />
        <Route path="/editusers" element={<EditUsers />} />
        <Route path="/editarticlebody/:id" element={<Editarticlebody />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
