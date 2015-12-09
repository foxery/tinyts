var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextBox = (function (_super) {
    __extends(TextBox, _super);
    function TextBox(id) {
        _super.call(this, id);
    }
    TextBox.prototype.LoadView = function () {
        _super.prototype.LoadView.call(this);
        this.validationArea = this.target.parent().children(".validation");
    };
    TextBox.prototype.Value = function () {
        var value = this.target.val();
        if ($.trim(value) == "") {
            this.validationArea.css("display", "block");
            return null;
        }
        else {
            this.validationArea.css("display", "");
            return value;
        }
    };
    TextBox.prototype.SetValue = function (value) {
        this.target.val(value);
    };
    TextBox.prototype.SetColor = function (color) {
        this.target.css("color", color);
    };
    // ColorPicker 将TextBox构造为一个ColorPicker
    // @param 当选择一个颜色之后的回调函数
    TextBox.prototype.ColorPicker = function (handler) {
        this.target.colorpicker({
            format: "hex"
        }).on("changeColor.colorpicker", handler);
    };
    return TextBox;
})(BaseControl);
//# sourceMappingURL=textBox.js.map