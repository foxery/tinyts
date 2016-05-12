/**
 * IValidator 验证器接口
 * T: 验证的类型
 */
export interface IValidator<T> {
    /**
     * Validate 验证方法,返回是否验证成功
     */
    Validate(input: T): boolean;
    /**
     * GetMessage 获取验证的错误信息
     */
    GetMessage(): string;
}

export function validator(target: { new (...args: any[]): IValidator<any> }) {
    // save a reference to the original constructor
    var original = target;

    var name = original.prototype.constructor.name;
    if (!name) {
        //IE不支持name属性
        name = original.toString().match(/^function\s*([^\s(]+)/)[1];
    }
    /**
     * 注册validator
     */
    ValidatePool.RegisterValidator(translateName(name), original);

    // a utility function to generate instances of a class
    function construct(constructor, args) {
        var c: any = function () {
            return constructor.apply(this, args);
        }
        c.prototype = constructor.prototype;
        return new c();
    }

    // the new constructor behaviour
    var f: any = function (...args) {
        return construct(original, args);
    }

    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;

    // return new constructor (will override original)
    return f;
}

function translateName(input: string) {
    return "data-validate" + input.replace(/([A-Z])/g, "-$1").toLowerCase().substr(2);
}

export class ValidatePool {

    private static validators: { [name: string]: { new (...param: any[]): IValidator<any> } } = {};

    constructor() {

    }

    static RegisterValidator(name: string, c: { new (...param: any[]): IValidator<any> }) {
        ValidatePool.validators[name] = c;
    }
    /**
     * 创建一个validator实例
     */
    static GetValidator(name: string, value: any, tag: string): IValidator<any> {
        if (ValidatePool.validators[name]) {
            return new ValidatePool.validators[name](tag, value);
        } else {
            return null;
        }
    }
}
