import React from 'react'
import { useParams, useLoaderData, Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa'
import RecipesPage from './RecipesPage'
import {toast} from 'react-toastify'



const RecipePage = ({deleteRecipe}) => {
    const navigate = useNavigate()
    const {id} = useParams()
    const recipe= useLoaderData()

    const onDeleteClick = (recipeid)=>{
      const confirm= window.confirm(`are you sure you want to delete this recipe?`)
      if (!confirm) return
      deleteRecipe (recipeid)
      toast.success('recipe deleted')
      navigate('/recipes')
    }
  return (
  <>
    <section>
        <div className="container m-auto py-6 px-6">
          <Link
                to="/recipes"
                className="text-pink-500 hover:text-pink-600 flex items-center"
          >
          <FaArrowLeft className="mr-2" />
                Back to Recipes
          </Link>
        </div>
    </section>
    <section className="bg-pink-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-[70%_30%] w-full gap-6">
          <main>
            <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
              <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
              <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                <p className="text-violet-700">{recipe.cookTime}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-pink-800 text-lg font-bold mb-6">{recipe.description}</h3>
              <p className="mb-4 text-sm font-semibold text-gray-700">Difficulty level:{""}
              <span className="inline-block bg-pink-100 text-pink-800 px-2 py-1 rounded">
              {recipe.difficulty}
              </span>
              </p>
              <h2 className="text-2xl font-bold text-pink-700 mb-4">Ingredients</h2>
              <ul className="space-y-2 text-gray-800">{recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex justify-between bg-pink-50 px-4 py-2 rounded-lg shadow-sm">
                    <span className="font-medium">{ingredient.name}</span>
                    <span>{ingredient.amount}</span>
                </li>
              ))}
              </ul>
            </div>
          </main>
            {/* <!-- Sidebar --> */}
          <aside>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-pink-800 mb-4">Instructions</h3>
              <hr className="my-4" />
                <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                  <h2 className="text-2xl font-bold text-pink-700 mb-4">Method</h2>
                  <ul className="space-y-2 text-gray-800">{recipe.instructions.map((instructions, index) => (
                    <li key={index} className="flex justify-between bg-pink-50 px-4 py-2 rounded-lg shadow-sm">
                        <span className="font-medium">{instructions.step}</span>
                        <span>{instructions.text}</span>
                    </li>
                  ))}
                  </ul>
                </div>
              </div>
              <div className="my-2">
                <p className="font-bold mb-2">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                  ))}
                </div>
            </div>
            {/* <!-- Manage --> */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-xl font-bold mb-6">Manage Recipe</h3>
              <Link
                    to={`/edit-recipe/${recipe.id}`}
                    className='bg-pink-500 hover:bg-violet-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
              >
              Edit Recipe
              </Link>
            </div>
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <button
                    onClick={() => onDeleteClick(recipe.id)}
                    className='bg-pink-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                  >Delete Recipe</button>
              </div> 
          </aside>
        </div>
      </div>
    </section>
  </>
  )
}

const recipeLoader = async ({ params }) => {
  const res = await fetch(`/api/recipes/${params.id}`);

  if (!res.ok) {
    throw new Error('Recipe not found');
  }

  const data = await res.json();

  return {
    id: data.id || '',
    title: data.title || '',
    description: data.description || '',
    cookTime: data.cookTime || '',
    difficulty: data.difficulty || 'Easy',
    ingredients: Array.isArray(data.ingredients) ? data.ingredients : [],
    instructions: Array.isArray(data.instructions) ? data.instructions : [],
    tags: Array.isArray(data.tags) ? data.tags : []
  };
};


export { RecipePage as default , recipeLoader}