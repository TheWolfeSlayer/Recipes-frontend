import { useState } from "react";
import { useNavigate } from "react-router-dom";

function New() {
const navigate = useNavigate()

const [recipeInput, setRecipeInput] = useState({
    name: '',
    image: '',
    ingredients: []
})

const handleChange = (e) => {
    const value = e.target.value;
        setRecipeInput({
            ...recipeInput,
            [e.target.name]: value
        });
}

const ingredient = document.getElementById('ingredient')

let ingredients = []

function addIngredient() {
    if (ingredient.value!== '') {
        ingredients.push(ingredient.value)
        ingredient.value = ''
    } else {}
    console.log(ingredients)
}

const handleSubmit = async (e) => {
    e.preventDefault()
    const URL = `${process.env.REACT_APP_BACKEND_URI}/recipes`
    console.log('recipe input', recipeInput)
    const response = await fetch(URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(recipeInput)
})
const data = await response.json()
    console.log('response', data)
    navigate('/')
}

return (
    <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={recipeInput.name} name='name' placeholder='name' />
        <input onChange={handleChange} value={recipeInput.image} name='image' placeholder='image' />
        <input onChange={handleChange} id='ingredient' value={recipeInput.ingredients} name='ingredients' placeholder='ingredients' />
        <input type='button' onClick={addIngredient} value='Add Ingredient' />
        

        {/* <button onClick={addIngredient}>Add Ingredient</button> */}
        <input type='submit' />
    </form>
    )
}

export default New