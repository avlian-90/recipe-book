'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strArea: string;
  strCategory: string;
  strInstructions: string;
  strIngredient1?: string;
  strIngredient2?: string;
  strIngredient3?: string;
  strIngredient4?: string;
  strIngredient5?: string;
}

export default function RecipeInfo() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [categoryRecipes, setCategoryRecipes] = useState<Recipe[]>([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchRecipe(id as string);
    }
  }, [id]);

  useEffect(() => {
    if (recipe?.strCategory) {
      fetchCategoryRecipes(recipe.strCategory);
    }
  })

  const fetchRecipe = async (recipeId: string) => {
    try {
      const response = axios.get(`${API_URL}/recipe/${recipeId}`);
      setRecipe((await response).data.meals[0]);
    } catch (error) {
      console.error('Error fetching recipe info', error);
    }
  };

  const fetchCategoryRecipes = async (category: string) => {
    try {
      const response = await axios.get(`${API_URL}/recipes?category=${category}`);
      setCategoryRecipes(response.data.meals);
    } catch (error) {
      console.error('Error fetching category recipes', error);
    }
  }

  if (!recipe) {
    return <div className='text-center'>Loading...</div>
  }

  return (
    <div className='flex p-4 max-w-6xl mx-auto'>
      <div className='w-2/3 pr-6'>
        <div className='mb-4'>
          <Link href='/' className='text-blue-500 hover:underline'>Back to Recipes</Link>
        </div>
        <h1 className='text-3xl font-bold mb-4'>{recipe.strMeal}</h1>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className='w-full rounded mb-4' />
        <p className='text-lg'><strong>Country: </strong>
          <Link href={`/?country=${recipe.strArea}`} className='text-blue-500 hover:underline'>
            {recipe.strArea}
          </Link>
        </p>
        <p className='text-lg'><strong>Instructions: </strong>{recipe.strInstructions}</p>
        <h2 className='text-xl font-semibold mt-4'>Ingredients:</h2>
        <ul className='list-disc pl-5'>
          {[recipe.strIngredient1, recipe.strIngredient2, recipe.strIngredient3, recipe.strIngredient4, recipe.strIngredient5]
            .filter(Boolean)
            .map((ingredient, index) => (
              <li key={index} className='text-lg'>
                <Link href={`/?ingredient=${ingredient}`} className='text-blue-500 hover:underline'>{ingredient}</Link>
              </li>
            ))}
        </ul>
      </div>

      <aside className='w-1/3 bg-gray-100 p-4 rounded'>
        <h2 className='text-lg font-semibold mb-3'>More {recipe.strCategory} Resipes</h2>
        <ul>
          {categoryRecipes.map((categoryRecipe) => (
            <li key={categoryRecipe.idMeal} className='mb-2'>
              <Link href={`/recipe/${categoryRecipe.idMeal}`} className='text-blue-500 hover:underline'>
                {categoryRecipe.strMeal}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}