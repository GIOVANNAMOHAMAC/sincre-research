# PNGIO - Multi-Tenant Visual Content Platform

A modern SaaS platform for sales teams to create professional marketing materials using company-approved templates and brand assets.

## Overview

PNGIO is built with Next.js 14, Supabase, Fabric.js, and shadcn/ui. It provides a multi-tenant architecture where each company operates in an isolated workspace with role-based access control (Owner, Admin, Staff).

## Key Features

- **Multi-tenant Architecture**: Complete data isolation per organization
- **Role-Based Access Control**: Owner, Admin, and Staff roles with granular permissions
- **Canvas Editor**: In-app design editor powered by Fabric.js
- **Template Management**: Admins create and publish templates for the team
- **Brand Asset Library**: Centralized storage for logos, images, fonts, and colors
- **Inspiration Feed**: Team members can share and duplicate successful designs
- **Export System**: PNG, PDF, and SVG exports (plan-dependent)
- **Subscription Tiers**: Free, Pro ($49/mo), and Enterprise plans

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Canvas Editor**: Fabric.js
- **UI Components**: shadcn/ui + Tailwind CSS
- **Payments**: Stripe
- **Email**: Resend + React Email
- **Deployment**: Vercel
- **State Management**: Zustand

## Project Structure

```
pngio/
├── app/                          # Next.js 14 App Router
│   ├── (marketing)/              # Public marketing pages
│   │   ├── about/
│   │   ├── pricing/
│   │   └── contact/
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/
│   │   ├── signup/
│   │   └── invite/[token]/
│   ├── (app)/                    # Protected app routes
│   │   ├── onboarding/
│   │   └── [org-slug]/           # Org-scoped routes
│   │       ├── dashboard/
│   │       ├── templates/
│   │       ├── editor/
│   │       ├── projects/
│   │       ├── inspiration/
│   │       ├── brand-assets/
│   │       ├── analytics/
│   │       └── settings/
│   ├── api/                      # API routes
│   │   ├── auth/
│   │   ├── orgs/
│   │   ├── stripe/
│   │   └── contact/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── canvas/                   # Canvas editor components
│   ├── templates/                # Template components
│   ├── navigation/               # Navigation components
│   ├── forms/                    # Form components
│   └── ...
├── lib/                          # Utilities and libraries
│   ├── supabase/                 # Supabase client & helpers
│   ├── stripe/                   # Stripe integration
│   ├── canvas/                   # Canvas editor class
│   ├── validations.ts            # Zod schemas
│   └── utils.ts                  # Utility functions
├── types/                        # TypeScript types
│   ├── supabase.ts               # Auto-generated Supabase types
│   └── index.ts                  # Shared types
├── emails/                       # Email templates (React Email)
│   ├── team-invitation.tsx
│   └── welcome.tsx
├── supabase/                     # Supabase migrations
│   └── migrations/
│       ├── 001_initial_schema.sql
│       └── 002_row_level_security.sql
├── hooks/                        # Custom React hooks
├── store/                        # Zustand stores
│   └── canvas-store.ts
├── public/                       # Static assets
├── middleware.ts                 # Next.js middleware
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Supabase account
- Stripe account (for payments)
- Resend account (for emails)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd pngio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@pngio.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Set up Supabase:
```bash
# Install Supabase CLI
npm install -g supabase

# Link your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Database Setup

### Run Migrations

The database schema is defined in `supabase/migrations/`. To apply:

```bash
supabase db push
```

### Generate TypeScript Types

After schema changes, regenerate types:

```bash
npm run supabase:gen-types
```

### Row Level Security (RLS)

All tables have RLS policies to enforce multi-tenant isolation. See `supabase/migrations/002_row_level_security.sql`.

## Stripe Setup

1. Create products in Stripe:
   - **Pro Plan**: $49/mo recurring
   - **Enterprise Plan**: Custom pricing (handled manually)

2. Set up webhooks:
   - Webhook URL: `https://yourdomain.com/api/stripe/webhooks`
   - Events to listen for:
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`

3. Add price IDs to `.env`:
```env
STRIPE_PRO_PRICE_ID=price_xxx
STRIPE_ENTERPRISE_PRICE_ID=price_xxx
```

## Development

### Key Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Code Style

- Use TypeScript for all files
- Follow Next.js 14 App Router conventions
- Use Server Components by default, Client Components when needed
- Prefer server actions for mutations
- Use Zod for validation

## Multi-Tenancy

### Organization Isolation

Every data table includes `org_id` for tenant isolation:
- RLS policies enforce users can only access their org's data
- Storage buckets use `org_id/` prefixes
- All queries filter by org_id automatically

### Role Hierarchy

1. **Owner**: Full control, billing, team management
2. **Admin**: Template and asset management, can invite users
3. **Staff**: Template consumption, project creation, export

## Canvas Editor

The canvas editor is built with Fabric.js:

```typescript
import { CanvasEditor } from '@/lib/canvas/editor'

const editor = new CanvasEditor(canvasElement, {
  width: 800,
  height: 600,
})

// Add objects
editor.addText('Hello World')
editor.addRectangle({ fill: '#3b82f6' })
await editor.addImage('/logo.png')

// Export
const png = editor.exportToPNG({ quality: 1, dpi: 300 })
const svg = editor.exportToSVG()

// Undo/Redo
editor.undo()
editor.redo()

// Save/Load
const json = editor.toJSON()
await editor.loadFromJSON(json)
```

## Deployment

### Vercel

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Custom Subdomains (Enterprise)

1. Add wildcard domain in Vercel: `*.pngio.com`
2. DNS: Add CNAME record `*` → `cname.vercel-dns.com`
3. Middleware handles subdomain resolution

## Testing

### Manual Testing Checklist

- [ ] User signup and organization creation
- [ ] Email invitation flow
- [ ] Template creation and publishing
- [ ] Canvas editor (add text, shapes, images)
- [ ] Project creation from template
- [ ] Export to PNG/PDF
- [ ] Inspiration feed sharing
- [ ] Stripe subscription upgrade
- [ ] Role-based permissions

## Documentation

See `project_specs.md` for:
- Complete feature specifications
- Data model details
- API route documentation
- Pricing plans
- Security considerations

## Roadmap

### Phase 1 (MVP)
- [x] Project structure
- [ ] Authentication & onboarding
- [ ] Organization management
- [ ] Template CRUD
- [ ] Canvas editor
- [ ] Basic export

### Phase 2
- [ ] Stripe integration
- [ ] Inspiration feed
- [ ] Analytics dashboard (Pro)
- [ ] Custom branding (Pro)

### Phase 3
- [ ] SSO/SAML (Enterprise)
- [ ] Custom subdomains (Enterprise)
- [ ] API access (Enterprise)
- [ ] Advanced analytics

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is proprietary and confidential.

## Support

For questions or support:
- Email: support@pngio.com
- Documentation: https://docs.pngio.com

---

Built with ❤️ using Next.js, Supabase, and Fabric.js
