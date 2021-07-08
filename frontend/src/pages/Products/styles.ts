import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  width: 85vw;
  min-width: 380px;
  max-width: 1100px;
  height: 95vh;
  background-color: #FFF;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0px 5px 8px -3px rgba(0,0,0,0.71);
  display: flex;
  align-items: center;

  & hr {
    width: 96%;
    margin: 10px 0;
  }
`

export const ShoppingListContainer = styled.div`
  height: 100%;
  width: 100%;
  flex: 2;
  border-right: 1px solid #999;
  padding: 10px;
  display: flex;
  flex-direction: column;
`

export const ShoppingListProductsContainer = styled.div`
  max-height: 450px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar{
    display: none;
  }
`

export const ShoppingListProductItem = styled.div`
  width: 100%;
  border-radius: 6px;
  border: 1px solid #AAA;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  font-size: 18px;
  margin-top: 5px;

  & button {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    min-width: 0;
  }

  & > span {
    margin: 0 10px 0 auto;
    white-space: nowrap;
  }

  & div {
    min-width: 120px;
    text-align: center;
    margin: 0 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

export const ShoppingListButtons = styled.button`
  width: 100%;
  display: flex;
  border: none;
  margin-top: auto;
  background-color: inherit;

  & button {
    flex: 1;
    margin: 0 5px;
  }
`

export const ProductsTableContainer = styled.div`
  height: 100%;
  width: 100%;
  flex: 3;
  padding: 10px;

  & h1 {
    text-align: center;
    margin-bottom: 10px;
    font-weight: 600;
  }

  & h2 {
    text-align: center;
  }
`

export const FilterContainer = styled.div`
  width: 100% !important;
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  font-size: 18px;
`

export const ProductItemContainer = styled.div`
  max-height: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar{
    display: none;
  }

  & div:nth-child(odd) {
    background-color: #e5f3ff;
  }
`

export const ProductItemHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 600;
  padding: 5px;
  margin-bottom: 5px;
  border-bottom: 1px solid #AAA;

  & span:last-child {
    flex: 2;
    text-align: right;
  }

  & span:nth-child(2) {
    flex: 4;
  }

  & span:first-child {
    flex: 6;
  }
`

export const ProductItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
  margin-top: 5px;

  &:hover {
    box-shadow: 0px 5px 8px -3px rgba(0,0,0,0.71);
  }

  & span:last-child {
    flex: 2;
    text-align: right;
  }

  & span:nth-child(2) {
    flex: 4;
  }

  & span:first-child {
    flex: 6;
  }
`
