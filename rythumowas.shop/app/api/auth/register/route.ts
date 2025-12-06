import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  try {
    const user = await currentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { role } = await req.json()

    // Update user role in our database
    const dbUser = await prisma.user.update({
      where: { clerkId: user.id },
      data: { role: role || 'CUSTOMER' }
    })

    return NextResponse.json({ user: dbUser })
  } catch (error) {
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}
