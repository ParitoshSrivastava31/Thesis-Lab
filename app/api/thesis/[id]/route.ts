
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  const { data, error } = await supabase
    .from('theses')
    .select(`
      *,
      nodes (*),
      edges (*),
      scenarios (*)
    `)
    .eq('id', id)
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  
  // RLS ensures users can only access their own theses, but we can double check ownership if needed
  if (data.user_id !== user.id && !data.is_public) {
     return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  return NextResponse.json(data)
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  const { error } = await supabase
    .from('theses')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id) // Ensure ownership

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params
    const body = await request.json()

    // Filter allowed fields for update
    const updates: any = {}
    if (body.name) updates.name = body.name
    if (body.statement) updates.statement = body.statement
    if (body.description !== undefined) updates.description = body.description
    if (body.timeHorizon) updates.time_horizon = body.timeHorizon
    if (body.isPublic !== undefined) updates.is_public = body.isPublic
    
    const { data, error } = await supabase
        .from('theses')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single()
    
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json(data)
}
