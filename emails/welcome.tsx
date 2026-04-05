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

interface WelcomeEmailProps {
  name: string
  orgName: string
  dashboardLink: string
}

export default function WelcomeEmail({
  name,
  orgName,
  dashboardLink,
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to PNGIO - Let's get started!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to PNGIO, {name}!</Heading>

          <Text style={text}>
            Thanks for creating your organization <strong>{orgName}</strong> on PNGIO.
            We're excited to help your team create amazing visual content.
          </Text>

          <Text style={text}>
            Here's what you can do next:
          </Text>

          <ul style={list}>
            <li style={listItem}>Upload your brand assets (logos, images, colors)</li>
            <li style={listItem}>Create your first template</li>
            <li style={listItem}>Invite your team members</li>
            <li style={listItem}>Start creating beautiful designs</li>
          </ul>

          <Section style={buttonContainer}>
            <Button style={button} href={dashboardLink}>
              Go to Dashboard
            </Button>
          </Section>

          <Text style={text}>
            Need help getting started? Check out our documentation or reach out to our support team.
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

const list = {
  margin: '16px 8px',
  paddingLeft: '20px',
}

const listItem = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  marginBottom: '8px',
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
