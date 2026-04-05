import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'

interface TeamInvitationEmailProps {
  inviterName: string
  inviterEmail: string
  orgName: string
  role: 'admin' | 'staff'
  inviteLink: string
}

export default function TeamInvitationEmail({
  inviterName,
  inviterEmail,
  orgName,
  role,
  inviteLink,
}: TeamInvitationEmailProps) {
  const roleText = role === 'admin' ? 'Admin' : 'Staff member'

  return (
    <Html>
      <Head />
      <Preview>You've been invited to join {orgName} on PNGIO</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>You've been invited to join {orgName}</Heading>

          <Text style={text}>
            {inviterName} ({inviterEmail}) has invited you to join their team on PNGIO as a {roleText}.
          </Text>

          <Text style={text}>
            PNGIO is a visual content platform that helps sales teams create professional marketing
            materials using company-approved templates and brand assets.
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={inviteLink}>
              Accept Invitation
            </Button>
          </Section>

          <Text style={text}>
            This invitation will expire in 7 days. If you didn't expect this invitation, you can
            safely ignore this email.
          </Text>

          <Text style={footer}>
            © 2026 PNGIO. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 8px',
}

const buttonContainer = {
  padding: '27px 0 27px',
  textAlign: 'center' as const,
}

const button = {
  backgroundColor: '#3b82f6',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  marginTop: '32px',
  textAlign: 'center' as const,
}
