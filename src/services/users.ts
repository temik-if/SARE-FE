import { useState, useEffect } from 'react'
import Users from '@/components/DataList/data/users'

export const useUsers = () => {
  const [data, setData] = useState(Users)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Por enquanto usando dados mockados
    // Futuramente substituir por chamada à API
    setData(Users)
  }, [])

  return { data, isLoading, error }
}
