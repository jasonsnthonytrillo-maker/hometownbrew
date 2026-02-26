import { createContext, useContext, useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getClientById, getClientIds, defaultClientId } from '../data/clients'

const ClientContext = createContext(null)

export const useClient = () => {
  const context = useContext(ClientContext)
  if (!context) {
    throw new Error('useClient must be used within a ClientProvider')
  }
  return context
}

export const ClientProvider = ({ children }) => {
  const [client, setClient] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [clientId, setClientId] = useState(null)
  
  const location = useLocation()
  const params = useParams()

  useEffect(() => {
    // Get all client IDs
    const clientIds = getClientIds()
    
    // Get current path
    const path = location.pathname
    
    // Extract client ID from URL path
    // Expected format: /projectbrew, /projectbrew/menu, /milkteashop, etc.
    const pathParts = path.split('/').filter(Boolean)
    const urlClientId = pathParts[0]
    
    // Check if the first path segment is a valid client ID
    if (clientIds.includes(urlClientId)) {
      setClientId(urlClientId)
    } else {
      // Default to the first client if no valid client ID in URL
      setClientId(defaultClientId)
    }
  }, [location.pathname])

  useEffect(() => {
    if (clientId) {
      const clientData = getClientById(clientId)
      setClient(clientData)
      setIsLoading(false)
      
      // Update document title with client name
      if (clientData) {
        document.title = clientData.name
      }
    }
  }, [clientId])

  const value = {
    client,
    clientId,
    isLoading,
    getClientById,
    getClientIds
  }

  return (
    <ClientContext.Provider value={value}>
      {children}
    </ClientContext.Provider>
  )
}

export default ClientContext
