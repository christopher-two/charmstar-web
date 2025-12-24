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
        name: 'Charm Harry Potter - Snitch Dorada',
        price: 290,
        category: 'Charms',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Snitch+Dorada',
    },
    {
        id: '2',
        name: 'Charm Castillo Mágico (Hogwarts)',
        price: 290,
        category: 'Charms',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Castillo+Hogwarts',
    },
    {
        id: '3',
        name: 'Charm Corazón Brillante',
        price: 250,
        category: 'Charms',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Corazon+Brillante',
    },
    {
        id: '4',
        name: 'Charm Cámara Fotográfica',
        price: 250,
        category: 'Charms',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Camara',
    },
    {
        id: '5',
        name: 'Charm Stitch (Disney)',
        price: 290,
        category: 'Charms',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Stitch',
    },
    {
        id: '6',
        name: 'Charm Baby Yoda / Grogu',
        price: 290,
        category: 'Charms',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Baby+Yoda',
    },
    {
        id: '7',
        name: 'Charm Estrella de Mar',
        price: 250,
        category: 'Charms',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Estrella+Mar',
    },
    {
        id: '8',
        name: 'Charm Maleta de Viaje',
        price: 250,
        category: 'Charms',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Maleta+Viaje',
    },
    {
        id: '9',
        name: 'Charm Inicial "A-Z"',
        price: 220,
        category: 'Charms',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Inicial+A-Z',
    },

    // --- PULSERAS ---
    {
        id: '10',
        name: 'Pulsera Cadena de Serpiente - Cierre Corazón',
        price: 850,
        category: 'Pulseras',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Pulsera+Serpiente',
    },
    {
        id: '11',
        name: 'Pulsera Rígida Abierta (Bangle)',
        price: 900,
        category: 'Pulseras',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Bangle',
    },
    {
        id: '12',
        name: 'Pulsera de Cuero Trenzado Negro',
        price: 650,
        category: 'Pulseras',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Cuero+Trenzado',
    },

    // --- COLLARES ---
    {
        id: '13',
        name: 'Collar Alhambra Trébol - Negro (Onyx)',
        price: 900,
        category: 'Collares',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Alhambra+Negro',
    },
    {
        id: '14',
        name: 'Collar Alhambra Trébol - Rojo (Cornalina)',
        price: 900,
        category: 'Collares',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Alhambra+Rojo',
    },
    {
        id: '15',
        name: 'Collar Alhambra Trébol - Blanco (Nácar)',
        price: 900,
        category: 'Collares',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Alhambra+Blanco',
    },
    {
        id: '16',
        name: 'Collar Alhambra Trébol - Verde (Malaquita)',
        price: 900,
        category: 'Collares',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Alhambra+Verde',
    },
    {
        id: '17',
        name: 'Collar Mariposa Plata',
        price: 450,
        category: 'Collares',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Mariposa+Plata',
    },

    // --- ANILLOS ---
    {
        id: '18',
        name: 'Anillo Corona de Princesa',
        price: 400,
        category: 'Anillos',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Corona',
    },
    {
        id: '19',
        name: 'Anillo Infinito',
        price: 350,
        category: 'Anillos',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Infinito',
    },
    {
        id: '20',
        name: 'Anillo Solitario Corazón',
        price: 380,
        category: 'Anillos',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Solitario+Corazon',
    },

    // --- COLECCIONABLES ---
    {
        id: '21',
        name: 'Sonny Angel - Serie Animales 1 (Blind Box)',
        price: 350,
        category: 'Sonny Angel',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Animales+1',
    },
    {
        id: '22',
        name: 'Sonny Angel - Serie Frutas (Blind Box)',
        price: 350,
        category: 'Sonny Angel',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Frutas',
    },
    {
        id: '23',
        name: 'Labubu - The Monsters (Edición Limitada)',
        price: 550,
        category: 'Sonny Angel',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Labubu+Monsters',
    },
    {
        id: '24',
        name: 'Labubu - Fall in Wild',
        price: 600,
        category: 'Sonny Angel',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Labubu+Fall',
    },

    // --- ACCESORIOS ---
    {
        id: '25',
        name: 'Caja de Regalo Premium',
        price: 150,
        category: 'Accesorios',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Caja+Regalo',
    },
    {
        id: '26',
        name: 'Paño de Limpieza para Plata',
        price: 50,
        category: 'Accesorios',
        image: 'https://placehold.co/600x600/f3f4f6/1a1a1a?text=Paño+Limpieza',
    },
]
