import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const URL = `${process.env.REACT_APP_BACKEND_URI}/recipes`;
      const response = await fetch(URL);
      const data = await response.json();
      setRecipes(data);
    };

    fetchData();
  }, []);

  const display = recipes.map((recipe) => {
    return (
      <div key={recipe._id} className="col-lg-4 col-md-6 mb-4">
        <div className="card" style={{ width: "100%" }}>
          <img
            src={recipe.image}
            className="card-img-top"
            alt={recipe.name}
          />
          <div className="card-body">
            <h5 className="card-title">{recipe.name}</h5>
            <Link to={`/recipes/${recipe._id}`} className="btn btn-primary">
              View Recipe
            </Link>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <h1>Recipe Database</h1>
      <div className="row">{display}</div>
    </div>
  );
}

export default Home;
