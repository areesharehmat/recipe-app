import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {FaMapMarker} from 'react-icons/fa'

const RecipeListing = ({ recipe }) => {
  const [showFullDesc, setShowFullDesc] = useState(false)

  let description = recipe.description
  if (!showFullDesc) {
    description = description.substring(0, 90) + '...'
  }

  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">Servings : {recipe.servings}</div>
          <h3 className="text-xl font-bold">{recipe.title}</h3>
        </div>

        <div className="mb-5">
          {description}
          <button
            onClick={() => setShowFullDesc((prevState)=>
                !prevState
            )}
            className="text-pink-500 mb-5 hover:text-indigo-60"
          >
            {showFullDesc ? ' Show less' : ' Read more'}
          </button>
        </div>

        <h3 className="text-pink-500 mb-2">{ recipe.cookTime || "N/A"}</h3>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <Link
            to={`/recipes/${recipe.id}`}
            className="h-[36px] bg-pink-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            View Full Recipe
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RecipeListing
