function animate() {

	position = $(".tank-level").css("background-position").split(' ');
	x = parseInt(position[0]);
	y = parseInt(position[1]);
	
	if (x > -3058) {
		$(".tank-level").css("background-position", (x-160) + "px " + y + "px");
	} else {
		$(".tank-level").css("background-position", "-18px " + y + "px");
	}
	
}

function round5(x) {
    return (x % 5) >= 2.5 ? parseInt(x / 5) * 5 + 5 : parseInt(x / 5) * 5;
}

function generateChart(tapNumber, chartData) {

	$("#" + tapNumber + " .chart").sparkline(chartData,
			{
				width: '300px',
				height: "80px",
				lineColor: "#555",
				spotColor: "#555",
				minSpotColor: "#555",
				maxSpotColor: "#555",
				fillColor: "rgba(0,0,0,.1)",
				type: 'line',
				spotRadius: 1.5
			}
		);
}

function setLevel(tapNumber, level) {

	y = -40;
	x = -4000;
	
	if (level >= 0 && level <= 100) {
		x = -3058-((round5(level)/5-1)*-160);
		//x = level;
	} else {
		alert("level out of range (must be 0-100)");
	}
		
	$("#" + tapNumber + " .tank-level").css("background-position", x + "px " + y + "px");

}

function updateValues() {

	console.log("checking values...");
	
	//FIRST TAP DATA
	$.ajax({
		type: 'GET',
		url: "/get_tap/1",
		success: function(data){
			
			console.log(data);
			setLevel("one", data*100);

		}

	});

	$.ajax({
		type: 'GET',
		url: "/get_graph/1",
		success: function(data){
			
			console.log(data);
			generateChart("one", $.parseJSON(data));

		}

	});

	//SECOND TAP DATA
	$.ajax({
		type: 'GET',
		url: "/get_tap/2",
		success: function(data){
			
			console.log(data);
			setLevel("two", data*100);

		}

	});

	$.ajax({
		type: 'GET',
		url: "/get_graph/2",
		success: function(data){
			
			console.log(data);
			generateChart("two", $.parseJSON(data));

		}

	});
	
	
}

$(document).ready(function(){

	//ANIMATE TANK LEVEL
	//var interval = setInterval("animate()", 100);	

	//var interval = setInterval("updateValues()", 5000);
	updateValues();
	/*//SET TANK LEVEL
	setLevel("one", Math.floor(Math.random()*100));
	setLevel("two", Math.floor(Math.random()*100));
	
	//GENERATE CHART
	generateChart("one", [3,4,5,6,4,6,9,3,2]);
	generateChart("two", [3,4,5,6,4,6,9,3,2]);*/
	
});
