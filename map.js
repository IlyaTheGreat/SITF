class map {
    constructor(pos) {
        this.pos = pos;
        this.h = 32;
        this.imgT = new Image();
        this.imgT.src = "st.png";
		this.imgS = new Image();
        this.imgS.src = "snow.png";	
		this.imgFin = new Image();
        this.imgFin.src = "fin.png";
        this.imgSt = new Image();
        this.imgSt.src = "start.png";
        this.imgMapItem = new Image();
        this.imgMapItem.src = "map.png";
    }

    Draw(c, table) {
        for (var i = 0; i < 20; i++)
            for (var j = 0; j < 20; j++) {
                if (table[i][j] == 1)
                    c.drawImage(this.imgT, j * this.h, i * this.h);
				if (table[i][j] == 0)
                    c.drawImage(this.imgS, j * this.h, i * this.h);
				if (table[i][j] == 2)
                    c.drawImage(this.imgFin, j * this.h, i * this.h);
                if (table[i][j] == 3)
                    c.drawImage(this.imgSt, j * this.h, i * this.h);
                if (table[i][j] == 4)
                    c.drawImage(this.imgMapItem, j * this.h, i * this.h);
            }
    }
}

function onChange() {
	cmap = document.getElementById('map_select').value;
	wave.LeeAlg(table[cmap], {x: 1, y: 1}, {x: 18, y: 18});
	player.pos.x = 32; player.pos.y = 32;
	player.step = 0;
    document.getElementById("sw").setAttribute("disabled","disabled");
    document.getElementById("labelsw").textContent = "Find map!";
}