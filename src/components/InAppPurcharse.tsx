// src/components/InAppPurchase.tsx
import {useInAppPurchase} from '../hook/useInAppPurchase';

const InAppPurchase = () => {
    useInAppPurchase();

    const handleBuy = () => {
        const store = (window as any)?.CdvPurchase?.store;

        if (!store) {
            console.warn('Store not initialized yet');
            return;
        }

        const product = store.get('es.test.jmchincho.fitness.premium.1');
        console.log('dasdas' + product)
        const offer = product?.getOffer();

        store.order(offer);
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h1>Mi App con Suscripciones</h1>
            <button onClick={handleBuy}>Comprar Suscripción</button>
        </div>
    );
};

export default InAppPurchase;
