import type { Product } from '@/lib/types';

const laptopOrder = [
    ['processor', 'Processor'],
    ['screen', 'Display'],
    ['ram', 'Memory'],
    ['storage', 'Storage'],
    ['graphics', 'Graphics'],
    ['battery', 'Battery'],
    ['os', 'OS'],
    ['ports', 'Ports'],
    ['weight', 'Weight'],
] as const;

const monitorOrder = [
    ['displaySize', 'Display size'],
    ['resolution', 'Resolution'],
    ['panelType', 'Panel'],
    ['refreshRate', 'Refresh rate'],
    ['responseTime', 'Response time'],
    ['ports', 'Ports'],
    ['weight', 'Weight'],
] as const;

const tabletOrder = [
    ['screenSize', 'Screen'],
    ['screen', 'Display'],
    ['storage', 'Storage'],
    ['chipset', 'Chipset'],
    ['processor', 'Processor'],
    ['camera', 'Camera'],
    ['connectivity', 'Connectivity'],
    ['battery', 'Battery'],
    ['pencilSupport', 'Apple Pencil'],
    ['keyboardSupport', 'Keyboard'],
] as const;

const phoneOrder = [
    ['screenSize', 'Screen'],
    ['camera', 'Camera'],
    ['chipset', 'Chipset'],
    ['processor', 'Processor'],
    ['ram', 'RAM'],
    ['storage', 'Storage'],
    ['simType', 'SIM'],
    ['connectivity', 'Connectivity'],
    ['battery', 'Battery'],
] as const;

function entriesForProduct(product: Product): { key: string; label: string; value: string }[] {
    const specs = product.specs || {};
    const type = product.productType || 'laptop';
    let order: readonly (readonly [string, string])[];
    if (type === 'monitor') order = monitorOrder;
    else if (type === 'ipad') order = tabletOrder;
    else if (type === 'phone') order = phoneOrder;
    else order = laptopOrder;

    return order
        .map(([key, label]) => {
            const value = specs[key as keyof typeof specs];
            return { key, label, value };
        })
        .filter((e): e is { key: string; label: string; value: string } => Boolean(e.value));
}

export default function ComboProductSpecs({ product }: { product: Product }) {
    const rows = entriesForProduct(product);
    if (rows.length === 0) return null;

    return (
        <div className="mt-8">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Specifications</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                {rows.map(({ key, label, value }) => (
                    <div
                        key={key}
                        className="flex flex-col sm:flex-row sm:justify-between gap-0.5 py-2 border-b border-gray-200/80 last:border-0"
                    >
                        <dt className="text-sm text-gray-500 shrink-0">{label}</dt>
                        <dd className="text-sm font-semibold text-gray-900 text-left sm:text-right">{value}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
