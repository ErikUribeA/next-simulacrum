import { NextRequest, NextResponse } from 'next/server'

export async function GET() {

    const res = await fetch('https://fakestoreapi.com/products', {
        headers: {
            'Content-Type': 'application/json',
        },
    })

    const products = await res.json();

    return NextResponse.json({
        products,
    }, { status: 200 })
}

export async function POST(request: NextRequest) {

    const data = await request.json()
    console.log('Received POST data:', data)

    return NextResponse.json({
        message: 'POST: Hello from Next.js!',
        data: data,
    }, { status: 200 })
}

