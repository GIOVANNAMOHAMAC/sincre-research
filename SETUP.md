# PNGIO Setup Guide

This guide will help you set up PNGIO from scratch.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# 3. Set up Supabase
supabase link --project-ref your-project-ref
supabase db push

# 4. Install shadcn/ui components (as needed)
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
# ... add more as needed

# 5. Start development server
npm run dev
```

## Detailed Setup

### 1. Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Get your project credentials:
   - Project URL: `https://xxxxx.supabase.co`
   - Anon/Public Key: From Settings > API
   - Service Role Key: From Settings > API (keep this secret!)

3. Add credentials to `.env`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

4. Install Supabase CLI:
```bash
npm install -g supabase
```

5. Link your project:
```bash
supabase link --project-ref your-project-ref
```

6. Run migrations:
```bash
supabase db push
```

7. Generate TypeScript types:
```bash
npm run supabase:gen-types
```

### 2. Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Get your API keys from Dashboard > Developers > API keys
3. Add to `.env`:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

4. Create products in Stripe Dashboard:
   - **Pro Plan**: $49/mo recurring subscription
   - Get the price ID (starts with `price_`)

5. Add price IDs to `.env`:
```env
STRIPE_PRO_PRICE_ID=price_xxxxx
```

6. Set up webhooks (after deploying):
   - Webhook URL: `https://yourdomain.com/api/stripe/webhooks`
   - Events: `customer.subscription.*`, `invoice.*`
   - Get webhook secret and add to `.env`:
```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 3. Resend Setup

1. Create a Resend account at https://resend.com
2. Get your API key from Dashboard > API Keys
3. Add to `.env`:
```env
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

4. Verify your domain in Resend for production use

### 4. Install shadcn/ui Components

Install components as you need them:

```bash
# Core components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add select
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add table
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add command
npx shadcn-ui@latest add popover
```

### 5. Storage Buckets

Create the following storage buckets in Supabase:

1. Go to Storage in Supabase Dashboard
2. Create buckets:
   - `templates` (public)
   - `brand-assets` (private)
   - `projects` (private)
   - `exports` (private)

3. Set up RLS policies for each bucket (see Supabase docs)

### 6. Authentication Setup

1. In Supabase Dashboard, go to Authentication > Settings
2. Enable email provider
3. Configure email templates (optional)
4. Set up OAuth providers (optional):
   - Google
   - Microsoft
   - LinkedIn

### 7. Development

Start the development server:

```bash
npm run dev
```

Visit http://localhost:3000

### 8. Deployment

#### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

#### Set up custom domain (Enterprise)

1. Add wildcard domain in Vercel: `*.pngio.com`
2. Add DNS records:
   - CNAME: `*` → `cname.vercel-dns.com`
   - A record: `@` → Vercel IP
3. Verify domain in Vercel

## Project Structure

```
pngio/
├── app/                    # Next.js App Router
│   ├── (marketing)/       # Public pages
│   ├── (auth)/            # Auth pages
│   ├── (app)/             # Protected app
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Utilities
├── types/                 # TypeScript types
├── emails/                # Email templates
├── supabase/              # Database migrations
├── hooks/                 # Custom hooks
├── store/                 # Zustand stores
└── public/                # Static assets
```

## Next Steps

1. **Build authentication pages**: Sign up, login, password reset
2. **Create dashboard**: Organization overview, recent activity
3. **Implement canvas editor**: Template creation and editing
4. **Build template library**: Browse, search, filter
5. **Add project management**: Create, save, export
6. **Implement team features**: Invitations, roles, permissions
7. **Add inspiration feed**: Share and duplicate projects
8. **Integrate Stripe**: Subscription management
9. **Build analytics**: Usage tracking, reports (Pro+)
10. **Add admin features**: User management, billing

## Common Issues

### Supabase connection issues
- Check your environment variables
- Ensure RLS policies are set up correctly
- Verify your API keys are correct

### Canvas not rendering
- Make sure Fabric.js is properly installed
- Check that canvas element exists in DOM
- Verify canvas dimensions are set

### Email not sending
- Check Resend API key
- Verify sender email is verified
- Check Resend dashboard for errors

### Stripe webhook not working
- Verify webhook secret matches
- Check webhook URL is correct
- Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3000/api/stripe/webhooks`

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Fabric.js Documentation](http://fabricjs.com/docs/)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Stripe Documentation](https://stripe.com/docs)
- [Resend Documentation](https://resend.com/docs)

## Support

If you need help:
1. Check the documentation
2. Search for existing issues
3. Contact the development team
