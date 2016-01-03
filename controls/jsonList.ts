class JsonList extends View {
    mData: JsonListModel;
    editable: boolean;
    onItemClick: (obj: JQuery) => void;

    SetData(obj: any) {
        this.mData = new JsonListModel();
        this.mData.SetData(obj, 0, "Root");
        //顶级数据
        this.RefreshView();
    }

    SetJsonListModel(data: JsonListModel) {
        this.mData = data;
        this.RefreshView();
    }

    GetData(): JsonListModel {
        return this.mData;
    }

    LoadView() {
        super.LoadView();
        this.editable = Boolean(this.target.attr("data-editable"));
    }

    GetSummary(): string {
        var value = "";
        this.target.children("li").each((index, elem) => {
            var name = $(elem).find("label").text();
            var v = $(elem).find(".active").text();
            if (name == "" || v == "")
                return "";
            value += (name + ":");
            value += (v + "|");
        });
        return value.substr(0, value.length - 1);
    }

    GetLeafNodeId(): number {
        return +this.target.find("button.active").last().attr("data-id");
    }

    GetView(data: JsonListModel): string {
        var html = "";
        if (data == null) {
            if (!this.editable) {
                return "";
            }
            html += "<li>";
            html += "<input type='text' placeholder='输入类别' data-id=" + data.Id + " />";
            html += "<ul>";
            html += "</ul>";
            html += "<button class='btnAddSpec' data-id=" + data.Id + ">+</button>";
            html += "</li>";
            return html;
        }
        if (data.Product && data.Product != 0) {
            return "<li>已经绑定到二级商品了</li>";
        }
        html += "<li>";
        if (this.editable) {
            html += "<input type='text' placeholder='输入类别' value='" + (data.Name == null ? "" : data.Name) + "' data-id=" + data.Id + " />";
        } else {
            html += "<label>" + data.Name + "</label>";
        }

        html += "<ul>";
        for (var i = 0; i < data.Children.length; i++) {
            var name = data.Children[i].Option == null ? "" : data.Children[i].Option;
            html += "<li>";
            html += "<button class='item' data-id=" + (data.Children[i].Id) + ">";
            if (this.editable) {
                // 内容编辑框
                html += "<input type='text' value='" + name + "' data-id=" + (data.Children[i].Id) + " />";
            } else {
                html += name;
            }
            if (this.editable) {
                //删除按钮
                html += "<span>×</span>";
            }
            html += "</button>";
            html += "</li>";
        }
        html += "</ul>";
        if (this.editable) {
            // 添加按钮
            html += "<button class='btnAddSpec' data-id=" + (data.Id) + ">+</button>";
        }
        html += "</li>";
        return html;
    }

    RegisterEvents() {
        var me = this;
        //解除事件绑定
        this.target.find(".item").unbind("click");
        this.target.find(".btnAddSpec").unbind("click");
        this.target.find(".item span").unbind("click");
        this.target.children("li").children("input[type='text']").unbind("blur");
        this.target.find("ul button>input[type='text']").unbind("blur");

        this.target.find(".item").click((obj: JQueryEventObject) => {
            var t = $(obj.target);
            if (t.is("button")) {
                t.parent().parent().find(".item").removeClass("active");
                t.addClass("active");
                t.parent().parent().parent().nextAll("li").remove();

                this.target.append(me.GetView(this.mData.GetChild(+t.attr("data-id"))));
                if (me.onItemClick) {
                    me.onItemClick(t);
                }
                me.RegisterEvents();
            }
        });
        if (this.editable) {
            this.target.find(".btnAddSpec").click((obj: JQueryEventObject) => {
                var t = $(obj.target);
                var id = +t.attr("data-id");
                var model = this.mData.GetChild(id);
                //添加数据
                var temp = new JsonListModel();
                temp.PId = id;
                temp.Id = JsonListModel.curId++;
                model.AddChild(temp);

                var html = "<li><button class='item' data-id=" + temp.Id + "><input type='text' data-id=" + temp.Id + " /><span>×</span></button></li>";
                t.parent().children("ul").append(html);
                //添加后注册事件
                me.RegisterEvents();
            });

            this.target.find(".item span").click((obj: JQueryEventObject) => {
                var t = $(obj.target);
                var id = +t.parent().attr("data-id");
                if (t.parent().hasClass("active")) {
                    t.parent().parent().parent().parent().nextAll("li").remove();
                }
                if (me.mData.RemoveChild(id)) {
                    t.parent().remove();
                }

            });
        
            //类别
            this.target.children("li").children("input[type='text']").blur((obj: JQueryEventObject) => {
                var id = +$(obj.target).attr("data-id");
                var value = $(obj.target).val();
                if (value != "") {
                    var c = this.mData.GetChild(id);
                    if (c != null) {
                        c.Name = value;
                    }
                }
            });
        
            //名称
            this.target.find("ul button>input[type='text']").blur((obj: JQueryEventObject) => {
                var id = +$(obj.target).attr("data-id");
                var value = $(obj.target).val();
                if (value != "") {
                    var c = this.mData.GetChild(id);
                    if (c != null) {
                        c.Option = value;
                    }
                }
            });
        }
    }

    GetJsonString(): string {
        return this.mData.ToJsonString();
    }

    protected Clear() {
        this.target.html("");
    }

    RefreshView() {
        this.Clear();
        this.target.html(this.GetView(this.mData));
        this.RegisterEvents();
    }
}