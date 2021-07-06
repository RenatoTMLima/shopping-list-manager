import axios, { AxiosInstance } from 'axios'
import { apiAxiosConfig } from '../config/api.config'
import { ShoppingList } from '../interfaces/shoppingList.interface'
import { Product } from '../interfaces/product.interface'
import { CreateShoppingListDTO } from '../dtos/createShoppingList.dto'

class ApiService {
  private apiClient: AxiosInstance

  constructor() {
    this.apiClient = axios.create(apiAxiosConfig)
  }

  async getAllShoppingLists(): Promise<ShoppingList[]> {
    const response = await this.apiClient.get('/shoppingList')

    return response.data
  }

  async createOrUpdateShoppingList(
    newShoppingList: CreateShoppingListDTO
    ): Promise<ShoppingList> {
    const response = await this.apiClient.post('/shoppingList', newShoppingList)

    return response.data
  }

  async deleteShoppingList(id: number): Promise<void> {
    return this.apiClient.delete(`/shoppingList/${id}`)
  }

  async getOneShoppingList(id: number): Promise<ShoppingList> {
    const shoppingList = await this.apiClient.get(`/shoppingList/${id}`)

    return shoppingList.data
  }

  async getAllProducts(): Promise<Product[]> {
    const allProducts = await this.apiClient.get('/products')

    return allProducts.data
  }
}

export const apiService = new ApiService()
