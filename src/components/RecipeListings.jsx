import React from 'react'
import { useState,useEffect } from 'react'
import RecipeListing from './RecipeListing'
import Spinner from './Spinner'


const RecipeListings = ({isHome=false}) => {
  
  const[recipes,setRecipes]=useState([])
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    const fetchRecipes = async()=>{
      const apiUrl=isHome? 
      '/api/recipes?_limit=3':
      '/api/recipes'
      try {
        const res = await fetch(apiUrl)
        const data = await res.json()
        console.log('Fetched data:', data);  // ✅ SAFE logging
        setRecipes(Array.isArray(data) ? data : []);
        //setRecipes(data)
      } catch (error) {
        console.log('error fetching data',error)
      } finally{
        setLoading(false)
      }
    }
    fetchRecipes()
  },[])
  return (
      <section className="bg-pink-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-pink-500 mb-6 text-center">
            {isHome? 'Top recipes':'Browse recipes'}
          </h2>
            {loading? <Spinner loading={loading}/>:(
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recipes.map((recipe)=>(
              <RecipeListing key={recipe.id} recipe={recipe}/>
            ))}
            </div>
            )}
        </div>
      </section>
  )
}



export default RecipeListings