import React, { FC, useEffect, useCallback, useState, useMemo, ChangeEvent } from "react";
import { useLocation, useHistory } from 'react-router-dom'
import { TextField, MenuItem, Button } from '@material-ui/core'
import { Add, Remove, ArrowBack, Save } from '@material-ui/icons'

import {
  Container,
  Content,
  ShoppingListContainer,
  ProductsTableContainer,
  ProductItemHeader,
  ProductItemContainer,
  ProductItem,
  FilterContainer,
  ShoppingListButtons,
  ShoppingListProductsContainer,
  ShoppingListProductItem
} from './styles'

import { apiService } from '../../services/api.service'
import { Product } from '../../interfaces/product.interface'
import { ShoppingList } from '../../interfaces/shoppingList.interface'
import { SelectedProducts } from '../../dtos/selectedProducts.dto'

import { numberFormat } from '../../helpers/numberFormat'

type LocationState = {
  id: number;
}

export const Products: FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [shoppingList, setShoppingList] = useState<ShoppingList>()
  const [selectedProducts, setSelectedProducts] = useState<SelectedProducts[]>([])
  const [tableProducts, setTableProducts] = useState<Product[]>([])
  const [categorySelected, setCategorySelected] = useState('0')

  const location = useLocation<LocationState>()
  const history = useHistory()

  const getProductsAndShoppingList = useCallback(async () => {
    const [productsResolved, shoppingListResolved] = await Promise.all([
      apiService.getAllProducts(),
      apiService.getOneShoppingList(location.state.id)
    ])

    setProducts(productsResolved)
    setShoppingList(shoppingListResolved)

    if(
      shoppingListResolved &&
      shoppingListResolved.products &&
      shoppingListResolved.products.length > 0
      ) {
      setSelectedProducts(shoppingListResolved.products)
      const productsSelectedIds = shoppingListResolved.products.map(product => product.productId)
      setTableProducts(productsResolved.filter(product => !productsSelectedIds.includes(product.id)))
    } else {
      setTableProducts(productsResolved)
    }
  }, [location])

  useEffect(() => {
    getProductsAndShoppingList()
  }, [getProductsAndShoppingList])

  const categoriesList = useMemo(() => {
    const categoriesIds = [...new Set(products.map(product => product.categoriesId))]

    return categoriesIds.map(id => {
      const productFound = products.find(product => product.categoriesId === id)

      return {
        categoryName: productFound?.categoryName,
        categoriesId: id
      }
    })
  }, [products])

  const productsNotSelected = useMemo(() => {
    const selectedProductsIds = selectedProducts?.map(product => product.productId)
    return products.filter(product => !selectedProductsIds?.includes(product.id))
  }, [selectedProducts, products])

  const handleCategoryChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const categoryId = event.target.value
    if(categoryId === '0') {
      setTableProducts(productsNotSelected)
    } else {
      setTableProducts(productsNotSelected.filter(product => product.categoriesId === Number(categoryId)))
    }
    setCategorySelected(categoryId)
  }, [productsNotSelected])

  const totalPrice = useMemo(() => {
    return selectedProducts.reduce((total, product) => total += product.price * product.quantity, 0)
  }, [selectedProducts])

  const handleProductSelect = useCallback((product: Product) => {
    setSelectedProducts(previous => [...previous, {
      categoriesId: product.categoriesId,
      categoryName: product.categoryName,
      name: product.name,
      price: product.price,
      productId: product.id,
      quantity: 1
     }])
     const selectedProductsIds = selectedProducts.map(selected => selected.productId)
     selectedProductsIds.push(product.id)
     const filteredProducts = products.filter(prt => {
       if(categorySelected === '0')
        return !selectedProductsIds.includes(prt.id)

      return (!selectedProductsIds.includes(prt.id) && prt.categoriesId === Number(categorySelected))
     })
     setTableProducts(filteredProducts)
  }, [products, categorySelected, selectedProducts])

  const handleRemoveProduct = useCallback((id: number) => {
    const productToRemove = selectedProducts.find(product => product.productId === id)

    if(productToRemove){
      if(productToRemove?.quantity === 1){
        setSelectedProducts(previous => {
          const newSelectedProducts = previous.filter(product => product.productId !== productToRemove.productId)
          const newSelectedProductsIds = newSelectedProducts.map(product => product.productId)
          const filteredProducts = products.filter(prt => {
            if(categorySelected === '0')
             return !newSelectedProductsIds.includes(prt.id)

           return (!newSelectedProductsIds.includes(prt.id) && prt.categoriesId === Number(categorySelected))
          })
          setTableProducts(filteredProducts)
          return newSelectedProducts
        })
      } else {
        setSelectedProducts(previous => {
          return previous.map(prev => {
            if(prev.productId !== productToRemove.productId) return prev

            return {...prev, quantity: prev.quantity - 1}
          })
        })
      }
    }
  }, [selectedProducts, categorySelected, products])

  const handleAddProduct = useCallback((id: number) => {
    const productToAdd = selectedProducts.find(product => product.productId === id)
    if(productToAdd)
      setSelectedProducts(previous => {
        return previous.map(prev => {
          if(prev.productId !== productToAdd.productId) return prev

          return {...prev, quantity: prev.quantity + 1}
        })
      })
  }, [selectedProducts, categorySelected, products])

  const handleSaveShoppingList = useCallback(async () => {
    if(shoppingList) {
      await apiService.createOrUpdateShoppingList({
        id: shoppingList.id,
        name: shoppingList.name,
        description: shoppingList.description,
        totalPrice,
        products: selectedProducts.map(product => ({...product, shoppingListId: shoppingList.id}))
      })
    }
    history.goBack()
  }, [shoppingList, selectedProducts])

  return (
    <Container>
      <Content>
        <ShoppingListContainer>
          <h1>Lista: {shoppingList?.name}</h1>
          <h2>{shoppingList?.description}</h2>
          <h2>Preço total: R$ {numberFormat(totalPrice)}</h2>
          <ShoppingListProductsContainer>
            {selectedProducts.length > 0 && selectedProducts.map(product => (
              <ShoppingListProductItem key={product.id}>
                <strong>{product.name}</strong>
                <span>R$ {numberFormat(product.price)}</span>
                <div>
                  <Button variant="contained" size="small" onClick={() => handleRemoveProduct(product.productId)} >
                    <Remove fontSize="small" />
                  </Button>
                  <span>{product.quantity}</span>
                  <Button variant="contained" size="small" onClick={() => handleAddProduct(product.productId)} >
                    <Add fontSize="small" />
                  </Button>
                </div>
              </ShoppingListProductItem>
            ))}
          </ShoppingListProductsContainer>
          <ShoppingListButtons>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<ArrowBack />}
              onClick={() => history.goBack()}
            >
              Voltar
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              onClick={handleSaveShoppingList}
            >
              Salvar lista
            </Button>
          </ShoppingListButtons>
        </ShoppingListContainer>
        <ProductsTableContainer>
          <h1>Produtos</h1>
          <h2>Selecione os produtos desejados para preencher seu carrinho</h2>
          <FilterContainer>
            <TextField
              select
              variant="outlined"
              size="small"
              value={categorySelected}
              onChange={handleCategoryChange}
            >
              <MenuItem value="0" >Filtrar por categoria</MenuItem>
              {categoriesList.length > 0 && categoriesList.map(category => (
                <MenuItem key={category.categoriesId} value={category.categoriesId}>{category.categoryName}</MenuItem>
              ))}
            </TextField>
          </FilterContainer>
          <ProductItemHeader>
            <span>Produto</span>
            <span>Categoria</span>
            <span>Preço</span>
          </ProductItemHeader>
          <ProductItemContainer>
            {tableProducts.length > 0 && tableProducts.map(product => (
              <ProductItem key={product.id} onClick={() => handleProductSelect(product)}>
                <span>{product.name}</span>
                <span>{product.categoryName}</span>
                <span>R$ {numberFormat(product.price)}</span>
              </ProductItem>
            ))}
          </ProductItemContainer>
        </ProductsTableContainer>
      </Content>
    </Container>
  )
}
