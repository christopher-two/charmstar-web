export interface Product {
    id: string
    name: string
    price: number
    category: 'Charms' | 'Pulseras' | 'Collares' | 'Anillos' | 'Sonny Angel' | 'Accesorios'
    image: string
    images?: string[]
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
    },
    {
        id: '17',
        name: 'Charm Spider-Man',
        price: 310,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/bc587c94-0fe7-451e-8371-61e149845078.jpeg',
    },
    {
        id: '18',
        name: 'Charm Star',
        price: 299,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/star/b401aee9-a2e5-4700-9e9f-c3bdb5ada04a.jpeg',
        images: [
            'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/star/c4f896ae-6cd9-4962-ad51-06a3dfd6f2b5.jpeg',
        ]
    },
    {
        id: '19',
        name: 'Charm Alfabeto A-Z',
        price: 250,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/alfabeto/8e25dda9-70e5-4fc9-9c8f-ef3ae6a602d8.jpeg',
        images: [
            'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/alfabeto/25802488-8fb3-44be-9f34-c1de15812209.jpeg',
            'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/alfabeto/1fddf922-b63f-4701-af45-4516f491732d.jpeg',
            'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/alfabeto/53e0f496-048b-4fd5-bf35-51499f3de7d7.jpeg',
            'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/alfabeto/5d8a7fd9-614b-4c81-8a93-ee1d65c1739b.jpeg',
            'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/alfabeto/7c071edb-a0ef-4a11-9641-70d4b9597e6a.jpeg',
            'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/alfabeto/7da65f0a-db18-47b4-b077-eb79eeaa86a9.jpeg',
            'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/alfabeto/809d44bf-ca9b-4052-a540-48eece1542ab.jpeg',
            'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/alfabeto/910a6c3c-09d0-4093-995f-fa8928052e4a.jpeg',
            'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/alfabeto/b066cfed-1aec-4019-bb7f-6bf6192e7eeb.jpeg',
            'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/alfabeto/e51dbde0-9377-431e-a90f-63b32f4d6d18.jpeg',
            'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/alfabeto/fdb508d7-967c-4857-8ebf-a2c4a33d6b53.jpeg'
        ]
    },
    {
        id: '30',
        name: 'Charm Oso',
        price: 300,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/72f9f287-3c78-467d-8e76-cc71e773714e.jpeg'
    },
    {
        id: '31',
        name: 'Charm Virgencita',
        price: 295,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/e4d5e919-afd8-41bc-b3cc-1c82c23aca10.jpeg'
    },
    {
        id: '32',
        name: 'Charm Luciérnaga',
        price: 310,
        category: 'Charms',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/2ff03b41-380b-4687-a58f-0a4cbaeb9552.jpeg'
    },

    // --- PULSERAS ---

    {
        id: '20',
        name: 'Pulsera Ajustable Acero Inoxidable',
        price: 280,
        category: 'Pulseras',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/pulseras/4e0040ad-dff9-4f34-8296-9756b3cb7101.jpeg',
    },
    {
        id: '21',
        name: 'Pulsera Ajustable Acero Inoxidable',
        price: 280,
        category: 'Pulseras',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/pulseras/2abfdc57-6843-4fbc-93a2-94e5abc10a5a.jpeg',
    },
    {
        id: '22',
        name: 'Pulsera Ajustable Acero Inoxidable',
        price: 280,
        category: 'Pulseras',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/pulseras/11b9ed1c-df75-4638-8d33-c52972fdaba7.jpeg',
    },
    {
        id: '23',
        name: 'Pulsera Barril Acero Inoxidable',
        price: 380,
        category: 'Pulseras',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/pulseras/11b9ed1c-df75-4638-8d33-c52972fdaba7.jpeg',
    },
    {
        id: '24',
        name: 'Pulsera Corazón Acero Inoxidable',
        price: 500,
        category: 'Pulseras',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/pulseras/d248a573-cca6-46b5-a63a-6269d4355770.jpeg',
    },
    {
        id: '26',
        name: 'Pulsera Corona Acero Inoxidable',
        price: 500,
        category: 'Pulseras',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/pulseras/fedd7f98-249c-40fa-ae16-f0ee58973ca0.jpeg',
        images: [
            'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/pulseras/a83f68ce-9fb8-4637-a516-ae921334f8ad.jpeg',
        ]
    },
    {
        id: '27',
        name: 'Pulsera Corazón infinito centelleante',
        price: 580,
        category: 'Pulseras',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/pulseras/522be9af-8b23-46c4-8e14-69f33bedc160.jpeg',
    },
    {
        id: '28',
        name: 'Pulsera Rígida Plata',
        price: 500,
        category: 'Pulseras',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/pulseras/ff005800-9df6-422a-9bfb-465e2ee5521d.jpeg',
    },
    {
        id: '29',
        name: 'Pulsera Doble',
        price: 390,
        category: 'Pulseras',
        image: 'https://vluoppbaehfmhkebyygv.supabase.co/storage/v1/object/public/imagenes/charmstar/pulseras/6e4f200d-504c-4bd1-9b05-5ea800a02ef8.jpeg'
    }
]
