import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

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
    <form onSubmit={handleSubmit}>
      <input required onChange={handleChange} value={recipeInput.name} name="name" placeholder="Name" />

      <div>
        {/* Displaying existing ingredients */}
        {recipeInput.ingredients.map((ingredient, index) => (
          <div key={index}>
            {ingredient} | 
            <Button variant="danger" type="button" onClick={() => handleDeleteIngredient(index)}> Delete Ingredient </Button>
          </div>
        ))}
      </div>

      <input onChange={handleIngredientChange} value={ingredientInput} placeholder="Enter an ingredient" />
      <button type="button" onClick={handleAddIngredient}> Add Ingredient </button>

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

      <input onChange={handleStepChange} value={stepInput} placeholder="Enter a step"/>
      <button type="button" onClick={handleAddStep}> Add Step </button>

<div>
    <input onChange={handleChange} value={recipeInput.image} name="image" placeholder="Image" />
</div>
      <Button variant="success" as="input" type="submit" value="Submit" />
    </form>
  );

  return <div>{display}</div>;
}

export default UpdateRecipe;