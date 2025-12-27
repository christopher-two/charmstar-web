import { X } from 'lucide-react'
import { useEffect } from 'react'
import { Button } from './ui/button'

interface ImageModalProps {
    isOpen: boolean
    onClose: () => void
    image: string
    alt: string
}

export function ImageModal({ isOpen, onClose, image, alt }: ImageModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200"
            onClick={onClose}
        >
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white hover:bg-white/10 hover:text-white"
                onClick={onClose}
            >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
            </Button>

            <div className="relative max-w-7xl max-h-screen p-4 flex items-center justify-center">
                <img
                    src={image}
                    alt={alt}
                    className="max-h-[90vh] max-w-full object-contain rounded-md"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        </div>
    )
}
