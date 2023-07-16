import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavigationBar from "./components/Navbar";
import Home from "./components/Home";
import Recipe from "./components/Recipe";
import New from "./components/New";
import UpdateRecipe from "./components/UpdateRecipe";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
     
      <Router> 
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes/:id" element={<Recipe />} />
          <Route path="/recipes/update/:id" element={<UpdateRecipe />} />
          <Route path="/new" element={<New />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;