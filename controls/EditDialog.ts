import {View} from "../core/View";
import {controlConfig} from '../config/TinytsConfig';

/**
 * EditDialog 弹窗
 * options
 * data-draggable
 * data-mask
 * data-focus
 * data-close-on-click
 * data-layer
 * data-mask-layer
 * data-auto-close
 */
export class EditDialog extends View {
    mask: JQuery;
    masked: boolean;
    closeOnClick: boolean;
    focus: View;
    protected autoclose: number;
    protected width: number;
    protected mouseX: number;
    protected mouseY: number;
    protected isMoving: boolean;

    LoadView() {
        var me = this;
        super.LoadView();
        var draggable = this.target.attr("data-draggable");
        var masked = this.target.attr("data-mask");
        var focus = this.target.attr("data-focus");
        this.closeOnClick = Boolean(this.target.attr("data-close-on-click"));
        var layer = this.target.attr("data-layer");
        var maskLayer = this.target.attr("data-mask-layer");
        this.autoclose = +this.target.attr('data-auto-close');
        //z-index
        if (layer) {
            this.SetStyle("z-index", layer);
        }
        if (maskLayer) {
            this.mask.css("z-index", maskLayer);
        }
        //焦点元素
        if (focus) {
            var temp: View = new View();
            temp.SetID(focus);
            temp.LoadView();
            this.focus = temp;
        }
        //遮罩
        if (masked) {
            this.masked = true;
            this.initMask();
        }
        this.Hide();
        //关闭按钮
        this.target.find(controlConfig.dialogCloseButtonSelector).click(() => {
            me.Hide();
        });
        //可拖动
        if (draggable) {
            this.initDraggable();
        }
    }

    /**
     * SetFocus 设置默认焦点
     * @param target 目标View
     * @param selector 目标选择器
     */
    SetFocus(target: View);
    SetFocus(selector: string);
    SetFocus(param: any) {
        if (typeof param == "string") {
            var temp: View = new View();
            temp.BindBySelector(param);
            this.focus = temp;
        } else if (typeof param == "object") {
            this.focus = param;
        }
    }

    /**
     * Show 显示editdialog
     */
    Show() {
        var me = this;
        this.target.css("display", "block");
        if (this.masked) {
            this.mask.css("display", "block");
        }
        if (this.focus) {
            this.focus.Focus();
        }
        if (this.autoclose) {
            setTimeout(function () {
                me.Hide();
            }, this.autoclose);
        }
    }

    /**
     * Hide 隐藏editdialog
     */
    Hide() {
        this.target.css("display", "none");
        if (this.masked) {
            this.mask.css("display", "none");
        }
    }

    /**
     * 需要添加mask的样式
     */
    protected initMask() {
        var html = `<div class='${controlConfig.dialogMaskClass}'></div>`;
        this.mask = $(html);
        this.mask.insertAfter(this.target);
        var me = this;
        if (this.closeOnClick) {
            this.mask.click(() => {
                me.Hide();
            });
        }
    }

    protected initDraggable() {
        var me = this;

        this.target.mousedown((eventObject: JQueryMouseEventObject) => {
            if (eventObject.target instanceof HTMLInputElement || eventObject.target instanceof HTMLTextAreaElement) {
                return;
            }
            eventObject = (eventObject || window.event) as JQueryMouseEventObject;
            pauseEvent(eventObject);
            me.mouseX = eventObject.pageX - me.target.offset().left;
            me.mouseY = eventObject.pageY - me.target.offset().top;
            me.isMoving = true;
        });
        $(document).mousemove((eventObject: JQueryMouseEventObject) => {
            if (!me.isMoving) {
                return;
            }
            if (eventObject.target instanceof HTMLInputElement || eventObject.target instanceof HTMLTextAreaElement) {
                return;
            }
            eventObject = (eventObject || window.event) as JQueryMouseEventObject;
            pauseEvent(eventObject);
            if (me.isMoving) {
                me.target.css("top", eventObject.pageY - me.mouseY);
                me.target.css("left", eventObject.pageX - me.mouseX);
            }
        });

        this.target.mouseup(() => {
            me.isMoving = false;
        });
    }
}

function pauseEvent(e: JQueryMouseEventObject) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
}