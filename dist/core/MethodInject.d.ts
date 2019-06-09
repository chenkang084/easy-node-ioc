export declare function Get(path: string): (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
export declare function Post(path: string): (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
export declare function Put(path: string): (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
export declare function Delete(path: string): (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
export declare function Patch(path: string): (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
export declare function Multer(target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): void;
