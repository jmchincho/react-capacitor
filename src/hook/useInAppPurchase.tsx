// src/hooks/useInAppPurchase.ts
import { useEffect } from 'react';

declare const window: any;

export function useInAppPurchase() {
    useEffect(() => {
        if (!window.store) {
            console.warn('Store plugin not available');
            return;
        }

        const store = window.store;

        store.verbosity = store.DEBUG;

        store.register({
            id: 'es.test.jmchincho.fitness.premium.1', // el ID de tu producto en App Store Connect
            type: store.PAID_SUBSCRIPTION,
        });

        store.when('es.test.jmchincho.fitness.premium.1').approved((product: any) => {
            console.log('[APPROVED]', product);
            product.finish();
        });

        store.when('es.test.jmchincho.fitness.premium.1').updated((product: any) => {
            console.log('[UPDATED]', product);
        });

        store.error((err: any) => {
            console.error('[STORE ERROR]', err);
        });

        store.ready(() => {
            console.log('[STORE READY]');
        });

        store.refresh();

    }, []);
}
