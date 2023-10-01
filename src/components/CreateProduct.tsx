import { useProducts } from '@/context/ProductContext'
import {useState} from 'react'

export default function CreateProduct({ params }: { params: { id: string } }) {

    const [productName, setProductName] = useState('');
    const [pricee, setPrice] = useState('1');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const {createProduct} = useProducts();
    return (
        <div>
            <form className='bg-slate-900 px-4 py-4 rounded-md'
                onSubmit={async(e)=>{
                    e.preventDefault();
                    const price=Number(pricee);
                    await createProduct({
                        id:1,
                        productName,
                        description,
                        price,
                        image,
                        sellerId: 0
                    },Number(params.id))
                }
                }
            >
                <div className="relative z-0 w-full mb-6 group">
                    <input 
                        type="text" 
                        name="productName" 
                        id="productName" 
                        className="block py-2.5 px-0 w-full text-sm text-blue-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" " 
                        onChange={(e) => setProductName(e.target.value)}
                        required />
                    <label htmlFor="productName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Product Name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input 
                        type="text" 
                        name="price" 
                        id="price" 
                        className="block py-2.5 px-0 w-full text-sm text-blue-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder=" "
                        onChange={(e) => setPrice(e.target.value)}
                        required />
                    <label htmlFor="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input 
                        type="text" 
                        name="image" 
                        id="image" 
                        className="block py-2.5 px-0 w-full text-sm text-blue-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder="" 
                        onChange={(e) => setImage(e.target.value)}
                        />
                    <label htmlFor="image" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Image's Url</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <textarea  
                        name="description" 
                        id="description" 
                        className="block py-2.5 px-0 w-full text-sm text-blue-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                        placeholder="" 
                        onChange={(e) => setDescription(e.target.value)}
                        required />
                    <label htmlFor="description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Description</label>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>


        </div>
    )
}
