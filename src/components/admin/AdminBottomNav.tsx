import { Package, PlusCircle, List, LogOut, Store } from 'lucide-react'

interface AdminBottomNavProps {
    activeSection: string
    onNavigate: (section: string) => void
    onLogout: () => void
    onShop: () => void
}

export const AdminBottomNav: React.FC<AdminBottomNavProps> = ({
    activeSection,
    onNavigate,
    onLogout,
    onShop,
}) => {
    const navItems = [
        {
            id: 'products',
            label: 'Products',
            icon: Package,
        },
        {
            id: 'add',
            label: 'Add',
            icon: PlusCircle,
        },
        {
            id: 'categories',
            label: 'Categories',
            icon: List,
        },
    ]

    return (
        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <div className="flex items-center gap-1.5 lg:gap-2 bg-background/80 backdrop-blur-md border border-border/50 shadow-lg rounded-full px-3 py-2 lg:px-6 lg:py-4 pointer-events-auto transition-all hover:scale-105 hover:bg-background/90 mx-4">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`relative flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full transition-all ${activeSection === item.id
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                            }`}
                        title={item.label}
                    >
                        <item.icon className="h-5 w-5 lg:h-6 lg:w-6" />
                        {activeSection === item.id && (
                            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                            </span>
                        )}
                    </button>
                ))}

                <div className="w-px h-6 lg:h-8 bg-border mx-1 lg:mx-2" />

                <button
                    onClick={onShop}
                    className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    title="Go to Shop"
                >
                    <Store className="h-5 w-5 lg:h-6 lg:w-6" />
                </button>

                <button
                    onClick={onLogout}
                    className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                    title="Logout"
                >
                    <LogOut className="h-5 w-5 lg:h-6 lg:w-6" />
                </button>
            </div>
        </div>
    )
}
