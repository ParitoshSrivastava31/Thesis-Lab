import { NextResponse } from 'next/server'
import { runMonteCarlo } from '@/lib/simulation/monteCarlo'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { nodes, edges, iterations } = body

        if (!nodes || !edges) {
            return NextResponse.json({ error: 'nodes and edges are required' }, { status: 400 })
        }

        const result = runMonteCarlo(nodes, edges, iterations || 500)

        return NextResponse.json(result)
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
