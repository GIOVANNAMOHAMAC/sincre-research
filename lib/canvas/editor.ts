'use client'

import { fabric } from 'fabric'
import type { ExportOptions } from '@/types'

export class CanvasEditor {
  private canvas: fabric.Canvas
  private history: string[] = []
  private currentHistoryIndex: number = -1
  private maxHistory: number = 50

  constructor(canvasElement: HTMLCanvasElement, options?: fabric.ICanvasOptions) {
    this.canvas = new fabric.Canvas(canvasElement, {
      width: options?.width || 800,
      height: options?.height || 600,
      backgroundColor: options?.backgroundColor || '#ffffff',
      preserveObjectStacking: true,
      ...options,
    })

    this.setupEventListeners()
    this.saveState()
  }

  private setupEventListeners() {
    this.canvas.on('object:modified', () => this.saveState())
    this.canvas.on('object:added', () => this.saveState())
    this.canvas.on('object:removed', () => this.saveState())
  }

  // State Management
  private saveState() {
    const json = JSON.stringify(this.canvas.toJSON())

    // Remove states after current index
    this.history = this.history.slice(0, this.currentHistoryIndex + 1)

    // Add new state
    this.history.push(json)
    this.currentHistoryIndex++

    // Limit history size
    if (this.history.length > this.maxHistory) {
      this.history.shift()
      this.currentHistoryIndex--
    }
  }

  public undo() {
    if (this.currentHistoryIndex > 0) {
      this.currentHistoryIndex--
      this.loadState(this.history[this.currentHistoryIndex])
    }
  }

  public redo() {
    if (this.currentHistoryIndex < this.history.length - 1) {
      this.currentHistoryIndex++
      this.loadState(this.history[this.currentHistoryIndex])
    }
  }

  private loadState(state: string) {
    this.canvas.loadFromJSON(state, () => {
      this.canvas.renderAll()
    })
  }

  // Object Management
  public addText(text: string, options?: Partial<fabric.ITextOptions>) {
    const textObj = new fabric.IText(text, {
      left: 100,
      top: 100,
      fontSize: 24,
      fontFamily: 'Arial',
      fill: '#000000',
      ...options,
    })

    this.canvas.add(textObj)
    this.canvas.setActiveObject(textObj)
    this.canvas.renderAll()
  }

  public addRectangle(options?: Partial<fabric.IRectOptions>) {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 200,
      height: 150,
      fill: '#3b82f6',
      ...options,
    })

    this.canvas.add(rect)
    this.canvas.setActiveObject(rect)
    this.canvas.renderAll()
  }

  public addCircle(options?: Partial<fabric.ICircleOptions>) {
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 50,
      fill: '#10b981',
      ...options,
    })

    this.canvas.add(circle)
    this.canvas.setActiveObject(circle)
    this.canvas.renderAll()
  }

  public async addImage(imageUrl: string) {
    return new Promise<void>((resolve, reject) => {
      fabric.Image.fromURL(imageUrl, (img) => {
        if (!img) {
          reject(new Error('Failed to load image'))
          return
        }

        img.scaleToWidth(300)
        img.set({
          left: 100,
          top: 100,
        })

        this.canvas.add(img)
        this.canvas.setActiveObject(img)
        this.canvas.renderAll()
        resolve()
      })
    })
  }

  // Selection Management
  public deleteSelected() {
    const activeObjects = this.canvas.getActiveObjects()
    if (activeObjects.length) {
      this.canvas.remove(...activeObjects)
      this.canvas.discardActiveObject()
      this.canvas.renderAll()
    }
  }

  public duplicateSelected() {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      activeObject.clone((cloned: fabric.Object) => {
        cloned.set({
          left: (cloned.left || 0) + 20,
          top: (cloned.top || 0) + 20,
        })
        this.canvas.add(cloned)
        this.canvas.setActiveObject(cloned)
        this.canvas.renderAll()
      })
    }
  }

  // Alignment
  public alignLeft() {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      activeObject.set({ left: 0 })
      this.canvas.renderAll()
    }
  }

  public alignCenter() {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      activeObject.set({ left: (this.canvas.width || 0) / 2 - (activeObject.width || 0) / 2 })
      this.canvas.renderAll()
    }
  }

  public alignRight() {
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      activeObject.set({ left: (this.canvas.width || 0) - (activeObject.width || 0) })
      this.canvas.renderAll()
    }
  }

  // Zoom
  public zoomIn() {
    const zoom = this.canvas.getZoom()
    this.canvas.setZoom(Math.min(zoom * 1.1, 3))
  }

  public zoomOut() {
    const zoom = this.canvas.getZoom()
    this.canvas.setZoom(Math.max(zoom * 0.9, 0.1))
  }

  public resetZoom() {
    this.canvas.setZoom(1)
    this.canvas.viewportTransform = [1, 0, 0, 1, 0, 0]
  }

  // Serialization
  public toJSON(): string {
    return JSON.stringify(this.canvas.toJSON())
  }

  public loadFromJSON(json: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.canvas.loadFromJSON(json, () => {
          this.canvas.renderAll()
          this.saveState()
          resolve()
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  // Export
  public exportToPNG(options: Partial<ExportOptions> = {}): string {
    return this.canvas.toDataURL({
      format: 'png',
      quality: options.quality || 1,
      multiplier: options.dpi ? options.dpi / 96 : 1,
    })
  }

  public exportToSVG(): string {
    return this.canvas.toSVG()
  }

  // Cleanup
  public destroy() {
    this.canvas.dispose()
  }

  // Getters
  public getCanvas(): fabric.Canvas {
    return this.canvas
  }

  public getSelectedObject(): fabric.Object | null {
    return this.canvas.getActiveObject() || null
  }

  public canUndo(): boolean {
    return this.currentHistoryIndex > 0
  }

  public canRedo(): boolean {
    return this.currentHistoryIndex < this.history.length - 1
  }
}
