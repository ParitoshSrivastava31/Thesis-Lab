import { NextResponse } from 'next/server'
import { runPropagation } from '@/lib/simulation/propagation'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { nodes, edges, changedNodeId, originalProbability, newProbability } = body

        if (!nodes || !edges || !changedNodeId || originalProbability === undefined || newProbability === undefined) {
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
        }

        const updatesMap = runPropagation(nodes, edges, changedNodeId, originalProbability, newProbability)
        // Convert Map to Object for JSON serialization
        const updates = Object.fromEntries(updatesMap)

        return NextResponse.json({ updates })
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}
