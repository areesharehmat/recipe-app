import React from 'react'
import {Link} from 'react-router-dom'
import Card from './Card'
const HomeCards = () => {
  return (
    <>
         {/* <!-- Developers and Employers --> */}
    <section className="py-4">
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <Card>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">For Home Bakers</h2>
            <p className="mt-2 mb-4">
              Browse our recipes for fulfilling your sweeth tooth!
            </p>
            <Link
              to="/recipes"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Browse Recipes
            </Link>
          </div>
        </Card>
        <Card>
            <h2 className="text-2xl font-bold">For experienced bakers</h2>
            <p className="mt-2 mb-4">
              Share your recipies around the world
            </p>
            <Link
              to="/add-recipe"
              className="inline-block bg-pink-500 text-white rounded-lg px-4 py-2 hover:bg-indigo-600"
            >
              Add Recipe
            </Link>
        </Card>
        </div>
      </div>
    </section>

    </>
  )
}

export default HomeCards