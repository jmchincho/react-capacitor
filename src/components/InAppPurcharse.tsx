// src/components/InAppPurchase.tsx
import {useInAppPurchase} from '../hook/useInAppPurchase';

const InAppPurchase = () => {
    useInAppPurchase();

    const handleBuySubscription = () => {
        const store = (window as any)?.CdvPurchase?.store;

        if (!store) {
            console.warn('Store not initialized yet');
            return;
        }

        const product = store.get('es.test.jmchincho.fitness.premium.1');
        console.log('>>>>>>>>>>>>> ' + product)
        const offer = product?.getOffer();

        store.order(offer);
    };

    const handleBuyProduct = () => {
        const store = (window as any)?.CdvPurchase?.store;

        if (!store) {
            console.warn('Store not initialized yet');
            return;
        }

        const product = store.get('es.test.jmchincho.fitness.product.1');
        console.log('>>>>>>>>>>>>>>> ' + product)
        const offer = product?.getOffer();

        store.order(offer);
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h1>Mi App con Suscripciones</h1>
            <button onClick={handleBuySubscription}>Comprar Suscripción</button>

            <h1>Mi App con producto</h1>
            <button onClick={handleBuyProduct}>Comprar producto</button>
        </div>
    );
};

export default InAppPurchase;
