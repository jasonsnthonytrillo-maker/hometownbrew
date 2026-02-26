import { useEffect } from 'react'
import { useParams, useLocation, Navigate } from 'react-router-dom'
import { useClient } from '../context/ClientContext'
import Home from './Home'
import Menu from './Menu'
import About from './About'
import Contact from './Contact'
import Cart from './Cart'

/**
 * ClientPage - A wrapper component that handles client detection from URL
 * and renders the appropriate page component with client-specific data.
 * 
 * Usage:
 * <ClientPage component={Home} />
 * <ClientPage component={Menu} />
 * etc.
 */
function ClientPage({ component: Component, ...props }) {
  const { client, clientId, isLoading } = useClient()
  const location = useLocation()
  const params = useParams()

  // Show loading while detecting client
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '1.2rem',
        color: 'var(--client-primary, #4A2C2A)'
      }}>
        Loading...
      </div>
    )
  }

  // If no client found, redirect to default
  if (!client) {
    return <Navigate to="/" replace />
  }

  return <Component {...props} />
}

export default ClientPage

/**
 * Helper hook to get the base path for client routes
 * @returns {string} Base path like '/hometownbrew' or ''
 */
export const useClientBasePath = () => {
  const { clientId } = useClient()
  return clientId ? `/${clientId}` : ''
}

/**
 * Helper hook to check if current route is client-specific
 * @returns {boolean} True if route has client ID
 */
export const useIsClientRoute = () => {
  const { clientId } = useClient()
  return !!clientId
}
