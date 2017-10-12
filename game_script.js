var context, //контекст для отрисовки
    player, //игрок
    field, //карта
	wave, //алгоритм поиска кратчайшего пути
	fin, //отрисовка итогов
    currentCommand = 0, //счетчик исполняемых команд
    listCommand = null, //список исполняемых команд
	table = new maps(), //список карт
	timer, //таймер для update()
	swv, //переключатель для АПКП
	sw2v, tostart, //для переключения режимов
	len = 0, //длина кратчайшего пути
	step_c, //число пройденных игроком шагов
	stop_m = false, //сообщает, что игра остановлена
	num_comm = 0, //число повторений команды
	cmap = 'map1', //карта, которая грузится по умолчанию
	path = []; //путь к массиву карт
	
function init() {
    var canvas = document.getElementById("mycanvas");
    context = canvas.getContext("2d");
    field = new map({i: 0, j: 0});
    player = new skier({x: 32, y: 32});
	wave = new lee();
	wave.LeeAlg(table[cmap], { x: 1, y: 1 }, { x: 18, y: 18 });
	fin = new finishD({i: 0, j: 0});
    timer = setInterval(update, 100);
}

function update() {
    context.fillStyle = 'white';
    context.fillRect(0, 0, 640, 640);
	len = wave.DrawPath(context);
    field.Draw(context, table[cmap]);
	swv = document.getElementById("sw").value;
	if (swv == "1") wave.DrawPath(context);
	sw2v = document.getElementById("sw2").value;
	if (sw2v == "1") {
		tostart = true;
		document.getElementById("labelsw2").textContent = "Hard mode!";
	}
	else {
		tostart = false;
		document.getElementById("labelsw2").textContent = "Easy mode!";
	}
	if (player.OffStart()) document.getElementById("map_select").setAttribute("disabled","disabled");
	else document.getElementById("map_select").removeAttribute("disabled");
	if (player.Finished({x: 18, y: 18})) { // ?
		if (step_c == len) fin.Draw(context, true);
		else fin.Draw(context, false);
		stop_m = true; clearInterval(timer);	
	}
	player.Draw(context);
    if (!stop_m) { //если игрок еще не финишировал
    	if (listCommand != null) { //если в списке команд еще есть команды на выполнение
    		if (currentCommand < listCommand.length) { //если число выполненных команд не достигло максимума
    			if (listCommand[currentCommand].indexOf('.') != -1) { //если во время выполнения текущей команды из списка команд найдена '.' в команде
	    			num_comm = Number(listCommand[currentCommand].split('.')[1]); //здесь лежит число повторов команды
					if (num_comm != 0) { //если число повторов не равно нулю, т.е. мы еще должны повторить команду num_comm раз
						step_c = player.DoCommand(listCommand[currentCommand].split('.')[0], table[cmap]); //повторяем команду один раз
						num_comm--; //уменьшаем число повторов
						listCommand[currentCommand] = listCommand[currentCommand].split('.')[0]+'.'+num_comm; //новая команда теперь == старая с num_comm-1
					}
					else
						currentCommand++; //иначе команда выполнена
    			}
    			else { //если же '.' в команде не найдена
					switch(listCommand[currentCommand]) {
						case "up": moveToWall(0, -1); break; //едем до стены
						case "down": moveToWall(0, 1); break;
						case "left": moveToWall(-1, 0); break;
						case "right": moveToWall(1, 0); break;
					}
				}
    		}
    		else {
    			currentCommand = 0;
    			listCommand = null;
    		}
    	}
		else {
			if (tostart) {
				player.pos.x = 32;
				player.pos.y = 32;
			}
		}
    }
}

function moveToWall(_x, _y) {
	if (!player.CheckCollision(table[cmap], { x: _x, y: _y }))
		step_c = player.DoCommand(listCommand[currentCommand], table[cmap]);
	else
		currentCommand++;
}

function start() {
    listCommand = document.getElementById("ta").value.split(";\n");
	listCommand.pop();
}