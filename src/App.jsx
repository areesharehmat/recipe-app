import React from 'react'
import {Route,createBrowserRouter,
  createRoutesFromElements,RouterProvider
} from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import HomePage from '../pages/HomePage'
import RecipesPage from '../pages/RecipesPage'
import NotFoundPage from '../pages/NotFoundPage'
import RecipePage, {recipeLoader} from '../pages/RecipePage'
import AddRecipePage from '../pages/AddRecipePage'
import EditRecipePage from '../pages/EditRecipePage'

const App = () => {
  // add new recipe
   const makeRequest = async (url, method, data = null) => {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (data) options.body = JSON.stringify(data)

    const res = await fetch(url, options)
    
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.message || 'Request failed')
    }

    return res.json()
  }
   const addRecipe = async (newRecipe) => {
    try {
      // Ensure arrays exist before sending
      const recipeToSend = {
        ...newRecipe,
        ingredients: newRecipe.ingredients || [],
        instructions: newRecipe.instructions || [],
        tags: newRecipe.tags || []
      }

      const data = await makeRequest('/api/recipes', 'POST', recipeToSend)
      toast.success('Recipe added successfully!')
      return data
    } catch (error) {
      toast.error(error.message)
      throw error
    }
  }

  // Delete recipe
  const deleteRecipe = async (id) => {
    try {
      await makeRequest(`/api/recipes/${id}`, 'DELETE')
      toast.success('Recipe deleted successfully!')
    } catch (error) {
      toast.error(error.message)
      throw error
    }
  }

  // Update recipe
  const updateRecipe = async (recipe) => {
    try {
      // Ensure arrays exist before sending
      const recipeToSend = {
        ...recipe,
        ingredients: recipe.ingredients || [],
        instructions: recipe.instructions || [],
        tags: recipe.tags || []
      }

      const data = await makeRequest(`/api/recipes/${recipe.id}`, 'PUT', recipeToSend)
      toast.success('Recipe updated successfully!')
      return data
    } catch (error) {
      toast.error(error.message)
      throw error
    }
  }

  const router=createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout/>}>
      <Route index element={<HomePage/>} />
      <Route path='/recipes' element={<RecipesPage/>}/>
      <Route path='/add-recipe' element={<AddRecipePage addRecipeSubmit={addRecipe}/>}/>
      <Route path='/edit-recipe/:id' element={<EditRecipePage updateRecipeSubmit={updateRecipe}/>} loader={recipeLoader}/>
      <Route path='/recipes/:id' element={<RecipePage deleteRecipe={deleteRecipe}/>} loader={recipeLoader}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Route>
    )
  )
  return <RouterProvider router={router}/>
}

export default App