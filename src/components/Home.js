import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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

  const display = (
    <Row xs={1} md={2} lg={3} className="g-4">
      {recipes.map((recipe) => (
        <Col key={recipe._id} className="col">
          <Card>
            <Card.Img variant="top" src={recipe.image} style={{ height: '18rem', objectFit: 'cover' }}  />
            <Card.Body>
              <Card.Title>{recipe.name}</Card.Title>
              <Button variant="primary" className="btn btn-primary btn-sm">
                <Link to={`/recipes/${recipe._id}`} className="btn btn-primary">
                  View Recipe
                </Link>
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <div className="container">
      <h1>Recipe HomePage</h1>
      <div className="row">
        {display}
      </div>
    </div>
  );
}

export default Home;
