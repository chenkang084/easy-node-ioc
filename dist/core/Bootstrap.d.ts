import 'reflect-metadata';
export declare const iocContainer: WeakMap<any, any>;
export declare const controlSet: Set<any>;
export declare function Bootstrap(target: any): void;
export declare function ComponentScan(scanPath: string): (target: any) => void;
