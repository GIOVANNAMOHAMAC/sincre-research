import { z } from 'zod'

// Organization schemas
export const createOrganizationSchema = z.object({
  name: z.string().min(2, 'Organization name must be at least 2 characters').max(100),
  slug: z.string()
    .min(3, 'Slug must be at least 3 characters')
    .max(50)
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
})

export const updateOrganizationSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  logo_url: z.string().url().optional(),
  allowed_email_domains: z.array(z.string().email()).optional(),
  branding_settings: z.object({
    primary_color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
    secondary_color: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
    font_family: z.string().optional(),
  }).optional(),
})

// User schemas
export const inviteUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'staff']),
})

export const updateUserSchema = z.object({
  full_name: z.string().min(2).max(100).optional(),
  avatar_url: z.string().url().optional(),
  notification_preferences: z.record(z.boolean()).optional(),
})

export const updateUserRoleSchema = z.object({
  role: z.enum(['admin', 'staff']),
})

// Template schemas
export const createTemplateSchema = z.object({
  name: z.string().min(2, 'Template name must be at least 2 characters').max(100),
  description: z.string().max(500).optional(),
  category: z.string().min(1, 'Category is required'),
  tags: z.array(z.string()).optional(),
  canvas_data: z.record(z.any()),
  dimensions: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
    unit: z.string().default('px'),
  }),
  thumbnail_url: z.string().url(),
})

export const updateTemplateSchema = createTemplateSchema.partial()

export const publishTemplateSchema = z.object({
  is_published: z.boolean(),
})

// Project schemas
export const createProjectSchema = z.object({
  name: z.string().min(2, 'Project name must be at least 2 characters').max(100),
  template_id: z.string().uuid().optional(),
  canvas_data: z.record(z.any()),
  dimensions: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
    unit: z.string().default('px'),
  }),
})

export const updateProjectSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  canvas_data: z.record(z.any()).optional(),
  status: z.enum(['draft', 'completed']).optional(),
})

export const shareProjectSchema = z.object({
  caption: z.string().max(500).optional(),
  tags: z.array(z.string()).optional(),
})

// Brand Asset schemas
export const uploadBrandAssetSchema = z.object({
  name: z.string().min(2, 'Asset name must be at least 2 characters').max(100),
  description: z.string().max(500).optional(),
  type: z.enum(['logo', 'image', 'font', 'color_palette', 'icon']),
  file_url: z.string().url(),
  file_size: z.number().positive(),
  mime_type: z.string(),
  dimensions: z.object({
    width: z.number().positive(),
    height: z.number().positive(),
  }).optional(),
  color_values: z.array(z.string().regex(/^#[0-9A-F]{6}$/i)).optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

// Export schemas
export const exportProjectSchema = z.object({
  format: z.enum(['png', 'pdf', 'svg']),
  quality: z.number().min(0.1).max(1).default(1),
  dpi: z.number().min(72).max(600).default(96),
  backgroundColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  includeWatermark: z.boolean().default(false),
})

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
})

// Type exports
export type CreateOrganization = z.infer<typeof createOrganizationSchema>
export type UpdateOrganization = z.infer<typeof updateOrganizationSchema>
export type InviteUser = z.infer<typeof inviteUserSchema>
export type UpdateUser = z.infer<typeof updateUserSchema>
export type CreateTemplate = z.infer<typeof createTemplateSchema>
export type UpdateTemplate = z.infer<typeof updateTemplateSchema>
export type CreateProject = z.infer<typeof createProjectSchema>
export type UpdateProject = z.infer<typeof updateProjectSchema>
export type ShareProject = z.infer<typeof shareProjectSchema>
export type UploadBrandAsset = z.infer<typeof uploadBrandAssetSchema>
export type ExportProject = z.infer<typeof exportProjectSchema>
export type ContactForm = z.infer<typeof contactFormSchema>
