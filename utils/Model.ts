import {View} from '../core/View';
import {InputView} from '../core/InputView';
import {ListView} from '../core/ListView';
import {ListInputView} from '../core/ListInputView';

/**
 * ModelParser 模型注入器
 */
export class ModelInjector {

    /**
     * InjectModelDistrict 按严格模式注入Model,严格模式指最后得到的Model已经经过数据验证
     * @param context 从context中查找定义了data-property属性的控件,并将值注入到Model中
     * @return 返回注入后的model
     */
    static InjectModelDistrict(context): any {
        var temp = {};
        for (var property in context) {
            var target: Object = context[property];
            if (target instanceof View) {
                var propName = target.GetPropertyName();
                if (propName) {
                    var value;
                    if (target instanceof InputView) {
                        //如果是InputView则增加验证
                        value = target.ValidatedValue();
                    } else {
                        value = target.Value();
                    }
                    if (value != null) {
                        temp[propName] = value;
                    }
                }
            }
        }
        return temp;
    }

    /**
     * InjectModel 注入Model
     * @param context 从context中查找定义了data-property属性的控件,并将值注入到Model中
     * @return 返回注入后的model
     */
    static InjectModel(context): any {
        var temp = {};
        for (var property in context) {
            var target: Object = context[property];
            if (target instanceof View) {
                var propName = target.GetPropertyName();
                if (propName) {
                    var value = target.Value();
                    if (value != null) {
                        temp[propName] = value;
                    }
                }
            }
        }
        return temp;
    }

    /**
     * ResolveModel 解析model,将值注入到控件中
     * @param model 模型
     * @param context 上下文,控件父容器
     */
    static ResolveModel(model, context) {
        for (var property in context) {
            var target: Object = context[property];
            if (target instanceof View) {
                var propName = target.GetPropertyName();
                if (propName) {
                    var value = model[propName];
                    if (value != null) {
                        if (target instanceof ListView && Array.isArray(value)) {
                            //如果是列表控件并且值是数组,调用SetData方法
                            target.SetData(value);
                        } else {
                            target.SetValue(value);
                        }
                    }
                }
            }
        }
    }

    /**
     * InjectValidatedModel 注入带验证装饰器的Model
     * @param context 从context中查找定义了data-property属性的控件,并将值注入到Model中
     */
    static InjectValidatedModel<T extends IModel>(TClass: { new (...args: any[]): T }, context): T {
        // temp 用于验证
        var temp = new TClass();
        var model = {};
        for (var property in context) {
            var target: Object = context[property];
            if (target instanceof View) {
                var propName = target.GetPropertyName();
                if (propName) {
                    var value = target.Value();
                    //如果model中存在,优先注入
                    if (TClass.prototype.hasOwnProperty(propName)) {
                        temp[propName] = value;
                        model[propName] = value;
                    } else if (value != null) {
                        //注入model中不存在,但是value不为null的值
                        model[propName] = value;
                    }
                }
            }
        }
        return <T>model;
    }

    /**
     * ClearView 清除context中所有View的值
     * @param context 上下文
     */
    static ClearView(context) {
        for (var property in context) {
            var target: Object = context[property];
            if (target instanceof View && target.GetPropertyName()) {
                //列表控件
                if (target instanceof ListView) {
                    if (target instanceof ListInputView) {
                        target.Clear();
                    } else {
                        target.SetData(null);
                    }
                } else {
                    target.Clear();
                }
            }
        }
    }
}
