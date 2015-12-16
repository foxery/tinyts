var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SelectButton = (function (_super) {
    __extends(SelectButton, _super);
    function SelectButton() {
        _super.apply(this, arguments);
        this.itemClasses = [];
    }
    SelectButton.prototype.LoadView = function () {
        _super.prototype.LoadView.call(this);
        var t = Boolean(this.target.attr("data-muilti-select"));
        if (t) {
            this.muiltiSelect = true;
        }
        else {
            this.muiltiSelect = false;
        }
    };
    SelectButton.prototype.Clear = function () {
        this.target.html("");
    };
    SelectButton.prototype.Add = function (model) {
        var me = this;
        _super.prototype.Add.call(this, model);
        for (var i = 0; i < this.itemClasses.length; i++) {
            this.target.find("button").last().addClass(this.itemClasses[i]);
        }
        if (me.onItemClick != null) {
            this.target.find("button").last().click(function (p) {
                me.onItemClick($(p.target));
            });
        }
    };
    SelectButton.prototype.GetView = function (index) {
        if (index < 0 || index > this.mData.length) {
            return "";
        }
        var html = "";
        html += "<button data-id=" + this.mData[index].value + ">";
        html += this.mData[index].text;
        html += "</button>";
        return html;
    };
    SelectButton.prototype.GetSelectedItemId = function () {
        if (this.muiltiSelect) {
            return 0;
        }
        else {
            return +this.target.find("button").filter(".active").attr("data-id");
        }
    };
    SelectButton.prototype.RefreshView = function () {
        var _this = this;
        var me = this;
        _super.prototype.RefreshView.call(this);
        for (var i = 0; i < this.itemClasses.length; i++) {
            this.target.find("button").addClass(this.itemClasses[i]);
        }
        if (me.onItemClick != null) {
            this.target.find("button").click(function (p) {
                if (_this.muiltiSelect) {
                    if ($(p.target).hasClass("active")) {
                        $(p.target).removeClass("active");
                    }
                    else {
                        $(p.target).addClass("active");
                    }
                }
                else {
                    _this.target.find("button").removeClass("active");
                    $(p.target).addClass("active");
                }
                me.onItemClick($(p.target));
            });
        }
    };
    SelectButton.prototype.SetItemClass = function (className) {
        if (className.trim() == "") {
            return;
        }
        this.itemClasses.push(className);
    };
    return SelectButton;
})(ListView);
//# sourceMappingURL=selectButton.js.map