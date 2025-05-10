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
                    alert('CdvPurchase store not available');
                    return;
                }

                alert('📦 Iniciando œ...');
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
                            id: 'virtualcoins100',
                            type: store.CONSUMABLE ,
                            platform: store.GOOGLE_PLAY,
                        }
                    ]);

                    // ✅ Listeners
                    store.when()
                        .productUpdated(() => {
                            alert('✅ Productos cargados:' + store.products);
                        })
                        .approved((tx: any) => {
                            alert('🛒 Compra aprobada:'+ tx);
                            tx.verify();
                        })
                        .verified((receipt: any) => {
                            alert('✅ Compra verificada:' + receipt);
                            receipt.finish();
                        });

                    store.ready(() => {
                        alert('✅ Productos cargados:' + store.products);
                        alert('✅ Store READY');
                    });

                    store.error((err: any) => {
                        alert('[STORE ERROR]' + err);
                    });

                } catch (error: any) {
                    alert('[STORE INITIALIZATION ERROR]' + error?.message || error);
                }
            }, { once: true });
        };

        initStore();
    }, []);
}
