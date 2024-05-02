"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

import { ProductsTypes } from '../Types/productsType';

interface ProductsContextType {
  products: ProductsTypes[];
  addToCart: (product: ProductsTypes) => void;
  decrementQuantity: (productId: string) => void;
  incrementQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
}

interface ProductsProviderProps {
  children: ReactNode;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  
  const [products, setProducts] = useState<ProductsTypes[]>([]);

  const addToCart = (product: ProductsTypes) => {
    const existingProductIndex = products.findIndex((p) => p.id === product.id);
    if (existingProductIndex !== -1) {
      // Le produit existe déjà dans le panier, nous mettons à jour sa quantité
      const updatedProducts = [...products];
      updatedProducts[existingProductIndex].quantityProduct += 1;
      setProducts(updatedProducts);
    } else {
      // Le produit n'existe pas dans le panier, nous l'ajoutons
      setProducts([...products, { ...product, quantityProduct: 1 }]);
    }
  };

  
const decrementQuantity = (productId: string) => {
  const updatedProducts = products.map(product => {
    if (product.id === productId) {
      // Si la quantité est supérieure à 1, nous la décrémentons
      if (product.quantityProduct > 1) {
        return { ...product, quantityProduct: product.quantityProduct - 1 };
      } else {
        // Sinon, nous le retirons complètement du panier
        return null;
      }
    }
    return product;
  }).filter(product => product !== null) as ProductsTypes[]; // Filtrer les produits nuls et caster le tableau
  setProducts(updatedProducts);
};

const incrementQuantity = (productId: string) => {
  setProducts(prevProducts =>
    prevProducts.map(product =>
      product.id === productId ? { ...product, quantityProduct: product.quantityProduct + 1 } : product
    )
  );
};

const removeFromCart = (productId: string) => {
  setProducts(products.filter(product => product.id !== productId));
};


  return (
    <ProductsContext.Provider value={{ products, addToCart, removeFromCart, decrementQuantity, incrementQuantity }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }
  return context;
};
