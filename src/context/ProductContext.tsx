"use client"
import { createContext, useContext, useState } from "react";
import { Product } from "@prisma/client";

interface Children {
    children: React.ReactNode;
}

//ACA ES DONDE SE CREA EL CONTEXTO EN SI Y SE EXPORTAN TODAS LAS FUNCIONES QUE ABAJO DECLARAREMOS EN EL PROVIDER
export const ProductContext = createContext<{
    products:Product[];
    loadProducts:()=> Promise<void>;
    createProduct: (product: Product) => Promise<void>;
    updateProduct: (id:number,product: Product) => Promise<void>;
    loadSellerProducts:(id:number)=>Promise<void>;
    deleteProduct: (id: number) => Promise<void>;
}>({
    products:[],
    loadProducts:async()=>{},
    createProduct: async (product: Product) => { },
    updateProduct: async (id:number,product: Product) => { },
    loadSellerProducts: async (id: number) => { },
    deleteProduct: async (id: number) => { },
})

export const useProducts = () =>{
    const context = useContext(ProductContext)
    if (!context){
        throw new Error('useProducts must be used whithin a ProductsProviders')
    }
    return context
}

export const ProductsProvider = ({ children }: Children) => {
    const [products,setProducts] = useState<Product[]>([]);

    
    async function loadProducts(){
        const res = await fetch("/api/product");
        const data = await res.json();
        setProducts(data);
    }

    //funcion para cargar los productos de 1 vendedor
    async function loadSellerProducts(id:number){
        const res = await fetch("/api/product/"+id);
        const data = await res.json();
        setProducts(data);
    }

    //esta funcion lo que hace es crear un nuevo producto, y ademas agrega al estado donde estan todos los productos el nuevo
    //despues uno tiene que mostrar el estado ese nomas y se muestra actualizado
    async function createProduct(product:Product){
        const  res = await fetch('/api/product',{
            method:'POST',
            body: JSON.stringify(product),
            headers:{
                'content-Type':'application/json'
            }
        })
        const newProduct: Product = await res.json()
        setProducts([...products, newProduct]);
    }

    //esta funcion es para eliminar y elimina del estado el producto eliminado
    async function deleteProduct(id:number){
        const res = await fetch('/api/product/'+id,{
            method:'DELETE',
        })
        const data = await res.json()
        setProducts(products.filter((product)=> product.id!=id));
    }


    //esta funcion es para actualizar la informacion de un producto
    async function updateProduct(id: number, product: Product) {
        const res = await fetch('/api/product/' + id,  {
            body: JSON.stringify(product),
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            }
        })
        const data = await res.json()
        setProducts(products.map(product => product.id === id ? data : product));
    }
    return(
    <ProductContext.Provider
        value={{
            products,
            loadProducts,
            createProduct,
            updateProduct,
            deleteProduct,
            loadSellerProducts
        }}>{children}
    </ProductContext.Provider>
    )
}
