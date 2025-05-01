import { useEffect, useState } from 'react';

declare global {
    interface Window {
        store: any;
    }
}

export type StoreProduct = {
    id: string;
    title: string;
    description: string;
    price: string;
    loaded: boolean;
};

export const useStoreProducts = (productDefinitions: { id: string; type: any }[]) => {
    const [products, setProducts] = useState<StoreProduct[]>([]);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const onDeviceReady = () => {
            const store = window.store;
            if (!store) {
                console.warn('cordova-plugin-purchase no está disponible');
                return;
            }

            store.verbosity = store.DEBUG;

            store.register(productDefinitions);

            store.when('product').updated((p: any) => {
                setProducts((prev) => {
                    const updated = prev.filter((x) => x.id !== p.id);
                    return [
                        ...updated,
                        {
                            id: p.id,
                            title: p.title,
                            description: p.description,
                            price: p.price,
                            loaded: true,
                        },
                    ];
                });
            });

            store.ready(() => {
                console.log('Store lista');
                setIsReady(true);
            });

            store.refresh();
        };

        document.addEventListener('deviceready', onDeviceReady);
        return () => document.removeEventListener('deviceready', onDeviceReady);
    }, [productDefinitions]);

    return { products, isReady };
};
