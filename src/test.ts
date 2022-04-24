function Component(id: number) {
  console.log("init component", id);
  return (target: Function) => {
    console.log("run component", id);
    target.prototype.id = id;
  };
}

function Logger() {
  console.log("init logger");
  return (target: Function) => {
    console.log("run logger");
  };
}

function Method(
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log("init method", { target, propertyKey, descriptor });
  const oldValue = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log("run method", { target, propertyKey, args, descriptor });
    const [id, ...rest] = args;
    return oldValue.apply(this, [id * 11, ...rest]);
  };
  return descriptor;
}

function Prop(target: Object, key: string) {
  console.log("init prop", { target, key });
  let value: number;

  const getter = () => {
    console.log("run prop getter", { target, key, value });
    return value;
  };

  const setter = (newValue: number) => {
    console.log("setter", { target, key, newValue });
    value = newValue;
  };

  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

function Param(target: Object, key: string, index: number) {
  console.log("init param", { target, key, index });
}

@Logger()
@Component(1)
export class User {
  @Prop id: number;

  @Method
  updateId(@Param id: number) {
    this.id = id;
    return this.id;
  }
}

const user = new User();
console.log(user.updateId(2));
console.log("uid", user.id);
