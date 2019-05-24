import { classPool } from './Container';
import { DecoratorType } from './Types';

export default function Injectable(decoratorType?: DecoratorType) {
  return (target: Function) => {
    const targetName = target.name;
    // TODO class name duplicate
    if (!classPool.has(targetName)) {
      console.log(`=====inject ${targetName}=====`);
      classPool.set(targetName, target);
    }
  };
}
