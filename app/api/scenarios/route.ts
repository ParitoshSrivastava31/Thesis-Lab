import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json()

    if (!body.thesis_id || !body.name || !body.node_snapshot || body.strength_score === undefined) {
        return NextResponse.json({ error: 'thesis_id, name, node_snapshot, and strength_score are required' }, { status: 400 })
    }

    const { data, error } = await supabase
        .from('scenarios')
        .insert({
            thesis_id: body.thesis_id,
            name: body.name,
            description: body.description || null,
            is_baseline: body.is_baseline ?? false,
            node_snapshot: body.node_snapshot,
            strength_score: body.strength_score,
        })
        .select()
        .single()

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data, { status: 201 })
}
