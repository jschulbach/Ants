
var ants = (function() {

	//Title screen events

	//Survival Mode
	$('#survivalmode').one('click', function() {
		$('#titleScreen').fadeOut(ants.init());
		$('.toolbar').removeClass('hideleft');
		$('#tilesDrawer').removeClass('hideright');
	});

	//Sandbox Mode
	$('#sandboxmode').one('click', function() {
		$('#config').show();
		$('#titleScreen').fadeOut();

	});

	var worker = new Worker('js/worker.js');

	//Red vs Black Mode
	$('#rvsbmode').one('click', function() {
		ants.COLONY_COUNT = 2;
		ants.INITIAL_MAP_FOOD = 35;
		ants.INITIAL_POPULATION = 30;
		$('#titleScreen').fadeOut(ants.init());
		$('.toolbar').removeClass('hideleft')
		$('#tilesDrawer').removeClass('hideright')
		data.datasets.push(
			{
	            label: "Red Ants",
	            fillColor: "rgba(220,220,220,0.5)",
	            strokeColor: "rgba(250,120,120,0.8)",
	            highlightFill: "rgba(220,220,220,0.75)",
	            highlightStroke: "rgba(220,220,220,1)",
	            data: [ants.INITIAL_POPULATION, ants.INITIAL_POPULATION]
	        }
		);

	});

	//Set Map scale based on data value from scale buttons
	$('#map_scale').on('click', function(evt) {
		console.log($(evt.target).attr('data-scale'))
		$('.scaleButton').removeClass('selected');
		$(evt.target).addClass('selected');
		ants.setScale($(evt.target).attr('data-scale'));
	})

	//Sandbox Events

	$('#sandbox_start').one('click', function(e) {
		$('#config').fadeOut(ants.init());
		$('.toolbar').removeClass('hideleft')
		$('#tilesDrawer').removeClass('hideright')
		$('#configButton').show();
		$(e.currentTarget).hide();
		$('#sandbox_close').show();
		$('#sandbox_close').click(function() {
			$('#config').fadeOut();
		})
	})

	//Config Events

	$('#initial_population').on('change', function(e) {
		ants.INITIAL_POPULATION = $(e.currentTarget).val();
	});

	$('#initial_map_food').on('change', function(e) {
		ants.INITIAL_MAP_FOOD = $(e.currentTarget).val();
	});

	$('#initial_colony_food').on('change', function(e) {
		ants.INITIAL_COLONY_FOOD = $(e.currentTarget).val();
	})

	$('#max_energy').on('change', function(e) {
		ants.MAX_ENERGY = $(e.currentTarget).val();
	})

	$('#ant_cost').on('change', function(e) {
		ants.ANT_COST = $(e.currentTarget).val();
	})

	$('#food_growth_rate').on('change', function(e) {
		ants.FOOD_GROWTH_RATE = $(e.currentTarget).val();
	})

	$('#food_energy').on('change', function(e) {
		ants.FOOD_ENERGY = $(e.currentTarget).val();
	})

	$('#hungry').on('change', function(e) {
		ants.HUNGRY = $(e.currentTarget).val();
	})

	$('#dizziness').on('change', function(e) {
		ants.DIZZINESS = $(e.currentTarget).val();
	})

	$('#chance_turn').on('change', function(e) {
		ants.CHANCE_TURN = $(e.currentTarget).val();
	})

	$('#chance_turn_on_trail').on('change', function(e) {
		ants.CHANCE_TURN_ON_TRAIL = $(e.currentTarget).val();
	})

	$('#chance_turn_food').on('change', function(e) {
		ants.CHANCE_TURN_FOOD = $(e.currentTarget).val();
	})

	Chart.defaults.global = {
	    // Boolean - Whether to animate the chart
	    animation: true,

	    // Number - Number of animation steps
	    animationSteps: 60,

	    // String - Animation easing effect
	    animationEasing: "easeOutQuart",

	    // Boolean - If we should show the scale at all
	    showScale: true,

	    // Boolean - If we want to override with a hard coded scale
	    scaleOverride: false,

	    // ** Required if scaleOverride is true **
	    // Number - The number of steps in a hard coded scale
	    scaleSteps: null,
	    // Number - The value jump in the hard coded scale
	    scaleStepWidth: null,
	    // Number - The scale starting value
	    scaleStartValue: null,

	    // String - Colour of the scale line
	    scaleLineColor: "rgba(0,0,0,.1)",

	    // Number - Pixel width of the scale line
	    scaleLineWidth: 1,

	    // Boolean - Whether to show labels on the scale
	    scaleShowLabels: true,

	    // Interpolated JS string - can access value
	    scaleLabel: "<%=value%>",

	    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
	    scaleIntegersOnly: true,

	    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
	    scaleBeginAtZero: false,

	    // String - Scale label font declaration for the scale label
	    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

	    // Number - Scale label font size in pixels
	    scaleFontSize: 12,

	    // String - Scale label font weight style
	    scaleFontStyle: "normal",

	    // String - Scale label font colour
	    scaleFontColor: "#666",

	    // Boolean - whether or not the chart should be responsive and resize when the browser does.
	    responsive: false,

	    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
	    maintainAspectRatio: true,

	    // Boolean - Determines whether to draw tooltips on the canvas or not
	    showTooltips: true,

	    // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
	    customTooltips: false,

	    // Array - Array of string names to attach tooltip events
	    tooltipEvents: ["mousemove", "touchstart", "touchmove"],

	    // String - Tooltip background colour
	    tooltipFillColor: "rgba(0,0,0,0.8)",

	    // String - Tooltip label font declaration for the scale label
	    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

	    // Number - Tooltip label font size in pixels
	    tooltipFontSize: 14,

	    // String - Tooltip font weight style
	    tooltipFontStyle: "normal",

	    // String - Tooltip label font colour
	    tooltipFontColor: "#fff",

	    // String - Tooltip title font declaration for the scale label
	    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

	    // Number - Tooltip title font size in pixels
	    tooltipTitleFontSize: 14,

	    // String - Tooltip title font weight style
	    tooltipTitleFontStyle: "bold",

	    // String - Tooltip title font colour
	    tooltipTitleFontColor: "#fff",

	    // Number - pixel width of padding around tooltip text
	    tooltipYPadding: 6,

	    // Number - pixel width of padding around tooltip text
	    tooltipXPadding: 6,

	    // Number - Size of the caret on the tooltip
	    tooltipCaretSize: 8,

	    // Number - Pixel radius of the tooltip border
	    tooltipCornerRadius: 6,

	    // Number - Pixel offset from point x to tooltip edge
	    tooltipXOffset: 10,

	    // String - Template string for single tooltips
	    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

	    // String - Template string for single tooltips
	    multiTooltipTemplate: "<%= value %>",

	    // Function - Will fire on animation progression.
	    onAnimationProgress: function(){},

	    // Function - Will fire on animation completion.
	    onAnimationComplete: function(){}
	};

	var data = {
	    labels: [],
	    datasets: [
	        {
	            label: "Black Ants",
	            fillColor: "rgba(220,220,220,0.5)",
	            strokeColor: "rgba(220,220,220,0.8)",
	            highlightFill: "rgba(220,220,220,0.75)",
	            highlightStroke: "rgba(220,220,220,1)",
	            data: []
	        }
	    ]
	};

	var options = {

	    ///Boolean - Whether grid lines are shown across the chart
	    scaleShowGridLines : true,

	    //String - Colour of the grid lines
	    scaleGridLineColor : "rgba(0,0,0,.05)",

	    //Number - Width of the grid lines
	    scaleGridLineWidth : 1,

	    //Boolean - Whether to show horizontal lines (except X axis)
	    scaleShowHorizontalLines: true,

	    //Boolean - Whether to show vertical lines (except Y axis)
	    scaleShowVerticalLines: true,

	    //Boolean - Whether the line is curved between points
	    bezierCurve : true,

	    //Number - Tension of the bezier curve between points
	    bezierCurveTension : 0.4,

	    //Boolean - Whether to show a dot for each point
	    pointDot : true,

	    //Number - Radius of each point dot in pixels
	    pointDotRadius : 4,

	    //Number - Pixel width of point dot stroke
	    pointDotStrokeWidth : 1,

	    //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
	    pointHitDetectionRadius : 20,

	    //Boolean - Whether to show a stroke for datasets
	    datasetStroke : true,

	    //Number - Pixel width of dataset stroke
	    datasetStrokeWidth : 2,

	    //Boolean - Whether to fill the dataset with a colour
	    datasetFill : true,

	    //String - A legend template
	    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

	};
	//Set up canvas' and context
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	var co = document.getElementById("overlaycanvas");
	var ctxo = co.getContext("2d");
	var cf = document.getElementById("foodcanvas");
	var ctxf = cf.getContext("2d");
	var cm = document.getElementById("miniMap");
	var ctxm = cm.getContext("2d");

	//The ant sprite image
	var antImg = new Image();
	antImg.src = './img/ant_sprite.png';

	//sprite object used for ants
	function Sprite(img, width, height, positions){
	  this.img = img;
	  this.width = width;
	  this.height = height;
	  this.positions = positions;
	}
	Sprite.prototype = {
	  draw: function(position, x, y){
	    var pos = this.positions[position];
	    ctxo.drawImage( 
	      this.img,
	      pos[0],
	      pos[1],
	      this.width,
	      this.height,
	      x, y,
	      this.width,
	      this.height
	    );
	  }

	};

	var antSprite = new Sprite(antImg, 11, 11, [
	  // specify a few sprite locations
	  [11, 0], //n
	  [22, 0], //ne
	  [22, 11], //e
	  [22, 22], //se
	  [11, 22], //s
	  [0, 22], //sw
	  [0, 11], //w
	  [0, 0], //nw
	  [44, 0], //n food
	  [55, 0], //ne food
	  [55, 11], //e food
	  [55, 22], //se food
	  [44, 22], //s food
	  [33, 22], //sw food
	  [33, 11], //w food
	  [33, 0], //nw food
	  //red ants
	  [11, 33], //n
	  [22, 33], //ne
	  [22, 44], //e
	  [22, 55], //se
	  [11, 55], //s
	  [0, 55], //sw
	  [0, 44], //w
	  [0, 33], //nw
	  [44, 33], //n food
	  [55, 33], //ne food
	  [55, 44], //e food
	  [55, 55], //se food
	  [44, 55], //s food
	  [33, 55], //sw food
	  [33, 44], //w food
	  [33, 33], //nw food
	  //vets
	  [77, 0], //n
	  [88, 0], //ne
	  [88, 11], //e
	  [88, 22], //se
	  [77, 22], //s
	  [66, 22], //sw
	  [66, 11], //w
	  [66, 0], //nw
	  [110, 0], //n food
	  [121, 0], //ne food
	  [121, 11], //e food
	  [121, 22], //se food
	  [110, 22], //s food
	  [99, 22], //sw food
	  [99, 11], //w food
	  [99, 0], //nw food
	  //red ants
	  [77, 33], //n
	  [88, 33], //ne
	  [88, 44], //e
	  [88, 55], //se
	  [77, 55], //s
	  [66, 55], //sw
	  [66, 44], //w
	  [66, 33], //nw
	  [110, 33], //n food
	  [121, 33], //ne food
	  [121, 44], //e food
	  [121, 55], //se food
	  [110, 55], //s food
	  [99, 55], //sw food
	  [99, 44], //w food
	  [99, 33] //nw food
	 ]);

	//all the properties on the base Ants object
	return {
		INITIAL_POPULATION : 20,
		INITIAL_COLONY_FOOD : 15,
		INITIAL_MAP_FOOD : 20,
		ENTRANCE_COST: 1000,
		MAX_ENERGY : 10000,
		DIZZINESS : 2,
		CHANCE_TURN : 10,
		CHANCE_TURN_ON_TRAIL : 7,
		CHANCE_TURN_FOOD : 3,
		FOOD_GROWTH_RATE : 20,
		FOOD_ENERGY : 1000,
		HUNGRY : 8000,
		ANT_COST : 3,
		COLONY_COUNT : 1,
		MAP_SCALE: 1,
		colonies : [],
		foodData : [],
		barrierData : [],
		SELECTED_COLONY: 0,
		achievements: [{name: '30+', reward: '2nd entrance', earned : false}],
		setScale : function(scale) {
			ants.MAP_SCALE = scale;
			$(c).css('width', c.width * Number(scale) + 'px');
			$(co).css('width', c.width * Number(scale) + 'px');
			$(cf).css('width', c.width * Number(scale) + 'px');
			$(c).css('height', c.height * Number(scale) + 'px');
			$(co).css('height', c.height * Number(scale) + 'px');
			$(cf).css('height', c.height * Number(scale) + 'px');
			$('#bg').css('width', c.width * Number(scale) + 'px');
			$('#bg').css('height', c.height * Number(scale) + 'px');
			switch(scale) {
				case "1" :
					$('#bg').css('background-size', '256px 256px');
					$('#scrollContainer').removeClass('full');
					for(var g = 0; g < ants.colonies.length; g++) {
						ants.colonies[g].homeImg.css('width', '30px');
						ants.colonies[g].homeImg.css('height', '29px');
						ants.colonies[g].homeImg.css('left' , ants.colonies[g].entrances[0].x - 14);
						ants.colonies[g].homeImg.css('top', ants.colonies[g].entrances[0].y - 13);
					}
				break;
				case "0.5" :
					$('#bg').css('background-size', '128px 128px');
					$('#scrollContainer').addClass('full');
					for(var g = 0; g < ants.colonies.length; g++) {
						ants.colonies[g].homeImg.css('width', '15px');
						ants.colonies[g].homeImg.css('height', '15px');
						ants.colonies[g].homeImg.css('left' , (ants.colonies[g].entrances[0].x - 14)/2);
						ants.colonies[g].homeImg.css('top', (ants.colonies[g].entrances[0].y - 13)/2);
					}
				break;
				case "2" :
					$('#bg').css('background-size', '512px 512px');
					$('#scrollContainer').removeClass('full');
					for(var g = 0; g < ants.colonies.length; g++) {
						ants.colonies[g].homeImg.css('width', '60px');
						ants.colonies[g].homeImg.css('height', '58px');
						ants.colonies[g].homeImg.css('left' , (ants.colonies[g].entrances[0].x - 14)*2);
						ants.colonies[g].homeImg.css('top', (ants.colonies[g].entrances[0].y - 13)*2);
					}
				break;
			}
			
		},
		init : function() {
			
			ctx.fillStyle = "#FF0000";

			var names = [['Bob', 'Tim', 'Jonny', 'Anthony', 'Red', 'Zapp','Roman' , 'Fry', 'Joel', 'Biff', 'Arnold', 'Marty', 'Luke', 'Han', 'Drew', 'Kenny',
								'Fred', 'Sean', 'Jesse', 'Daniel', 'Blain', 'Speedy', 'Marcus', 'Sven', 'Kristoff', 'William', 'Bennet', 'Josh', 'Tucker', 'Nolan', 'Caleb', 'Kevin', 'Tony', 'Chuck', 'Frank', 'Andrew', 'Darnell', 'Zane', 'Hans'],
							['Leela', 'Anna', 'Elsa', 'Andrea', 'Laurel', 'Alice', 'Jenny', 'Susan', 'Antonia', 'Leia', 'Ashlee', 'Cindy', 'Annie', 'Lucy', 'Adelia', 'Kirby', 'Aurora', 'Jasmine', 'Maya', 'Lexie','Laura', 'Julie', 'Arlene', 'Marlane', 'Gail', 'Katniss', 'Aunty', 'Roo', ]]

			//setup kinetic scrolling using 3rd party library
			$('#scrollContainer').kinetic();

			var ph = 500;
			var maxAnts = 0;
			var toolMode = 'pan';
			var paused = false;
			var TRAIL_STRENGTH = 0.04;
			var MIN_TRAIL_STRENGTH = 0.01; 
			var TRAIL_STRENGTH_DECAY = 0.02;
			var DECAY_INTERVAL = 60;
			var CANVAS_WIDTH = c.width;
			var CANVAS_HEIGHT = c.height;
			var CANVAS_WIDTHX4 = CANVAS_WIDTH * 4;
			var NUM_PIXELS = CANVAS_WIDTH * CANVAS_HEIGHT;
			var nextAntID = 1;
			var mousePos = { x: 400, y: 400};
			var trailData = [];
			var foodData = []

			var h1 = document.getElementById('timer'),
			    seconds = 0, 
			    minutes = 0, 
			    hours = 0,
			    t;

			function add() {
			    if(!paused) {
			    	seconds++;
			    }
			    if (seconds >= 60) {
			        seconds = 0;
			        minutes++;
			        if (minutes >= 60) {
			            minutes = 0;
			            hours++;
			        }
			    }
			    
			    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

			    timer();
			}

			function timer() {
			    if(ants.colonies[0].population > 0)
			    	t = setTimeout(add, 1000);
			    else {
			    	var efficientAnt = {antName: 'nobody'};
			    	var efficientValue = 0;
			    	for(var g = 0; g < ants.colonies[0].ants.length; g++) {
						if(ants.colonies[0].ants[g].delivered > 0 && ants.colonies[0].ants[g].distance/ants.colonies[0].ants[g].delivered > efficientValue) {
							efficientValue = ants.colonies[0].ants[g].distance/ants.colonies[0].ants[g].delivered;
							efficientAnt = ants.colonies[0].ants[g];
						}
					}
					var ctx2 = $("#myLineChart").get(0).getContext("2d");
					var populationChart = new Chart(ctx2).Line(data, options);
					$('#finalTime').html(h1.textContent);		
					$('#efficientAntName').html(efficientAnt.antName);
					$('#efficientDistance').html(efficientValue.toFixed(2));
					$('#maxAnts').html(maxAnts);
			    	$('.gameover').fadeIn();
			    }
			}

			var colony = function() {
				var x = (Math.floor(Math.random() * (CANVAS_WIDTH-30)));
				var y = (Math.floor(Math.random() * (CANVAS_HEIGHT-30)));
				trailData.push([]);
				console.dir(this)
				var homeImg = $('<img class="hill" src="img/hill.png">');
				homeImg.css('left' , x - 14);
				homeImg.css('top', y - 13);
				$("#scrollContainer").append(homeImg);
				return {
					food : ants.INITIAL_COLONY_FOOD,
					entrances : [{x: x, y:y}],
					homeImg : homeImg,
					population: 0,
					popHistory:[],
					ants:[],
					addEntrance: function(x,y) {
						ph -= ENTRANCE_COST;
						this.entrances.push({x: x, y:y})
						var homeImg = $('<img class="hill" src="img/hill.png">');
						homeImg.css('left' , x - 14);
						homeImg.css('top', y - 13);
						$("#scrollContainer").append(homeImg);
					},
					newAnt: function() {
						this.ants.push(new ant(this,0, Math.floor(mousePos.x), Math.floor(mousePos.y)));
					}
				}
			}

			var ant = function(myHome, team, x, y) {
				var dir = Math.floor((Math.random() * 8) + 1);
				var delay = 0;
				if(!x) delay = Math.floor((Math.random() * 500));
				ants.colonies[team].population++;
				if(team == 0) {
					if(ants.colonies[team].population > maxAnts)
						maxAnts = ants.colonies[team].population;
					$('#ants').html(ants.colonies[team].population);
				}
				var id = nextAntID++;
				var gender = Math.floor(Math.random() * 2);
				var head = Math.floor(Math.random() * 3);
				if(gender == 1)
					head = 1;
				else if(gender == 0 && head == 1)
					head = 0;
				var name = names[gender][Math.floor(Math.random() * names[gender].length)];
				var eating = 0;
				var count = 0;
				/*for(var g = 0; g < ants.length; g++) {
					if(ants[team][g].name.indexOf(name) != -1 )
						count ++;
				}*/
				if(count > 1) {
					name = name + ' ' + count;
				}
				if(team == ants.SELECTED_COLONY) {
					var antTile = $('<div class="antTile" id="ant' + id + '"><div class="energy_container"><div class="energy"></div></div><div class="phero_container"><div class="pheromone"></div></div><div class="avatar head' + head + '"></div><div class="name">' + name + '</div><div class="distance">0</div><div class="delivered">0 delivered</div><div class="kills">0 kills</div></div>')
					$("#tilesDrawer").append(antTile)
					antTile.click(function(evt) {
						$('.antTile').each(function() {
								$(this).removeClass('selected')
							})
						$(evt.target).toggleClass('selected'); 
						
						for(var t = 0; t < ants.colonies[0].ants.length; t++) {
							ants.colonies[0].ants[t].selected = false;
							if(ants.colonies[0].ants[t].id === Number(this.id.substr(3))) {
								ants.colonies[0].ants[t].selected = true;
							} 
						}
					})
				}
				var startEnt = Math.floor(Math.random() * myHome.entrances.length) ;
				return {
					id : id,
					alive : true,
					dir: dir,
					delay: delay,
					color: antCols[team],
					distance: 0,
					delivered: 0,
					home: myHome,
					name: name,
					speed: 1,
					gender: gender,
					hasFood: false,
					x: x ? x : myHome.entrances[startEnt].x,
					y: y ? y : myHome.entrances[startEnt].y,
					width: 3,
					height: 3,
					energy: ants.MAX_ENERGY,
					max_energy: ants.MAX_ENERGY,
					justFoundFood: 0,
					trailStrength: TRAIL_STRENGTH,
					fright: 0,
					kills: 0,
					eating: eating,
					fighting: 0,
					tile: antTile,
					l: {x: 0, y: 0},
					l2: {x: 0, y: 0},
					r2: {x: 0, y: 0},
					c: {x: 0, y: 0},
					cl: {x: 0, y: 0},
					cr: {x: 0, y: 0},
					r: {x: 0, y: 0},
					dizzy: 0,
					selected: false,
					vet : 0,
					leftHome: 10,
					turn: function(dir) {

					},
					addKill: function() {
						this.kills++;
						if(team == ants.SELECTED_COLONY)
							this.tile.children('.kills').html(this.kills + " kills");
					},
					pickupFood: function() {
						this.hasFood = true;
						if(team == ants.SELECTED_COLONY)
							this.tile.addClass('hasFood');
					},
					dropFood: function() {
						this.hasFood = false;
						if(team == ants.SELECTED_COLONY) {
							this.tile.removeClass('hasFood');
							this.tile.children('.delivered').html(this.delivered + " delivered");
						}
						this.delivered ++;
						
					},
					eatCarriedFood: function() {
						this.hasFood = false;
						if(team == ants.SELECTED_COLONY)
							this.tile.removeClass('hasFood');
						this.energy += ants.FOOD_ENERGY;
					},
					die: function(index) {
						if(this.alive)	{				
							var deadSprite = $('<img class="deadhead" src="./img/dead.png">')
							$("#scrollContainer").append(deadSprite)
							deadSprite.css('top', (this.y-4) * ants.MAP_SCALE);
							deadSprite.css('left', (this.x-4) * ants.MAP_SCALE);
							deadSprite.animate({queue: false, top: (this.y - 20) * ants.MAP_SCALE + 'px'}, 1300).fadeOut(800, function() {
								deadSprite.remove();
							});
							ants.colonies[team].population--;
							console.log('ant died on team ' + team + ' population is now ' + ants.colonies[team].population)
							if(team == 0) {
								$('#ants').html(ants.colonies[team].population);
							}
							//console.log(antCount + " ants left!")
							this.alive = false;
							if(this.tile)
								this.tile.find('.energy').css('width', '0%');
							//ants.splice(index, 1);
							$('#ant' + this.id + ' .name').addClass('dead')
							$('#ant' + this.id + ' .avatar').addClass('dead');
						}
					},
					turnLeft: function() {
						this.dir --;
						this.dizzy --;
						if (this.dir < 1)
							this.dir = 8;
					},
					turnRight: function() {
						this.dir ++;
						this.dizzy ++;
						if (this.dir > 8)
							this.dir = 1;
					},
					setSenses: function() {
						switch(this.dir) {
							//n
							case 1:
								this.l2 = {x: this.x - 3, y: this.y - 4};
								this.l = {x: this.x - 1, y: this.y - 3};
								this.cl = {x: this.x, y: this.y - 2};
								this.c = {x: this.x + 1, y: this.y - 2};
								this.cr = {x: this.x + 2, y: this.y - 2};
								this.r = {x: this.x + 3, y: this.y - 3};
								this.r2 = {x: this.x + 5, y: this.y - 4};
								break;
							//ne
							case 2:
								this.l2 = {x: this.x + 1, y: this.y - 5};
								this.l = {x: this.x + 2, y: this.y - 3};
								this.cl = {x: this.x + 2, y: this.y - 2};
								this.c = {x: this.x + 3, y: this.y - 1};
								this.cr = {x: this.x + 4, y: this.y};
								this.r = {x: this.x + 5, y: this.y};
								this.r2 = {x: this.x + 7, y: this.y + 1};
								break;
							//e
							case 3:
								this.l2 = {x: this.x + 6, y: this.y - 3};
								this.l = {x: this.x + 5, y: this.y - 1};
								this.cl = {x: this.x + 4, y: this.y};
								this.c = {x: this.x + 4, y: this.y + 1};
								this.cr = {x: this.x + 4, y: this.y + 2};
								this.r = {x: this.x + 5, y: this.y + 3};
								this.r2 = {x: this.x + 6, y: this.y + 5};
								break;
							//se
							case 4:
								this.l2 = {x: this.x + 7, y: this.y + 1};
								this.l = {x: this.x + 5, y: this.y + 2};
								this.cl = {x: this.x + 5, y: this.y + 3};
								this.c = {x: this.x + 4, y: this.y + 4};
								this.cr = {x: this.x + 3, y: this.y + 5};
								this.r = {x: this.x + 2, y: this.y + 5};
								this.r2 = {x: this.x + 1, y: this.y + 7};
								break;
							//s
							case 5:
								this.l2 = {x: this.x + 5, y: this.y + 6};
								this.l = {x: this.x + 3, y: this.y + 5};
								this.cl = {x: this.x + 2, y: this.y + 4};
								this.c = {x: this.x + 1, y: this.y + 4};
								this.cr = {x: this.x, y: this.y + 4};
								this.r = {x: this.x - 1, y: this.y + 5};
								this.r2 = {x: this.x - 3, y: this.y + 6};
								break;
							//sw
							case 6:
								this.l2 = {x: this.x + 1, y: this.y + 7};
								this.l = {x: this.x, y: this.y + 5};
								this.cl = {x: this.x, y: this.y + 4};
								this.c = {x: this.x - 1, y: this.y + 3};
								this.cr = {x: this.x - 2, y: this.y + 2};
								this.r = {x: this.x - 3, y: this.y + 2};
								this.r2 = {x: this.x - 5, y: this.y + 1};
								break;
							//w
							case 7:
								this.l2 = {x: this.x - 4, y: this.y + 5};
								this.l = {x: this.x - 3, y: this.y + 3};
								this.cl = {x: this.x - 2, y: this.y + 2};
								this.c = {x: this.x - 2, y: this.y + 1};
								this.cr = {x: this.x - 2, y: this.y};
								this.r = {x: this.x - 3, y: this.y - 1};
								this.r2 = {x: this.x - 4, y: this.y - 3};
								break;
							//nw
							case 8:
								this.l2 = {x: this.x - 5, y: this.y + 1};
								this.l = {x: this.x - 3, y: this.y};
								this.cl = {x: this.x - 2, y: this.y};
								this.c = {x: this.x - 1, y: this.y - 1};
								this.cr = {x: this.x, y: this.y - 2};
								this.r = {x: this.x, y: this.y - 3};
								this.r2 = {x: this.x + 1, y: this.y - 5};
						}
					},
					update: function() {
						var units = 'cm';
						var theDist;
						if (this.distance >= 1000) {
							theDist = this.distance/1000;
							units = 'm';
						} else if (this.distance >= 1000000) {
							theDist = this.distance/1000000;
							units = 'km';
						} else {
							theDist = this.distance/10;
						}
						this.tile.children('.distance').html(theDist.toFixed(2) + units);
						this.tile.find('.energy').css('width', this.energy/ants.MAX_ENERGY*100 + '%');
						this.tile.find('.pheromone').css('width', this.trailStrength*5000 + '%');
						if(this.energy < ants.MAX_ENERGY * 0.25)
							this.tile.find('.energy').css('background', 'red')
						else if(this.energy < ants.MAX_ENERGY * .5)
							this.tile.find('.energy').css('background', 'orange')
						else if(this.energy < ants.MAX_ENERGY * .75)
							this.tile.find('.energy').css('background', 'yellow')
						else
							this.tile.find('.energy').css('background', '#00bb00')
					}
				}
			};

			var antCols = ['#000000', '#ff0000'];
			var trailCols = [[73,162,238], [174,53,144]]
			
			for (var n = 0; n < ants.COLONY_COUNT ; n++) {

				var home = new colony();
				ants.colonies.push(home);
				for (var i = 0; i < ants.INITIAL_POPULATION; i++) {
					home.ants.push(new ant(home,n));
				}
			}
			timer();

			$('#ph').html(ph);

			function generateFood() {
				ctxf.fillStyle = "#00bb00";
				for(var i = 0; i < ants.INITIAL_MAP_FOOD; i++) {
					ctxf.beginPath();
					var xPos = Math.floor((Math.random() * CANVAS_WIDTH) + 1);
					var yPos = Math.floor((Math.random() * CANVAS_HEIGHT) + 1);
					ctxf.fillRect(xPos + 2,yPos,5,9);
					drawFood(xPos + 2,yPos,5,9);
					ctxf.fillRect(xPos + 1,yPos + 1,7,7);
					drawFood(xPos + 1,yPos + 1,7,7);
					ctxf.fillRect(xPos,yPos + 2,9,5);
					drawFood(xPos,yPos + 2,9,5);
					for(var t = 0; t < 30; t++) {
						var xShift = Math.floor(Math.random()*12) + 1;
						xShift *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
						var yShift = Math.floor(Math.random()*12) + 1;
						yShift *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
						ctxf.fillRect(xPos + xShift + 2,yPos + yShift,5,9);
						drawFood(xPos + xShift,yPos,5,9);
						ctxf.fillRect(xPos + xShift + 1,yPos + yShift + 1,7,7);
						drawFood(xPos + xShift + 1,yPos + yShift + 1,7,7);
						ctxf.fillRect(xPos + xShift ,yPos + yShift + 2,9,5);
						drawFood(xPos + xShift ,yPos + yShift + 2,9,5);
					}  
				}
			}

			generateFood();

			function drawFood(x, y, w, h) {
				var pixelPos = x + (CANVAS_WIDTH * y);
				for(var height = 0; height < h; height++) {
					for (var width = 0; width < w; width++) {
						ants.foodData[pixelPos] = 1;
						pixelPos += 1;
					}
					pixelPos += CANVAS_WIDTH - w;
				}
			}

			function getMousePos(canvas, evt) {
			  var rect = canvas.getBoundingClientRect();
			  return {
			    x: evt.clientX - rect.left,
			    y: evt.clientY - rect.top
			  };
			}

			var layingTrail = false;
			var drawingBarrier = false;
			var erasing = false;

			var lastTrainX, lastTrailY;
			cf.addEventListener('mousemove', function(evt) {
			mousePos = getMousePos(cf, evt);
			var f = ctxf.getImageData(mousePos.x, mousePos.y, 1, 1).data;
			var n = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
			  $('#foodVal').html(ants.foodData[mousePos.x + (CANVAS_WIDTH * mousePos.y)] ? ants.foodData[mousePos.x + (CANVAS_WIDTH * mousePos.y)] : 0);
			  $('#foodVal2').html(f[0 + 3]);
			  
			  $('#trailValReal').html(trailData[0][mousePos.x + (CANVAS_WIDTH * mousePos.y)] ? trailData[0][mousePos.x + (CANVAS_WIDTH * mousePos.y)] : 0);
			  
			  $('#trailValDisp').html(n[0] + ", " + n[1] + ", " + n[2] + ", " + n[3]);
			  
			  if(layingTrail && ph > 0) { 
			  		ctx.fillStyle = "rgba(" + trailCols[0][0] + ", " + trailCols[0][1] + ", " + trailCols[0][2] + ",0.4)";
					ctx.fillRect(mousePos.x-3,mousePos.y-3,3,3);
					drawSquare(mousePos.x-3, mousePos.y-3, 3, 0.4, 0);
					ph --;
					$('#ph').html(ph);
			  } else if (drawingBarrier) {
					Draw(Math.floor(mousePos.x + 8), Math.floor(mousePos.y + 8), ctxf, true, false, 4);
			  } else if (erasing) {
					Draw(Math.floor(mousePos.x + 8), Math.floor(mousePos.y + 8), ctxf, true, true, 8);
			  } 
			}, false);

			var lastX, lastY;
			function Draw(x, y, context, isDown, erase, size) {
			    if (isDown) {
			        context.beginPath();
			        if(erase) {
			        	context.globalCompositeOperation = "destination-out";
						context.strokeStyle = "rgba(0,0,0,1)";
					  } else {
						context.globalCompositeOperation = "source-over";
			        	context.strokeStyle = "rgba(0,0,0,1)";
			        }
			        context.lineWidth = size;
			        context.lineJoin = "round";
			        context.moveTo(lastX, lastY);
			        context.lineTo(x, y);
			        context.closePath();
			        context.stroke();
			        ants.barrierData = context.getImageData(0, 0, c.width, c.height).data;
			    }
			    lastX = x; lastY = y;
			}
			$('#panButton').click(function(evt) {
				$(cf).removeClass('circle_cursor');
				$(cf).removeClass('hand_cursor');
				$(cf).addClass('move_cursor');
				$('.toolbar button').each(function() {
					$(this).removeClass('active')
				})
				$(evt.target).addClass('active');
				toolMode = 'pan';
				$('#scrollContainer').kinetic('attach', {cursor: 'move'});
			});

			$('#entranceButton').click(function(evt) {
				if(ph > ENTRANCE_COST){
					if(toolMode == 'pan') {
						$('#scrollContainer').kinetic('detach');
					}
					$(cf).removeClass('circle_cursor');
					$(cf).removeClass('hand_cursor');
					$(cf).addClass('move_cursor');
					$('.toolbar button').each(function() {
						$(this).removeClass('active')
					})
					$(evt.target).addClass('active');
					toolMode = 'entrance';
				}
			});

			var antButton = document.getElementById('antButton');
			antButton.addEventListener('click', function(evt) {
				if(toolMode == 'pan') {
					$('#scrollContainer').kinetic('detach');
				}
				$(cf).removeClass('move_cursor');
				$(cf).removeClass('circle_cursor');
				$(cf).removeClass('hand_cursor');
				$('.toolbar button').each(function() {
					$(this).removeClass('active')
				})
				$(evt.target).addClass('active');
				toolMode = 'ant';
				console.log(toolMode)
			})

			var pauseButton = document.getElementById('pauseButton');
			pauseButton.addEventListener('click', function(evt) {
				paused = !paused;
				$(this).toggleClass('pauseIcon');
				$(this).toggleClass('playIcon');
				console.log(paused)
				//drawData();
			})

			/*var playButton = document.getElementById('stepButton');
			playButton.addEventListener('click', function(evt) {
				test(1);
			})*/

			var foodButton = document.getElementById('foodButton');
			foodButton.addEventListener('click', function(evt) {
				$(cf).removeClass('move_cursor');
				$(cf).removeClass('circle_cursor');
				$(cf).removeClass('hand_cursor');
				$('.drawMode button').each(function() {
					$(this).removeClass('active')
				})
				$(evt.target).addClass('active');
				toolMode = 'food';
				console.log(toolMode)
			})

			$('#trailButton').click(function(evt) {
				if(toolMode == 'pan') {
					$('#scrollContainer').kinetic('detach');
				}
				$(cf).removeClass('move_cursor');
				$(cf).removeClass('circle_cursor');
				$(cf).removeClass('hand_cursor');
				$('.drawMode button').each(function() {
					$(this).removeClass('active')
				})
				$(evt.target).addClass('active');
				toolMode = 'trail';
				console.log(toolMode)
			})

			var configButton = document.getElementById('configButton');
			configButton.addEventListener('click', function(evt) {
				$('#config').fadeToggle()
			})

			$('#SquishButton').click(function(evt) {
				if(toolMode == 'pan') {
					$('#scrollContainer').kinetic('detach');
				}
				$(cf).removeClass('move_cursor');
				$(cf).removeClass('circle_cursor');
				$('.drawMode button').each(function() {
					$(this).removeClass('active')
				})
				$(evt.target).addClass('active');
				$(cf).addClass('hand_cursor');
				toolMode = 'squish';
				console.log(toolMode)
			})


			var barrierButton = document.getElementById('barrierButton');
			barrierButton.addEventListener('click', function(evt) {
				if(toolMode == 'pan') {
					$('#scrollContainer').kinetic('detach');
				}
				$(cf).removeClass('move_cursor');
				$(cf).removeClass('hand_cursor');
				$('.drawMode button').each(function() {
					$(this).removeClass('active')
				})
				$(evt.target).addClass('active');
				$(cf).addClass('circle_cursor');
				toolMode = 'barrier';
				console.log(toolMode)
			})

			$('#eraserButton').on('click', function(evt) {
				$(cf).removeClass('move_cursor');
				$(cf).removeClass('hand_cursor');
				$('.drawMode button').each(function() {
					$(this).removeClass('active')
				})
				$(evt.target).addClass('active');
				$(cf).addClass('circle_cursor');
				toolMode = 'erase'
			});

			var showGroundButton = document.getElementById('showGroundButton');
			showGroundButton.addEventListener('click', function(evt) {
				$('#bg').toggleClass('bg');
			})

			$('#showTrailsButton').click(function(evt) {
				$(c).fadeToggle();
				$(evt.target).toggleClass('active');
			})

			cf.addEventListener('mousedown', function(evt){
				Draw(Math.floor(mousePos.x), Math.floor(mousePos.y), ctxf, false);
				if (toolMode == 'trail') 
					layingTrail = true;
				else if (toolMode == 'barrier')
					drawingBarrier = true;
				else if (toolMode == 'erase')
					erasing = true;
			})

			cf.addEventListener('mouseup', function(evt){
				if (toolMode == 'trail') 
					layingTrail = false;
				if (toolMode == 'barrier') 
					drawingBarrier = false;
				if (toolMode == 'erase')
					erasing = false;
			})

			cf.addEventListener('click', function(evt) {
				if( toolMode == 'ant') {
					if(ants.colonies[0].food >= ants.ANT_COST) {
						ants.colonies[0].newAnt();
					}
				}else if (toolMode == 'food'){
					ctxf.fillStyle = "#00bb00";
					ctxf.beginPath();
					console.log(mousePos.x, mousePos.y);
					ctxf.arc(Math.floor(mousePos.x), Math.floor(mousePos.y), 4, 0, 2 * Math.PI, false);
			      ctxf.fill();
				} else if (toolMode === 'squish') {
					for(var col = 0; col < ants.colonies.length ; col ++) {
						var numAnts = ants.colonies[col].ants.length;
						for(var ant = 0; ant < numAnts; ant++) {
							var thisAnt = ants.colonies[col].ants[ant];
							if(mousePos.x > thisAnt.x - 5 && mousePos.x < thisAnt.x + 11 && mousePos.y > thisAnt.y - 5 && mousePos.y < thisAnt.y + 11) {
								thisAnt.die();
							}
						}
					}
				} else if (toolMode === 'entrance' && ph > 1000) {
					ants.colonies[0].addEntrance(Math.floor(mousePos.x), Math.floor(mousePos.y));
				}
			}, false);

			function lineDistance( point1, point2 )
			{
			  var xs = 0;
			  var ys = 0;
			 
			  xs = point2.x - point1.x;
			  xs = xs * xs;
			 
			  ys = point2.y - point1.y;
			  ys = ys * ys;
			 
			  return Math.sqrt( xs + ys );
			}

			
			anim();

			var pData, bData;

			function anim() {
				if(!paused){
					ctxo.clearRect ( 0 , 0 , co.width, co.height );
					
					for(var col = 0; col < ants.colonies.length; col++) {
						var numAnts = ants.colonies[col].ants.length;
						var color = ants.colonies[col].ants[0].color;
						for(var ant = 0; ant < numAnts; ant++) {				
							var thisAnt = ants.colonies[col].ants[ant];
							var vet = 0;
							if(thisAnt && thisAnt.alive && thisAnt.delay == 0 ) {
								if(thisAnt.selected) {
									ctxo.beginPath();
									ctxo.fillStyle = "rgba(2,204,255, 0.2)";
									ctxo.arc(thisAnt.x + 2, thisAnt.y + 2, 10, 0, 2 * Math.PI, false);
									ctxo.fill();
								}
								if(thisAnt.vet)
									vet = 32;
								if(thisAnt.hasFood) {
									antSprite.draw(thisAnt.dir + 7 + (col * 16) + vet, thisAnt.x - 4, thisAnt.y - 4);
								} else {
									antSprite.draw(thisAnt.dir - 1 + (col * 16) + vet, thisAnt.x - 4, thisAnt.y - 4);
								}
							}
						}
					}
				}
				requestAnimationFrame(anim)	

			}
            //draw a square of pheromone into the trail data array
			function drawSquare(x, y, size, strength, colony) {
				var pixelPos = x + (CANVAS_WIDTH * y);
				for(var height = 0; height < size; height++) {
					for (var width = 0; width < size; width++) {
						if(trailData[colony][pixelPos]) {
							trailData[colony][pixelPos] = Number(trailData[colony][pixelPos]) +  Number(strength);
							if(trailData[colony][pixelPos] > 1)
								trailData[colony][pixelPos] = 1;
						} else {
							trailData[colony][pixelPos] = strength;
						}
						pixelPos += 1;
					}
					pixelPos += CANVAS_WIDTH - size;
				}
			}
			
			function drawData() {
				$(c).hide();
				var cViz = document.getElementById("dataViz");
				var ctxViz = c.getContext("2d");
				for(var i = 0; i < NUM_PIXELS; i++) {
					if(trailData[i]) {
						ctxViz.fillStyle = "rgba(255,0,0," + trailData[i] + ")";
						var y = parseInt(i/CANVAS_WIDTH);
						console.log(i, y, i-y*CANVAS_WIDTH)
						var x = i - y * CANVAS_WIDTH
						console.log(i, ' : drawing a pixel at ' + x + ", " +  y + ' with strength ' + trailData[i])
						ctxViz.fillRect(x,y,1,1);
					}
				}
			}
			var decay = DECAY_INTERVAL;
			setInterval(function() {
				if(!paused) {
					//loop through all the colonies
					for(var col = 0; col < ants.colonies.length; col ++) {
						var numAnts = ants.colonies[col].ants.length;
						//loop through this colonies' ants
						for(var ant = 0; ant < numAnts; ant++) {
							var thisAnt = ants.colonies[col].ants[ant];
							if(thisAnt && thisAnt.alive) {
								if(thisAnt.eating > 0) {
									thisAnt.eating --;
									//done eating? then turn around
									if(thisAnt.eating === 0) {
										thisAnt.dir += 4;
										if (thisAnt.dir > 8)
											thisAnt.dir -= 8;
									}
								}
								thisAnt.setSenses();
								//multi colony code for fighting
								if(ants.colonies.length > 1) {
									if(!thisAnt.fighting) {
										for(var col2 = 0; col2 < ants.colonies.length ; col2 ++) {
											if(col != col2) {
												var numAnts2 = ants.colonies[col2].ants.length;
												for(var ant2 = 0; ant2 < numAnts2; ant2++) {	
													var enemyAnt = ants.colonies[col2].ants[ant2];
													if(enemyAnt.alive && !enemyAnt.fighting) {
														if (lineDistance( thisAnt, enemyAnt ) < 6) {
															enemyAnt.fighting = thisAnt.fighting = 50;
															enemyAnt.opp = thisAnt;
															thisAnt.opp = enemyAnt;
															enemyAnt.speed = thisAnt.speed = 0;
														}
													}
												}
											}
										}
									} else if(thisAnt.fighting > 1) {
										thisAnt.fighting --;
									} else if(thisAnt.fighting === 1) {
										if(thisAnt.energy + thisAnt.vet > thisAnt.opp.energy + thisAnt.opp.vet ) {
											thisAnt.vet = 3000;
											thisAnt.addKill();
											thisAnt.energy -=1000;
											thisAnt.opp.die();
										}else if(thisAnt.energy + thisAnt.vet < thisAnt.opp.energy + thisAnt.opp.vet) {
											thisAnt.opp.energy -=1000;
											thisAnt.opp.addKill();
											thisAnt.opp.vet = 3000;
											thisAnt.die();
										}
										thisAnt.fighting --;
										thisAnt.opp.fighting --;
									}
								}
								/*if (thisAnt.fright < 0 && lineDistance( thisAnt, mousePos ) < 15) {
									thisAnt.dir = Math.floor(Math.random() * 8) + 1;
									thisAnt.fright = 10;
								}*/
								if(thisAnt.justFoundFood > 1)
									thisAnt.justFoundFood--;
								//thisAnt.fright--;
								thisAnt.energy--;
								if(thisAnt.energy < 1) {
									if(thisAnt.hasFood) {
										thisAnt.eatCarriedFood();
									} else {
										thisAnt.die(ant);
									}
									continue;
								}
								if(thisAnt.delay > 0)
									thisAnt.delay --;
								else if(thisAnt.delay < 1) {
									var dirChange = 0;
								if(!thisAnt.eating) {
										//do the sensing
										if(thisAnt.l.x < c.width && thisAnt.l.x > 0 && thisAnt.l.y < c.height && thisAnt.l.y > 0) {
											
											var pl = 100 * trailData[col][thisAnt.l.x + (CANVAS_WIDTH * thisAnt.l.y)];
											if(isNaN(pl))
												pl = 0;
											var fl = ants.foodData[thisAnt.l.x + (CANVAS_WIDTH * thisAnt.l.y)];
											if(isNaN(fl))
												fl = 0;
										} else {
											var pl = 0;
											var fl = 0;
										}
										if(thisAnt.r.x > 0 && thisAnt.r.x < CANVAS_WIDTH && thisAnt.r.y < c.height && thisAnt.r.y > 0) {
											var pr = 100 * trailData[col][thisAnt.r.x + (CANVAS_WIDTH * thisAnt.r.y)];
											if(isNaN(pr))
												pr = 0;
											var fr = ants.foodData[thisAnt.r.x + (CANVAS_WIDTH * thisAnt.r.y)];
											if(isNaN(fr))
												fr = 0;
										} else {
											var pr = 0;
											var fr = 0;
										}
										if(thisAnt.l2.x < c.width && thisAnt.l2.x > 0 && thisAnt.l2.y < c.height && thisAnt.l2.y > 0) {
											var pl2 = 100 * trailData[col][thisAnt.l2.x + (CANVAS_WIDTH * thisAnt.l2.y)];
											if(isNaN(pl2))
												pl2 = 0;
											var fl2 = ants.foodData[thisAnt.l2.x + (CANVAS_WIDTH * thisAnt.l2.y)];
											if(isNaN(fl2))
												fl2 = 0;
										} else {
											var pl2 = 0;
											var fl2 = 0;
										}
										if(thisAnt.r2.x > 0 && thisAnt.r2.x < CANVAS_WIDTH && thisAnt.r2.y < c.height && thisAnt.r2.y > 0) {
											var pr2 = 100 * trailData[col][thisAnt.r2.x + (CANVAS_WIDTH * thisAnt.r2.y)];
											if(isNaN(pr2))
												pr2 = 0;
											var fr2 = ants.foodData[thisAnt.r2.x + (CANVAS_WIDTH * thisAnt.r2.y)];
											if(isNaN(fr2))
												fr2 = 0;
										} else {
											var pr2 = 0;
											var fr2 = 0;
										}
										if(thisAnt.c.x > 0 && thisAnt.c.x < CANVAS_WIDTH && thisAnt.c.y < c.height && thisAnt.c.y > 0) {
											var pc = 100 * trailData[col][thisAnt.c.x + (CANVAS_WIDTH * thisAnt.c.y)];
											if(isNaN(pc))
												pc = 0;
											var food = ants.foodData[thisAnt.c.x + (CANVAS_WIDTH * thisAnt.c.y)];
											if(isNaN(food))
												food = 0;
											var barrier = ants.barrierData[((thisAnt.c.y * CANVAS_WIDTHX4) + (thisAnt.c.x * 4)) + 3];
											if(isNaN(barrier))
												barrier = 0;
										} else {
											var pc = 0;
											var food = 0;
											var barrier = 0;
										}
										if(thisAnt.cr.x > 0 && thisAnt.cr.x < CANVAS_WIDTH && thisAnt.cr.y < c.height && thisAnt.cr.y > 0) {
											var foodR = ants.foodData[thisAnt.cr.x + (CANVAS_WIDTH * thisAnt.cr.y)];
											if(isNaN(foodR))
												foodR = 0;
										} else {
											var foodR = 0;
										}
										if(thisAnt.cl.x > 0 && thisAnt.cl.x < CANVAS_WIDTH && thisAnt.cl.y < c.height && thisAnt.cl.y > 0) {
											var foodL = ants.foodData[thisAnt.cl.x + (CANVAS_WIDTH * thisAnt.cl.y)];
											if(isNaN(foodL))
												foodL = 0;
										} else {
											var foodL = 0;
										}
										//console.log(pl2, pl, pc, pr, pr2)
										if((food > 0  || foodR > 0 || foodL > 0) && (!thisAnt.hasFood || thisAnt.energy < ants.HUNGRY)) {
											//console.log('found food');
											thisAnt.energy += ants.FOOD_ENERGY;
											if(thisAnt.energy > ants.MAX_ENERGY)
												thisAnt.energy = ants.MAX_ENERGY;
											thisAnt.speed = 0;
											thisAnt.eating = 50;
											thisAnt.pickupFood();
											thisAnt.trailStrength = TRAIL_STRENGTH;
											if(food > 0) {
												ctxf.clearRect ( thisAnt.c.x , thisAnt.c.y , 1, 1 );
												ants.foodData[thisAnt.c.x + (CANVAS_WIDTH * thisAnt.c.y)] = 0;
											} else if (foodR > 0) { 
												ctxf.clearRect ( thisAnt.cr.x , thisAnt.cr.y , 1, 1 );
												ants.foodData[thisAnt.cr.x + (CANVAS_WIDTH * thisAnt.cr.y)]= 0;
											} else if (foodL > 0) {
												ctxf.clearRect ( thisAnt.cl.x , thisAnt.cl.y , 1, 1 );
												ants.foodData[thisAnt.cl.x + (CANVAS_WIDTH * thisAnt.cl.y)] = 0;
											}
										} else if ((food > 0  || foodR > 0 || foodL > 0) /*&& !thisAnt.justFoundFood*/) {
											//console.log('found food did not eat ')
											//thisAnt.speed = 0;
											//thisAnt.eating = 20;
											//thisAnt.justFoundFood = 100;
											thisAnt.trailStrength += (TRAIL_STRENGTH/10).toFixed(3);
										}
										
										//console.log(pl2, pl,pc,pr,pr2);
										if((fl + fl2 > 0 || pl + pl2 > 0 ) && pl + pl2 > pr + pr2 && pl + pl2 > pc) {
											dirChange = 2;
										}  else if ((fr + fr2 > 0 || pr + pr2 > 0) && pl + pl2 < pr + pr2 && pr + pr2 > pc) {
											dirChange = 3;
										} else if (pc > 6 && thisAnt.hasFood) {
											dirChange = (Math.random() * 100 + 1) < ants.CHANCE_TURN_FOOD ? (Math.floor(Math.random() * 3) + 1) : 1;
										} else if (pl + pl2 > 0 && pr + pr2 > 0 && pl === pr) {
											dirChange = (Math.floor(Math.random() * 3) + 1);
										} else if (pc > 6) {
											dirChange = (Math.random() * 100 + 1) < ants.CHANCE_TURN_ON_TRAIL ? (Math.floor(Math.random() * 3) + 1) : 1;
										} else if (barrier > 0) {
											dirChange = (Math.floor(Math.random() * 2) + 2);
										} else if (food > 0 && thisAnt.hasFood) {
											dirChange = (Math.floor(Math.random() * 2) + 2);
										}else {
											dirChange = (Math.random() * 100 + 1) < ants.CHANCE_TURN ? (Math.floor(Math.random() * 3) + 1) : 0;
										}
										//var dirChange = (Math.floor(Math.random() * 10) + 1) < 2 ? (Math.floor(Math.random() * 3) + 1) : 0;
										//left turn
										if (dirChange == 2 && thisAnt.dizzy > -1 * ants.DIZZINESS) {
											thisAnt.turnLeft();
										}
										//right turn
										if (dirChange == 3 && thisAnt.dizzy < ants.DIZZINESS) {
											thisAnt.turnRight();
										}
										if(thisAnt.eating === 0 && thisAnt.fighting === 0)
											thisAnt.speed = 1;
										
										switch(thisAnt.dir) {
											case 1:
												if( thisAnt.y > thisAnt.speed && barrier === 0) {
													thisAnt.y -= thisAnt.speed;
													thisAnt.distance += 0.1;
												} else {
													thisAnt.dir = (Math.floor(Math.random() * 2)) === 0 ? 8 : 2;
												}
												if(thisAnt.x >= c.width - thisAnt.width - thisAnt.speed) {
													thisAnt.dir = (Math.random() * 100 + 1) < 11 ? 8 : 1;
												} else if (thisAnt.x === 1) {
													thisAnt.dir = (Math.random() * 100 + 1) < 11 ? 2 : 1;
												}
												break;
											case 2:
												if ( thisAnt.x < c.width - thisAnt.width - thisAnt.speed && barrier === 0) {
													thisAnt.x += thisAnt.speed;
													thisAnt.distance += 0.1;
												} else {
													thisAnt.dir = 1;
												}
												if( thisAnt.y > thisAnt.speed  && barrier === 0) {
													thisAnt.y -= thisAnt.speed;
													thisAnt.distance += 0.1;
												} else {
													thisAnt.dir = 3;
												}
												if(thisAnt.x >= c.width - thisAnt.width - thisAnt.speed && thisAnt.y <= thisAnt.speed) {
													thisAnt.dir = 6;
												}
												break;
											case 3:
												if ( thisAnt.x < c.width - thisAnt.width - thisAnt.speed && barrier === 0) {
													thisAnt.x += thisAnt.speed;
													thisAnt.distance += 0.1;
												} else {
													thisAnt.dir = (Math.floor(Math.random() * 2)) === 0 ? 2 : 4;
												}
												if(thisAnt.y >= c.height - thisAnt.height - thisAnt.speed ) {
													thisAnt.dir = (Math.random() * 100 + 1) < 11 ? 2 : 3;
												} else if (thisAnt.y === 1) {
													thisAnt.dir = (Math.random() * 100 + 1) < 11 ? 4 : 3;
												}
												break;
											case 4:
												if ( thisAnt.y < c.height - thisAnt.height - thisAnt.speed && barrier === 0) {
													thisAnt.y += thisAnt.speed;
													thisAnt.distance += 1;
												} else {
													thisAnt.dir = 3;
												}
												if ( thisAnt.x < c.width - thisAnt.width - thisAnt.speed && barrier === 0) {
													thisAnt.x += thisAnt.speed;
													thisAnt.distance += 0.1;
												} else
													thisAnt.dir = 5;
												if(thisAnt.y >= c.height - thisAnt.height - thisAnt.speed && thisAnt.x >= c.width - thisAnt.width - thisAnt.speed)
													thisAnt.dir = 8;
												break;
											case 5:
												if ( thisAnt.y < c.height - 3 - thisAnt.speed && barrier === 0) {
													thisAnt.y += thisAnt.speed;
													thisAnt.distance += 0.1;
												} else {
													thisAnt.dir = (Math.floor(Math.random() * 2)) === 0 ? 4 : 6;
												}
												if(thisAnt.x >= c.width - thisAnt.width - thisAnt.speed) {
													thisAnt.dir = (Math.random() * 100 + 1) < 11 ? 6 : 5;
												} else if (thisAnt.x === 1) {
													thisAnt.dir = (Math.random() * 100 + 1) < 11 ? 4 : 5;
												}
												break;
											case 6:
												if( thisAnt.x > thisAnt.speed && barrier === 0) {
													thisAnt.x -= thisAnt.speed;
													thisAnt.distance += 0.1;
												} else {
													thisAnt.dir = 5;
												}
												if ( thisAnt.y < c.height - 3 - thisAnt.speed && barrier === 0) {
													thisAnt.y += thisAnt.speed;
													thisAnt.distance += 0.1;
												} else {
													thisAnt.dir = 7;
												}
												if(thisAnt.x <= thisAnt.speed && thisAnt.y >= c.height - 3 - thisAnt.speed) {
													thisAnt.dir = 2;
												}
												break;
											case 7:
												//document.getElementById("w").style.background = 'red';
												if( thisAnt.x > thisAnt.speed && barrier === 0) {
													thisAnt.x -= thisAnt.speed;
													thisAnt.distance += 0.1;
												} else {
													thisAnt.dir = (Math.floor(Math.random() * 2)) === 0 ? 6 : 8;
												}
												if(thisAnt.y >= c.height - thisAnt.height - thisAnt.speed) {
													thisAnt.dir = (Math.random() * 100 + 1) < 11 ? 8 : 7;
												} else if (thisAnt.y === 1) {
													thisAnt.dir = (Math.random() * 100 + 1) < 11 ? 6 : 7;
												}
												break;
											case 8:
												//document.getElementById("nw").style.background = 'red';
												if( thisAnt.x > thisAnt.speed && barrier === 0) {
													thisAnt.x -= thisAnt.speed;
													thisAnt.distance += 0.1;
												} else
													thisAnt.dir = 1;
												if( thisAnt.y > thisAnt.speed && barrier === 0) {
													thisAnt.y -= thisAnt.speed;
													thisAnt.distance += 0.1;
												} else {
													thisAnt.dir = 7;
												}
												if(thisAnt.x <= thisAnt.speed && thisAnt.y <= thisAnt.speed) {
													thisAnt.dir = 4;
												}			
										}
										for (var e = 0; e < ants.colonies[col].entrances.length; e++) {
											if(thisAnt.x > ants.colonies[col].entrances[e].x - 5 && thisAnt.x < ants.colonies[col].entrances[e].x + 5 && thisAnt.y > ants.colonies[col].entrances[e].y - 5 && thisAnt.y < ants.colonies[col].entrances[e].y + 5) {
												thisAnt.trailStrength = TRAIL_STRENGTH;
												if(thisAnt.hasFood) {
													//console.log('brought food home');
													ants.colonies[col].food++;
													ph += 10;
													if(ph > 1000)
														$('#entranceButton').removeClass('disabled');
													$('#ph').html(ph);
													thisAnt.dropFood();
												} else if (ants.colonies[col].food > 0 && thisAnt.energy < 5001) {
													//console.log('took some colony food');
													thisAnt.energy += ants.FOOD_ENERGY;
													ants.colonies[col].food --;
												}
												document.getElementById('food').innerHTML = ants.colonies[col].food;
												if(thisAnt.leftHome == 0) {
													thisAnt.leftHome = 10;
													thisAnt.dir += 4;
													if (thisAnt.dir > 8)
														thisAnt.dir -= 8;
												}
											}
										}
										
										
									}
									if(thisAnt.leftHome > 0)
										thisAnt.leftHome--;
									//enemy1.x = enemy1.x - 0.01;
									//draw trail
									ctx.fillStyle = "rgba(" + trailCols[col][0] + ", " + trailCols[col][1] + ", " + trailCols[col][2] + ", " + thisAnt.trailStrength + ")";
									
									drawSquare(thisAnt.x, thisAnt.y, 3, Number(thisAnt.trailStrength).toFixed(3), col)
									
									//console.log(trailData);

									//decay count makes it so the ant's trail strength doesn't drop every frame
									if(decay === 0) {
										thisAnt.trailStrength = (thisAnt.trailStrength - TRAIL_STRENGTH_DECAY).toFixed(3);
										if(thisAnt.trailStrength < MIN_TRAIL_STRENGTH )
											thisAnt.trailStrength = MIN_TRAIL_STRENGTH;
									}

									ctx.fillRect(thisAnt.x,thisAnt.y,3,3);
								}
							}
						}
					}
					decay = decay === 0 ? DECAY_INTERVAL : decay--;
				}	
			}, 25)

			
			

			var img, food;
			var food_grow = 0;
			var labelInterval=10;
			var utilityCount=0;

			worker.addEventListener('message', function(e) {
			  trailData = e.data;
			}, false);

	

			var utilityInterval = setInterval(function() {
				var numAnts = ants.colonies[0].ants.length;
				for(var a = 0; a < numAnts; a++) {
					if(ants.colonies[0].ants[a].alive)
						ants.colonies[0].ants[a].update();
				}
				//new baby ants are born
				for(var t = 0; t < ants.colonies.length; t ++) {
					if(ants.colonies[t].food > 20 && !paused) {
						ants.colonies[t].ants.push(new ant(ants.colonies[t], t));
						ants.colonies[t].food -= ants.ANT_COST;
						var babySprite = $('<img class="babySprite" src="./img/newant.png">')
						$("#scrollContainer").append(babySprite)
						babySprite.css('top', (ants.colonies[t].entrances[0].y * ants.MAP_SCALE));
						babySprite.css('left', (ants.colonies[t].entrances[0].x * ants.MAP_SCALE));
						babySprite.animate({queue: false, top: (ants.colonies[t].entrances[0].y * ants.MAP_SCALE - 15) + 'px'}, 1300).fadeOut(800, function() {
							babySprite.remove();
						});

						var baby = new ant(ants.colonies[0], 0);
						baby.x = Math.floor(mousePos.x);
						baby.y = Math.floor(mousePos.y);
						baby.delay = 0;
						ants.colonies[0].food -= ants.ANT_COST;
						ants.colonies[0].ants.push(baby);
						$('#food').html(ants.colonies[0].food);
					}
				}

				var tileCount = 0;
				if(food_grow == ants.FOOD_GROWTH_RATE && !paused) {

					img = ctx.getImageData(0,0, c.width, c.height);
					var newFood;
					var popData = [];
					if (labelInterval == 10) {
						data.labels.push(document.getElementById('timer').textContent);
						labelInterval=0;
					} else {
						data.labels.push("");
						labelInterval++;
					}
					
					worker.postMessage(trailData);
					for(var t = 0; t < ants.colonies.length; t ++) {
						data.datasets[t].data.push(ants.colonies[t].population)
					}
					var foodlen = ants.foodData.length;
					for(var n = 0; n < foodlen; n++) {
						//fade trails
						if(img.data[n*4 + 3] > 0)
						 	img.data[n*4 + 3] = img.data[n*4 + 3] - 5;
						if(ants.foodData[n] > 0) {
						 	if((Math.random() * 1000 + 1) < 25) {
						    	//console.log('added some food at ' + Math.floor((n) % CANVAS_WIDTH) + ", " + Math.floor(n / CANVAS_WIDTH))
						    	ctxf.globalCompositeOperation = "source-over";
						    	var xDir = Math.random() < 0.5 ? -2 : 2;
						    	var yDir = Math.random() < 0.5 ? -2 : 2;
						    	ctxf.fillRect(Math.floor((n) % CANVAS_WIDTH),Math.floor(n / CANVAS_WIDTH), xDir, yDir);
								drawFood(Math.floor((n) % CANVAS_WIDTH),Math.floor(n / CANVAS_WIDTH), xDir, yDir);
							}
						}
					}

					ctx.clearRect(0, 0, c.width, c.height);
					ctx.putImageData(img, 0, 0);
					food_grow = 0;
					//populationChart.addData(popData, );

				}
				food_grow++;
			}, 1000);
		}
	}

})();

