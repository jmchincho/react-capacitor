import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import 'cordova-plugin-purchase/www/store';

const { store, ProductType, Platform, LogLevel } = window.CdvPurchase;

const InAppPurchase = () => {
    const [product, setProduct] = useState(null);
    const productId = 'virtualcoins100'; // Reemplaza con tu ID de producto real

    useEffect(() => {
        const platformName =
            Capacitor.getPlatform() === 'android'
                ? Platform.GOOGLE_PLAY
                : Platform.APPLE_APPSTORE;

        store.verbosity = LogLevel.DEBUG;

        store.register([
            {
                id: productId,
                type: ProductType.CONSUMABLE, // O ProductType.CONSUMABLE según tu caso
                platform: platformName,
            },
        ]);

        store.error((err) => {
            console.warn('Store Error:', err);
        });

        store.when()
            .productUpdated((p) => {
                setProduct(p);
            })
            .approved((transaction) => {
                transaction.verify();
            })
            .verified((receipt) => {
                receipt.finish();
                // Aquí puedes desbloquear contenido o funcionalidades
            });

        store.initialize([platformName]).then(() => {
            store.update().then(() => {
                store.restorePurchases();
            });
        });
    }, []);

    const purchaseProduct = () => {
        if (product) {
            const offer = product.getOffer();
            if (offer) {
                store.order(offer).then(
                    () => {
                        console.log('Compra iniciada');
                    },
                    (err) => {
                        console.error('Error al iniciar la compra:', err);
                    }
                );
            }
        }
    };

    return (
        <div>
            <h1>Compra dentro de la aplicación</h1>
            {product && (
                <div>
                    <p>{product.title}</p>
                    <p>{product.description}</p>
                    <p>{product.offers[0].pricingPhases[0].price}</p>
                    <button onClick={purchaseProduct}>Comprar</button>
                </div>
            )}
        </div>
    );
};

export default InAppPurchase;
