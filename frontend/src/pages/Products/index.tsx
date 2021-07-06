import React, { FC, useEffect, useCallback, useState } from "react";
import { useLocation } from 'react-router-dom'

import {
  Container,
  Content,
  ShoppingListContainer,
  ProductsTableContainer
} from './styles'

import { apiService } from '../../services/api.service'
import { Product } from '../../interfaces/product.interface'
import { ShoppingList } from '../../interfaces/shoppingList.interface'

type LocationState = {
  id: number;
}

export const Products: FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [shoppingList, setShoppingList] = useState<ShoppingList>()

  const location = useLocation<LocationState>()

  const getProductsAndShoppingList = useCallback(async () => {
    const [productsResolved, shoppingListResolved] = await Promise.all([
      apiService.getAllProducts(),
      apiService.getOneShoppingList(location.state.id)
    ])

    setProducts(productsResolved)
    setShoppingList(shoppingListResolved)
  }, [location])

  useEffect(() => {
    getProductsAndShoppingList()
  }, [])

  return (
    <Container>
      <Content>
        <ShoppingListContainer>
          <h1></h1>
        </ShoppingListContainer>
        <ProductsTableContainer>
          PSJIDFNGPJNPSJDNFGPJSDPFGNSPDJFGBSNDPFGH´JDFNGBPHSNDPFBHÓDKNFBH´KOSNDPOFAJSDFNGPJANSDPFGNPSJIDFGPSIJDFPSDFJÇF
        </ProductsTableContainer>
      </Content>
    </Container>
  )
}
