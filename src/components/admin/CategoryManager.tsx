import { useState, useEffect } from 'react'
import {
    collection,
    addDoc,
    deleteDoc,
    updateDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, Plus, Edit2, Check, X } from 'lucide-react'
import toast from 'react-hot-toast'
import type { Category } from '@/types/admin'

export const CategoryManager: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [newCategory, setNewCategory] = useState('')
    const [loading, setLoading] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editValue, setEditValue] = useState('')

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

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newCategory.trim()) return

        setLoading(true)
        try {
            await addDoc(collection(db, 'categories'), {
                name: newCategory.trim(),
                createdAt: serverTimestamp(),
            })
            setNewCategory('')
            toast.success('Category added successfully')
        } catch (error) {
            console.error('Error adding category:', error)
            toast.error('Failed to add category')
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteCategory = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this category?')) return

        try {
            await deleteDoc(doc(db, 'categories', id))
            toast.success('Category deleted successfully')
        } catch (error) {
            console.error('Error deleting category:', error)
            toast.error('Failed to delete category')
        }
    }

    const startEdit = (category: Category) => {
        setEditingId(category.id)
        setEditValue(category.name)
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditValue('')
    }

    const saveEdit = async (id: string) => {
        if (!editValue.trim()) return
        try {
            await updateDoc(doc(db, 'categories', id), {
                name: editValue.trim(),
            })
            setEditingId(null)
            toast.success('Category updated')
        } catch (error) {
            console.error('Error updating category:', error)
            toast.error('Failed to update category')
        }
    }

    return (
        <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>

            <form onSubmit={handleAddCategory} className="flex gap-4 mb-8">
                <Input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category name..."
                    disabled={loading}
                />
                <Button type="submit" disabled={loading || !newCategory.trim()}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                </Button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.length === 0 ? (
                    <div className="col-span-full">
                        <p className="text-muted-foreground text-center py-12 bg-secondary/20 rounded-lg border-2 border-dashed border-border">
                            No categories found. Add one above.
                        </p>
                    </div>
                ) : (
                    categories.map((cat) => (
                        <div
                            key={cat.id}
                            className={`flex items-center justify-between p-4 bg-secondary/30 border border-border rounded-lg group transition-colors ${editingId === cat.id ? 'ring-2 ring-primary bg-background' : 'hover:bg-secondary/50'
                                }`}
                        >
                            {editingId === cat.id ? (
                                <div className="flex items-center gap-2 w-full">
                                    <Input
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                        className="h-8"
                                        autoFocus
                                    />
                                    <Button
                                        size="icon"
                                        className="h-8 w-8 shrink-0"
                                        onClick={() => saveEdit(cat.id)}
                                    >
                                        <Check className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 shrink-0"
                                        onClick={cancelEdit}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <span className="font-medium truncate pr-2">{cat.name}</span>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                            onClick={() => startEdit(cat)}
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                            onClick={() => handleDeleteCategory(cat.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
