import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import 'cordova-plugin-purchase/www/store';

const { store, ProductType, Platform, LogLevel } = window.CdvPurchase;

const InAppPurchase = () => {
    const [product, setProduct] = useState(null);
    const [logs, setLogs] = useState<string[]>([]);
    const productId = 'virtualcoins100'; // Reemplaza con tu ID real de Google Play Console

    const log = (msg: string) => {
        console.log(msg);
        setLogs(prev => [...prev, msg]);
    };

    useEffect(() => {
        log('Iniciando configuración de compras...');



        const platformName =
            Capacitor.getPlatform() === 'android'
                ? Platform.GOOGLE_PLAY
                : Platform.APPLE_APPSTORE;

        log(`Plataforma detectada: ${platformName}`);

        store.verbosity = LogLevel.DEBUG;

        store.validator = 'https://ea35-92-176-223-111.ngrok-free.app/api/google-play/validate';

        store.register([
            {
                id: productId,
                type: ProductType.CONSUMABLE,
                platform: platformName,
            },
        ]);

        log(`Producto registrado: ${productId}`);

        store.error((err) => {
            log(`❌ Error del store: ${err.code} - ${err.message}`);
        });

        store.when()
            .productUpdated((p) => {
                log(`✅ Producto actualizado: ${p.id}`);
                setProduct(p);
            })
            .approved((transaction) => {
                console.log('🧩 Transacción completa:', transaction);
                log(`✅ Transacción aprobada (raw): ${JSON.stringify(transaction)}`);
                transaction.verify().then(() => {
                    log('🔐 Verificación solicitada correctamente.');
                    const purchaseToken = transaction.nativeTransaction?.purchaseToken;

                    if (purchaseToken) {
                        log(`🎟️ Token de compra: ${purchaseToken}`);

                        // Aquí llamas a tu backend para validarlo y/o consumirlo
                        fetch('https://ea35-92-176-223-111.ngrok-free.app/api/google-play/validate', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'ngrok-skip-browser-warning': 'true',
                            },
                            body: JSON.stringify({
                                productId: productId,
                                purchaseToken: purchaseToken,
                                platform: 'android',
                            }),
                        })
                            .then(res => res.json())
                            .then(data => {
                                log(`📡 Respuesta backend: ${JSON.stringify(data)}`);
                                // Solo llamas a finish si el backend valida
                                if (data.status === 'ok') {
                                    transaction.finish();
                                } else {
                                    log('⚠️ Backend no confirmó la compra');
                                }
                            })
                            .catch(err => {
                                log(`❌ Error al contactar backend: ${err.message}`);
                            });
                    }
                }).catch((err) => {
                    log(`❌ Error al verificar: ${err.message || err}`);
                });
            })
            .verified((receipt) => {
                log(`✅ Recibo verificado: ${receipt.transaction.id}`);

                const purchaseToken = receipt.nativeTransaction?.purchaseToken;

                if (purchaseToken) {
                    log(`🎟️ Token de compra: ${purchaseToken}`);

                    // Aquí llamas a tu backend para validarlo y/o consumirlo
                    // fetch('https://ea35-92-176-223-111.ngrok-free.app/api/google-play/validate', {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //         'ngrok-skip-browser-warning': 'true',
                    //     },
                    //     body: JSON.stringify({
                    //         productId: productId,
                    //         purchaseToken: purchaseToken,
                    //         platform: 'android',
                    //     }),
                    // })
                    //     .then(res => res.json())
                    //     .then(data => {
                    //         log(`📡 Respuesta backend: ${JSON.stringify(data)}`);
                    //         // Solo llamas a finish si el backend valida
                    //         if (data.status === 'ok') {
                    //             receipt.finish();
                    //         } else {
                    //             log('⚠️ Backend no confirmó la compra');
                    //         }
                    //     })
                    //     .catch(err => {
                    //         log(`❌ Error al contactar backend: ${err.message}`);
                    //     });
                } else {
                    log('⚠️ No se obtuvo purchaseToken');
                    receipt.finish(); // fallback: termina igual para no quedar colgado
                }
            });

        store.initialize([platformName])
            .then(() => {
                log('✅ Store inicializado correctamente.');
                return store.update();
            })
            .then(() => {
                log('🔄 Productos actualizados. Intentando restaurar...');
                return store.restorePurchases();
            })
            .catch((e) => {
                log(`❌ Error durante la inicialización: ${e.message}`);
            });
    }, []);

    const purchaseProduct = () => {
        if (product) {
            const offer = product.getOffer();
            if (offer) {
                log(`🛒 Iniciando compra para oferta: ${offer.id}`);
                store.order(offer).then(
                    () => log('✅ Compra iniciada con éxito'),
                    (err) => log(`❌ Error al iniciar compra: ${err.message}`)
                );
            } else {
                log('⚠️ No hay oferta disponible para el producto');
            }
        } else {
            log('⚠️ Producto no disponible aún');
        }
    };

    return (
        <div>
            <h1>Compra dentro de la aplicación</h1>
            {product ? (
                <div>
                    <p><strong>{product.title}</strong></p>
                    <p>{product.description}</p>
                    <p>Precio: {product.offers?.[0]?.pricingPhases?.[0]?.price}</p>
                    <button onClick={purchaseProduct}>Comprar</button>
                </div>
            ) : (
                <p>Cargando producto...</p>
            )}
            <h3>Logs:</h3>
            <pre style={{ background: '#eee', padding: '1rem', maxHeight: 300, overflowY: 'auto' }}>
                {logs.join('\n')}
            </pre>
        </div>
    );
};

export default InAppPurchase;
