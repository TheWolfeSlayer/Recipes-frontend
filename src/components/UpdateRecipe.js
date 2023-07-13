import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateRecipe() {
  const navigate = useNavigate();

  const [recipeInput, setRecipeInput] = useState({
    ingredients: [],
    steps: [],
  });

  const [ingredientInput, setIngredientInput] = useState("");
  const [stepInput, setStepInput] = useState("");
  const [stepCount, setStepCount] = useState(1); // Initialize step count to 1

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
        const updatedSteps = [...prevRecipeInput.steps, `${stepCount}. ${stepInput}`];
  
        // Renumber the steps
        const renumberedSteps = updatedSteps.map((step, idx) => {
          const stepNumber = idx + 1;
          return `${stepNumber}. ${step.substring(step.indexOf(' ') + 1)}`;
        });
  
        return {
          ...prevRecipeInput,
          steps: renumberedSteps,
        };
      });
  
      setStepInput(""); // Clear the step input field
      setStepCount((prevStepCount) => prevStepCount + 1); // Increment the step count
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
    const renumberedSteps = updatedSteps.map((step, idx) => {
      const stepNumber = idx + 1;
      return `${stepNumber}. ${step.substring(step.indexOf(". ") + 2)}`;
    });
  
    setRecipeInput({
      ...recipeInput,
      steps: renumberedSteps,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipeInput),
    });
    if (response.status !== 204) console.log("error!");
    navigate(`/recipes/${id}`);
  };

  const display = recipeInput && (
    <form onSubmit={handleSubmit}>
      <input required onChange={handleChange} value={recipeInput.name} name="name" placeholder="Name" />

      <div>
        {/* Displaying existing ingredients */}
        {recipeInput.ingredients.map((ingredient, index) => (
          <div key={index}>
            <p>{ingredient}</p>
            <button type="button" onClick={() => handleDeleteIngredient(index)}> Delete Ingredient </button>
          </div>
        ))}
      </div>

      <input onChange={handleIngredientChange} value={ingredientInput} placeholder="Enter an ingredient" />
      <button type="button" onClick={handleAddIngredient}> Add Ingredient </button>

      <div>
        {/* Displaying existing steps */}
        {recipeInput.steps.map((step, index) => (
          <div key={index}>
            <p>{step}</p>
            <button type="button" onClick={() => handleDeleteStep(index)}> Delete Step </button>
          </div>
        ))}
      </div>

      <input onChange={handleStepChange} value={stepInput} placeholder="Enter a step"/>
      <button type="button" onClick={handleAddStep}> Add Step </button>

<div>
    <input onChange={handleChange} value={recipeInput.image} name="image" placeholder="Image" />
</div>
      <input type="submit" />
    </form>
  );

  return <div>{display}</div>;
}

export default UpdateRecipe;
