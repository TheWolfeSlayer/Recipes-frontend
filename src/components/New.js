import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function New() {
  const navigate = useNavigate();

  const [recipeInput, setRecipeInput] = useState({
    name: "",
    ingredients: [],
    steps: [],
    image: "",
  });

  const [ingredientInput, setIngredientInput] = useState(""); // New state for individual ingredient input
  const [stepInput, setStepInput] = useState(""); // New state for individual step input

  const handleChange = (e) => {
    const value = e.target.value;
    setRecipeInput({
      ...recipeInput,
      [e.target.name]: value,
    });
  };

  //Adding each individual ingredient
  const handleIngredientChange = (e) => {
    setIngredientInput(e.target.value);
  };

  //Adding each individual step
  const handleStepChange = (e) => {
    setStepInput(e.target.value);
  };

  const handleAddIngredient = () => {
    if (ingredientInput) {
      setRecipeInput({
        ...recipeInput,
        ingredients: [...recipeInput.ingredients, ingredientInput], // Add new ingredient to the array
      });
      setIngredientInput(""); // Clear the ingredient input field
    }
  };

  const handleAddStep = () => {
    if (stepInput) {
      setRecipeInput((prevRecipeInput) => {
        const updatedSteps = [...prevRecipeInput.steps, `${stepInput}`];
        
        return {
          ...prevRecipeInput,
          steps: updatedSteps, // Add numbered step to the array + Add new step to the array
        };
      });
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

    setRecipeInput({
      ...recipeInput,
      steps: updatedSteps,
    });
  };

  const stepCheck = async (e) => {
    if (recipeInput.step.length===0) {
      return(
        console.log('enter atleast 1 step')
      )
    } else {
      return (handleAddStep)
      
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = `${process.env.REACT_APP_BACKEND_URI}/recipes`;
    console.log("recipe input", recipeInput);
    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeInput),
    });
    const data = await response.json();
    console.log("response", data);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} value={recipeInput.name} name="name" placeholder="Name" required/>

      <div>
        {/* Displaying existing ingredients */}
        {recipeInput.ingredients.map((ingredient, index) => (
          <div key={index}>
            <p>{ingredient}</p>
            <Button variant="danger" type="button" onClick={() => handleDeleteIngredient(index)}> Delete Ingredient </Button>
          </div>
        ))}
      </div>

      <input onChange={handleIngredientChange} value={ingredientInput} placeholder="Enter an ingredient" />
      <Button variant="success" type="button" onClick={handleAddIngredient}> Add Ingredient </Button>

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
      <input onChange={handleStepChange} value={stepInput} name="Enter a step" placeholder="Enter step"/>
      <Button variant="success" type="button" onClick={handleAddStep}> Add Step </Button>

    <div>
      <input onChange={handleChange} value={recipeInput.image} name="image" placeholder="Image" />
    </div>
    
      <input type="submit" />
    </form>
  );
}

export default New;
