import { Package, PlusCircle, List, LogOut } from 'lucide-react'

interface AdminBottomNavProps {
    activeSection: string
    onNavigate: (section: string) => void
    onLogout: () => void
}

export const AdminBottomNav: React.FC<AdminBottomNavProps> = ({
    activeSection,
    onNavigate,
    onLogout,
}) => {
    const navItems = [
        {
            id: 'products',
            label: 'Products',
            icon: Package,
        },
        {
            id: 'upload',
            label: 'Upload',
            icon: PlusCircle,
        },
        {
            id: 'categories',
            label: 'Categories',
            icon: List,
        },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border lg:hidden z-50 pb-safe">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${activeSection === item.id
                                ? 'text-primary'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        <item.icon className="h-5 w-5" />
                        <span className="text-xs font-medium">{item.label}</span>
                    </button>
                ))}
                <button
                    onClick={onLogout}
                    className="flex flex-col items-center justify-center w-full h-full space-y-1 text-muted-foreground hover:text-destructive"
                >
                    <LogOut className="h-5 w-5" />
                    <span className="text-xs font-medium">Logout</span>
                </button>
            </div>
        </div>
    )
}
