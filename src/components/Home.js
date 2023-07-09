import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const URL = `${process.env.REACT_APP_BACKEND_URI}/recipes`
      const response = await fetch(URL)
      const data = await response.json()
      setRecipes(data)
    }

    fetchData()
  }, [])

  const display = recipes.map(recipe => {
    return (
      <div key={recipe._id}>
        <Link to={`/recipes/${recipe._id}`}>
          <p>{recipe.name}</p>
        </Link>
      </div>
    )
  })

  return (
    <div>
      <h1>Recipe Database</h1>
      {display}
    </div>
  );
}

export default Home;