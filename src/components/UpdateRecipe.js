import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function UpdateRecipe() {
  const navigate = useNavigate();

  const [recipeInput, setRecipeInput] = useState({
    ingredients: [],
    steps: [],
  });

  const [ingredientInput, setIngredientInput] = useState("");
  const [stepInput, setStepInput] = useState("");

  const { id } = useParams();
  const URL = `${process.env.REACT_APP_BACKEND_URI}/recipes/${id}`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(URL);
      const data = await response.json();
      setRecipeInput(data);
    };

    fetchData();
  }, [id, URL]);

  const handleChange = (e) => {
    const value = e.target.value;
    setRecipeInput({
      ...recipeInput,
      [e.target.name]: value,
    });
  };

  const handleIngredientChange = (e) => {
    setIngredientInput(e.target.value);
  };

  const handleStepChange = (e) => {
    setStepInput(e.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredientInput) {
      setRecipeInput({
        ...recipeInput,
        ingredients: [...recipeInput.ingredients, ingredientInput],
      });
      setIngredientInput("");
    }
  };

  const handleAddStep = () => {
    if (stepInput) {
      setRecipeInput((prevRecipeInput) => {
        const updatedSteps = [...prevRecipeInput.steps, stepInput];
  
        return {
          ...prevRecipeInput,
          steps: updatedSteps,
        };
      });
  
      setStepInput("");
    }
  };

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = [...recipeInput.ingredients];
    updatedIngredients.splice(index, 1);
    setRecipeInput({
      ...recipeInput,
      ingredients: updatedIngredients,
    });
  };

  const handleDeleteStep = (index) => {
    const updatedSteps = [...recipeInput.steps];
    updatedSteps.splice(index, 1);
  
    // Renumber the steps
  
    setRecipeInput({
      ...recipeInput,
      steps: updatedSteps,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (recipeInput.steps.length === 0 || recipeInput.ingredients.length === 0) {
      return(
        console.log('enter atleast 1 step and ingredient')
      )
    } 
    else {
      const response = await fetch(URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recipeInput),
      });
      if (response.status !== 204) console.log("error!");
      navigate(`/recipes/${id}`);
    }
  };

  const display = recipeInput && (
    <Form onSubmit={handleSubmit} className="input">
      <Form.Group className="mb-3" >
        <Form.Label>Enter recipe name</Form.Label>
        <Form.Control placeholder="recipe name" />
      </Form.Group>

      <div>
        <ul>
        {/* Displaying existing ingredients */}
        {recipeInput.ingredients.map((ingredient, index) => (
          <div key={index}>
            <li>{ingredient}</li>
            <Button variant="danger" type="button" onClick={() => handleDeleteIngredient(index)}> Delete Ingredient </Button>
          </div>
        ))}
        </ul>
      </div>

      <Form.Group className="mb-3" >
        <Form.Label>Enter ingredients</Form.Label>
        <Form.Control placeholder="Enter ingredient" onChange={handleIngredientChange}/>
      </Form.Group>
      <Button variant="success" onClick={handleAddIngredient}> Add Ingredient </Button>

      <div>
        {/* Displaying existing steps */}
        <ol>
          {recipeInput.steps.map((step, index) => (
            <div key={index}>
              <li>{step}</li>
              <Button variant="danger" type="button" onClick={() => handleDeleteStep(index)}> Delete Step </Button>
            </div>
          ))}
        </ol>
      </div>

      <Form.Group className="mb-3" >
        <Form.Label>Enter recipe steps</Form.Label>
        <Form.Control placeholder="Enter step" onChange={handleStepChange}/>
        </Form.Group>
      <Button variant="success" onClick={handleAddStep}> Add Step </Button>

      <Form.Group className="mb-3" >
        <Form.Label>Enter recipe image</Form.Label>
        <Form.Control placeholder="Enter image link" onChange={handleChange} value={recipeInput.image}/>
      </Form.Group>
        
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );

  return <div>{display}</div>;
}

export default UpdateRecipe;