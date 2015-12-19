class EditDialog extends ViewGroup {
	mask: JQuery;
	masked: boolean;

	MoveTo(x: number, y: number) {
		this.target.css("left", x);
		this.target.css("top", y);
	}

	SetTitle(title: string) {
		this.target.children(".title").text(title);
	}

	SetWidth(width: number) {
		this.target.width(width);
	}

	SetHeight(height: number) {
		this.target.height(height);
	}

	LoadView() {
		super.LoadView();
		var masked = this.target.attr("data-mask");
		if (masked) {
			this.masked = true;
			this.initMask();
		}
	}

	Show() {
		super.Show();
		if (this.masked) {
			this.mask.css("display", "block");
		}
	}

	Hide() {
		super.Hide();
		if (this.masked) {
			this.mask.css("display", "none");
		}
	}

	protected initMask() {
		var html = "<div class='dialog-mask'></div>";
		this.mask = $(html);
		this.mask.insertBefore(this.target);
		this.mask.css("position", "fixed");
		this.mask.css("top", "0");
		this.mask.css("bottom", "0");
		this.mask.css("left", "0");
		this.mask.css("right", "0");
		this.mask.css("background-color", "#353B4B");
		this.mask.css("z-index", "1000");
		this.target.css("z-index", "1001");
		this.mask.css("opacity", "0.5");
	}
}