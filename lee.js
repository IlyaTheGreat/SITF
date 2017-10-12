class lee {
	constructor() {
		this.start;
		this.end;
		this.d = 1;
		this.high = 99999;
		this.tfp = [];
		this.max_iter = 20 * 20;
		this.path = [];
		this._h = 32;
        this._img = new Image();
        this._img.src = "wall.png";
	}
	
	WaveStart() {
		do {
			for (var i = 0; i < 20; i++)
				for (var j = 0; j < 20; j++) {
					if (this.tfp[i][j] == this.d) {
						if (j != 0)
							if((this.tfp[i][j-1] != this.d - 1) || this.tfp[i][j-1] == 0)
								if (this.tfp[i][j-1] != this.high)
									this.tfp[i][j-1] = this.d + 1;
						if (i != 19)
							if((this.tfp[i+1][j] != this.d - 1) || this.tfp[i+1][j] == 0)
								if (this.tfp[i+1][j] != this.high)
									this.tfp[i+1][j] = this.d + 1;
						if (j != 19)
							if((this.tfp[i][j+1] != this.d - 1) || this.tfp[i][j+1] == 0)
								if (this.tfp[i][j+1] != this.high)
									this.tfp[i][j+1] = this.d + 1;
						if (i != 0)
							if((this.tfp[i-1][j] != this.d - 1) || this.tfp[i-1][j] == 0)
								if (this.tfp[i-1][j] != this.high)
									this.tfp[i-1][j] = this.d + 1;
					}
				}
			this.d++;
		}
		while(this.tfp[this.end.x][this.end.y] != this.d && this.d < this.max_iter);
		this.ReturnPath(this.tfp);
	}
	
	ReturnPath(matrix) {
		var i = this.end.x,
			j = this.end.y;
		do {
			if (j != 0)
				if (matrix[i][j-1] == this.d - 1) {
					this.path.push({i: i, j: j--});
					this.d--;
				}
			if (i != 19)
				if (matrix[i+1][j] == this.d - 1) {
					this.path.push({i: i++, j: j});
					this.d--;
				}
			if (j != 19)
				if (matrix[i][j+1] == this.d - 1) {
					this.path.push({i: i, j: j++});
					this.d--;
				}
			if (i != 0)
				if (matrix[i-1][j] == this.d - 1) {
					this.path.push({i: i--, j: j});
					this.d--;
				}
		}
		while ((i != this.start.x && j != this.start.y) || this.d > 1);
	}
	
	LeeAlg(map, start_point, end_point) {
		this.path = [];
		this.start = start_point;
		this.end = end_point;
		for (var i = 0; i < 20; i++)
			this.tfp.push([]);
		for (var i = 0; i < 20; i++)
			for (var j = 0; j < 20; j++) {
				this.tfp[i][j] = (map[i][j] == 0 || map[i][j] == 2 || map[i][j] == 3 || map[i][j] == 4) ? 0 : this.high;
			}
		this.tfp[this.start.x][this.start.y] = this.d;
		this.WaveStart();
	}
	
	DrawPath(c) {
		for (var i = 0; i < this.path.length; i++)
			c.drawImage(this._img, this.path[i].j * this._h, this.path[i].i * this._h);
		return i;
    }
}