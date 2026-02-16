import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { uploadImageToR2 } from '@/lib/cloudflareR2'
import type { ProductFormData, Product } from '@/types/admin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { Upload, X } from 'lucide-react'

interface AdminProductFormProps {
  initialData?: Product
  onSave: () => void
  onCancel: () => void
}

export const AdminProductForm: React.FC<AdminProductFormProps> = ({
  initialData,
  onSave,
  onCancel,
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
      category: 'Charms',
      description: '',
      image: '',
      images: [],
    },
  })

  const [uploadingImage, setUploadingImage] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string>(
    initialData?.image || ''
  )

  const categories = [
    'Charms',
    'Pulseras',
    'Collares',
    'Anillos',
    'Sonny Angel',
    'Accesorios',
  ]

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be smaller than 5MB')
      return
    }

    setUploadingImage(true)
    try {
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
      const url = await uploadImageToR2(file, fileName)

      setValue('image', url)
      setImagePreview(url)
      toast.success('Image uploaded successfully')
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Failed to upload image')
    } finally {
      setUploadingImage(false)
    }
  }

  const onSubmit = async (data: ProductFormData) => {
    if (!data.image) {
      toast.error('Please upload an image')
      return
    }

    setSubmitting(true)
    try {
      await addDoc(collection(db, 'products'), {
        name: data.name,
        price: parseFloat(data.price.toString()),
        category: data.category,
        description: data.description,
        image: data.image,
        images: data.images || [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })

      toast.success('Product created successfully!')
      onSave()
    } catch (error) {
      console.error('Error saving product:', error)
      toast.error('Failed to save product')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-xl font-bold mb-4">
        {initialData ? 'Edit Product' : 'Create New Product'}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Name *</label>
          <Input
            {...register('name', { required: 'Name is required' })}
            placeholder="Product name"
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium mb-2">Price *</label>
          <Input
            {...register('price', {
              required: 'Price is required',
              min: 0,
            })}
            type="number"
            step="0.01"
            placeholder="0.00"
            className={errors.price ? 'border-red-500' : ''}
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-2">Category *</label>
          <select
            {...register('category', { required: 'Category is required' })}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-xs mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            {...register('description')}
            placeholder="Product description"
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium mb-2">Main Image *</label>
          <div className="border-2 border-dashed border-border rounded-lg p-4">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="max-h-48 mx-auto rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview('')
                    setValue('image', '')
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center">
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-sm font-medium">Click to upload</span>
                <span className="text-xs text-muted-foreground">
                  PNG, JPG up to 5MB
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                />
              </label>
            )}
          </div>
          {uploadingImage && (
            <p className="text-xs text-muted-foreground mt-2">Uploading...</p>
          )}
        </div>

        {/* Form Actions */}
        <div className="space-y-2 pt-4">
          <Button
            type="submit"
            disabled={submitting || uploadingImage}
            className="w-full"
          >
            {submitting ? 'Saving...' : 'Save Product'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={submitting}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
