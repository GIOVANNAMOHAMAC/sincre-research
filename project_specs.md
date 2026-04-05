# PNGIO - Multi-Tenant Visual Content Platform

## Product Summary

PNGIO is a multi-tenant visual content creation platform designed specifically for sales teams. Similar to Canva but with enterprise-grade controls, PNGIO enables companies to maintain brand consistency while empowering their sales teams to create professional marketing materials. Each company operates in an isolated workspace where marketing teams control brand assets and templates, while sales staff can customize and export polished visuals on demand.

### Core Value Proposition
- **For Companies**: Maintain brand consistency across all sales materials with centralized control
- **For Marketing/Admins**: Upload, manage, and publish approved templates and brand assets organization-wide
- **For Sales Teams**: Access company-approved templates, customize quickly, and export professional visuals without design skills
- **For Organizations**: Scalable, secure multi-tenant SaaS with team collaboration and inspiration sharing

### Key Differentiators
- **Multi-tenant architecture** with complete data isolation
- **Role-based access control** (Owner, Admin, Staff)
- **In-app canvas editor** powered by Fabric.js
- **Template library** managed by marketing teams
- **Inspiration feed** for sharing completed projects across teams
- **Professional work email verification** for team security

---

## Multi-Tenant Architecture

### Tenant Isolation Strategy

**Organization-based Multi-tenancy**
Each company (organization) is a separate tenant with complete data isolation at the database level using Row Level Security (RLS).

```typescript
// Every data table includes org_id for tenant isolation
{
  org_id: uuid (FK -> Organizations)
  // RLS policies ensure users only access their org's data
}
```

### Key Architectural Decisions

1. **Single Database, Logical Isolation**
   - One Supabase project with RLS policies
   - `org_id` foreign key on all tenant-specific tables
   - RLS policies enforce org_id matching current user's organization

2. **Subdomain Routing** (Enterprise)
   - Free/Pro: `app.pngio.com/org/[org-slug]`
   - Enterprise: `acmecorp.pngio.com` (custom subdomain)
   - Middleware resolves organization from subdomain or path

3. **Storage Buckets**
   - Shared buckets with `org_id/` prefixes
   - Separate buckets: `templates/`, `brand-assets/`, `projects/`, `exports/`
   - RLS on storage ensures cross-tenant isolation

4. **Authentication Flow**
   - User signs up → Creates or joins organization
   - Email domain matching for auto-joining (e.g., @acmecorp.com)
   - Invitation system for adding team members
   - SSO/SAML for Enterprise (Supabase Auth with external providers)

---

## User Roles & Permissions

### 1. Owner (Primary Account)
**One per organization** - Full administrative control

Capabilities:
- Create and configure organization workspace
- Manage billing and subscription (Stripe)
- Invite/remove Admin and Staff users
- Configure organization settings (name, logo, default permissions)
- View usage analytics and reports
- Transfer ownership
- Delete organization
- All Admin and Staff permissions

### 2. Admin (Marketing Team)
**Multiple per organization** - Content and brand management

Capabilities:
- Upload and manage brand assets (logos, fonts, colors, images)
- Create and publish templates to template library
- Organize templates into categories/folders
- Archive/unpublish templates
- View template usage analytics (which templates are most used)
- Moderate inspiration feed (delete inappropriate shares)
- Invite Staff users
- View Staff activity logs
- All Staff permissions

### 3. Staff (Sales Team)
**Multiple per organization** - Template consumers and content creators

Capabilities:
- Browse company-approved template library
- Search and filter templates by category/tag
- Customize templates in canvas editor
- Save projects as drafts
- Export completed designs (format depends on plan)
- Share completed projects to inspiration feed
- Browse team inspiration feed
- Duplicate shared projects from feed
- Manage own profile settings
- View personal project history

### 4. Public (Unauthenticated)
- View marketing website (home, about, pricing, contact)
- Sign up for new organization
- Request to join existing organization (if email domain matches)

---

## Data Model

### Organizations Table
```typescript
{
  id: uuid (PK)
  name: string
  slug: string (unique, URL-friendly)
  custom_subdomain: string? (unique, Enterprise only)
  logo_url: string?

  // Subscription & Billing
  plan: enum('free', 'pro', 'enterprise')
  stripe_customer_id: string?
  stripe_subscription_id: string?
  subscription_status: enum('active', 'trialing', 'past_due', 'canceled', 'incomplete')
  subscription_current_period_end: timestamp?

  // Plan Limits
  max_users: integer (5 for free, 50 for pro, unlimited for enterprise)
  max_templates: integer (10 for free, unlimited for pro/enterprise)
  features: json // { has_watermark, can_export_pdf, has_analytics, has_sso }

  // Settings
  allowed_email_domains: string[] // Auto-join domains
  default_staff_permissions: json
  branding_settings: json // { primary_color, secondary_color, font_family }

  created_at: timestamp
  updated_at: timestamp
  deleted_at: timestamp? // Soft delete
}
```

### Users Table
```typescript
{
  id: uuid (PK) // Links to Supabase Auth
  email: string (unique)
  full_name: string
  avatar_url: string?

  // Multi-tenant relationship
  org_id: uuid (FK -> Organizations)
  role: enum('owner', 'admin', 'staff')

  // Status
  status: enum('pending', 'active', 'suspended')
  invited_by: uuid? (FK -> Users)
  invited_at: timestamp?
  accepted_at: timestamp?
  last_login_at: timestamp?

  // Preferences
  notification_preferences: json

  created_at: timestamp
  updated_at: timestamp
}
```

### Brand Assets Table
```typescript
{
  id: uuid (PK)
  org_id: uuid (FK -> Organizations)
  uploaded_by: uuid (FK -> Users)

  // Asset Details
  name: string
  description: text?
  type: enum('logo', 'image', 'font', 'color_palette', 'icon')
  file_url: string // Supabase Storage path
  thumbnail_url: string?

  // Metadata
  file_size: integer // bytes
  mime_type: string
  dimensions: json? // { width, height } for images
  color_values: string[]? // For color palettes: ['#FF5733', '#C70039']

  // Organization
  category: string?
  tags: string[]
  is_published: boolean (default: false)

  created_at: timestamp
  updated_at: timestamp
}
```

### Templates Table
```typescript
{
  id: uuid (PK)
  org_id: uuid (FK -> Organizations)
  created_by: uuid (FK -> Users)

  // Template Info
  name: string
  description: text?
  thumbnail_url: string

  // Canvas Data
  canvas_data: json // Fabric.js JSON serialization
  dimensions: json // { width, height, unit: 'px' }

  // Organization
  category: string // 'Social Media', 'Email Header', 'Presentation', 'Flyer'
  tags: string[]
  is_published: boolean (default: false)
  is_featured: boolean (default: false)

  // Usage Stats
  usage_count: integer (default: 0)
  last_used_at: timestamp?

  created_at: timestamp
  updated_at: timestamp
  archived_at: timestamp?
}
```

### Projects Table (User-created designs)
```typescript
{
  id: uuid (PK)
  org_id: uuid (FK -> Organizations)
  user_id: uuid (FK -> Users)
  template_id: uuid? (FK -> Templates) // Original template if created from one

  // Project Info
  name: string
  thumbnail_url: string?

  // Canvas Data
  canvas_data: json // Fabric.js JSON
  dimensions: json

  // Status
  status: enum('draft', 'completed')

  // Sharing
  shared_to_feed: boolean (default: false)
  shared_at: timestamp?

  created_at: timestamp
  updated_at: timestamp
}
```

### Inspiration Feed Table
```typescript
{
  id: uuid (PK)
  org_id: uuid (FK -> Organizations)
  project_id: uuid (FK -> Projects)
  shared_by: uuid (FK -> Users)

  // Feed Details
  caption: text?
  tags: string[]

  // Engagement
  views_count: integer (default: 0)
  duplicates_count: integer (default: 0) // How many times duplicated

  // Moderation
  is_hidden: boolean (default: false)
  hidden_by: uuid? (FK -> Users)
  hidden_at: timestamp?

  created_at: timestamp
}
```

### Exports Table
```typescript
{
  id: uuid (PK)
  org_id: uuid (FK -> Organizations)
  user_id: uuid (FK -> Users)
  project_id: uuid (FK -> Projects)

  // Export Details
  format: enum('png', 'pdf', 'svg')
  has_watermark: boolean
  file_url: string // Supabase Storage path
  file_size: integer

  // Metadata
  dimensions: json
  export_settings: json // { quality, dpi, background_color }

  created_at: timestamp
}
```

### Invitations Table
```typescript
{
  id: uuid (PK)
  org_id: uuid (FK -> Organizations)
  email: string
  invited_by: uuid (FK -> Users)
  role: enum('admin', 'staff')

  // Token
  token: string (unique, indexed)
  expires_at: timestamp

  // Status
  status: enum('pending', 'accepted', 'expired', 'revoked')
  accepted_at: timestamp?
  accepted_by: uuid? (FK -> Users)

  created_at: timestamp
}
```

### Activity Log Table
```typescript
{
  id: uuid (PK)
  org_id: uuid (FK -> Organizations)
  user_id: uuid? (FK -> Users)

  // Activity
  action: string // 'template_created', 'project_exported', 'user_invited', 'asset_uploaded'
  resource_type: string // 'template', 'project', 'user', 'brand_asset'
  resource_id: uuid?

  // Details
  metadata: json
  ip_address: string?
  user_agent: string?

  created_at: timestamp
}
```

### Payments Table
```typescript
{
  id: uuid (PK)
  org_id: uuid (FK -> Organizations)

  // Stripe
  stripe_payment_intent_id: string
  stripe_invoice_id: string?

  // Payment Details
  amount: integer // cents
  currency: string (default: 'usd')
  status: enum('pending', 'succeeded', 'failed', 'refunded')

  // Billing Period
  plan: enum('pro', 'enterprise')
  billing_period_start: timestamp
  billing_period_end: timestamp

  created_at: timestamp
}
```

---

## Application Routes

### Public Pages (Marketing Website)
- **/** - Home page (hero, features, demo video, testimonials, CTA)
- **/about** - About page (mission, team, company story)
- **/pricing** - Pricing plans with feature comparison table
- **/contact** - Contact form (sales inquiries, support requests)
- **/login** - User authentication (Supabase Auth)
- **/signup** - Organization registration & user signup
- **/invite/[token]** - Accept team invitation
- **/terms** - Terms of service
- **/privacy** - Privacy policy

### Authenticated Routes (App)

#### Organization Selection & Setup
- **/app** - Organization selector (if user is in multiple orgs)
- **/app/onboarding** - New organization setup wizard
- **/app/join** - Request to join organization by email domain

#### Main App Routes (Tenant-scoped)
- **/app/[org-slug]/dashboard** - Overview (recent projects, quick stats, activity feed)
- **/app/[org-slug]/templates** - Browse template library
- **/app/[org-slug]/templates/[id]** - Template detail & preview
- **/app/[org-slug]/templates/new** - Create new template (Admin only)
- **/app/[org-slug]/templates/[id]/edit** - Edit template (Admin only)
- **/app/[org-slug]/editor** - Canvas editor (new project)
- **/app/[org-slug]/editor/[project-id]** - Edit existing project
- **/app/[org-slug]/projects** - My projects (drafts & completed)
- **/app/[org-slug]/projects/[id]** - Project detail & export options
- **/app/[org-slug]/inspiration** - Team inspiration feed
- **/app/[org-slug]/brand-assets** - Brand asset library (Admin+ to manage)
- **/app/[org-slug]/settings** - Organization settings (Owner only)
- **/app/[org-slug]/settings/team** - Team member management
- **/app/[org-slug]/settings/billing** - Subscription & billing (Owner only)
- **/app/[org-slug]/settings/branding** - Organization branding settings
- **/app/[org-slug]/settings/profile** - Personal user profile

#### Analytics (Pro+)
- **/app/[org-slug]/analytics** - Usage analytics dashboard
- **/app/[org-slug]/analytics/templates** - Template performance
- **/app/[org-slug]/analytics/users** - User activity reports

### API Routes

#### Authentication
- **/api/auth/signup** - Create organization & owner account
- **/api/auth/invite/[token]** - Process invitation acceptance
- **/api/auth/verify-email** - Email verification callback

#### Organizations
- **/api/orgs** - List user's organizations
- **/api/orgs/[id]** - Get organization details
- **/api/orgs/[id]/settings** - Update organization settings
- **/api/orgs/check-slug** - Validate organization slug availability
- **/api/orgs/check-subdomain** - Validate custom subdomain (Enterprise)

#### Users & Invitations
- **/api/orgs/[id]/users** - List team members, invite new users
- **/api/orgs/[id]/users/[user-id]** - Update user role, remove user
- **/api/orgs/[id]/invitations** - List pending invitations
- **/api/invitations/[token]** - Get invitation details, accept/decline

#### Templates
- **/api/orgs/[id]/templates** - CRUD operations for templates
- **/api/orgs/[id]/templates/[template-id]** - Get, update, delete template
- **/api/orgs/[id]/templates/[template-id]/publish** - Publish/unpublish template
- **/api/orgs/[id]/templates/[template-id]/duplicate** - Duplicate template

#### Brand Assets
- **/api/orgs/[id]/brand-assets** - List, upload brand assets
- **/api/orgs/[id]/brand-assets/[asset-id]** - Update, delete asset
- **/api/orgs/[id]/brand-assets/upload-url** - Generate presigned upload URL

#### Projects
- **/api/orgs/[id]/projects** - CRUD operations for projects
- **/api/orgs/[id]/projects/[project-id]** - Get, update, delete project
- **/api/orgs/[id]/projects/[project-id]/save** - Autosave canvas data
- **/api/orgs/[id]/projects/[project-id]/export** - Generate export (PNG/PDF)
- **/api/orgs/[id]/projects/[project-id]/share** - Share to inspiration feed

#### Inspiration Feed
- **/api/orgs/[id]/inspiration** - List feed items
- **/api/orgs/[id]/inspiration/[feed-id]** - Get feed item details
- **/api/orgs/[id]/inspiration/[feed-id]/duplicate** - Duplicate shared project
- **/api/orgs/[id]/inspiration/[feed-id]/hide** - Hide from feed (Admin)

#### Exports
- **/api/orgs/[id]/exports** - List user's exports
- **/api/orgs/[id]/exports/[export-id]** - Download export file

#### Analytics (Pro+)
- **/api/orgs/[id]/analytics/overview** - Dashboard metrics
- **/api/orgs/[id]/analytics/templates** - Template usage data
- **/api/orgs/[id]/analytics/users** - User activity data

#### Stripe Webhooks
- **/api/stripe/webhooks** - Handle Stripe events (subscription updates, payments)
- **/api/stripe/create-checkout** - Create Stripe Checkout session
- **/api/stripe/create-portal** - Create Stripe Customer Portal session

#### Contact & Support
- **/api/contact** - Submit contact form (uses Resend)

---

## Tech Stack & Architecture Decisions

### Frontend Framework
**Next.js 14 (App Router)**
- **Why**: React Server Components for performance, built-in API routes, TypeScript support, excellent DX
- **App Router**: Nested layouts, loading/error states, parallel routes for complex UIs
- **Server Actions**: Form mutations, database updates
- **Middleware**: Tenant resolution from subdomain/path, authentication checks
- **Image Optimization**: next/image for thumbnails and brand assets

### UI Framework
**shadcn/ui + Tailwind CSS**
- **Why**: Accessible components, no runtime overhead, full customization, TypeScript support
- **Components Used**:
  - Layout: Sheet, Dialog, Tabs, Separator
  - Forms: Input, Textarea, Select, Button, Label, Checkbox
  - Data Display: Card, Badge, Avatar, Table
  - Navigation: Dropdown Menu, Command (search)
  - Feedback: Toast, Alert, Progress
  - Custom: Kanban-style template grid, canvas toolbar

### Canvas Editor
**Fabric.js**
- **Why**: Mature HTML5 canvas library, JSON serialization, rich object manipulation, extensible
- **Features Used**:
  - Object manipulation (drag, resize, rotate)
  - Text editing with custom fonts
  - Image upload and manipulation
  - Shapes, lines, paths
  - Layers and grouping
  - Undo/redo stack
  - Export to PNG/PDF/SVG
  - JSON serialization for save/load

**Integration Approach**:
```typescript
// lib/canvas/editor.ts
import { fabric } from 'fabric';

export class CanvasEditor {
  private canvas: fabric.Canvas;

  constructor(canvasElement: HTMLCanvasElement) {
    this.canvas = new fabric.Canvas(canvasElement);
  }

  loadFromJSON(json: string) {
    this.canvas.loadFromJSON(json, () => {
      this.canvas.renderAll();
    });
  }

  toJSON() {
    return this.canvas.toJSON();
  }

  exportToPNG(options: { quality: number; multiplier: number }) {
    return this.canvas.toDataURL({
      format: 'png',
      quality: options.quality,
      multiplier: options.multiplier
    });
  }
}
```

### Database & Backend
**Supabase (PostgreSQL)**
- **Why**: Built-in auth, real-time capabilities, storage, RLS for multi-tenancy, auto-generated APIs

**Row Level Security (RLS) Policies**:
```sql
-- Example: Templates table RLS
-- Users can only access templates from their organization
CREATE POLICY "org_isolation_templates"
  ON templates
  FOR ALL
  USING (
    org_id IN (
      SELECT org_id FROM users WHERE id = auth.uid()
    )
  );

-- Staff can only read published templates
CREATE POLICY "staff_read_published_templates"
  ON templates
  FOR SELECT
  USING (
    is_published = true
    AND org_id IN (SELECT org_id FROM users WHERE id = auth.uid() AND role = 'staff')
  );

-- Admins can CRUD all templates
CREATE POLICY "admin_manage_templates"
  ON templates
  FOR ALL
  USING (
    org_id IN (
      SELECT org_id FROM users
      WHERE id = auth.uid() AND role IN ('admin', 'owner')
    )
  );
```

**Supabase Storage Buckets**:
- `templates` - Template thumbnails (public read)
- `brand-assets` - Logos, images, fonts (authenticated read)
- `projects` - Project thumbnails (private)
- `exports` - Exported files (private, signed URLs)

### Authentication & Authorization
**Supabase Auth**
- **Email/Password**: Primary auth method
- **Magic Links**: Passwordless option
- **OAuth Providers**: Google, Microsoft (for SSO)
- **SAML/SSO**: Enterprise via Supabase Auth (external provider integration)

**Email Verification**:
- Required for all signups
- Uses Resend for transactional emails
- Custom email templates

**Role-Based Access Control (RBAC)**:
```typescript
// middleware.ts - Route protection
export async function middleware(request: NextRequest) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect('/login');
  }

  const { data: userProfile } = await supabase
    .from('users')
    .select('role, org_id')
    .eq('id', user.id)
    .single();

  // Check role permissions for route
  if (request.nextUrl.pathname.includes('/settings/billing')) {
    if (userProfile.role !== 'owner') {
      return NextResponse.redirect('/app/dashboard');
    }
  }

  return NextResponse.next();
}
```

### Email Service
**Resend**
- **Why**: Developer-friendly API, React email templates, excellent deliverability
- **Use Cases**:
  - Welcome emails
  - Team invitations
  - Password resets
  - Export ready notifications
  - Billing notifications
  - Weekly digest (optional)

**Email Templates** (React Email):
```typescript
// emails/TeamInvitation.tsx
import { Button, Html, Text } from '@react-email/components';

export default function TeamInvitation({
  inviterName,
  orgName,
  inviteLink
}: Props) {
  return (
    <Html>
      <Text>
        {inviterName} invited you to join {orgName} on PNGIO
      </Text>
      <Button href={inviteLink}>Accept Invitation</Button>
    </Html>
  );
}
```

### Payment Processing
**Stripe**
- **Checkout**: Subscription creation with Checkout Sessions
- **Customer Portal**: Self-service billing management
- **Webhooks**: Handle subscription lifecycle events
- **Products**:
  - Free: $0/mo (no Stripe required)
  - Pro: $49/mo recurring
  - Enterprise: Custom pricing (contact sales → manual setup)

**Webhook Events to Handle**:
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

**Usage Enforcement**:
```typescript
// lib/usage.ts
export async function checkUsageLimits(orgId: string) {
  const org = await getOrganization(orgId);
  const userCount = await getUserCount(orgId);
  const templateCount = await getTemplateCount(orgId);

  const limits = {
    free: { users: 5, templates: 10 },
    pro: { users: 50, templates: Infinity },
    enterprise: { users: Infinity, templates: Infinity }
  };

  const orgLimits = limits[org.plan];

  return {
    canAddUser: userCount < orgLimits.users,
    canAddTemplate: templateCount < orgLimits.templates,
    usage: { users: userCount, templates: templateCount },
    limits: orgLimits
  };
}
```

### Deployment & Hosting
**Vercel**
- **Why**: Native Next.js support, edge functions, automatic HTTPS, preview deployments
- **Edge Middleware**: Tenant resolution, auth checks
- **Environment Variables**: Supabase keys, Stripe keys, Resend API key
- **Custom Domains**: Enterprise subdomains via Vercel domain management
- **Analytics**: Web Vitals tracking

**Edge Middleware for Subdomains**:
```typescript
// middleware.ts
export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const subdomain = hostname.split('.')[0];

  // Check if custom subdomain exists
  if (subdomain !== 'app' && subdomain !== 'www') {
    const org = await getOrgBySubdomain(subdomain);
    if (org) {
      // Rewrite to org-specific route
      return NextResponse.rewrite(
        new URL(`/app/${org.slug}${request.nextUrl.pathname}`, request.url)
      );
    }
  }

  return NextResponse.next();
}
```

### State Management
**React Server Components + URL State + Zustand**
- **Server Components**: Data fetching, initial state
- **URL State**: Search params for filters, pagination
- **Zustand**: Client-side canvas editor state, UI state (modals, drawers)

**Canvas State Example**:
```typescript
// store/canvas-store.ts
import { create } from 'zustand';

interface CanvasState {
  selectedObject: fabric.Object | null;
  history: CanvasHistory[];
  currentHistoryIndex: number;

  setSelectedObject: (obj: fabric.Object | null) => void;
  undo: () => void;
  redo: () => void;
  addToHistory: (state: string) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  selectedObject: null,
  history: [],
  currentHistoryIndex: -1,

  setSelectedObject: (obj) => set({ selectedObject: obj }),
  // ... undo/redo implementation
}));
```

### File Upload & Storage
**Supabase Storage + Presigned URLs**
- **Upload Flow**:
  1. Client requests presigned URL from API route
  2. API validates user permissions, generates signed URL
  3. Client uploads directly to Supabase Storage
  4. Client notifies API of successful upload
  5. API creates database record

**Security**:
- File type validation (MIME type checking)
- File size limits (10MB for images, 50MB for exports)
- Storage RLS policies
- Virus scanning (future: ClamAV integration)

### Monitoring & Analytics
**Vercel Analytics + Custom Event Tracking**
- **Performance**: Core Web Vitals, page load times
- **User Events**: Template usage, exports, feed interactions
- **Error Tracking**: Sentry for production errors
- **Business Metrics**: Conversion funnels, retention cohorts

**Pro Plan Analytics Dashboard**:
- Template usage (views, uses, exports)
- User activity (active users, project creation rate)
- Export metrics (formats, counts)
- Storage usage

---

## Pricing Plans

### Free Plan - $0/mo
**Perfect for small teams getting started**

Features:
- ✅ Up to 5 users (Owner + 4 team members)
- ✅ 10 published templates
- ✅ Unlimited projects (drafts & completed)
- ✅ In-app canvas editor (Fabric.js)
- ✅ Brand asset library (basic)
- ✅ PNG export with PNGIO watermark
- ✅ Team inspiration feed
- ✅ 1GB storage
- ✅ Email support (48-hour response)
- ❌ PDF export
- ❌ No watermark
- ❌ Analytics dashboard
- ❌ Custom branding
- ❌ SSO/SAML

Limits:
- Max 5 users
- Max 10 templates
- PNG only (with watermark)
- 1GB storage

### Pro Plan - $49/mo
**For growing sales teams that need flexibility**

Everything in Free, plus:
- ✅ **Up to 50 users**
- ✅ **Unlimited templates**
- ✅ **PDF export** (high-quality, print-ready)
- ✅ **SVG export** (vector format)
- ✅ **No watermark** on exports
- ✅ **Analytics dashboard** (template usage, user activity, export metrics)
- ✅ **Advanced brand asset management** (folders, tags, bulk upload)
- ✅ **Custom organization branding** (logo, colors)
- ✅ **Priority email support** (24-hour response)
- ✅ **Template categories & folders**
- ✅ **Advanced search & filtering**
- ✅ **Bulk operations** (duplicate, archive templates)
- ✅ **Export history** (download previous exports)
- ✅ **Team activity feed** (audit log)
- ✅ **50GB storage**
- ✅ **Email notifications** (new templates, feed posts)
- ✅ **Custom export presets** (save export settings)

Limits:
- Max 50 users
- Unlimited templates
- 50GB storage

### Enterprise Plan - Custom Pricing
**For large organizations with advanced security and integration needs**

Everything in Pro, plus:
- ✅ **Unlimited users**
- ✅ **SSO/SAML integration** (Okta, Azure AD, Google Workspace, OneLogin)
- ✅ **Custom subdomain** (yourcompany.pngio.com)
- ✅ **API access** (RESTful API for integrations)
- ✅ **Dedicated account manager**
- ✅ **Priority phone & chat support** (1-hour response SLA)
- ✅ **Advanced security**:
  - IP whitelisting
  - Advanced audit logs
  - Data retention policies
  - Compliance certifications (SOC 2, GDPR)
- ✅ **Custom integrations** (Salesforce, HubSpot, Slack)
- ✅ **White-label options** (remove PNGIO branding)
- ✅ **Unlimited storage**
- ✅ **Advanced analytics & reporting**:
  - Custom dashboards
  - Data export to BI tools
  - ROI tracking
- ✅ **Custom contract terms** (annual billing, volume discounts)
- ✅ **Onboarding & training** (dedicated sessions for teams)
- ✅ **SLA guarantees** (99.9% uptime)
- ✅ **Dedicated infrastructure** (optional isolated deployment)
- ✅ **Custom features** (bespoke development available)

**Contact sales for custom pricing**

---

## Key Features Breakdown

### Multi-Tenant Workspace Management

**Organization Setup**:
1. Owner signs up → Creates organization
2. Configure workspace (name, slug, branding)
3. Invite Admin users (marketing team)
4. Admins invite Staff users (sales team)
5. Email domain auto-joining (optional)

**Tenant Isolation**:
- Complete data separation via RLS
- Subdomain routing (Enterprise)
- Per-tenant storage quotas
- Cross-tenant access prevention

### Role-Based Template Management

**Admin Workflow**:
1. Upload brand assets (logos, images, fonts, color palettes)
2. Create template in canvas editor
3. Configure template metadata (name, category, tags)
4. Publish to template library (visible to all Staff)
5. Monitor template usage analytics (Pro+)

**Staff Workflow**:
1. Browse published templates
2. Filter by category/tags
3. Preview template
4. Click "Use Template" → Opens in editor
5. Customize with brand assets
6. Save as project
7. Export to PNG/PDF
8. Optionally share to inspiration feed

### Canvas Editor (Fabric.js)

**Core Features**:
- **Text Tools**: Add text, change fonts (including custom brand fonts), size, color, alignment
- **Shapes**: Rectangles, circles, lines, polygons
- **Images**: Upload or select from brand assets
- **Layers**: Z-index control, grouping
- **Alignment**: Snap to grid, alignment guides
- **Undo/Redo**: Full history stack
- **Zoom**: Pan and zoom canvas
- **Backgrounds**: Solid colors, gradients, images

**Toolbar Components**:
- Text formatting (font, size, bold, italic, color)
- Shape tools
- Image upload/library
- Alignment tools
- Layer controls
- Export options

**Autosave**:
- Debounced autosave every 30 seconds
- Save indicator in UI
- Version history (future feature)

### Inspiration Feed

**Sharing Workflow**:
1. Staff completes a project
2. Clicks "Share to Team" from project page
3. Adds optional caption and tags
4. Posted to organization's inspiration feed
5. All team members can view and duplicate

**Feed Features**:
- Grid layout with thumbnails
- Filter by tags, user, date
- View count tracking
- Duplicate button (creates new project from shared design)
- Admin moderation (hide inappropriate content)

**Benefits**:
- Knowledge sharing across sales team
- Discover effective designs
- Reduce redundant work
- Build team culture

### Export System

**Export Formats**:
- **PNG**: All plans (Free has watermark)
- **PDF**: Pro+ (high-quality, print-ready)
- **SVG**: Pro+ (vector format for further editing)

**Export Options**:
- Resolution/DPI selection
- Background (transparent, solid color)
- Crop to content vs. artboard
- Quality settings

**Watermark (Free Plan)**:
- "Created with PNGIO" text in corner
- Removed on Pro+ plans

**Export History** (Pro+):
- List of all exports
- Re-download previous exports
- Metadata (format, settings, date)

### Brand Asset Library

**Asset Types**:
- **Logos**: SVG, PNG (with transparency)
- **Images**: JPG, PNG, WebP
- **Fonts**: TTF, OTF, WOFF2 (uploaded by Admins)
- **Color Palettes**: Named color collections
- **Icons**: SVG icon sets

**Organization** (Pro+):
- Folders and subfolders
- Tags for cross-cutting categorization
- Search and filter
- Bulk upload (drag multiple files)

**Usage**:
- Quick insert into canvas
- Drag and drop from library panel
- Replace existing objects

### Analytics Dashboard (Pro+)

**Overview Metrics**:
- Total users, active users (last 30 days)
- Total templates, most-used templates
- Total projects created
- Total exports

**Template Analytics**:
- Usage by template (views, uses, exports)
- Trending templates
- Template performance over time
- Category breakdown

**User Analytics**:
- Active users chart
- Projects per user
- Exports per user
- Activity heatmap

**Export Analytics**:
- Exports by format (PNG, PDF, SVG)
- Export volume over time
- Most-exported projects

---

## Security & Compliance

### Data Protection

**Encryption**:
- At rest: Supabase PostgreSQL encryption
- In transit: TLS 1.3 for all connections
- Storage: Encrypted at rest in Supabase Storage

**Multi-Tenant Isolation**:
- RLS policies enforce org_id filtering
- Storage buckets with org_id prefixes
- No shared data across tenants
- Audit logging per tenant

**Access Control**:
- Role-based permissions (Owner, Admin, Staff)
- Invitation-only team joining
- Email verification required
- Professional email domain validation

### Authentication Security

**Password Requirements**:
- Minimum 10 characters
- Mix of uppercase, lowercase, numbers, symbols
- Bcrypt hashing (Supabase default)

**Session Management**:
- JWT-based sessions
- Refresh token rotation
- Automatic session expiration (7 days)
- Device tracking

**Rate Limiting**:
- Login attempts: 5 per 15 minutes
- API requests: 100 per minute per user
- Export generation: 10 per hour per user

### Compliance

**GDPR**:
- Data export (download all user data)
- Right to deletion (hard delete on request)
- Cookie consent banner
- Privacy policy and terms of service

**SOC 2** (Roadmap for Enterprise):
- Security controls documentation
- Access logs and audit trails
- Incident response procedures
- Third-party audit

### File Upload Security

**Validation**:
- MIME type checking (server-side)
- File extension whitelisting
- File size limits (10MB images, 50MB exports)
- Virus scanning (future: ClamAV)

**Storage Security**:
- Presigned URLs (short-lived)
- RLS policies on storage buckets
- No direct public access
- CDN with access controls

---

## Future Enhancements (Roadmap)

### Phase 2 (Q2 2026)
- **AI-Powered Features**:
  - AI design suggestions
  - Auto-layout optimization
  - Smart cropping and resizing
  - Background removal
- **Collaboration**:
  - Real-time co-editing (multiple users on same canvas)
  - Comments and annotations
  - Version history with restore
- **Mobile App**:
  - iOS and Android apps
  - Mobile-optimized editor
  - Push notifications

### Phase 3 (Q3 2026)
- **Advanced Templates**:
  - Animated templates (GIF export)
  - Video templates (MP4 export)
  - Interactive templates (HTML export)
- **Integrations**:
  - Slack (share to channels)
  - Salesforce (attach to opportunities)
  - HubSpot (attach to deals)
  - Zapier (workflow automation)
- **Advanced Analytics**:
  - A/B testing for templates
  - Conversion tracking
  - ROI measurement

### Phase 4 (Q4 2026)
- **Enterprise Features**:
  - Multi-workspace support (one account, multiple orgs)
  - Advanced approval workflows
  - Content governance and policies
- **AI Content Generation**:
  - Text generation (AI copywriting)
  - Image generation (DALL-E integration)
  - Design from text prompt
- **Marketplace**:
  - Public template marketplace
  - Premium template packs
  - Third-party plugins

---

## Development Milestones

### Phase 1: Foundation (Weeks 1-4)
- [ ] Project setup (Next.js 14, TypeScript, Tailwind, shadcn/ui)
- [ ] Supabase setup (database, auth, storage)
- [ ] Database schema and migrations
- [ ] RLS policies for multi-tenancy
- [ ] Authentication flow (signup, login, email verification)
- [ ] Organization creation and onboarding
- [ ] Basic routing structure (public + app routes)

### Phase 2: Core Features (Weeks 5-8)
- [ ] Canvas editor integration (Fabric.js)
- [ ] Template CRUD (Admin)
- [ ] Brand asset library (upload, manage)
- [ ] Project creation and saving
- [ ] Template browser for Staff
- [ ] Basic export (PNG with watermark)
- [ ] User invitation system
- [ ] Email integration (Resend)

### Phase 3: Multi-Tenancy & Teams (Weeks 9-12)
- [ ] Tenant isolation validation
- [ ] Role-based access control implementation
- [ ] Team management UI (Owner/Admin)
- [ ] Invitation flow (send, accept, revoke)
- [ ] Organization settings page
- [ ] User profile management
- [ ] Activity logging

### Phase 4: Monetization (Weeks 13-16)
- [ ] Stripe integration (Checkout, webhooks)
- [ ] Pricing page with plan comparison
- [ ] Subscription management (upgrade, downgrade, cancel)
- [ ] Usage limit enforcement (Free plan)
- [ ] PDF export (Pro+)
- [ ] Watermark removal (Pro+)
- [ ] Analytics dashboard (Pro+)
- [ ] Billing page and Customer Portal

### Phase 5: Advanced Features (Weeks 17-20)
- [ ] Inspiration feed (share, browse, duplicate)
- [ ] Template categories and search
- [ ] Advanced brand asset management
- [ ] Export history (Pro+)
- [ ] Custom branding (Pro+)
- [ ] Email notifications
- [ ] Custom subdomain support (Enterprise)
- [ ] SSO/SAML integration (Enterprise)

### Phase 6: Polish & Launch (Weeks 21-24)
- [ ] Performance optimization
- [ ] SEO optimization (public pages)
- [ ] Security audit
- [ ] Accessibility improvements (WCAG AA)
- [ ] Documentation and help center
- [ ] Onboarding tooltips and tutorials
- [ ] Beta testing with real users
- [ ] Bug fixes and refinements
- [ ] Launch preparation (marketing site, blog, support)

---

## Success Metrics

### Product KPIs
- **User Acquisition**: 500 organizations in first 6 months
- **Activation**: 70% of signups create first project within 7 days
- **Engagement**: 40% MAU (monthly active users)
- **Retention**: 80% month-over-month retention
- **Conversion**: 15% free-to-pro conversion rate
- **Revenue**: $10k MRR by month 6

### Usage Metrics
- **Templates Created**: 5+ templates per organization (Admin)
- **Projects Created**: 20+ projects per organization per month
- **Exports**: 50+ exports per organization per month
- **Inspiration Feed**: 30% of Staff users share to feed

### Technical KPIs
- **Performance**: < 2s LCP (Largest Contentful Paint)
- **Uptime**: 99.9% availability
- **Editor Load**: < 1s canvas initialization
- **Export Speed**: < 5s for PNG, < 10s for PDF
- **Error Rate**: < 0.1% of API requests fail

---

## Competitive Analysis

### vs. Canva
- **Advantage**: Company-controlled templates, multi-tenant architecture, role-based access
- **Disadvantage**: Smaller template library (user-generated vs. Canva's massive library)
- **Differentiation**: Built for sales teams, not general consumers

### vs. Piktochart
- **Advantage**: Better collaboration features, inspiration feed, modern tech stack
- **Disadvantage**: Less focus on infographics/presentations initially
- **Differentiation**: Multi-tenant SaaS, not just individual accounts

### vs. Adobe Express
- **Advantage**: Simpler interface, faster learning curve, lower cost
- **Disadvantage**: Fewer advanced editing features
- **Differentiation**: Sales team focus, brand control, team sharing

### vs. Custom Internal Tools
- **Advantage**: No development cost, faster time to value, maintained and updated
- **Disadvantage**: Less customization than fully bespoke solution
- **Differentiation**: SaaS model with continuous improvements

---

## Open Questions / Decisions

1. **Template Duplication**: Should Staff users be able to duplicate templates to create new templates, or only Admins?
   - **Recommendation**: Staff can save duplicates as personal templates (not published)

2. **Font Licensing**: How to handle custom font uploads and licensing?
   - **Recommendation**: Admin responsibility, add ToS clause, provide font licensing resources

3. **Real-time Collaboration**: Priority for MVP or Phase 2?
   - **Recommendation**: Phase 2 (significant complexity)

4. **Video Export**: Include in Pro or Enterprise only?
   - **Recommendation**: Enterprise only initially

5. **Template Approval Workflow**: Should templates require approval before publishing?
   - **Recommendation**: Optional setting (Owner can enable for Admin uploads)

6. **Subdomain Wildcard**: Technical approach for Enterprise subdomains?
   - **Recommendation**: Vercel wildcard domain + middleware resolution

7. **Storage Quotas**: Hard limit or soft limit with overage charges?
   - **Recommendation**: Hard limit with upgrade prompts

8. **API Rate Limits**: Per-user or per-organization?
   - **Recommendation**: Per-organization (shared quota)

9. **Image Optimization**: Server-side processing or client-side?
   - **Recommendation**: Client-side for previews, server-side for final exports

10. **Internationalization (i18n)**: Launch in English only or multi-language?
    - **Recommendation**: English only for MVP, add i18n in Phase 2

---

## Technical Constraints & Considerations

### Canvas Editor Performance
- Large canvas files (>100 objects) may slow down
- Solution: Pagination of objects, virtualization
- Lazy load images and fonts

### Export Generation
- Server-side rendering for PDF/SVG exports
- Use headless browser (Puppeteer/Playwright) or Canvas API
- Queue system for bulk exports (BullMQ)

### Storage Costs
- Monitor storage usage per tenant
- Implement cleanup for deleted projects
- Consider CDN costs for high-traffic orgs

### Multi-Tenancy Complexity
- Thorough testing of RLS policies
- Automated tests for cross-tenant data leakage
- Regular security audits

### Scalability
- Database connection pooling
- CDN for static assets
- Edge caching for public pages
- Database read replicas for analytics queries

---

**Document Version**: 1.0
**Last Updated**: March 11, 2026
**Owner**: Product & Engineering Team
**Status**: Ready for Development
