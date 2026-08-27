import { Resend } from 'resend'

const NOTIFY_TO = 'zamashange2007@gmail.com'

type Body = {
  type?: unknown
  note?: unknown
  date?: unknown
  time?: unknown
  place?: unknown
}

function asText(value: unknown, max = 500) {
  return typeof value === 'string' ? value.slice(0, max) : ''
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY

  let body: Body = {}
  try {
    body = (await request.json()) as Body
  } catch {
    body = {}
  }

  const kind = body.type === 'summons' ? 'summons' : 'heard'
  const note = asText(body.note)
  const date = asText(body.date, 40)
  const time = asText(body.time, 80)
  const place = asText(body.place, 160)

  const when = new Date().toLocaleString('en-ZA', {
    timeZone: 'Africa/Johannesburg',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  if (!apiKey) {
    console.log('[v0] RESEND_API_KEY missing — skipping notification email')
    return Response.json({ ok: false, reason: 'not_configured' }, { status: 200 })
  }

  const heardMail = {
    subject: 'The Queen heard you — Ricky answered',
    text: [
      'Ricky tapped “I hear you my handsome tall darkskin king”.',
      '',
      `When: ${when} (SAST)`,
      '',
      'She is on The Summons page now. Stay close.',
    ].join('\n'),
  }

  const summonsMail = {
    subject: 'A summons from Queen Ricky — she named the meeting',
    text: [
      'Ricky sealed a summons. She is letting you see her.',
      '',
      `When she sent it: ${when} (SAST)`,
      date ? `The day: ${date}` : '',
      time ? `The hour: ${time}` : '',
      place ? `The place: ${place}` : '',
      note ? `Her word: ${note}` : 'She did not leave a note.',
      '',
      'Go. This is the first time.',
    ]
      .filter(Boolean)
      .join('\n'),
  }

  const mail = kind === 'summons' ? summonsMail : heardMail

  try {
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: 'A raven for Ricky <onboarding@resend.dev>',
      to: [NOTIFY_TO],
      subject: mail.subject,
      text: mail.text,
    })

    return Response.json({ ok: true })
  } catch (error) {
    console.log('[v0] Failed to send notification:', (error as Error).message)
    return Response.json({ ok: false, reason: 'send_failed' }, { status: 200 })
  }
}
