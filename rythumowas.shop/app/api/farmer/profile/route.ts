import { NextResponse } from 'next/server'
import { stackServerApp } from '@/lib/stack'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const user = await stackServerApp.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json() as {
      farmName: string
      location: string
      district: string
      phone: string
      description?: string
    }
    const { farmName, location, district, phone, description } = body

    // Check if farmer profile already exists
    const existingFarmer = await prisma.farmer.findUnique({
      where: { userId: user.id }
    })

    if (existingFarmer) {
      return NextResponse.json(
        { error: 'Farmer profile already exists' },
        { status: 400 }
      )
    }

    // Create farmer profile
    const farmer = await prisma.farmer.create({
      data: {
        userId: user.id,
        farmName,
        location,
        district,
        phone,
        description,
        verified: false
      }
    })

    return NextResponse.json({ farmer }, { status: 201 })
  } catch (error) {
    console.error('Error creating farmer profile:', error)
    return NextResponse.json(
      { error: 'Failed to create farmer profile' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const user = await stackServerApp.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const farmer = await prisma.farmer.findUnique({
      where: { userId: user.id },
      include: {
        _count: {
          select: { products: true }
        }
      }
    })

    if (!farmer) {
      return NextResponse.json(
        { error: 'Farmer profile not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ farmer })
  } catch (error) {
    console.error('Error fetching farmer profile:', error)
    return NextResponse.json(
      { error: 'Failed to fetch farmer profile' },
      { status: 500 }
    )
  }
}
