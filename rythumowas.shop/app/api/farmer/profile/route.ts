import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { currentUser } from '@clerk/nextjs/server'

export async function POST(req: Request) {
  try {
    const clerkUser = await currentUser()
    
    if (!clerkUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { farmName, location, district, phone, description } = await req.json()

    // Get or create user in our DB
    let user = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: clerkUser.id,
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim(),
          role: 'FARMER',
        }
      })
    } else {
      // Update role to FARMER
      user = await prisma.user.update({
        where: { id: user.id },
        data: { role: 'FARMER' }
      })
    }

    const farmer = await prisma.farmer.create({
      data: {
        userId: user.id,
        farmName,
        location,
        district,
        phone,
        description,
        verified: false,
      }
    })

    return NextResponse.json({ farmer })
  } catch (error) {
    console.error('Farmer profile creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create farmer profile' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const clerkUser = await currentUser()
    
    if (!clerkUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const farmer = await prisma.farmer.findUnique({
      where: { userId: user.id },
      include: { user: true, products: true }
    })

    return NextResponse.json({ farmer })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch farmer profile' },
      { status: 500 }
    )
  }
}
