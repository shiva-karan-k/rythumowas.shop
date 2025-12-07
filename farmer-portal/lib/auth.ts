// Simple token-based auth for farmer portal
// Users authenticate via rythumowas.shop and get redirected here with a token

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('farmer_auth_token')
}

export function setAuthToken(token: string) {
  localStorage.setItem('farmer_auth_token', token)
}

export function clearAuthToken() {
  localStorage.removeItem('farmer_auth_token')
}

export function redirectToLogin() {
  const mainAppUrl = process.env.NEXT_PUBLIC_MAIN_APP_URL || 'http://localhost:3000'
  window.location.href = `${mainAppUrl}/farmer/login?redirect=${encodeURIComponent(window.location.href)}`
}
