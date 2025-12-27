export interface Product {
    id: string
    name: string
    price: number
    category: 'Charms' | 'Pulseras' | 'Collares' | 'Anillos' | 'Sonny Angel' | 'Accesorios'
    image: string
}

export const products: Product[] = [
    // --- CHARMS ---
    {
        id: '1',
        name: 'Charm Tontin Disney',
        price: 300,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/f4897549-46e1-4483-ab85-876b1f556590.jpeg',
    },
    {
        id: '2',
        name: 'Charm Niña',
        price: 300,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/f4757799-5241-4369-97be-05cad8213999.jpeg',
    },
    {
        id: '3',
        name: 'Charm Sirena',
        price: 300,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/6005ff41-aebf-4211-8bcb-cdcb34794b8e.jpeg',
    },
    {
        id: '4',
        name: 'Charm Camaleón',
        price: 300,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/4e0040ad-dff9-4f34-8296-9756b3cb7101.jpeg',
    },
    {
        id: '5',
        name: 'Charm Abeja',
        price: 300,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/f2b99f35-2e59-4771-860e-4c4ae8133bca.jpeg',
    },
    {
        id: '6',
        name: 'Charm Winnie Pooh',
        price: 300,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/523ffbc9-6b35-4f75-8ac0-f9a7ca3b354c.jpeg',
    },
    {
        id: '7',
        name: 'Charm Mickey Mouse',
        price: 300,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/d1ff63be-c45b-4da0-8980-b4ad67bbd4fd.jpeg',
    },
    {
        id: '8',
        name: 'Charm Tortuga',
        price: 300,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/327e4394-8981-4181-bfdf-3e34b46e82cc.jpeg',
    },
    {
        id: '9',
        name: 'Charm de niño',
        price: 300,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/4ca559a5-a86c-4c2b-bc24-4f7d507800bc.jpeg',
    },
    {
        id: '10',
        name: 'Charm Mickey Aprendiz de Mago de Disney',
        price: 300,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/ff521395-6190-417d-aad7-ed03fb5aee9e.jpeg',
    },
    {
        id: '11',
        name: 'Charm Corazon',
        price: 200,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/8aa28569-5505-495c-94b3-fed0dbfefeb2.jpeg',
    },
    {
        id: '12',
        name: 'Charm Perro',
        price: 300,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/fc4b835d-7eca-44bc-9498-89dce2a7f720.jpeg',
    },
    {
        id: '13',
        name: 'Charm Búho',
        price: 300,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/39a8efe5-013f-415f-a413-806a3606fa9a.jpeg',
    },
    {
        id: '14',
        name: 'Charm Mariposa',
        price: 300,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/d0025e11-a419-43d5-a281-020c91d9f005.jpeg',
    },
    {
        id: '15',
        name: 'Charm Love escrito a mano',
        price: 280,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/efce63ad-daad-4918-b834-ca39acbe7a16.jpeg',
    },
    {
        id: '16',
        name: 'Charm Perezoso',
        price: 300,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/cdf3d017-d413-45f5-a165-e846664674d3.jpeg',
    }
]
