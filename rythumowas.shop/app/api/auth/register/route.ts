import { NextResponse } from 'next/server'
import { stackServerApp } from '@/lib/stack'

export async function POST(req: Request) {
  try {
    const user = await stackServerApp.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // User is already registered via Stack Auth
    // This endpoint can be used for additional registration logic if needed
    return NextResponse.json({ 
      success: true,
      user: {
        id: user.id,
        email: user.primaryEmail
      }
    })
  } catch (error) {
    console.error('Error in register route:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
