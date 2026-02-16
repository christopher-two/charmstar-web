import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { uploadImageToR2, deleteImageFromR2 } from '@/lib/cloudflareR2'
import type { ProductFormData, Product, Category } from '@/types/admin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import toast from 'react-hot-toast'
import { Trash2, Upload, X, Plus, Check, Loader2, ArrowLeft } from 'lucide-react'

interface AdminProductFormProps {
  initialData?: Product
  onSave: () => void
  onCancel: () => void
  onDelete?: () => void
}

export const AdminProductForm: React.FC<AdminProductFormProps> = ({
  initialData,
  onSave,
  onCancel,
  onDelete,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProductFormData>({
    defaultValues: initialData || {
      name: '',
      price: 0,
      category: '',
      description: '',
      image: '',
      images: [],
    },
  })

  const [categories, setCategories] = useState<Category[]>([])
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Image States
  const [mainImagePreview, setMainImagePreview] = useState<string>(initialData?.image || '')
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(initialData?.images || [])

  // Pending Uploads
  const [pendingMainImage, setPendingMainImage] = useState<File | null>(null)
  const [pendingGalleryImages, setPendingGalleryImages] = useState<File[]>([])

  // Track images to remove from existing gallery (if editing)
  const [imagesToRemove, setImagesToRemove] = useState<string[]>([])

  // Fetch Categories
  useEffect(() => {
    const q = query(collection(db, 'categories'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cats: Category[] = []
      snapshot.forEach((doc) => {
        cats.push({ id: doc.id, ...doc.data() } as Category)
      })
      setCategories(cats)
    })
    return () => unsubscribe()
  }, [])

  // Cleanup Object URLs
  useEffect(() => {
    return () => {
      if (mainImagePreview && !mainImagePreview.startsWith('http')) URL.revokeObjectURL(mainImagePreview)
      galleryPreviews.forEach(url => {
        if (!url.startsWith('http')) URL.revokeObjectURL(url)
      })
    }
  }, [mainImagePreview, galleryPreviews])

  // --- Handlers ---

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > 5 * 1024 * 1024) return toast.error('Max file size 5MB')

      setPendingMainImage(file)
      setMainImagePreview(URL.createObjectURL(file))
      setValue('image', 'pending') // Placeholder to pass 'required' check if needed
    }
  }

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      const validFiles = files.filter(f => f.size <= 5 * 1024 * 1024)

      if (validFiles.length !== files.length) toast.error('Some files were skipped (Max 5MB)')

      setPendingGalleryImages(prev => [...prev, ...validFiles])

      const newPreviews = validFiles.map(f => URL.createObjectURL(f))
      setGalleryPreviews(prev => [...prev, ...newPreviews])
    }
  }

  const removeGalleryImage = (index: number) => {
    // If it's a pending image (blob), remove from pending list
    // If it's an existing image (http), add to imagesToRemove
    const previewToRemove = galleryPreviews[index]

    if (previewToRemove.startsWith('http')) {
      setImagesToRemove(prev => [...prev, previewToRemove])
    } else {
      // Find the corresponding File in pendingGalleryImages
      // This is tricky without IDs. Simple approach: 
      // We assume pending images are appended at the end.
      // Better: Reset all pending and re-calculate? 
      // For now, let's just use index offset.
      // Actually, simplest is to filter the preview array and matching pending array
      // But indices won't match if mixed.
      // FIX: Store Pending Images with their preview URLs to map them.

      // Simpler approach for this iteration:
      // If user removes a Blob, we must find which File it was.
      // But we revoked IDs. 
      // Let's just create a quick filter:
      const blobIndex = galleryPreviews.filter((p, i) => i < index && !p.startsWith('http')).length
      setPendingGalleryImages(prev => prev.filter((_, i) => i !== blobIndex))
    }

    setGalleryPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleDeleteProduct = async () => {
    if (!initialData?.id || !window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) return

    setSubmitting(true)
    try {
      // 1. Delete Main Image
      if (initialData.image) await deleteImageFromR2(initialData.image)

      // 2. Delete Gallery Images
      if (initialData.images && initialData.images.length > 0) {
        await Promise.all(initialData.images.map(img => deleteImageFromR2(img)))
      }

      // 3. Delete Document
      await deleteDoc(doc(db, 'products', initialData.id))

      toast.success('Product deleted successfully')
      if (onDelete) onDelete()
    } catch (error) {
      console.error('Delete failed:', error)
      toast.error('Failed to delete product')
    } finally {
      setSubmitting(false)
    }
  }

  const onSubmit = async (data: ProductFormData) => {
    if (!mainImagePreview) return toast.error('Main image is required')

    setSubmitting(true)
    setUploading(true)

    try {
      let finalMainImage = initialData?.image || ''
      const currentGalleryImages = initialData?.images ? [...initialData.images] : []

      // 1. Upload Main Image (if changed)
      if (pendingMainImage) {
        const fileName = `${Date.now()}-main-${pendingMainImage.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
        finalMainImage = await uploadImageToR2(pendingMainImage, fileName, data.category)

        // Delete old main image if replacing
        if (initialData?.image) {
          await deleteImageFromR2(initialData.image)
        }
      }

      // 2. Upload New Gallery Images
      const newGalleryUrls: string[] = []
      for (const file of pendingGalleryImages) {
        const fileName = `${Date.now()}-gallery-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
        const url = await uploadImageToR2(file, fileName, data.category)
        newGalleryUrls.push(url)
      }

      // 3. Process Gallery Removals
      for (const urlToRemove of imagesToRemove) {
        await deleteImageFromR2(urlToRemove)
      }

      // 4. Construct Final Gallery List
      // Keep existing (minus removed) + Add new
      const finalGallery = currentGalleryImages
        .filter(url => !imagesToRemove.includes(url))
        .concat(newGalleryUrls)

      // 5. Save to Firestore
      const productData = {
        name: data.name,
        price: parseFloat(data.price.toString()),
        category: data.category,
        description: data.description,
        image: finalMainImage,
        images: finalGallery,
        updatedAt: serverTimestamp(),
      }

      if (initialData?.id) {
        await updateDoc(doc(db, 'products', initialData.id), productData)
        toast.success('Product updated!')
      } else {
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: serverTimestamp(),
        })
        toast.success('Product created!')
      }

      onSave()
    } catch (error) {
      console.error('Save failed:', error)
      toast.error('Failed to save product')
    } finally {
      setSubmitting(false)
      setUploading(false)
    }
  }

  return (
    <div className="bg-background rounded-xl w-full max-w-5xl mx-auto">
      {initialData && (
        <div className="flex justify-between items-center mb-8 border-b border-border/40 pb-4">
          <Button variant="ghost" onClick={onCancel} className="gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to Products
          </Button>
          <h2 className="text-xl font-bold">Edit Product</h2>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-8 lg:gap-12">

        {/* LEFT COLUMN - IMAGES */}
        <div className="space-y-6">
          {/* Main Image */}
          <div className="relative aspect-square bg-muted rounded-xl overflow-hidden group border-2 border-dashed border-transparent hover:border-primary/50 transition-colors max-w-sm mx-auto md:max-w-none shadow-sm">
            {mainImagePreview ? (
              <>
                <img src={mainImagePreview} alt="Main" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer bg-white text-black px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg transform scale-95 group-hover:scale-100 duration-200">
                    Change Main Image
                    <input type="file" accept="image/*" onChange={handleMainImageChange} className="hidden" />
                  </label>
                </div>
              </>
            ) : (
              <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-muted-foreground hover:text-primary transition-colors">
                <Upload className="h-12 w-12 mb-2 opacity-50" />
                <span className="font-medium text-sm">Tap to Upload Image</span>
                <input type="file" accept="image/*" onChange={handleMainImageChange} className="hidden" />
              </label>
            )}
          </div>
          {errors.image && <p className="text-red-500 text-sm">Main image is required</p>}

          {/* Gallery Thumbnails */}
          <div>
            <label className="block text-sm font-medium mb-3">Gallery Images</label>
            <div className="grid grid-cols-4 gap-4">
              {galleryPreviews.map((url, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-border group bg-muted">
                  <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}

              {/* Add Gallery Image Button */}
              <label className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all text-muted-foreground hover:text-foreground">
                <Plus className="h-6 w-6 mb-1" />
                <span className="text-xs">Add</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - DETAILS */}
        <div className="flex flex-col space-y-6">

          {/* Category Badge */}
          <div className="flex items-center gap-2">
            <select
              {...register('category', { required: 'Category is required' })}
              className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border-none focus:ring-2 focus:ring-primary outline-none cursor-pointer hover:bg-primary/20 transition-colors"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Name - Big Title Style */}
          <div>
            <Input
              {...register('name', { required: 'Name is required' })}
              placeholder="Product Name"
              className="text-3xl md:text-4xl font-serif font-bold h-auto px-0 border-0 border-b border-transparent focus-visible:border-primary focus-visible:ring-0 rounded-none bg-transparent placeholder:text-muted-foreground/40"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Price - Large Style */}
          <div className="flex items-center gap-1">
            <span className="text-2xl font-semibold text-foreground">$</span>
            <Input
              {...register('price', { required: 'Price is required', min: 0 })}
              type="number"
              step="0.01"
              placeholder="0.00"
              className="text-2xl font-semibold w-full max-w-[200px] h-auto px-0 border-0 border-b border-transparent focus-visible:border-primary focus-visible:ring-0 rounded-none bg-transparent"
            />
          </div>

          {/* Description - Card Style */}
          <div className="bg-muted/30 rounded-lg p-0 transition-colors focus-within:bg-muted/50 border border-border/50 focus-within:border-primary/50">
            <Textarea
              {...register('description')}
              placeholder="Add a magical description..."
              className="min-h-[150px] border-0 bg-transparent focus-visible:ring-0 text-muted-foreground leading-relaxed resize-none p-6"
            />
          </div>

          {/* Actions */}
          <div className="mt-auto space-y-4 pt-8">
            <Button
              type="submit"
              size="lg"
              className="w-full text-lg gap-2"
              disabled={submitting || uploading}
            >
              {uploading || submitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {uploading ? 'Uploading Images...' : 'Saving Changes...'}
                </>
              ) : (
                <>
                  <Check className="h-5 w-5" />
                  {initialData ? 'Save Changes' : 'Create Product'}
                </>
              )}
            </Button>

            {/* DELETE BUTTON - ONLY IN EDIT MODE */}
            {initialData && onDelete && (
              <Button
                type="button"
                variant="destructive"
                className="w-full opacity-90 hover:opacity-100"
                onClick={handleDeleteProduct}
                disabled={submitting}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Product
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
