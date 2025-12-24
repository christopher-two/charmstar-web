import { Helmet } from 'react-helmet-async'

interface SEOProps {
    title?: string
    description?: string
    name?: string
    type?: string
    image?: string
    url?: string
}

export function SEO({
    title = 'Charm Star - Joyería y Accesorios',
    description = 'Descubre nuestra colección de charms, pulseras, anillos y collares estilo Van Cleef. Joyería única que cuenta tu historia.',
    name = 'Charm Star',
    type = 'website',
    image = '/icon.svg',
    url = 'https://charmstar.com',
}: SEOProps) {
    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content={name} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* JSON-LD Structured Data for Organization */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "OnlineStore",
                    "name": name,
                    "url": url,
                    "logo": "https://charmstar.com/icon.svg",
                    "description": description,
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://charmstar.com/search?q={search_term_string}",
                        "query-input": "required name=search_term_string"
                    },
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+52-452-179-3811",
                        "contactType": "sales",
                        "areaServed": "MX",
                        "availableLanguage": "Spanish"
                    }
                })}
            </script>
        </Helmet>
    )
}
