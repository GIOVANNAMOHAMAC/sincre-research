-- Enable Row Level Security on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspiration_feed ENABLE ROW LEVEL SECURITY;
ALTER TABLE exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Organizations Policies
-- Users can read their own organization
CREATE POLICY "Users can read their own organization"
  ON organizations FOR SELECT
  USING (
    id IN (
      SELECT org_id FROM users WHERE id = auth.uid()
    )
  );

-- Only owners can update their organization
CREATE POLICY "Owners can update their organization"
  ON organizations FOR UPDATE
  USING (
    id IN (
      SELECT org_id FROM users WHERE id = auth.uid() AND role = 'owner'
    )
  );

-- Users Policies
-- Users can read members of their organization
CREATE POLICY "Users can read org members"
  ON users FOR SELECT
  USING (
    org_id IN (
      SELECT org_id FROM users WHERE id = auth.uid()
    )
  );

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (id = auth.uid());

-- Owners and admins can insert new users (via invitations)
CREATE POLICY "Owners and admins can invite users"
  ON users FOR INSERT
  WITH CHECK (
    org_id IN (
      SELECT org_id FROM users
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Owners and admins can update users in their org
CREATE POLICY "Owners and admins can manage users"
  ON users FOR UPDATE
  USING (
    org_id IN (
      SELECT org_id FROM users
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Brand Assets Policies
-- Users can read published assets in their org
CREATE POLICY "Users can read org brand assets"
  ON brand_assets FOR SELECT
  USING (
    org_id IN (
      SELECT org_id FROM users WHERE id = auth.uid()
    )
  );

-- Admins and owners can manage brand assets
CREATE POLICY "Admins can manage brand assets"
  ON brand_assets FOR ALL
  USING (
    org_id IN (
      SELECT org_id FROM users
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Templates Policies
-- Staff can read published templates
CREATE POLICY "Staff can read published templates"
  ON templates FOR SELECT
  USING (
    is_published = true
    AND org_id IN (
      SELECT org_id FROM users WHERE id = auth.uid()
    )
  );

-- Admins and owners can read all templates
CREATE POLICY "Admins can read all templates"
  ON templates FOR SELECT
  USING (
    org_id IN (
      SELECT org_id FROM users
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Admins and owners can manage templates
CREATE POLICY "Admins can manage templates"
  ON templates FOR ALL
  USING (
    org_id IN (
      SELECT org_id FROM users
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Projects Policies
-- Users can manage their own projects
CREATE POLICY "Users can manage own projects"
  ON projects FOR ALL
  USING (user_id = auth.uid());

-- Users can read projects shared to feed in their org
CREATE POLICY "Users can read shared projects"
  ON projects FOR SELECT
  USING (
    shared_to_feed = true
    AND org_id IN (
      SELECT org_id FROM users WHERE id = auth.uid()
    )
  );

-- Inspiration Feed Policies
-- Users can read feed items from their org
CREATE POLICY "Users can read org feed"
  ON inspiration_feed FOR SELECT
  USING (
    is_hidden = false
    AND org_id IN (
      SELECT org_id FROM users WHERE id = auth.uid()
    )
  );

-- Users can create feed items
CREATE POLICY "Users can share to feed"
  ON inspiration_feed FOR INSERT
  WITH CHECK (
    org_id IN (
      SELECT org_id FROM users WHERE id = auth.uid()
    )
  );

-- Admins can moderate feed (hide items)
CREATE POLICY "Admins can moderate feed"
  ON inspiration_feed FOR UPDATE
  USING (
    org_id IN (
      SELECT org_id FROM users
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Exports Policies
-- Users can read their own exports
CREATE POLICY "Users can read own exports"
  ON exports FOR SELECT
  USING (user_id = auth.uid());

-- Users can create exports for their projects
CREATE POLICY "Users can create exports"
  ON exports FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Invitations Policies
-- Anyone can read invitations for their email
CREATE POLICY "Users can read own invitations"
  ON invitations FOR SELECT
  USING (
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
    OR org_id IN (
      SELECT org_id FROM users
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Owners and admins can create invitations
CREATE POLICY "Owners and admins can invite"
  ON invitations FOR INSERT
  WITH CHECK (
    org_id IN (
      SELECT org_id FROM users
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Owners and admins can update invitations (revoke)
CREATE POLICY "Owners and admins can manage invitations"
  ON invitations FOR UPDATE
  USING (
    org_id IN (
      SELECT org_id FROM users
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- Activity Log Policies
-- Owners and admins can read activity log
CREATE POLICY "Owners and admins can read activity log"
  ON activity_log FOR SELECT
  USING (
    org_id IN (
      SELECT org_id FROM users
      WHERE id = auth.uid() AND role IN ('owner', 'admin')
    )
  );

-- System can insert activity log (service role)
CREATE POLICY "System can insert activity log"
  ON activity_log FOR INSERT
  WITH CHECK (true);

-- Payments Policies
-- Owners can read their org's payments
CREATE POLICY "Owners can read payments"
  ON payments FOR SELECT
  USING (
    org_id IN (
      SELECT org_id FROM users
      WHERE id = auth.uid() AND role = 'owner'
    )
  );

-- System can insert payments (service role)
CREATE POLICY "System can insert payments"
  ON payments FOR INSERT
  WITH CHECK (true);
