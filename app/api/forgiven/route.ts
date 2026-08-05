import { Resend } from 'resend'

const NOTIFY_TO = 'zamashange2007@gmail.com'

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.log('[v0] RESEND_API_KEY missing — skipping notification email')
    return Response.json({ ok: false, reason: 'not_configured' }, { status: 200 })
  }

  let note = ''
  try {
    const body = (await request.json()) as { note?: unknown }
    if (typeof body.note === 'string') {
      note = body.note.slice(0, 500)
    }
  } catch {
    note = ''
  }

  const when = new Date().toLocaleString('en-ZA', {
    timeZone: 'Africa/Johannesburg',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: 'Abigail Letter <onboarding@resend.dev>',
      to: [NOTIFY_TO],
      subject: 'She said yes — Abigail forgave you',
      text: [
        'Abigail just tapped "yes, come here" on your letter.',
        '',
        `When: ${when} (SAST)`,
        note ? `Her note: ${note}` : 'She did not leave a note.',
        '',
        'Go call her.',
      ].join('\n'),
    })

    return Response.json({ ok: true })
  } catch (error) {
    console.log('[v0] Failed to send notification:', (error as Error).message)
    return Response.json({ ok: false, reason: 'send_failed' }, { status: 200 })
  }
}
