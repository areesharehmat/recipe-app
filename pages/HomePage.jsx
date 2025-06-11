import React from 'react'
import Hero from '../src/components/Hero'
import HomeCards from '../src/components/HomeCards'
import RecipeListings from '../src/components/RecipeListings'
import ViewAllRecipes from '../src/components/ViewAllRecipes'

const HomePage = () => {
  return (
    <>
        <Hero/>
        <HomeCards/>
        <RecipeListings isHome={true}/>
        <ViewAllRecipes/>

    </>
  )
}

export default HomePage