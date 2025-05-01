// src/App.tsx
import { useInAppPurchase } from '../hook/useInAppPurchase';

const InAppPurchase = () => {
    useInAppPurchase();

    const handleBuy = () => {
        const store = (window as any).store;
        store.order('es.test.jmchincho.fitness.premium.1');
    };

    return (
        <div>
            <h1>Mi App con Suscripciones</h1>
            <button onClick={handleBuy}>Comprar Suscripción</button>
        </div>
    );
}

export default InAppPurchase;
