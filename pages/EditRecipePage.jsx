import { useState } from 'react';
import { useParams,useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditRecipePage = ({updateRecipeSubmit }) => {
  const recipe = useLoaderData();
  const [title, setTitle] = useState(recipe.title);
  const [difficulty,setDifficulty]=useState(recipe.difficulty)
  const [description, setDescription] = useState(recipe.description);
  const [cookTime, setCookTime] = useState(recipe.cookTime);
  const [servings, setServings] = useState(recipe.servings);

  const [tags, setTags] = useState([recipe.tags])
  const [tagInput, setTagInput] = useState("")

  const [ingredients, setIngredients] = useState([recipe.ingredients])
  const [ingredientInput, setIngredientInput] = useState({ name: "", amount: "" })

  const [instructions, setInstructions] = useState([recipe.instructions]);
  const [instructionsInput, setInstructionsInput] = useState({ step: '', text: '' });

  const navigate = useNavigate();
  const { id } = useParams();

  const submitForm = (e) => {
    e.preventDefault();

    const updatedRecipe = {
        id,
        title,
        description,
        cookTime,
        servings,
        difficulty,
        ingredients,
        instructions
    };

    updateRecipeSubmit(updatedRecipe);
    toast.success('updated')
    navigate(`/recipes/${id}`, { replace: true });

  };

  return (
    <section className='bg-pink-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <form onSubmit={submitForm}>
            <h2 className='text-3xl text-center font-semibold mb-6'>
              Update Recipe
            </h2>

            <div className='mb-4'>
              <label
                htmlFor='type'
                className='block text-gray-700 font-bold mb-2'
              >
                Recipe Type
              </label>
              <select
                id='type'
                name='type'
                className='border rounded w-full py-2 px-3'
                required
                value={difficulty}
                onChange={(e)=>{ setDifficulty(e.target.value) }}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Recipe Name
              </label>
              <input
                type='text'
                id='title'
                name='title'
                className='border rounded w-full py-2 px-3 mb-2'
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='description'
                className='block text-gray-700 font-bold mb-2'
              >
                Description
              </label>
              <textarea
                id='description'
                name='description'
                className='border rounded w-full py-2 px-3'
                rows='4'
                placeholder='Add any recipe duties, expectations, requirements, etc'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="mb-4">
                        <label htmlFor="type" className="block text-gray-700 font-bold mb-2"
                            >Cooking Time</label>
                        <input
                            type="text"
                            id="time"
                            name="time"
                            className="border rounded w-full py-2 px-3 mb-2"
                            placeholder="eg. 5 minutes"
                            required
                            value={cookTime}
                            onChange={(e)=> setCookTime(e.target.value)}/>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Tags</label>
                        <div className="flex gap-2 mb-2">
                            <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault()
                                    if (tagInput.trim()) {
                                        setTags([...tags, tagInput.trim()])
                                        setTagInput("")
                                    }
                                }
                            }}
                            className="border rounded w-full py-2 px-3"
                            placeholder="Type and press Enter"/>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm"
                            >
                                {tag}
                            </span>
                            ))}
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Ingredients</label>
                        <div className="flex gap-2 mb-2">
                            <input
                            type="text"
                            placeholder="Name"
                            value={ingredientInput.name}
                            onChange={(e) => setIngredientInput({ ...ingredientInput, name: e.target.value })}
                            className="border rounded w-1/2 py-2 px-3"
                            />
                            <input
                            type="text"
                            placeholder="Amount"
                            value={ingredientInput.amount}
                            onChange={(e) => setIngredientInput({ ...ingredientInput, amount: e.target.value })}
                            className="border rounded w-1/2 py-2 px-3"
                            />
                            <button
                            type="button"
                            onClick={() => {
                                if (ingredientInput.name && ingredientInput.amount) {
                                setIngredients([...ingredients, ingredientInput])
                                setIngredientInput({ name: "", amount: "" })
                                }
                            }}
                            className="bg-pink-500 text-white px-3 rounded"
                            >
                            Add
                            </button>
                        </div>
                        <ul className="space-y-1">
                                {ingredients.map((ing, index) => (
                                <li key={index} className="text-sm text-gray-700">
                                    • {ing.amount} of {ing.name}
                                </li>
                                ))}
                        </ul>
                    </div>

                    <div className="mb-4">
                        {/* Instructions */}
                            <label className="block text-gray-700 font-bold mb-2">Instructions</label>
                            <input
                                type="text"
                                className="border rounded w-full py-2 px-3 mb-2"
                                placeholder="Step number"
                                value={instructionsInput.step}
                                onChange={(e) => setInstructionsInput({ ...instructionsInput, step: e.target.value })}/>
                            <textarea
                                rows="3"
                                className="border rounded w-full py-2 px-3 mb-2"
                                placeholder="Add a step and click Add"
                                value={instructionsInput.text}
                                onChange={(e) =>
                                setInstructionsInput({ ...instructionsInput, text: e.target.value })
                                }/>
                            <button
                                type="button"
                                className="bg-pink-500 text-white px-3 py-1 rounded"
                                onClick={() => {
                                if (instructionsInput.step && instructionsInput.text) {
                                    setInstructions([...instructions, instructionsInput]);
                                    setInstructionsInput({ step: '', text: '' }); // clear input
                                }
                                }}>
                                Add Step
                            </button>
                            <ol className="list-decimal list-inside mt-2 space-y-1 text-sm text-gray-700">
                                {instructions.map((s, i) => (
                                <li key={i}>
                                    Step {s.step}: {s.text}
                                </li>
                                ))}
                            </ol>
                    </div>
                    {/* Submit */}
                    <div className='mb-4'>
                        <button
                                className='bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                                type='submit'>
                                Update Recipe
                        </button>
                    </div>
            </form>
        </div>
      </div>
    </section>
  );
};
export default EditRecipePage;