import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  width: 60vw;
  min-width: 380px;
  max-width: 800px;
  height: 95vh;
  background-color: #FFF;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0px 5px 8px -3px rgba(0,0,0,0.71);
  display: flex;
  flex-direction: column;
  align-items: center;

  & hr {
    width: 96%;
    margin: 10px 0;
  }
`

export const Title = styled.h1`
  margin: 20px 0;
  border-bottom: 1px solid #999;
  text-align: center;
  font-weight: 600;
`

export const Subtitle = styled.h2`
  margin: 20px 0;
`

export const CreateList = styled.div`
  width: 80%;
  border-radius: 6px;
  background-color: #f4d869;
  display: flex;
  align-items: center;

  & button {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin: 0 20px;
    border: none;
    background-color: #25ea6a;
  }

  & button:hover {
    background-color: #5cf290;
  }

  & button span {
    margin: 0;
  }
`

export const CreateListInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;

  & > div {
    margin: 5px 0;
  }
`
export const CreatedListContainer = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar{
    display: none;
  }

  & .MuiCard-root {
    overflow: visible;
    margin: 5px 0;
  }

  & .MuiCard-root:hover {
    box-shadow: 0px 5px 8px -3px rgba(0,0,0,0.71);
  }

  & .MuiTextField-root {
    margin: 5px 0;
  }
`

export const ListDetailLink = styled.a`
  cursor: pointer;
`
