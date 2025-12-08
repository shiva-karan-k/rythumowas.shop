import Medusa from '@medusajs/medusa-js'
import { stackServerApp } from './stack'

/**
 * Get Medusa client with Stack Auth context
 * Attaches user information to requests for backend authorization
 */
export async function getMedusaClient() {
  const user = await stackServerApp.getUser()
  
  const medusa = new Medusa({
    baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000',
    maxRetries: 3,
  })
  
  if (user) {
    // Attach Stack Auth user context to all Medusa requests
    medusa.client.setHeaders({
      'x-stack-user-id': user.id,
      'x-user-email': user.primaryEmail || '',
    })
  }
  
  return medusa
}

/**
 * Get Medusa client for client-side use
 */
export function getMedusaClientSide() {
  return new Medusa({
    baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000',
    maxRetries: 3,
  })
}
