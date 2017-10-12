class skier {
    constructor(pos) {
        this.pos = pos; //координаты лыжника
        this.h = 32; //высота лыжника
        this.img = new Image();
        this.img.src = "ski.png";
        this.angle = 0; //угол поворота
        this.sq = 640; //ширина игрового поля
		this.step = 0; //количество шагов
		this.finish; //детектор финиша
        this.rep = 0;
		this.timer = 0;
    }
	
    Draw(c) {
        c.drawImage(this.img, this.pos.x, this.pos.y);
        this.Rotate(this.angle);
    }
	
    Move(x, y, angle, table) {
		if (!this.CheckCollision(table, { x: x, y: y })) {
			this.angle = angle;
			this.pos.x += x * this.h;
			this.pos.y += y * this.h;
			this.step++;
		}
	}
	
	OffStart() {
		if (this.pos.x != 32 || this.pos.y != 32)
			return true;
	}
	
    Finished(end) {
		this.finish = end;
		if (this.pos.x / this.h >> 0 == this.finish.x && this.pos.y / this.h >> 0 == this.finish.y)
			return true;
    }
	
    Rotate(angle) {
        context.save();
        context.fillStyle = 'white';
        context.fillRect(this.pos.x, this.pos.y, this.h, this.h);
        context.translate(this.pos.x + this.h/2, this.pos.y + this.h/2);
        context.rotate(angle * Math.PI/180);
        context.drawImage(this.img, -this.h/2, -this.h/2);
        context.restore();
    }
	
    CheckCollision(table, vec) {
        var i, j;
        j = (this.pos.x + vec.x * this.h) / this.h >> 0;
        i = (this.pos.y + vec.y * this.h) / this.h >> 0;
        if (table[i][j] == 1)
            return true;
        else
            if (table[i][j] == 4) {
                document.getElementById("sw").removeAttribute("disabled");
                document.getElementById("labelsw").textContent = "Open map!";
                table[i][j] = 0;
                return true;
            }
        else
            return false;
    }
	
    DoCommand(cmd, table) {
        switch(cmd) {
            case "up":
				this.Move (0, -1, 270, table); break;
            case "down":
				this.Move (0, 1, 90, table); break;
            case "left":
				this.Move (-1, 0, 180, table); break;
            case "right":
				this.Move (1, 0, 360, table); break;
            default: break;
        }
		return this.step;
    }
}