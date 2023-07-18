import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function Recipe() {
  const navigate = useNavigate()

  const [recipe, setRecipe] = useState(null)

  const { id } = useParams()
  const URL = `${process.env.REACT_APP_BACKEND_URI}/recipes/${id}`
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(URL)
      const data = await response.json()
      setRecipe(data)
    }

    fetchData()
  }, [id, URL])

  const deleteRecipe = async () => {
    const response = await fetch(URL, {
      method: 'DELETE'
    })
    if (response.status !== 204) console.log('error') // add error handling later
    navigate('/')
  }

  const display = recipe && (
    <div className="Recipe-Page">
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} height={300} />
      <div>
        <Button variant="success" onClick={() => navigate(`/recipes/update/${id}`)}>Edit</Button>
        <Button variant="danger" onClick={deleteRecipe}>Delete</Button>
      </div>
      <h2>Ingredients Needed</h2>
      <ul className="ingredients">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Steps</h2>
      <ol className="steps">
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  )

  return (
      <div>
          {display}
      </div>
  )
}

export default Recipe
