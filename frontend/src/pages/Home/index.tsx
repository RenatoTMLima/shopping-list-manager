import React, { FC, useEffect, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardActions
} from '@material-ui/core'
import { Add, Delete, Edit, Check, Cancel } from '@material-ui/icons'

import {
  Container,
  Content,
  Title,
  Subtitle,
  CreateList,
  CreateListInputContainer,
  CreatedListContainer,
  ListDetailLink
} from './styles'

import { apiService } from '../../services/api.service'
import { ShoppingList } from '../../interfaces/shoppingList.interface'
import { numberFormat } from '../../helpers/numberFormat'

export const Home: FC = () => {
  const [createdLists, setCreatedLists] = useState<ShoppingList[]>([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editEnabled, setEditEnabled] = useState(0)

  const history = useHistory()

  const getCreatedLists = useCallback(async () => {
    const lists = await apiService.getAllShoppingLists()

    setCreatedLists(lists)
  }, [])

  useEffect(() => {
    getCreatedLists()
  }, [getCreatedLists])

  const handleCreateShoppingList = useCallback(async () => {
    const newList = await apiService.createOrUpdateShoppingList({
      name,
      description
    })

    setCreatedLists(previous => [...previous, newList])
    setName('')
    setDescription('')
  }, [name, description])

  const handleRemoveList = useCallback(async (id: number) => {
    await apiService.deleteShoppingList(id)

    setCreatedLists(createdLists.filter(list => list.id !== id))
  }, [createdLists])

  const handleEnableEditList = useCallback((id, oldName, oldDescription) => {
    setEditName(oldName)
    setEditDescription(oldDescription)
    setEditEnabled(id)
  }, [])

  const handleConfirmEdit = useCallback(async (oldList) => {
    const response = await apiService.createOrUpdateShoppingList({
      ...oldList,
      name: editName,
      description: editDescription
    })
    const updatedList = createdLists.map(list => {
      if(list.id !== response.id) return list

      return response
    })
    setCreatedLists(updatedList)
    setEditEnabled(0)
  }, [editName, editDescription, createdLists])

  const handleListDetail = useCallback((id) => {
    history.push(`/products`, { id })
  }, [])

  return (
    <Container>
      <Content>
        <Title>
          Bem vindo(a) ao Shopping List Manager!
        </Title>
        <Subtitle>
          Aqui você poderá criar e organizar suas listas de compras.
        </Subtitle>
        <CreateList>
          <CreateListInputContainer>
            <TextField label="Nome da lista" variant="standard" value={name} onChange={e => setName(e.target.value)} />
            <TextField label="Uma descrição..." variant="standard" value={description} onChange={e => setDescription(e.target.value)} />
          </CreateListInputContainer>
          <Button startIcon={<Add />} variant="contained" onClick={handleCreateShoppingList} ></Button>
        </CreateList>
        <hr />
        <CreatedListContainer>
          {createdLists.length > 0 && createdLists.map(list => (
            <Card key={list.id} variant="outlined">
              <ListDetailLink onClick={() => handleListDetail(list.id)} >
                <CardContent>
                  {editEnabled === list.id ? (
                    <>
                      <TextField label="Nome da lista" variant="standard" value={editName} onChange={e => setEditName(e.target.value)} />
                      <br />
                      <TextField label="Uma descrição..." variant="standard" value={editDescription} onChange={e => setEditDescription(e.target.value)} />
                    </>
                  ) : (
                    <>
                      <h1><strong>{list.name}</strong></h1>
                      <h2>{list.description}</h2>
                    </>
                  )}
                  {list.totalPrice && <h2>Preço total: R$ {numberFormat(list.totalPrice)}</h2>}
                </CardContent>
              </ListDetailLink>
              <CardActions>
                {editEnabled === list.id ? (
                  <>
                    <Button
                      startIcon={<Check/>}
                      variant="contained"
                      color="primary"
                      onClick={() => handleConfirmEdit(list)}
                    >
                      Confirmar
                    </Button>
                    <Button
                      startIcon={<Cancel/>}
                      variant="contained"
                      color="default"
                      onClick={() => setEditEnabled(0)}
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                <Button
                  startIcon={<Edit/>}
                  variant="contained"
                  color="primary"
                  onClick={() => handleEnableEditList(
                    list.id,
                    list.name,
                    list.description
                    )}
                >
                  Editar
                </Button>
                )}
                <Button
                  startIcon={<Delete/>}
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemoveList(list.id)}
                >
                  Excluir
                </Button>
              </CardActions>
            </Card>
          ))}
        </CreatedListContainer>
      </Content>
    </Container>
  )
}
