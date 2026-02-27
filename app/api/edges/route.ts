import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()

    if (!body.thesis_id || !body.from_node_id || !body.to_node_id) {
        return NextResponse.json({ error: 'thesis_id, from_node_id, and to_node_id are required' }, { status: 400 })
    }

    const { data, error } = await supabase
        .from('edges')
        .insert({
            thesis_id: body.thesis_id,
            from_node_id: body.from_node_id,
            to_node_id: body.to_node_id,
            strength: body.strength ?? 'MODERATE',
            dependency_type: body.dependency_type ?? 'CAUSAL',
            weight: body.weight ?? 0.5,
        })
        .select()
        .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data, { status: 201 })
}
