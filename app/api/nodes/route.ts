import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()

  if (!body.thesis_id || !body.title) {
    return NextResponse.json({ error: 'thesis_id and title are required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('nodes')
    .insert({
      thesis_id: body.thesis_id,
      title: body.title,
      description: body.description || null,
      evidence_links: body.evidence_links || [],
      probability: body.probability ?? 70,
      confidence: body.confidence ?? 'MEDIUM',
      time_relevance: body.time_relevance ?? 'MEDIUM',
      node_type: body.node_type ?? 'STRUCTURAL_DRIVER',
      pos_x: body.pos_x ?? 0,
      pos_y: body.pos_y ?? 0,
      pos_z: body.pos_z ?? 0,
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
