import { useStoreProducts } from '../hook/useStoreProducts';

const productDefs = [
    { id: 'es.test.jmchincho.moneda.virtual.1', type: window.store?.CONSUMABLE },
    { id: 'es.test.jmchincho.moneda.virtual.2', type: window.store?.CONSUMABLE },
    { id: 'es.test.jmchincho.fitness.premium.1', type: window.store?.PAID_SUBSCRIPTION },
    { id: 'es.test.jmchincho.fitness.premium.2', type: window.store?.PAID_SUBSCRIPTION },
];

export const InAppPurchase = () => {
    const { products, isReady } = useStoreProducts(productDefs);

    if (!isReady) return <p>Cargando productos...</p>;

    return (
        <div>
            <h2>Productos disponibles</h2>
            <ul>
                {products.map((p) => (
                    <li key={p.id}>
                        <strong>{p.title}</strong> - {p.price}
                        <p>{p.description}</p>
                        <button onClick={() => window.store.order(p.id)}>Comprar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
