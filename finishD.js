class finishD {
    constructor() {

    }
    
    Draw(c, finish) {
        if (finish) {
            c.fillStyle = "Green";
            c.font = "bold 128px sans-serif";
            c.fillText("GOOD!", 110, 320);
        }
        else {
            c.fillStyle = "Red";
            c.font = "bold 128px sans-serif";
            c.fillText("Bad!", 180, 320);
        }
        c.fillStyle = "Black";
        c.font = "bold 32px sans-serif";
        c.fillText("Score:" + player.step, 250, 360);
    }
}