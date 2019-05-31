export const CONTROL = '@@CONTROL';
export const control_reg = new RegExp(`^${CONTROL}`);
export const SERVICE = '@@SERVICE';
export const AUTOWIRED = '@@AUTOWIRED';
export const autowired_reg = new RegExp(`^${AUTOWIRED}@@`);
export const RESTFUL = '@@RESTFUL';
export const restful_reg = new RegExp(`^${RESTFUL}`);

export type RestfulMethodType = 'get' | 'post' | 'put' | 'patch' | 'delete';
