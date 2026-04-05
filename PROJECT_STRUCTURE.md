# PNGIO Project Structure

Complete file structure for the PNGIO multi-tenant visual content platform.

## Created Files & Directories

### Documentation
```
├── README.md                          # Main project documentation
├── SETUP.md                           # Setup and installation guide
├── project_specs.md                   # Complete product specifications
├── PROJECT_STRUCTURE.md               # This file - project structure overview
├── CLAUDE.MD                          # Original context file
```

### Configuration Files
```
├── .env.example                       # Environment variables template
├── .gitignore                         # Git ignore rules
├── components.json                    # shadcn/ui configuration
├── next.config.js                     # Next.js configuration
├── package.json                       # Dependencies and scripts
├── postcss.config.js                  # PostCSS configuration
├── tailwind.config.ts                 # Tailwind CSS configuration
├── tsconfig.json                      # TypeScript configuration
├── middleware.ts                      # Next.js middleware (auth, multi-tenant)
```

### App Directory (Next.js 14 App Router)
```
app/
├── globals.css                        # Global styles
├── layout.tsx                         # Root layout
├── page.tsx                           # Home page
│
├── (marketing)/                       # Public marketing pages
│   ├── about/
│   │   └── page.tsx                  # About page
│   ├── contact/
│   │   └── page.tsx                  # Contact form
│   └── pricing/
│       └── page.tsx                  # Pricing plans
│
├── (auth)/                            # Authentication pages
│   ├── login/
│   │   └── page.tsx                  # Login (TODO)
│   ├── signup/
│   │   └── page.tsx                  # Sign up (TODO)
│   └── invite/
│       └── [token]/
│           └── page.tsx              # Accept invitation (TODO)
│
├── (app)/                             # Protected application routes
│   ├── onboarding/
│   │   └── page.tsx                  # New org onboarding (TODO)
│   └── [org-slug]/                   # Org-scoped routes
│       ├── dashboard/
│       │   └── page.tsx              # Dashboard (TODO)
│       ├── templates/
│       │   ├── page.tsx              # Template library (TODO)
│       │   ├── new/
│       │   │   └── page.tsx          # Create template (TODO)
│       │   └── [id]/
│       │       ├── page.tsx          # Template detail (TODO)
│       │       └── edit/
│       │           └── page.tsx      # Edit template (TODO)
│       ├── editor/
│       │   ├── page.tsx              # New project editor (TODO)
│       │   └── [project-id]/
│       │       └── page.tsx          # Edit project (TODO)
│       ├── projects/
│       │   ├── page.tsx              # My projects (TODO)
│       │   └── [id]/
│       │       └── page.tsx          # Project detail (TODO)
│       ├── inspiration/
│       │   └── page.tsx              # Team feed (TODO)
│       ├── brand-assets/
│       │   └── page.tsx              # Asset library (TODO)
│       ├── analytics/
│       │   ├── page.tsx              # Analytics overview (TODO)
│       │   ├── templates/
│       │   │   └── page.tsx          # Template analytics (TODO)
│       │   └── users/
│       │       └── page.tsx          # User analytics (TODO)
│       └── settings/
│           ├── page.tsx              # General settings (TODO)
│           ├── team/
│           │   └── page.tsx          # Team management (TODO)
│           ├── billing/
│           │   └── page.tsx          # Billing & subscription (TODO)
│           ├── branding/
│           │   └── page.tsx          # Custom branding (TODO)
│           └── profile/
│               └── page.tsx          # User profile (TODO)
│
└── api/                               # API routes
    ├── auth/
    │   ├── signup/
    │   │   └── route.ts              # Sign up endpoint (TODO)
    │   └── invite/
    │       └── route.ts              # Invite handling (TODO)
    ├── orgs/
    │   └── [id]/
    │       ├── route.ts              # Org CRUD (TODO)
    │       ├── users/
    │       │   └── route.ts          # User management (TODO)
    │       ├── templates/
    │       │   └── route.ts          # Template CRUD (TODO)
    │       ├── brand-assets/
    │       │   └── route.ts          # Asset management (TODO)
    │       ├── projects/
    │       │   └── route.ts          # Project CRUD (TODO)
    │       ├── inspiration/
    │       │   └── route.ts          # Feed management (TODO)
    │       ├── analytics/
    │       │   └── route.ts          # Analytics data (TODO)
    │       └── exports/
    │           └── route.ts          # Export handling (TODO)
    ├── stripe/
    │   ├── webhooks/
    │   │   └── route.ts              # Stripe webhooks (TODO)
    │   ├── create-checkout/
    │   │   └── route.ts              # Checkout session (TODO)
    │   └── create-portal/
    │       └── route.ts              # Customer portal (TODO)
    └── contact/
        └── route.ts                  # Contact form (TODO)
```

### Components
```
components/
├── ui/                                # shadcn/ui components (install as needed)
│   ├── button.tsx                    # (TODO: npx shadcn-ui add button)
│   ├── card.tsx                      # (TODO: npx shadcn-ui add card)
│   ├── input.tsx                     # (TODO: npx shadcn-ui add input)
│   ├── dialog.tsx                    # (TODO: npx shadcn-ui add dialog)
│   ├── sheet.tsx                     # (TODO: npx shadcn-ui add sheet)
│   ├── dropdown-menu.tsx             # (TODO: npx shadcn-ui add dropdown-menu)
│   ├── avatar.tsx                    # (TODO: npx shadcn-ui add avatar)
│   ├── badge.tsx                     # (TODO: npx shadcn-ui add badge)
│   ├── tabs.tsx                      # (TODO: npx shadcn-ui add tabs)
│   ├── toast.tsx                     # (TODO: npx shadcn-ui add toast)
│   ├── select.tsx                    # (TODO: npx shadcn-ui add select)
│   ├── table.tsx                     # (TODO: npx shadcn-ui add table)
│   └── ...                           # More as needed
│
├── canvas/                            # Canvas editor components
│   ├── canvas-editor.tsx             # Main editor component (TODO)
│   ├── canvas-toolbar.tsx            # Toolbar (TODO)
│   ├── canvas-sidebar.tsx            # Properties sidebar (TODO)
│   └── canvas-objects/               # Object-specific controls (TODO)
│
├── templates/                         # Template components
│   ├── template-card.tsx             # Template preview card (TODO)
│   ├── template-grid.tsx             # Template grid view (TODO)
│   └── template-filters.tsx          # Search & filters (TODO)
│
├── navigation/                        # Navigation components
│   ├── navbar.tsx                    # Main navbar (TODO)
│   ├── sidebar.tsx                   # App sidebar (TODO)
│   └── breadcrumbs.tsx               # Breadcrumb navigation (TODO)
│
├── forms/                             # Form components
│   ├── invite-user-form.tsx          # Invite form (TODO)
│   ├── create-template-form.tsx      # Template form (TODO)
│   └── upload-asset-form.tsx         # Asset upload (TODO)
│
├── dashboard/                         # Dashboard components
│   ├── stats-card.tsx                # Stat cards (TODO)
│   └── activity-feed.tsx             # Recent activity (TODO)
│
├── feed/                              # Inspiration feed components
│   ├── feed-card.tsx                 # Feed item card (TODO)
│   └── feed-grid.tsx                 # Feed grid view (TODO)
│
├── brand-assets/                      # Asset library components
│   ├── asset-card.tsx                # Asset card (TODO)
│   └── asset-upload.tsx              # Upload UI (TODO)
│
├── analytics/                         # Analytics components
│   ├── chart.tsx                     # Chart wrapper (TODO)
│   └── stats-table.tsx               # Stats table (TODO)
│
├── layouts/                           # Layout components
│   ├── app-layout.tsx                # Main app layout (TODO)
│   └── marketing-layout.tsx          # Marketing layout (TODO)
│
└── providers/                         # Context providers
    ├── supabase-provider.tsx         # Supabase context (TODO)
    └── toast-provider.tsx            # Toast notifications (TODO)
```

### Library & Utilities
```
lib/
├── supabase/                          # Supabase utilities
│   ├── client.ts                     # Browser client
│   ├── server.ts                     # Server client
│   └── middleware.ts                 # Middleware helper
│
├── stripe/                            # Stripe utilities
│   ├── client.ts                     # Stripe client (TODO)
│   ├── webhooks.ts                   # Webhook handlers (TODO)
│   └── subscriptions.ts              # Subscription logic (TODO)
│
├── canvas/                            # Canvas utilities
│   └── editor.ts                     # CanvasEditor class
│
├── validations.ts                     # Zod schemas
└── utils.ts                          # General utilities
```

### Types
```
types/
├── supabase.ts                        # Auto-generated Supabase types
└── index.ts                          # Shared TypeScript types
```

### Email Templates
```
emails/
├── team-invitation.tsx                # Invitation email
└── welcome.tsx                        # Welcome email
```

### Database
```
supabase/
├── migrations/
│   ├── 001_initial_schema.sql        # Database schema
│   └── 002_row_level_security.sql    # RLS policies
└── seed/
    └── seed.sql                      # Seed data (TODO)
```

### State Management
```
store/
└── canvas-store.ts                    # Zustand canvas store
```

### Custom Hooks
```
hooks/
├── use-user.ts                        # User hook (TODO)
├── use-organization.ts                # Organization hook (TODO)
├── use-templates.ts                   # Templates hook (TODO)
└── use-canvas.ts                     # Canvas hook (TODO)
```

### Public Assets
```
public/
├── images/
│   └── logo.svg                      # (TODO)
└── fonts/
    └── ...                           # Custom fonts (TODO)
```

## File Status Legend

- ✅ **Created**: File exists with initial implementation
- 📝 **TODO**: File structure created, needs implementation
- 🔧 **To Install**: shadcn/ui components to install as needed

## Implementation Priority

### Phase 1 (MVP - Weeks 1-4)
1. Install shadcn/ui components
2. Create auth pages (login, signup)
3. Build organization onboarding
4. Implement dashboard layout
5. Create basic canvas editor

### Phase 2 (Core Features - Weeks 5-8)
1. Template CRUD operations
2. Brand asset management
3. Project creation and editing
4. Export functionality
5. User invitation system

### Phase 3 (Team Features - Weeks 9-12)
1. Inspiration feed
2. Team management
3. Role-based permissions
4. Activity logging
5. Search and filters

### Phase 4 (Monetization - Weeks 13-16)
1. Stripe integration
2. Subscription management
3. Usage limits enforcement
4. Analytics dashboard (Pro)
5. Custom branding (Pro)

### Phase 5 (Enterprise - Weeks 17-20)
1. SSO/SAML integration
2. Custom subdomains
3. API access
4. Advanced analytics
5. Admin features

## Installation Commands

### Initial Setup
```bash
npm install
cp .env.example .env
# Edit .env with your credentials
```

### Install shadcn/ui Components (as needed)
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add select
npx shadcn-ui@latest add table
npx shadcn-ui@latest add label
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add command
npx shadcn-ui@latest add popover
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add alert
```

### Supabase Setup
```bash
supabase link --project-ref your-project-ref
supabase db push
npm run supabase:gen-types
```

### Development
```bash
npm run dev
```

## Key Features by File

### Multi-Tenancy
- `middleware.ts` - Org resolution from URL/subdomain
- `supabase/migrations/002_row_level_security.sql` - RLS policies
- All data tables include `org_id` foreign key

### Authentication
- `lib/supabase/client.ts` - Client-side auth
- `lib/supabase/server.ts` - Server-side auth
- `middleware.ts` - Route protection

### Canvas Editor
- `lib/canvas/editor.ts` - CanvasEditor class with Fabric.js
- `store/canvas-store.ts` - Editor state management
- `components/canvas/*` - Canvas UI components (TODO)

### Role-Based Access
- `types/index.ts` - Role definitions
- `supabase/migrations/001_initial_schema.sql` - User roles in DB
- RLS policies enforce role-based data access

### Subscriptions
- `lib/stripe/*` - Stripe integration (TODO)
- `api/stripe/webhooks` - Webhook handlers (TODO)
- `types/index.ts` - Plan limits defined

## Notes

- All route pages marked (TODO) need implementation
- shadcn/ui components need to be installed individually
- Supabase storage buckets need to be created manually
- Stripe products and webhooks need configuration
- Custom domain setup required for Enterprise subdomain feature

---

**Created**: March 11, 2026
**Version**: 1.0
**Status**: Initial structure complete, ready for implementation
