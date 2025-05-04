'use client';

import dynamic from 'next/dynamic';

const ProductList = dynamic(() => import('@/Component/Product/Product'), {
    loading: () => <p className="text-center mt-10 text-pink-700">Loading products...</p>,
    ssr: false,
});

export default function Page() {
    return (
        <main className="px-4 py-8">
            <ProductList />
        </main>
    );
}
