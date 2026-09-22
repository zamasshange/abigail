import { Resend } from 'resend'

const NOTIFY_TO = process.env.NOTIFY_EMAIL ?? 'austinriot@icloud.com'
const FALLBACK_TO = 'zamashange2007@gmail.com'

type Body = {
  type?: unknown
  note?: unknown
  when?: unknown
  where?: unknown
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

  const kind = body.type === 'details' ? 'details' : 'yes'
  const note = asText(body.note)
  const when = asText(body.when, 80)
  const where = asText(body.where, 160)

  const stamped = new Date().toLocaleString('en-ZA', {
    timeZone: 'Africa/Johannesburg',
    dateStyle: 'full',
    timeStyle: 'short',
  })

  if (!apiKey) {
    console.error('RESEND_API_KEY missing — skipping notification email')
    return Response.json({ ok: false, reason: 'not_configured' }, { status: 500 })
  }

  const yesMail = {
    subject: 'Jasmine said yes — she will go out with you',
    text: [
      'Jasmine just tapped “yes, let’s go” on your letter.',
      '',
      `When: ${stamped} (SAST)`,
      '',
      'She can still send when and where. Stay close.',
    ].join('\n'),
  }

  const detailsMail = {
    subject: 'Jasmine sent date details',
    text: [
      'Jasmine filled in the date details.',
      '',
      `When she sent it: ${stamped} (SAST)`,
      when ? `When works: ${when}` : 'She did not say when.',
      where ? `Where: ${where}` : 'She did not name a place.',
      note ? `Her note: ${note}` : 'She did not leave a note.',
      '',
      'Go make the plan.',
    ].join('\n'),
  }

  const mail = kind === 'details' ? detailsMail : yesMail

  try {
    const resend = new Resend(apiKey)
    const sendTo = async (to: string, extra = '') =>
      resend.emails.send({
        from: 'Riot for Jasmine <onboarding@resend.dev>',
        to: [to],
        subject: mail.subject,
        text: extra ? `${mail.text}\n\n${extra}` : mail.text,
      })

    let { data, error } = await sendTo(NOTIFY_TO)

    if (error && NOTIFY_TO !== FALLBACK_TO) {
      console.error('Resend blocked primary inbox, sending fallback:', error.message)
      const retry = await sendTo(
        FALLBACK_TO,
        `Could not deliver to ${NOTIFY_TO} yet (Resend test mode). Verify a domain at resend.com/domains to send straight to iCloud.`,
      )
      data = retry.data
      error = retry.error
    }

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
