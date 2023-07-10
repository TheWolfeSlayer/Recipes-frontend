import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
            <div>
                <h1>{recipe.name}</h1>
                <img src={recipe.image} alt={recipe.name} height={300} />
                <div>
                    <button onClick={() => navigate(`/recipe/update/${id}`)}>Edit</button>
                    <button onClick={deleteRecipe}>Delete</button>
                </div>
            </div>
        )

    return (
        <div>
            {display}
        </div>
    )
}

export default Recipe