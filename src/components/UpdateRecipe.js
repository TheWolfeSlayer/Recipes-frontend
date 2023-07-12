import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateRecipe() {
  const navigate = useNavigate();

  const [recipeInput, setRecipeInput] = useState(null);

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

  const handleStepChange = (e, index) => {
    const updatedSteps = [...recipeInput.steps];
    updatedSteps[index] = e.target.value;

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
    if (response.status !== 204) console.log("error!"); // add error handling later
    navigate(`/recipes/${id}`);
  };

  const display = recipeInput && (
    <form onSubmit={handleSubmit}>
      <input required onChange={handleChange} value={recipeInput.name} name="name" placeholder="Name" />
      <input required onChange={handleChange} value={recipeInput.ingredients} name="ingredients" placeholder="Ingredients" />

      {/* Displaying existing ingredients with delete buttons */}
      {recipeInput.ingredients.map((ingredient, index) => (
        <div key={index}>
          <p>{ingredient}</p>
          <button type="button" onClick={() => handleDeleteIngredient(index)}> Delete Ingredient </button>
        </div>
      ))}

      {/* Displaying existing steps with delete buttons */}
      {recipeInput.steps.map((step, index) => (
        <div key={index}>
          <p>{step}</p>
          <button type="button" onClick={() => handleDeleteStep(index)}> Delete Step </button>
          <input required onChange={(e) => handleStepChange(e, index)} value={step} name="steps" placeholder="Steps" />
        </div>
      ))}

      <input onChange={handleChange} value={recipeInput.image} name="image" placeholder="Image" />
      <input type="submit" />
    </form>
  );

  return <div>{display}</div>;
}

export default UpdateRecipe;