import { Resend } from 'resend'

const NOTIFY_TO = process.env.NOTIFY_EMAIL ?? 'zamashange2007@gmail.com'

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
    console.error('RESEND_API_KEY missing — skipping notification email')
    return Response.json({ ok: false, reason: 'not_configured' }, { status: 500 })
  }

  const heardMail = {
    subject: 'Ricky said yes — she heard you, king',
    text: [
      'Ricky just tapped “I hear you my handsome tall darkskin king”.',
      '',
      `When: ${when} (SAST)`,
      '',
      'She is on The Summons page now. Stay close to your phone.',
    ].join('\n'),
  }

  const summonsMail = {
    subject: 'Ricky made arrangements — she named when you can see her',
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
    const { data, error } = await resend.emails.send({
      from: 'A raven for Ricky <onboarding@resend.dev>',
      to: [NOTIFY_TO],
      subject: mail.subject,
      text: mail.text,
    })

    if (error) {
      console.error('Resend error:', error)
      return Response.json({ ok: false, reason: error.message }, { status: 500 })
    }

    return Response.json({ ok: true, id: data?.id })
  } catch (error) {
    console.error('Failed to send notification:', (error as Error).message)
    return Response.json({ ok: false, reason: 'send_failed' }, { status: 500 })
  }
}
