let boxes = document.getElementsByClassName('box');

//must RETURN the defense object of the json
document.getElementById('solution').addEventListener('click', function(){
fetch('viewsolutions')
	.then(response => response.json())
	.then(function(data){
		getSolutions(data);
	});
});


//must RETURN the attack object of the json
document.getElementById('attack').addEventListener('click', function(){
fetch('viewattack')
	.then(response => response.json())
	.then(function(data){
		getAttack(data);
	});
});


//must RESET the attack object of the json
document.getElementById('reset').addEventListener('click', function(){
fetch('reset')
	.then(response => response.json())
	.then(function(data){
		getReset(data);
	});
});


//must RETURN the attack object of the json
for (var i = 0; i < boxes.length; i++) {
	boxes[i].addEventListener('click', function(){
		var id = this.getAttribute('id');
		fetch('givehit', {
			headers: { "Content-Type": "application/json; charset=utf-8" },
	  		method: 'POST',
	  		body: JSON.stringify({
	    		id: id
	    	})
	  	})
	  	.then(response => response.json())
		.then(function(data){
			getAttack(data);
		});
	});

}

var getSolutions = (data) => (
	data.forEach(function(val,index){
		let elements = val.value;
		elements.forEach(function(v,i){
			let domBox = document.getElementById(v);
			domBox.classList.add('full_defense');
		});
	})
);

var getAttack = (data) => (
	data.forEach(function(val,index){
		let elements = val.value;
			let domBox = document.getElementById(elements);
			if(val.result === 'fail') {
				domBox.classList.add('full_attack_fail');
			}
			else if (val.result === 'shot') {
				domBox.classList.add('full_attack_shot');
			}
	})
);

var getReset = (data) => {
	let boxes = document.getElementsByClassName('box');
	for (var y = 0; y < boxes.length; y++) {
		boxes[y].classList.remove('full_attack_fail');
		boxes[y].classList.remove('full_attack_shot');
		boxes[y].classList.remove('full_defense');
	}
};



