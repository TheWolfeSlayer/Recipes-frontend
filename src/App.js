import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Recipe from "./components/Recipe";
import New from "./components/New";
import UpdateRecipe from "./components/UpdateRecipe";

function App() {
  return (
    <div>
     
      <Router> 
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/recipe/update/:id" element={<UpdateRecipe />} />
          <Route path="/new" element={<New />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;