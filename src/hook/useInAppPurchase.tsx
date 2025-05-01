// src/hooks/useInAppPurchase.ts
import { useEffect } from 'react';
import 'cordova-plugin-purchase';

declare global {
    interface Window {
        CdvPurchase?: any;
    }
}

export function useInAppPurchase() {
    useEffect(() => {
        if (!window.CdvPurchase.store) {
            console.warn('Store plugin not available');
            return;
        }

        const store = window.CdvPurchase.store;

        store.verbosity = store.DEBUG;
        //
        // store.initialize([{
        //     platform: CdvPurchase.Platform.APPLE_APPSTORE
        // }]);



        store.initialize();

        store.register({
            id: 'es.test.jmchincho.fitness.premium.1', // el ID de tu producto en App Store Connect
            type: store.PAID_SUBSCRIPTION,
            platform:  store.APPLE_APPSTORE,
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


    }, []);
}
