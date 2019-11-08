import 'reflect-metadata';
export declare const iocContainer: WeakMap<any, any>;
export declare const controlSet: Set<Function>;
export declare const serviceSet: WeakSet<Function>;
export declare const preHandles: Promise<any>[];
export declare function recurInject(target: any): any;
export declare function Bootstrap(target: any): void;
export declare function ComponentScan(scanPath: string): (target: any) => void;
