'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async (query = '') => {
    try {
      const response = await axios.get(
        `${API_URL}/recipes${query ? `?ingredient=${query}` : ''}`
      );
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.error('Error fetching recipes', error);
    }
  };

  const handleSearch = () => {
    fetchRecipes(search);
  }
  
  return (
    <div className='p-4 max-w-4xl mx-auto'>
        <h1 className='text-2xl font-bold mb-4'>Search Recipe</h1>
        <div className='flex gap-2 mb-4'>
          <input
            type='text'
            placeholder='Search by ingredient...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='border p-2 rounded w-full'
          />
          <button onClick={handleSearch} className='bg-blue-500 text-white p-2 rounded'>
            Search
          </button>
        </div> 
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {recipes.map((recipe) => (
            <Link key={recipe.idMeal} href={`/recipe/${recipe.idMeal}`}>
              <div className='border p-2 rounded cursor-pointer hover:shadow-lg'>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} className='w-full rounded' />
                <p className='text-center mt-2 font-semibold'>{recipe.strMeal}</p>
              </div>
            </Link>
          ))}
        </div>
    </div>
  );
}
