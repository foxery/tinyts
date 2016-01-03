//根据Control的属性名称和类型
//自动初始化,绑定页面上的id
//并注入到ViewModel中
/**
 * 用于某个控件
 */
function view(Class) {
    return function inject(target, decoratedPropertyName) {
        var targetType = target.constructor;
        if (!targetType.hasOwnProperty('__inject__')) {
            targetType.__inject__ = {};
        }
        // var temp = new Class();
        // temp.SetID(decoratedPropertyName);
        targetType.__inject__[decoratedPropertyName] = Class;
    };
}
/**
 * 用于封装的部分视图
 */
function partialView(Class) {
    return function inject(target, decoratedPropertyName) {
        var targetType = target.constructor;
        if (!targetType.hasOwnProperty('__inject__')) {
            targetType.__inject__ = {};
        }
        // var temp = new Class();
        targetType.__inject__[decoratedPropertyName] = Class;
    };
}
//# sourceMappingURL=ViewFilter.js.map