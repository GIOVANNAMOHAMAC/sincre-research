-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('owner', 'admin', 'staff');
CREATE TYPE user_status AS ENUM ('pending', 'active', 'suspended');
CREATE TYPE plan_type AS ENUM ('free', 'pro', 'enterprise');
CREATE TYPE subscription_status AS ENUM ('active', 'trialing', 'past_due', 'canceled', 'incomplete');
CREATE TYPE invitation_status AS ENUM ('pending', 'accepted', 'expired', 'revoked');
CREATE TYPE asset_type AS ENUM ('logo', 'image', 'font', 'color_palette', 'icon');
CREATE TYPE project_status AS ENUM ('draft', 'completed');

-- Organizations Table
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  custom_subdomain TEXT UNIQUE,
  logo_url TEXT,

  -- Subscription
  plan plan_type NOT NULL DEFAULT 'free',
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  subscription_status subscription_status,
  subscription_current_period_end TIMESTAMPTZ,

  -- Limits
  max_users INTEGER NOT NULL DEFAULT 5,
  max_templates INTEGER NOT NULL DEFAULT 10,
  features JSONB NOT NULL DEFAULT '{"has_watermark": true, "can_export_pdf": false, "can_export_svg": false, "has_analytics": false, "has_sso": false}'::jsonb,

  -- Settings
  allowed_email_domains TEXT[] DEFAULT '{}',
  default_staff_permissions JSONB DEFAULT '{}'::jsonb,
  branding_settings JSONB,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,

  -- Organization membership
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'staff',
  status user_status NOT NULL DEFAULT 'active',

  -- Invitation tracking
  invited_by UUID REFERENCES users(id),
  invited_at TIMESTAMPTZ,
  accepted_at TIMESTAMPTZ,
  last_login_at TIMESTAMPTZ,

  -- Preferences
  notification_preferences JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Brand Assets Table
CREATE TABLE brand_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  uploaded_by UUID NOT NULL REFERENCES users(id),

  name TEXT NOT NULL,
  description TEXT,
  type asset_type NOT NULL,
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,

  -- Metadata
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  dimensions JSONB,
  color_values TEXT[],

  -- Organization
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN NOT NULL DEFAULT false,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Templates Table
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES users(id),

  name TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT NOT NULL,

  -- Canvas data
  canvas_data JSONB NOT NULL,
  dimensions JSONB NOT NULL,

  -- Organization
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,

  -- Usage tracking
  usage_count INTEGER NOT NULL DEFAULT 0,
  last_used_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  archived_at TIMESTAMPTZ
);

-- Projects Table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  template_id UUID REFERENCES templates(id) ON DELETE SET NULL,

  name TEXT NOT NULL,
  thumbnail_url TEXT,

  -- Canvas data
  canvas_data JSONB NOT NULL,
  dimensions JSONB NOT NULL,

  status project_status NOT NULL DEFAULT 'draft',

  -- Sharing
  shared_to_feed BOOLEAN NOT NULL DEFAULT false,
  shared_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Inspiration Feed Table
CREATE TABLE inspiration_feed (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  shared_by UUID NOT NULL REFERENCES users(id),

  caption TEXT,
  tags TEXT[] DEFAULT '{}',

  -- Engagement
  views_count INTEGER NOT NULL DEFAULT 0,
  duplicates_count INTEGER NOT NULL DEFAULT 0,

  -- Moderation
  is_hidden BOOLEAN NOT NULL DEFAULT false,
  hidden_by UUID REFERENCES users(id),
  hidden_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Exports Table
CREATE TABLE exports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,

  format TEXT NOT NULL,
  has_watermark BOOLEAN NOT NULL DEFAULT false,
  file_url TEXT NOT NULL,
  file_size INTEGER NOT NULL,

  dimensions JSONB NOT NULL,
  export_settings JSONB,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Invitations Table
CREATE TABLE invitations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  invited_by UUID NOT NULL REFERENCES users(id),
  role user_role NOT NULL,

  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,

  status invitation_status NOT NULL DEFAULT 'pending',
  accepted_at TIMESTAMPTZ,
  accepted_by UUID REFERENCES users(id),

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Activity Log Table
CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),

  action TEXT NOT NULL,
  resource_type TEXT,
  resource_id UUID,

  metadata JSONB,
  ip_address TEXT,
  user_agent TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Payments Table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,

  stripe_payment_intent_id TEXT NOT NULL,
  stripe_invoice_id TEXT,

  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL,

  plan plan_type NOT NULL,
  billing_period_start TIMESTAMPTZ NOT NULL,
  billing_period_end TIMESTAMPTZ NOT NULL,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_users_org_id ON users(org_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_templates_org_id ON templates(org_id);
CREATE INDEX idx_templates_published ON templates(is_published) WHERE is_published = true;
CREATE INDEX idx_projects_org_id ON projects(org_id);
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_brand_assets_org_id ON brand_assets(org_id);
CREATE INDEX idx_invitations_token ON invitations(token);
CREATE INDEX idx_invitations_email ON invitations(email);
CREATE INDEX idx_activity_log_org_id ON activity_log(org_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers
CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_templates_updated_at BEFORE UPDATE ON templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brand_assets_updated_at BEFORE UPDATE ON brand_assets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
