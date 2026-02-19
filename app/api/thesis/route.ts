
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabase
    .from('theses')
    .select(`
      *,
      nodes(count),
      scenarios(count)
    `)
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json()

  // Basic validation
  if (!body.name || !body.statement) {
    return NextResponse.json({ error: 'Name and statement are required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('theses')
    .insert({
      user_id: user.id,
      name: body.name,
      statement: body.statement,
      description: body.description,
      time_horizon: body.timeHorizon ?? 'THREE_YEARS',
    })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data, { status: 201 })
}
