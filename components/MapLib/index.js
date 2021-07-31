import dynamic from 'next/dynamic';

export const Map = dynamic(() => import('./Map').then((mod) => mod.Map), {
    ssr: false,
});

export const BaseLayer = dynamic(() => import('./BaseLayer').then((mod) => mod.BaseLayer), {
    ssr: false,
});

export const BboxLayer = dynamic(() => import('./BboxLayer').then((mod) => mod.BboxLayer), {
    ssr: false,
});

export const FootprintLayer = dynamic(() => import('./FootprintLayer').then((mod) => mod.FootprintLayer), {
    ssr: false,
});
