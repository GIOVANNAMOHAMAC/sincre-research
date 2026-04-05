import { create } from 'zustand'
import type { CanvasEditor } from '@/lib/canvas/editor'

interface CanvasState {
  editor: CanvasEditor | null
  selectedObject: fabric.Object | null
  zoom: number
  isDirty: boolean
  isSaving: boolean

  // Actions
  setEditor: (editor: CanvasEditor | null) => void
  setSelectedObject: (object: fabric.Object | null) => void
  setZoom: (zoom: number) => void
  setIsDirty: (isDirty: boolean) => void
  setIsSaving: (isSaving: boolean) => void
}

export const useCanvasStore = create<CanvasState>((set) => ({
  editor: null,
  selectedObject: null,
  zoom: 1,
  isDirty: false,
  isSaving: false,

  setEditor: (editor) => set({ editor }),
  setSelectedObject: (object) => set({ selectedObject: object }),
  setZoom: (zoom) => set({ zoom }),
  setIsDirty: (isDirty) => set({ isDirty }),
  setIsSaving: (isSaving) => set({ isSaving }),
}))
