import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
      <Card style={{ width: '18rem', margin: '10px', height: '100%' }}>
        <Card.Img variant="top" src={recipe.image} style={{ height: '200px', objectFit: 'cover', paddingTop: '10px' }} />
        <Card.Body style={{ height: '120px' }}>
          <Card.Title>{recipe.name}</Card.Title>
          <Button variant="primary" class="btn btn-primary btn-sm">
            <Link to={`/recipes/${recipe._id}`} className="btn btn-primary">
              View Recipe
            </Link>
          </Button>
        </Card.Body>
      </Card>
    );
  });

  return (
    <div className="container">
      <h1>Recipe HomePage</h1>
      <div className="row">{display}</div>
    </div>
  );
}

export default Home;
