# PNGIO - Next Steps

This document outlines the immediate next steps to get PNGIO up and running.

## ✅ Completed

1. **Project Structure**: Full Next.js 14 app directory structure created
2. **Configuration Files**: package.json, tsconfig, tailwind, etc.
3. **Database Schema**: Supabase migrations with complete data model
4. **RLS Policies**: Row Level Security for multi-tenant isolation
5. **Type Definitions**: TypeScript types for all data models
6. **Canvas Editor**: Fabric.js integration with CanvasEditor class
7. **Email Templates**: React Email templates for invitations and welcome
8. **Utilities**: Validation schemas, helper functions, Supabase clients
9. **Documentation**: Comprehensive specs, setup guide, and README
10. **Marketing Pages**: Home, About, Pricing, Contact pages

## 🚀 Immediate Next Steps (Week 1)

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
```bash
cp .env.example .env
# Edit .env with your Supabase, Stripe, and Resend credentials
```

### 3. Set Up Supabase
```bash
# Create a Supabase project at https://supabase.com
# Then link and push migrations:
supabase link --project-ref your-project-ref
supabase db push

# Generate types:
npm run supabase:gen-types
```

### 4. Create Storage Buckets
In Supabase Dashboard > Storage, create:
- `templates` (public)
- `brand-assets` (authenticated)
- `projects` (authenticated)
- `exports` (authenticated)

### 5. Install shadcn/ui Components
```bash
# Core components needed for MVP
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add dropdown-menu
```

### 6. Start Development Server
```bash
npm run dev
# Visit http://localhost:3000
```

## 📋 Development Priorities

### Phase 1: Authentication & Onboarding (Week 1-2)

**Priority 1: Authentication Pages**
- [ ] `app/(auth)/login/page.tsx` - Login page with Supabase Auth
- [ ] `app/(auth)/signup/page.tsx` - Sign up page
- [ ] Password reset flow
- [ ] Email verification handling

**Priority 2: Organization Onboarding**
- [ ] `app/(app)/onboarding/page.tsx` - New org setup wizard
- [ ] Org creation form (name, slug)
- [ ] Redirect to dashboard after setup

**Priority 3: Base Layout**
- [ ] `components/layouts/app-layout.tsx` - Main app layout with sidebar
- [ ] `components/navigation/navbar.tsx` - Top navigation
- [ ] `components/navigation/sidebar.tsx` - App sidebar with org switcher
- [ ] User profile dropdown

### Phase 2: Dashboard & Basic Navigation (Week 2-3)

**Priority 4: Dashboard**
- [ ] `app/(app)/[org-slug]/dashboard/page.tsx` - Overview page
- [ ] `components/dashboard/stats-card.tsx` - Stat cards (users, templates, projects)
- [ ] `components/dashboard/activity-feed.tsx` - Recent activity
- [ ] Quick actions (create template, new project)

**Priority 5: Settings**
- [ ] `app/(app)/[org-slug]/settings/page.tsx` - General settings
- [ ] `app/(app)/[org-slug]/settings/profile/page.tsx` - User profile
- [ ] Org details form (name, logo)
- [ ] User profile form (name, avatar)

### Phase 3: Template Management (Week 3-4)

**Priority 6: Template Library (Staff View)**
- [ ] `app/(app)/[org-slug]/templates/page.tsx` - Browse templates
- [ ] `components/templates/template-grid.tsx` - Grid view
- [ ] `components/templates/template-card.tsx` - Template card
- [ ] `components/templates/template-filters.tsx` - Search & filters
- [ ] `app/(app)/[org-slug]/templates/[id]/page.tsx` - Template detail

**Priority 7: Template Management (Admin)**
- [ ] `app/(app)/[org-slug]/templates/new/page.tsx` - Create template
- [ ] `app/(app)/[org-slug]/templates/[id]/edit/page.tsx` - Edit template
- [ ] `components/forms/create-template-form.tsx` - Template form
- [ ] `api/orgs/[id]/templates/route.ts` - Template CRUD API
- [ ] Publish/unpublish toggle

### Phase 4: Canvas Editor (Week 4-6)

**Priority 8: Basic Canvas Editor**
- [ ] `app/(app)/[org-slug]/editor/page.tsx` - New project editor
- [ ] `app/(app)/[org-slug]/editor/[project-id]/page.tsx` - Edit project
- [ ] `components/canvas/canvas-editor.tsx` - Canvas component
- [ ] `components/canvas/canvas-toolbar.tsx` - Toolbar (text, shapes, images)
- [ ] `components/canvas/canvas-sidebar.tsx` - Properties panel
- [ ] Integrate CanvasEditor class
- [ ] Autosave functionality

**Priority 9: Canvas Tools**
- [ ] Text tool (add, edit, format)
- [ ] Shape tools (rectangle, circle, line)
- [ ] Image upload and insertion
- [ ] Undo/redo buttons
- [ ] Zoom controls
- [ ] Alignment tools

### Phase 5: Projects & Export (Week 6-8)

**Priority 10: Project Management**
- [ ] `app/(app)/[org-slug]/projects/page.tsx` - My projects list
- [ ] `app/(app)/[org-slug]/projects/[id]/page.tsx` - Project detail
- [ ] `api/orgs/[id]/projects/route.ts` - Project CRUD API
- [ ] Save/load project from template
- [ ] Project thumbnails

**Priority 11: Export System**
- [ ] `api/orgs/[id]/exports/route.ts` - Export API
- [ ] PNG export with watermark (Free plan)
- [ ] PNG export without watermark (Pro+)
- [ ] PDF export (Pro+)
- [ ] SVG export (Pro+)
- [ ] Export history page
- [ ] Download functionality

### Phase 6: Brand Assets (Week 8-9)

**Priority 12: Brand Asset Library**
- [ ] `app/(app)/[org-slug]/brand-assets/page.tsx` - Asset library
- [ ] `components/brand-assets/asset-card.tsx` - Asset card
- [ ] `components/brand-assets/asset-upload.tsx` - Upload UI
- [ ] `api/orgs/[id]/brand-assets/route.ts` - Asset CRUD API
- [ ] File upload to Supabase Storage
- [ ] Asset categories and tags
- [ ] Insert asset into canvas

### Phase 7: Team Management (Week 9-10)

**Priority 13: User Invitations**
- [ ] `app/(app)/[org-slug]/settings/team/page.tsx` - Team management
- [ ] `components/forms/invite-user-form.tsx` - Invite form
- [ ] `app/(auth)/invite/[token]/page.tsx` - Accept invitation
- [ ] `api/orgs/[id]/users/route.ts` - User management API
- [ ] Send invitation email (Resend)
- [ ] Role assignment (Admin/Staff)
- [ ] Remove user functionality

**Priority 14: Role-Based Permissions**
- [ ] Permission checks in middleware
- [ ] Hide/show UI based on role
- [ ] API route protection by role
- [ ] Owner-only billing access

### Phase 8: Inspiration Feed (Week 10-11)

**Priority 15: Share to Feed**
- [ ] `app/(app)/[org-slug]/inspiration/page.tsx` - Feed page
- [ ] `components/feed/feed-card.tsx` - Feed item card
- [ ] `components/feed/feed-grid.tsx` - Feed grid
- [ ] `api/orgs/[id]/inspiration/route.ts` - Feed API
- [ ] Share button on project detail
- [ ] Caption and tags for shared projects

**Priority 16: Feed Interactions**
- [ ] Duplicate shared project
- [ ] View count tracking
- [ ] Admin moderation (hide posts)
- [ ] Feed filters (tags, user)

### Phase 9: Stripe Integration (Week 11-12)

**Priority 17: Subscription Management**
- [ ] `lib/stripe/client.ts` - Stripe client setup
- [ ] `lib/stripe/subscriptions.ts` - Subscription logic
- [ ] `api/stripe/create-checkout/route.ts` - Checkout API
- [ ] `api/stripe/create-portal/route.ts` - Portal API
- [ ] `api/stripe/webhooks/route.ts` - Webhook handlers
- [ ] `app/(app)/[org-slug]/settings/billing/page.tsx` - Billing page
- [ ] Upgrade to Pro button
- [ ] Manage subscription button (Customer Portal)

**Priority 18: Usage Limits**
- [ ] Enforce user limits (5 for Free, 50 for Pro)
- [ ] Enforce template limits (10 for Free)
- [ ] Watermark on Free exports
- [ ] Block PDF/SVG export on Free
- [ ] Upgrade prompts when limits reached

### Phase 10: Analytics (Pro) (Week 12-13)

**Priority 19: Analytics Dashboard**
- [ ] `app/(app)/[org-slug]/analytics/page.tsx` - Analytics overview
- [ ] `app/(app)/[org-slug]/analytics/templates/page.tsx` - Template analytics
- [ ] `app/(app)/[org-slug]/analytics/users/page.tsx` - User analytics
- [ ] `api/orgs/[id]/analytics/route.ts` - Analytics API
- [ ] Charts (Chart.js or Recharts)
- [ ] Template usage stats
- [ ] User activity stats
- [ ] Export metrics

### Phase 11: Polish & Testing (Week 13-14)

**Priority 20: Polish**
- [ ] Error handling and error pages
- [ ] Loading states and skeletons
- [ ] Toast notifications
- [ ] Empty states
- [ ] Responsive design improvements
- [ ] Accessibility improvements (WCAG AA)

**Priority 21: Testing**
- [ ] Manual testing of all flows
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Performance optimization
- [ ] Security audit

### Phase 12: Enterprise Features (Week 14-16)

**Priority 22: SSO/SAML (Enterprise)**
- [ ] Supabase Auth SSO setup
- [ ] OAuth provider configuration
- [ ] SAML integration (Okta, Azure AD)
- [ ] SSO settings page

**Priority 23: Custom Subdomains (Enterprise)**
- [ ] Vercel wildcard domain setup
- [ ] DNS configuration
- [ ] Middleware subdomain resolution
- [ ] Custom subdomain settings page

**Priority 24: API Access (Enterprise)**
- [ ] REST API documentation
- [ ] API key generation
- [ ] API rate limiting
- [ ] API authentication

## 🔧 Tools You'll Need

### Required
- Node.js 18+ (install from nodejs.org)
- npm, yarn, or pnpm
- Git
- Code editor (VS Code recommended)

### Services
- Supabase account (supabase.com) - Database, Auth, Storage
- Stripe account (stripe.com) - Payments
- Resend account (resend.com) - Emails
- Vercel account (vercel.com) - Deployment

### Optional
- Supabase CLI (for migrations)
- Stripe CLI (for webhook testing)
- Postman or Insomnia (for API testing)

## 📚 Learning Resources

### Next.js 14
- https://nextjs.org/docs
- https://nextjs.org/learn

### Supabase
- https://supabase.com/docs
- https://supabase.com/docs/guides/auth
- https://supabase.com/docs/guides/database/postgres/row-level-security

### Fabric.js
- http://fabricjs.com/docs/
- http://fabricjs.com/demos/

### shadcn/ui
- https://ui.shadcn.com
- https://ui.shadcn.com/docs/components

### Stripe
- https://stripe.com/docs
- https://stripe.com/docs/billing/subscriptions/overview

## 🎯 Success Criteria

### MVP (End of Week 8)
- [x] Users can sign up and create an organization
- [x] Admins can create and publish templates
- [x] Staff can browse templates
- [x] Users can create projects from templates
- [x] Users can edit projects in canvas editor
- [x] Users can export to PNG (with watermark on Free)
- [x] Basic team invitations work

### Beta (End of Week 12)
- [ ] Stripe integration complete
- [ ] Pro plan features working (no watermark, PDF export)
- [ ] Inspiration feed functional
- [ ] Analytics dashboard (Pro)
- [ ] Role-based permissions enforced
- [ ] Usage limits enforced

### Launch (End of Week 16)
- [ ] All features complete and tested
- [ ] Performance optimized
- [ ] Security audited
- [ ] Documentation complete
- [ ] Deployed to production
- [ ] Enterprise features available

## 💡 Pro Tips

1. **Start Simple**: Get authentication and basic CRUD working before adding complex features
2. **Use shadcn/ui**: Don't build components from scratch, use the pre-built ones
3. **Test RLS Policies**: Make sure multi-tenant isolation is working correctly
4. **Incremental Development**: Build and test one feature at a time
5. **Use TypeScript**: Strong typing will catch bugs early
6. **Mobile First**: Design for mobile, then scale up
7. **Real Data**: Use real data as soon as possible, not placeholder text
8. **User Feedback**: Get real users testing as early as possible

## 🐛 Common Pitfalls to Avoid

1. **RLS Not Configured**: Always test with multiple orgs to ensure data isolation
2. **Missing org_id**: Every query must filter by org_id
3. **Client-Side Secrets**: Never expose service role key to client
4. **No Error Handling**: Always handle errors gracefully
5. **Hardcoded URLs**: Use environment variables
6. **No Loading States**: Always show loading indicators
7. **Ignoring Mobile**: Test on mobile devices early and often
8. **Over-Engineering**: Start simple, add complexity only when needed

## 📞 Need Help?

- Check the documentation files (README.md, SETUP.md, project_specs.md)
- Review the code comments
- Check the official docs for each technology
- Search GitHub issues
- Ask for help from the team

---

**Ready to build?** Start with `npm install` and follow the steps above!

Good luck! 🚀
