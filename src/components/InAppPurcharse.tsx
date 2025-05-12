import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import 'cordova-plugin-purchase/www/store';

const { store, ProductType, Platform, LogLevel } = window.CdvPurchase;

const InAppPurchase = () => {
    const [products, setProducts] = useState<Record<string, typeof store.Product>>({});
    const [activeSubscriptions, setActiveSubscriptions] = useState<string[]>([]);
    const [logs, setLogs] = useState<string[]>([]);

    const productId = 'virtualcoins100';
    const subscriptionId = 'premium';
    const subscriptionId2 = 'premium2';

    const log = (msg: string) => {
        console.log(msg);
        setLogs(prev => [...prev, msg]);
    };

    useEffect(() => {
        log('Iniciando configuración de compras...');

        const platformName = Capacitor.getPlatform() === 'android'
            ? Platform.GOOGLE_PLAY
            : Platform.APPLE_APPSTORE;

        log(`Plataforma detectada: ${platformName}`);

        store.verbosity = LogLevel.DEBUG;
        store.validator = 'https://ea35-92-176-223-111.ngrok-free.app/api/google-play/validate';

        store.register([
            { id: productId, type: ProductType.CONSUMABLE, platform: platformName },
            { id: subscriptionId, type: ProductType.PAID_SUBSCRIPTION, platform: platformName },
            { id: subscriptionId2, type: ProductType.PAID_SUBSCRIPTION, platform: platformName },
        ]);

        store.ready(() => {
            console.log('Store is ready');
            store.refresh(); // <-- Esto es obligatorio para recuperar compras previas
        });

        store.error(err => {
            log(`❌ Error del store: ${err.code} - ${err.message}`);
        });

        store.when().productUpdated((p) => {
            log(`✅ Producto actualizado: ${p.id}`);
            setProducts(prev => ({ ...prev, [p.id]: p }));
        });

        store.when().approved((transaction) => {
            log(`✅ Transacción aprobada: ${transaction.transactionId}`);
            transaction.verify().then(() => {
                log(`🔐 Verificación solicitada correctamente. Token: ${transaction.purchaseId}`);
                fetch('https://ea35-92-176-223-111.ngrok-free.app/api/google-play/validate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                    },
                    body: JSON.stringify({
                        productId: transaction.products?.[0]?.id,
                        purchaseToken: transaction.purchaseId,
                        platform: 'android',
                    }),
                })
                    .then(res => res.json())
                    .then(data => {
                        log(`📡 Respuesta backend: ${JSON.stringify(data)}`);
                        if (data.status === 'ok') {
                            transaction.finish();
                            log('✅ Compra finalizada');
                        }
                    })
                    .catch(err => log(`❌ Error backend: ${err.message}`));
            });
        });

        store.when().verified((receipt) => {
            log(`✅ Recibo verificado: ${receipt.transaction.id}`);
        });

        store.initialize([platformName])
            .then(() => {
                log('✅ Store inicializado correctamente.');
                store.refresh(); // <-- Esto es obligatorio para recuperar compras previas
                return store.update();
            })
            .then(() => {
                log('🔄 Productos actualizados. Restaurando compras...');
                return store.restorePurchases();
            })
            .then(() => {
                // Buscar suscripciones activas

                log('🔄 Buscar suscripciones activas...');

                const activeSubscription = store.verifiedPurchases.find(purchase => {
                    const product = store.get(purchase.id, purchase.platform);
                    return product?.type === CdvPurchase.ProductType.PAID_SUBSCRIPTION && product.owned;
                });
                // @ts-ignore
                log(`📌 Suscripciones activas: ${activeSubscription.join(', ') || 'ninguna'}`);
                // @ts-ignore
                setActiveSubscriptions(activeSubscription);
            })
            .catch(e => {
                log(`❌ Error inicialización: ${e.message}`);
            });
    }, []);

    const purchaseProduct = (productId: string) => {
        const product = products[productId];
        if (!product) return log('⚠️ Producto no encontrado');

        const offer = product.getOffer();
        if (offer) {
            log(`🛒 Iniciando compra para: ${productId}`);
            store.order(offer).then(
                () => log('✅ Compra iniciada con éxito'),
                err => log(`❌ Error en compra: ${err.message}`)
            );
        } else {
            log('⚠️ No hay oferta disponible');
        }
    };

    return (
        <div>
            <h1>Compras dentro de la aplicación</h1>

            {Object.values(products).map(p => (
                <div key={p.id}>
                    <p><strong>{p.title}</strong></p>
                    <p>{p.description}</p>
                    <p>Precio: {p.offers?.[0]?.pricingPhases?.[0]?.price}</p>
                    <button onClick={() => purchaseProduct(p.id)}>Comprar {p.id}</button>
                </div>
            ))}

            {activeSubscriptions.length > 0 && (
                <>
                    <h3>Suscripciones activas:</h3>
                    <ul>
                        {activeSubscriptions.map(sub => (
                            <li key={sub}>🟢 {sub}</li>
                        ))}
                    </ul>
                </>
            )}

            <h3>Logs:</h3>
            <pre style={{ background: '#eee', padding: '1rem', maxHeight: 300, overflowY: 'auto' }}>
                {logs.join('\n')}
            </pre>
        </div>
    );
};

export default InAppPurchase;
