import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateRecipe() {
    const navigate = useNavigate()

    const [recipeInput, setRecipeInput] = useState(null)
    
    const { id } = useParams()
    const URL = `${process.env.REACT_APP_BACKEND_URI}/recipes/${id}`

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(URL)
            const data = await response.json()
            setRecipeInput(data)
        }

        fetchData()
    }, [id, URL])

    const handleChange = (e) => {
        const value = e.target.value;
        setRecipeInput({
            ...recipeInput,
            [e.target.name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recipeInput)
        })
        if (response.status !== 204) console.log('error!') // add error handling later
        navigate(`/recipe/${id}`)
    }

    const display = recipeInput && (
        <form onSubmit={handleSubmit}>
            <input required onChange={handleChange} value={recipeInput.name} name='name' placeholder='name' />
            <input onChange={handleChange} value={recipeInput.image} name='image' placeholder='image' />
            <input onChange={handleChange} value={recipeInput.ingredients} name='ingredients' placeholder='ingredients' />
            <input type='submit' />
        </form>
    )

    return (
        <div>
            {display}
        </div>
    )
}

export default UpdateRecipe