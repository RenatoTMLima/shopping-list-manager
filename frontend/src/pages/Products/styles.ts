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
`

export const ProductsTableContainer = styled.div`
  height: 100%;
  width: 100%;
  flex: 3;
  padding: 10px;
`
