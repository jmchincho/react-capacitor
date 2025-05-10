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
        const initStore = async () => {
            document.addEventListener('deviceready', async () => {
                const store = window.CdvPurchase?.store;

                if (!store) {
                    console.warn('CdvPurchase store not available');
                    return;
                }

                console.log('📦 Iniciando œ...');
                store.verbosity = store.DEBUG;

                try {
                    // 🔐 (opcional) validador de recibos
                    store.validator = 'https://validator.iaptic.com/v1/validate?appName=demo&apiKey=12345678';

                    // ✅ Inicializar tienda
                    await store.initialize([
                        {
                            platform: store.GOOGLE_PLAY,
                            options: { needAppReceipt: true }
                        }
                    ]);

                    // ✅ Registrar productos
                    store.register([
                        {
                            id: 'es.test.jmchincho.fitness.premium',
                            type: store.PAID_SUBSCRIPTION,
                            platform: store.GOOGLE_PLAY,
                        },
                        {
                            id: 'es.test.jmchincho.fitness.product.1',
                            type: store.CONSUMABLE ,
                            platform: store.GOOGLE_PLAY,
                        }
                    ]);

                    // ✅ Listeners
                    store.when()
                        .productUpdated(() => {
                            console.log('✅ Productos cargados:', store.products);
                        })
                        .approved((tx: any) => {
                            console.log('🛒 Compra aprobada:', tx);
                            tx.verify();
                        })
                        .verified((receipt: any) => {
                            console.log('✅ Compra verificada:', receipt);
                            receipt.finish();
                        });

                    store.ready(() => {
                        console.log('✅ Productos cargados:', store.products);
                        console.log('✅ Store READY');
                    });

                    store.error((err: any) => {
                        console.error('[STORE ERROR]', err);
                    });

                } catch (error: any) {
                    console.error('[STORE INITIALIZATION ERROR]', error?.message || error);
                }
            }, { once: true });
        };

        initStore();
    }, []);
}
