let j=0, 	// попытка
	a=0,	// время реакции 
	k,		// время до смены цвета  
	butNum1=0,	// номер кнопки
	gameOver=false;



// сортировка таблицы рекордов

function sortList() {
  let list, u, switching, b, shouldSwitch;
  list = document.getElementById("record");
  switching = true;
	function resNumber(string) {					// убираем имя автора, оставляя результат
		return string.replace(/[а-яa-z]/gi, '');
	}
  while (switching) {
    switching = false;
    b = list.getElementsByTagName("li");
    for (u = b.length-1; u > 0 ; u--) {
      shouldSwitch = false;
      
      if (Number(resNumber(b[u].innerHTML)) < Number(resNumber(b[u-1].innerHTML))) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      b[u].parentNode.insertBefore(b[u], b[u-1]);
      switching = true;
    }
  }
}

// для определения активной кнопки
const butActive = (butNum) => {
	let colorBut = [document.getElementById('click'),	// инициализация кнопок
		document.getElementById('clickTwo'),
		document.getElementById('clickFree')
		],
		green = "rgb(23, 246, 15)",
		red = "rgba(232,0,0,0.79)",
		colorSquare,
		stateBut;

		gameOver ? colorSquare = colorBut.map((x, i) => i == butNum-1 ?  // цвет кнопки
		x=green : x=red) :
		colorSquare = colorBut.map((x) => x='rgba(46, 45, 45, 0.79)');	

		gameOver ? 	stateBut = colorBut.map((x, i) => i == butNum-1 ?	// надпись кнопки
		x='Жми!' : x='Жди') : 
		stateBut = colorBut.map((x) => x='       ');

		for (let i = 0; i<3; i++) {										// определение характеристик кнопки
			colorBut[i].style.backgroundColor = colorSquare[i];
			colorBut[i].value = stateBut[i];
		}
}

// подсчет времени реакции
const timerSpeed = () => {
	const messageArea= document.getElementById('msg');
	const id1 = setInterval(function () {
				a=Math.floor(a+1);
				if (k!=0) {
					clearInterval(id1);
					a-=1;
				};
				messageArea.innerHTML="Ваша скорость реакции: "+a+'ms';
		}, 1);
}

// время до смены состояния кнопки
const timerGame = () => {
	const id = setInterval(function () {
			k=k-1;
			const messageArea= document.getElementById('msg');
  			messageArea.innerHTML="Ваша скорость реакции: "+a+'ms';
		if (k == 0 ) {
			butNum1=Math.floor(Math.random() * (4 - 1)) + 1
			timerSpeed();
			clearInterval(id);
			butActive(butNum1);
		} 
		}, 100);
}


//для начала теста
const startGame = () => {
	if (!gameOver) {
	gameOver=true;
	j=0;
	a=0;
	const start4 = document.getElementById('st');
		start4.innerHTML="Начали!";
		k=Math.floor(Math.random() * (40 - 10)) + 10;
		if (k !=0) {
			timerGame()
		}	
		butActive(4)
	}
} 

// функция нажатия на кнопки
function handleButtonClick(keyClick){
	const step = document.getElementById('step');
	if ((k!=0 && keyClick!=butNum1 && j<5) || (k==0 && keyClick!=butNum1 && j<5)) a+=50; // штрафные очки за ошибочный клик
	if (k==0 && j<4 && gameOver && keyClick==butNum1) {		//нажатие на активную кнопку
			k=Math.floor(Math.random() * (30 - 8)) + 8;
			butNum1=4
			butActive(butNum1);
			timerGame();
			j++;
			step.innerHTML="Попытка № "+(j+1);
	} 
	
	if (k==0 && j>=4 && gameOver && keyClick==butNum1) {		// последний клик
		k=10;
		let textInput = document.getElementById("userName").value;
		let li = document.createElement("li");
		li.innerHTML = textInput+" "+a+' ms';
		let ol= document.getElementById("record");
		ol.appendChild(li);
		sortList();
		gameOver = false;
		butActive(4);
		const start4 = document.getElementById('st');
		start4.innerHTML="Стоп!";
	}
	const messageArea= document.getElementById('msg');
  	messageArea.innerHTML="Ваша скорость реакции: "+a+'ms';
}


// перезапуск теста
function refr() {
	j = 0;
	a=0;
	var messageArea= document.getElementById('msg');
	messageArea.innerHTML="Ваше скорость реакции: 0";
	var start4 = document.getElementById('st');
	startGame()
	butActive(4);
	start4.innerHTML="Начали!";
	const step = document.getElementById('step');
	step.innerHTML="Попытка № "+(j+1);
}

