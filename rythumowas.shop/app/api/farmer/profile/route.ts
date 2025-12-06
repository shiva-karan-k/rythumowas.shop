import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  return NextResponse.json(
    { error: 'Authentication disabled' },
    { status: 503 }
  )
}

export async function GET(req: Request) {
  return NextResponse.json(
    { error: 'Authentication disabled' },
    { status: 503 }
  )
}
