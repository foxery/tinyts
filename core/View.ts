/**
 * View 控件基类,所有的控件类继承自View
 */
export class View {
    private id: string;
    protected target: JQuery;
    protected attributes: { [index: string]: any };
    protected propertyName: string;

    /**
     * Value 返回控件的值,若不存在,返回null
     */
    Value(): any {
        return null;
    }

    /**
     * SetValue 设置控件的值
     * @param value 值
     */
    SetValue(value) {

    }

    /**
     * Clear 清除控件的值(设为默认值)
     */
    Clear() {

    }

    /**
     * GetPropertyName 获取属性名
     */
    GetPropertyName(): string {
        return this.propertyName;
    }
    /**
     * GetJqueryInstance 返回View的Jquery对象
     */
    GetJqueryInstance(): JQuery {
        return this.target;
    }

	/**
	 * SetID 设置元素的id,该方法会在View初始化之后被调用
	 * 可以重载该方法来实现额外的初始化
	 * @param id 唯一id
	 */
    SetID(id: string) {
        this.attributes = {};
        this.id = id;
    }

    /**
     * Focus 获得焦点
     */
    Focus() {
        this.target.focus();
    }

    /**
     * ViewId 返回元素的id
     */
    ViewId(): string {
        return this.id;
    }

    /**
     * LoadView 绑定jQuery引用
     * 如果有额外操作,可以在子类中重写该方法
     */
    LoadView() {
        this.target = $("#" + this.id);
        this.propertyName = this.target.attr("data-property");
    }

    /**
     * BindBySelector 通过选择器绑定View
     */
    BindBySelector(selector: string) {
        this.target = $(selector);
    }

    /**
     * SetStyle 设置style属性
     */
    SetStyle(key: string, value: string) {
        this.target.css(key, value);
    }

    /**
     * SetAttr 设置属性
     */
    SetAttr(attrName: string, value: any) {
        this.attributes[attrName] = value;
    }

    /**
     * Attr 获取属性
     */
    Attr(attrName: string): any {
        return this.attributes[attrName];
    }

    /**
     * On 注册控件事件
     * @param eventName:事件名称
     * @param handler: 事件处理函数
     */
    On(eventName: string, handler: (...args: any[]) => any) {
        if (this.target != null) {
            this.target.on(eventName, handler);
        }
    }

    /**
     * Off 解除绑定事件
     * @param eventName 事件名称
     */
    Off(eventName?: string) {
        if (this.target != null) {
            this.target.off(eventName);
        }
    }

    /**
     * OnClick 设置点击事件
     * @param handler 事件处理器
     */
    OnClick(handler: (eventObject: JQueryEventObject) => void) {
        if (this.target != null) {
            this.target.click(handler);
        }
    }

    /**
     * SetClass 添加class属性
     * @param className
     * @param selector:该View的子元素选择器
     */
    SetClass(className: string, selector?: string) {
        if (!selector) {
            this.target.addClass(className);
        } else {
            this.target.find(selector).addClass(className);
        }
    }

    /**
     * SetClass 移除class
     * @param className
     * @param selector:该View的子元素选择器
     */
    RemoveClass(className: string, selector?: string) {
        if (!selector) {
            this.target.removeClass(className);
        } else {
            this.target.find(selector).removeClass(className);
        }
    }

}
