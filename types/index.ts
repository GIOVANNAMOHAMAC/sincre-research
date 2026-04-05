import type { Database } from './supabase'

export type Organization = Database['public']['Tables']['organizations']['Row']
export type User = Database['public']['Tables']['users']['Row']
export type Template = Database['public']['Tables']['templates']['Row']
export type Project = Database['public']['Tables']['projects']['Row']
export type BrandAsset = Database['public']['Tables']['brand_assets']['Row']
export type Invitation = Database['public']['Tables']['invitations']['Row']

export type UserRole = 'owner' | 'admin' | 'staff'
export type Plan = 'free' | 'pro' | 'enterprise'

export interface PlanLimits {
  users: number
  templates: number
  storage: number // in GB
  hasWatermark: boolean
  canExportPDF: boolean
  canExportSVG: boolean
  hasAnalytics: boolean
  hasSSO: boolean
  hasCustomSubdomain: boolean
  hasAPI: boolean
}

export const PLAN_LIMITS: Record<Plan, PlanLimits> = {
  free: {
    users: 5,
    templates: 10,
    storage: 1,
    hasWatermark: true,
    canExportPDF: false,
    canExportSVG: false,
    hasAnalytics: false,
    hasSSO: false,
    hasCustomSubdomain: false,
    hasAPI: false,
  },
  pro: {
    users: 50,
    templates: Infinity,
    storage: 50,
    hasWatermark: false,
    canExportPDF: true,
    canExportSVG: true,
    hasAnalytics: true,
    hasSSO: false,
    hasCustomSubdomain: false,
    hasAPI: false,
  },
  enterprise: {
    users: Infinity,
    templates: Infinity,
    storage: Infinity,
    hasWatermark: false,
    canExportPDF: true,
    canExportSVG: true,
    hasAnalytics: true,
    hasSSO: true,
    hasCustomSubdomain: true,
    hasAPI: true,
  },
}

export interface CanvasEditorState {
  selectedObject: fabric.Object | null
  history: string[]
  currentHistoryIndex: number
  zoom: number
  isDirty: boolean
}

export interface ExportOptions {
  format: 'png' | 'pdf' | 'svg'
  quality: number
  dpi: number
  backgroundColor?: string
  includeWatermark: boolean
}
