//Title screen events

$('#survivalmode').one('click', function() {
	$('#titleScreen').fadeOut(init());
	$('.toolbar').removeClass('hideleft')
	$('#tilesDrawer').removeClass('hideright')
});

$('#sandboxmode').one('click', function() {
	$('#config').show();
	$('#titleScreen').fadeOut();

});

//Sandbox Events

$('#sandbox_start').one('click', function(e) {
	$('#config').fadeOut(init());
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
	antFarm.INITIAL_POPULATION = $(e.currentTarget).val();
});

$('#initial_map_food').on('change', function(e) {
	antFarm.INITIAL_MAP_FOOD = $(e.currentTarget).val();
});

$('#initial_colony_food').on('change', function(e) {
	antFarm.INITIAL_COLONY_FOOD = $(e.currentTarget).val();
})

$('#max_energy').on('change', function(e) {
	antFarm.MAX_ENERGY = $(e.currentTarget).val();
})

$('#food_growth_rate').on('change', function(e) {
	antFarm.FOOD_GROWTH_RATE = $(e.currentTarget).val();
})

$('#dizziness').on('change', function(e) {
	antFarm.DIZZINESS = $(e.currentTarget).val();
})

$('#chance_turn').on('change', function(e) {
	antFarm.CHANCE_TURN = $(e.currentTarget).val();
})

$('#chance_turn_on_trail').on('change', function(e) {
	antFarm.CHANCE_TURN_ON_TRAIL = $(e.currentTarget).val();
})

$('#chance_turn_food').on('change', function(e) {
	antFarm.CHANCE_TURN_FOOD = $(e.currentTarget).val();
})

var antFarm = (function() {
	return {
		INITIAL_POPULATION : 15,
		INITIAL_COLONY_FOOD : 20,
		INITIAL_MAP_FOOD : 40,
		MAX_ENERGY : 10000,
		DIZZINESS : 4,
		CHANCE_TURN : 14,
		CHANCE_TURN_ON_TRAIL : 7,
		CHANCE_TURN_FOOD : 3,
		FOOD_GROWTH_RATE : 20
	}
})();


function init() {
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	var co = document.getElementById("overlaycanvas");
	var ctxo = co.getContext("2d");
	var cf = document.getElementById("foodcanvas");
	var ctxf = cf.getContext("2d");
	//var cb = document.getElementById("barriercanvas");
	//var ctxDraw(Math.floor(mousePos.x), Math.floor(mousePos.y), ctxb, true, false)b = cb.getContext("2d");
	ctx.fillStyle = "#FF0000";

	var names = [['Bob', 'Tim', 'Jonny', 'Anthony', 'Red', 'Zapp','Roman' , 'Fry', 'Joel', 'Biff', 'Arnold', 'Marty', 'Luke', 'Han', 'Drew', 'Kenny',
						'Fred', 'Sean', 'Jesse', 'Daniel', 'Blain', 'Speedy', 'Marcus', 'Sven', 'Kristoff', 'William', 'Bennet', 'Josh', 'Tucker', 'Nolan', 'Caleb', 'Kevin', 'Tony', 'Chuck', 'Frank', 'Andrew', 'Darnell', 'Zane', 'Hans'],
					['Leela', 'Anna', 'Elsa', 'Andrea', 'Laurel', 'Alice', 'Jenny', 'Susan', 'Antonia', 'Leia', 'Ashlee', 'Cindy', 'Annie', 'Lucy', 'Adelia', 'Kirby', 'Aurora', 'Jasmine', 'Maya', 'Lexie','Laura', 'Julie', 'Arlene', 'Marlane', 'Gail', 'Katniss', 'Aunty', 'Roo', ]]

	var colonyFood = antFarm.INITIAL_COLONY_FOOD;
	var ph = 100;
	var antCount = 0;
	var maxAnts = 0;
	var toolMode = 'ant';
	var paused = false;
	var TRAIL_STRENGTH = 0.03;
	var TRAIL_STRENGTH_DECAY = 0.00008;
	var CANVAS_WIDTH = c.width;
	var CANVAS_HEIGHT = c.height;
	var CANVAS_WIDTHX4 = CANVAS_WIDTH * 4;
	var NUM_PIXELS = CANVAS_WIDTH * CANVAS_HEIGHT;
	var drawHealth = false;
	var nextAntID = 1;
	var mousePos = { x: 400, y: 400};
	var trailData = [];

	var h1 = document.getElementById('timer'),
	    seconds = 0, minutes = 0, hours = 0,
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
	    
	    if(antCount > 0)
	    	t = setTimeout(add, 1000);
	    else {
	    	var efficientAnt = {name: 'nobody'};
	    	var efficientValue = 0;
	    	for(var g = 0; g < ants.length; g++) {
				if(ants[g].delivered > 0 && ants[g].distance/ants[g].delivered > efficientValue) {
					efficientValue = ants[g].distance/ants[g].delivered;
					efficientAnt = ants[g];
				}
			}
			$('#finalTime').html(h1.textContent);		
			$('#efficientAntName').html(efficientAnt.name);
			$('#efficientDistance').html(efficientValue.toFixed(2));
			$('#maxAnts').html(maxAnts);
	    	$('.gameover').fadeIn();
	    }
	}


	var ant = function() {
		var dir = Math.floor((Math.random() * 8) + 1);
		var delay = Math.floor((Math.random() * 500));
		antCount++;
		if(antCount > maxAnts)
			maxAnts = antCount;
		$('#ants').html(antCount);
		var id = nextAntID++;
		var gender = Math.floor(Math.random() * 2);
		var head = Math.floor(Math.random() * 3);
		if(gender == 1)
			head = 1;
		else if(gender == 0 && head == 1)
			head = 0;
		var name = names[gender][Math.floor(Math.random() * names[gender].length)];
		var count = 0;
		for(var g = 0; g < ants.length; g++) {
			if(ants[g].name.indexOf(name) != -1 )
				count ++;
		}
		if(count > 1) {
			name = name + ' ' + count;
		}
		var antTile = $('<div class="antTile" id="ant' + id + '"><div class="energy_container"><div class="energy"></div></div><div class="avatar head' + head + '"></div><div class="name">' + name + '</div><div class="distance">0</div><div class="delivered">0 delivered</div></div>')
		$("#tilesDrawer").append(antTile)
		antTile.click(function(evt) {
			$('.antTile').each(function() {
					$(this).removeClass('selected')
				})
			$(evt.target).toggleClass('selected'); 
			for(var t = 0; t < ants.length; t++) {
				ants[t].selected = false;
				if(ants[t].id === Number(this.id.substr(3))) {
					ants[t].selected = true;
				} 
			}
		})
		
		return {
			id : id,
			alive : true,
			dir: dir,
			delay: delay,
			distance: 0,
			delivered: 0,
			name: name,
			speed: 0,
			gender: gender,
			hasFood: false,
			x: c.width/2,
			y: c.height/2,
			width: 3,
			height: 3,
			energy: antFarm.MAX_ENERGY,
			justFoudFood: 0,
			trailStrength: TRAIL_STRENGTH,
			fright: 0,
			eating: 0,
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
			turn: function(dir) {

			},
			pickupFood: function() {
				this.hasFood = true;
				this.tile.addClass('hasFood');
			},
			dropFood: function() {
				this.hasFood = false;
				this.tile.removeClass('hasFood');
				this.delivered ++;
			},
			die: function(index) {
				if(this.alive)	{
					var deadSprite = $('<img class="deadhead" src="./img/dead.png">')
					$("#game").append(deadSprite)
					deadSprite.css('top', this.y-4 + 30);
					deadSprite.css('left', this.x-4 + 60);
					deadSprite.animate({queue: false, top: this.y - 20 + 'px'}, 1300).fadeOut(800, function() {
						deadSprite.remove();
					});
					antCount--;
					$('#ants').html(antCount);
					//console.log(antCount + " ants left!")
					this.alive = false;
					//ants.splice(index, 1);
					$('#ant' + this.id + ' .name').addClass('dead')
					$('#ant' + this.id + ' .avatar').addClass('dead');
				}
			},
			update: function() {
				var units = 'cm';
				var theDist = this.distance/10;
				if (this.distance >= 1000) {
					theDist = this.distance/1000;
					units = 'm';
				} else if (this.distance >= 1000000) {
					theDist = this.distance/1000000;
					units = 'km';
				}
				this.tile.children('.distance').html(theDist.toFixed(2) + units);
				this.tile.children('.delivered').html(this.delivered + " delivered");
				this.tile.find('.energy').css('width', this.energy/antFarm.MAX_ENERGY*100 + '%')
				if(this.energy < antFarm.MAX_ENERGY * .25)
					this.tile.find('.energy').css('background', 'red')
				else if(this.energy < antFarm.MAX_ENERGY * .5)
					this.tile.find('.energy').css('background', 'orange')
				else if(this.energy < antFarm.MAX_ENERGY * .75)
					this.tile.find('.energy').css('background', 'yellow')
				else
					this.tile.find('.energy').css('background', '#00bb00')
			}
		}
	};

	var ants = [];
	for (var i = 0; i < antFarm.INITIAL_POPULATION; i++) {
		ants.push(new ant());
	}
	timer();

	$('#ph').html(ph);

	function generateFood() {
		ctxf.fillStyle = "#00bb00";
		for(var i = 0; i < antFarm.INITIAL_MAP_FOOD; i++) {
			ctxf.beginPath();
			var xPos = Math.floor((Math.random() * CANVAS_WIDTH) + 1);
			var yPos = Math.floor((Math.random() * CANVAS_HEIGHT) + 1);
			ctxf.arc(xPos, yPos, 4, 0, 2 * Math.PI, false);
			ctxf.fill();    
		}	
	}

	generateFood();

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
	//var deadImageObj = new Image();

	//deadImageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';

	cf.addEventListener('mousemove', function(evt) {
	  mousePos = getMousePos(cf, evt);
	  if(layingTrail && ph > 0) {
	  		ctx.fillStyle = "rgba(255,0,0,0.04)";
			ctx.fillRect(mousePos.x-3,mousePos.y-3,3,3);
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
	        //should be able to draw eraser with this:
	        //http://stackoverflow.com/questions/3328906/erasing-in-html5-canvas
	        	context.globalCompositeOperation = "destination-out";
				context.strokeStyle = "rgba(0,0,0,1)";
				} else {
					context.globalCompositeOperation = "source-over";
	        	context.strokeStyle = "rgba(0,0,0, 1)";
	        }
	        context.lineWidth = size;
	        context.lineJoin = "round";
	        context.moveTo(lastX, lastY);
	        context.lineTo(x, y);
	        context.closePath();
	        context.stroke();
	    }
	    lastX = x; lastY = y;
	}

	var antButton = document.getElementById('antButton');
	antButton.addEventListener('click', function(evt) {
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
		$(cf).removeClass('circle_cursor');
		$(cf).removeClass('hand_cursor');
		$('.drawMode button').each(function() {
			$(this).removeClass('active')
		})
		$(evt.target).addClass('active');
		toolMode = 'food';
		console.log(toolMode)
	})

	var trailButton = document.getElementById('trailButton');
	trailButton.addEventListener('click', function(evt) {
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

	var squishButton = document.getElementById('SquishButton');
	squishButton.addEventListener('click', function(evt) {
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
		$('#game').toggleClass('bg');
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
			if(colonyFood >=3) {
				var baby = new ant();
				baby.x = Math.floor(mousePos.x);
				baby.y = Math.floor(mousePos.y);
				baby.delay = 0;
				colonyFood -= 3;
				ants.push(baby);
				$('#food').html(colonyFood);
			}
		}else if (toolMode == 'food'){
			ctxf.fillStyle = "#00bb00";
			ctxf.beginPath();
			console.log(mousePos.x, mousePos.y);
			ctxf.arc(Math.floor(mousePos.x), Math.floor(mousePos.y), 4, 0, 2 * Math.PI, false);
	      ctxf.fill();
		} else if (toolMode === 'squish') {
			for(var a = 0; a < ants.length; a++) {
				if(mousePos.x > ants[a].x - 3 && mousePos.x < ants[a].x + 8 && mousePos.y > ants[a].y - 3 && mousePos.y < ants[a].y + 8) {
					ants[a].die(a);
				}
			}
		}
	}, false);

	// Example: http://www.lucaongaro.eu/blog/2012/12/02/easy-two-way-data-binding-in-javascript/

	/*function DataBinder( object_id ) {
	  // Use a jQuery object as simple PubSub
	  var pubSub = jQuery({});

	  // We expect a `data` element specifying the binding
	  // in the form: data-bind-<object_id>="<property_name>"
	  var data_attr = "bind-" + object_id,
	      message = object_id + ":change";

	  // Listen to change events on elements with the data-binding attribute and proxy
	  // them to the PubSub, so that the change is "broadcasted" to all connected objects
	  jQuery( document ).on( "change", "[data-" + data_attr + "]", function( evt ) {
	    var $input = jQuery( this );

	    pubSub.trigger( message, [ $input.data( data_attr ), $input.val() ] );
	  });

	  // PubSub propagates changes to all bound elements, setting value of
	  // input tags or HTML content of other tags
	  pubSub.on( message, function( evt, prop_name, new_val ) {
	    jQuery( "[data-" + data_attr + "=" + prop_name + "]" ).each( function() {
	      var $bound = jQuery( this );

	      if ( $bound.is("input, textarea, select") ) {
	        $bound.val( new_val );
	      } else {
	        $bound.html( new_val );
	      }
	    });
	  });

	  return pubSub;
	}
	*/

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

	function setSenses(a) {
		switch(a.dir) {
			//n
			case 1:
				a.l2 = {x: a.x - 2, y: a.y - 4};
				a.l = {x: a.x - 1, y: a.y - 3};
				a.cl = {x: a.x, y: a.y - 2};
				a.c = {x: a.x + 1, y: a.y - 2};
				a.cr = {x: a.x + 2, y: a.y - 2};
				a.r = {x: a.x + 3, y: a.y - 3};
				a.r2 = {x: a.x + 4, y: a.y - 4};
				break;
			//ne
			case 2:
				a.l2 = {x: a.x + 2, y: a.y - 4};
				a.l = {x: a.x + 2, y: a.y - 3};
				a.cl = {x: a.x + 2, y: a.y - 2};
				a.c = {x: a.x + 3, y: a.y - 1};
				a.cr = {x: a.x + 4, y: a.y};
				a.r = {x: a.x + 5, y: a.y};
				a.r2 = {x: a.x + 6, y: a.y};
				break;
			//e
			case 3:
				a.l2 = {x: a.x + 6, y: a.y - 2};
				a.l = {x: a.x + 5, y: a.y - 1};
				a.cl = {x: a.x + 4, y: a.y};
				a.c = {x: a.x + 4, y: a.y + 1};
				a.cr = {x: a.x + 4, y: a.y + 2};
				a.r = {x: a.x + 5, y: a.y + 3};
				a.r2 = {x: a.x + 6, y: a.y + 4};
				break;
			//se
			case 4:
				a.l2 = {x: a.x + 6, y: a.y + 2};
				a.l = {x: a.x + 5, y: a.y + 2};
				a.cl = {x: a.x + 5, y: a.y + 3};
				a.c = {x: a.x + 4, y: a.y + 4};
				a.cr = {x: a.x + 3, y: a.y + 5};
				a.r = {x: a.x + 2, y: a.y + 5};
				a.r2 = {x: a.x + 2, y: a.y + 6};
				break;
			//s
			case 5:
				a.l2 = {x: a.x + 4, y: a.y + 6};
				a.l = {x: a.x + 3, y: a.y + 5};
				a.cl = {x: a.x + 2, y: a.y + 4};
				a.c = {x: a.x + 1, y: a.y + 4};
				a.cr = {x: a.x, y: a.y + 4};
				a.r = {x: a.x - 1, y: a.y + 5};
				a.r2 = {x: a.x - 2, y: a.y + 6};
				break;
			//sw
			case 6:
				a.l2 = {x: a.x, y: a.y + 6};
				a.l = {x: a.x, y: a.y + 5};
				a.cl = {x: a.x, y: a.y + 4};
				a.c = {x: a.x - 1, y: a.y + 3};
				a.cr = {x: a.x - 2, y: a.y + 2};
				a.r = {x: a.x - 3, y: a.y + 2};
				a.r2 = {x: a.x - 4, y: a.y + 2};
				break;
			//w
			case 7:
				a.l2 = {x: a.x - 4, y: a.y + 4};
				a.l = {x: a.x - 3, y: a.y + 3};
				a.cl = {x: a.x - 2, y: a.y + 2};
				a.c = {x: a.x - 2, y: a.y + 1};
				a.cr = {x: a.x - 2, y: a.y};
				a.r = {x: a.x - 3, y: a.y - 1};
				a.r2 = {x: a.x - 4, y: a.y - 2};
				break;
			//nw
			case 8:
				a.l2 = {x: a.x - 4, y: a.y};
				a.l = {x: a.x - 3, y: a.y};
				a.cl = {x: a.x - 2, y: a.y};
				a.c = {x: a.x - 1, y: a.y - 1};
				a.cr = {x: a.x, y: a.y - 2};
				a.r = {x: a.x, y: a.y - 3};
				a.r2 = {x: a.x, y: a.y - 4};
		}
	}

	$('#hill').hide()
	$('#hill').fadeIn('slow', function() {
		anim();
	});

	var foodData, pData, bData;

	function anim() {
	if(!paused){
		ctxo.clearRect ( 0 , 0 , co.width, co.height );
		var numAnts = ants.length;
		for(var ant = 0; ant < numAnts; ant++) {				
			if(ants[ant] && ants[ant].alive && ants[ant].delay == 0 ) {
				if(ants[ant].selected) {
					ctxo.beginPath();
					ctxo.fillStyle = "rgba(2,204,255, 0.2)";
					ctxo.arc(ants[ant].x + 2, ants[ant].y + 2, 10, 0, 2 * Math.PI, false);
					ctxo.fill();
				}
				ctxo.beginPath();
				ctxo.fillStyle = "#000000";
				ctxo.fillRect(ants[ant].x, ants[ant].y,3,3);
				ctxo.fillRect(ants[ant].l.x, ants[ant].l.y,1,1);
				ctxo.fillRect(ants[ant].r.x, ants[ant].r.y,1,1);
				ctxo.fillRect(ants[ant].l2.x, ants[ant].l2.y,1,1);
				ctxo.fillRect(ants[ant].r2.x, ants[ant].r2.y,1,1);
				if(ants[ant].hasFood) {
					ctxo.fillStyle = "#00aa00";
					ctxo.fillRect(ants[ant].x, ants[ant].y,3,3);
				}
			}
		}
	}
		requestAnimationFrame(anim)	

	}

	function drawSquare(x, y, size, strength) {
		var pixelPos = x + (CANVAS_WIDTH * y);
		for(var height = 0; height < size; height++) {
			for (var width = 0; width < size; width++) {
				if(trailData[pixelPos]) {
					trailData[pixelPos] += strength;
					if(trailData[pixelPos] > 1)
						trailData[pixelPos] = 1;
				} else {
					trailData[pixelPos] = strength;
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
	var toggle = 20;
	setInterval(function() {
		if(!paused) {
		var numAnts = ants.length;
		if(toggle === 20) {
			foodData = ctxf.getImageData(0, 0, c.width, c.height).data;
			toggle = 0;
		}
		toggle++;
		for(var ant = 0; ant < numAnts; ant++) {
			if(ants[ant] && ants[ant].alive) {
				if(ants[ant].eating > 0) {
					ants[ant].eating --;
					if(ants[ant].eating === 0) {
						ants[ant].dir += 4;
							if (ants[ant].dir > 8)
								ants[ant].dir -= 8;
					}
				}
				setSenses(ants[ant]);
				if (ants[ant].fright < 0 && lineDistance( ants[ant], mousePos ) < 15) {
					ants[ant].dir = Math.floor(Math.random() * 8) + 1;
					ants[ant].fright = 10;
				}
				if(ants[ant].justFoundFood > 1)
					ants[ant].justFoundFood--;
				ants[ant].fright--;
				ants[ant].energy--;
				if(ants[ant].energy < 1) {
					if(ants[ant].hasFood) {
						ants[ant].energy += 1000;
						ants[ant].dropFood();
					}
					ants[ant].die(ant);
					continue;
				}
				
				if(ants[ant].delay > 0)
					ants[ant].delay --;
				else if(ants[ant].delay < 1) {
					var dirChange = 0;
				if(ants[ant].eating === 0) {
						if(ants[ant].l.x < c.width && ants[ant].l.x > 0 && ants[ant].l.y < c.height && ants[ant].l.y > 0) {
							
							var pl = 100 * trailData[ants[ant].l.x + (CANVAS_WIDTH * ants[ant].l.y)];
							if(isNaN(pl))
								pl = 0;
							var fl = foodData[((ants[ant].l.y * CANVAS_WIDTHX4) + (ants[ant].l.x * 4)) + 3];
						} else {
							var pl = 0;
							var fl = 0;
						}
						if(ants[ant].r.x > 0 && ants[ant].r.x < CANVAS_WIDTH && ants[ant].r.y < c.height && ants[ant].r.y > 0) {
							var pr = 100 * trailData[ants[ant].r.x + (CANVAS_WIDTH * ants[ant].r.y)];
							if(isNaN(pr))
								pr = 0;
							var fr = foodData[((ants[ant].r.y * CANVAS_WIDTHX4) + (ants[ant].r.x * 4)) + 3];
						} else {
							var pr = 0;
							var fr = 0;
						}
						if(ants[ant].l2.x < c.width && ants[ant].l2.x > 0 && ants[ant].l2.y < c.height && ants[ant].l2.y > 0) {
							var pl2 = 100 * trailData[ants[ant].l2.x + (CANVAS_WIDTH * ants[ant].l2.y)];
							if(isNaN(pl2))
								pl2 = 0;
							var fl2 = foodData[((ants[ant].l2.y * CANVAS_WIDTHX4) + (ants[ant].l2.x * 4)) + 3];
						} else {
							var pl2 = 0;
							var fl2 = 0;
						}
						if(ants[ant].r2.x > 0 && ants[ant].r2.x < CANVAS_WIDTH && ants[ant].r2.y < c.height && ants[ant].r2.y > 0) {
							var pr2 = 100 * trailData[ants[ant].r2.x + (CANVAS_WIDTH * ants[ant].r2.y)];
							if(isNaN(pr2))
								pr2 = 0;
							var fr2 = foodData[((ants[ant].r2.y * CANVAS_WIDTHX4) + (ants[ant].r2.x * 4)) + 3];
						} else {
							var pr2 = 0;
							var fr2 = 0;
						}
						if(ants[ant].c.x > 0 && ants[ant].c.x < CANVAS_WIDTH && ants[ant].c.y < c.height && ants[ant].c.y > 0) {
							var pc = 100 * trailData[ants[ant].c.x + (CANVAS_WIDTH * ants[ant].c.y)];
							if(isNaN(pc))
								pc = 0;
							var food = foodData[((ants[ant].c.y * CANVAS_WIDTHX4) + (ants[ant].c.x * 4)) + 1];
							var barrier = foodData[((ants[ant].c.y * CANVAS_WIDTHX4) + (ants[ant].c.x * 4)) + 3];
						} else {
							var pc = 0;
							var food = 0;
							var barrier = 0;
						}
						if(ants[ant].cr.x > 0 && ants[ant].cr.x < CANVAS_WIDTH && ants[ant].cr.y < c.height && ants[ant].cr.y > 0) {
							var foodR = foodData[((ants[ant].cr.y * CANVAS_WIDTHX4) + (ants[ant].cr.x * 4)) + 1];
						} else {
							var foodR = 0;
						}
						if(ants[ant].cl.x > 0 && ants[ant].cl.x < CANVAS_WIDTH && ants[ant].cl.y < c.height && ants[ant].cl.y > 0) {
							var foodL = foodData[((ants[ant].cl.y * CANVAS_WIDTHX4) + (ants[ant].cl.x * 4)) + 1];
						} else {
							var foodL = 0;
						}
						//console.log(pl2, pl, pc, pr, pr2)
						if((food > 0  || foodR > 0 || foodL > 0) && (!ants[ant].hasFood || ants[ant].energy < 8000)) {
							//console.log('found food ' + ants[ant].hasFood);
							ants[ant].energy += 1000;
							if(ants[ant].energy > antFarm.MAX_ENERGY)
								ants[ant].energy = antFarm.MAX_ENERGY;
							ants[ant].speed = 0;
							ants[ant].eating = 50;
							ants[ant].pickupFood();
							ants[ant].trailStrength += TRAIL_STRENGTH;
							if(food > 0) {
								ctxf.clearRect ( ants[ant].c.x , ants[ant].c.y , 1, 1 );
							} else if (foodR > 0) { 
								ctxf.clearRect ( ants[ant].cr.x , ants[ant].cr.y , 1, 1 );
							} else if (foodL > 0) {
								ctxf.clearRect ( ants[ant].cl.x , ants[ant].cl.y , 1, 1 );
							}
						} else if ((food > 0  || foodR > 0 || foodL > 0) && !ants[ant].justFoundFood) {
							//console.log('found food did not eat ' + ants[ant].hasFood)
							ants[ant].speed = 0;
							ants[ant].eating = 20;
							ants[ant].justFoundFood = 100;
							ants[ant].trailStrength += TRAIL_STRENGTH/50;
						}
						
						//console.log(pl2, pl,pc,pr,pr2);
						if((fl + fl2 > 0 || pl + pl2 > 0 ) && pl + pl2 > pr + pr2 && pl + pl2 > pc) {
							dirChange = 2;
						}  else if ((fr + fr2 > 0 || pr + pr2 > 0) && pl + pl2 < pr + pr2 && pr + pr2 > pc) {
							dirChange = 3;
						} else if (pc > 6 && ants[ant].hasFood) {
							dirChange = (Math.random() * 100 + 1) < antFarm.CHANCE_TURN_FOOD ? (Math.floor(Math.random() * 3) + 1) : 1;
						} else if (pl + pl2 > 0 && pr + pr2 > 0 && pl === pr) {
							dirChange = (Math.floor(Math.random() * 3) + 1);
						} else if (pc > 6) {
							dirChange = (Math.random() * 100 + 1) < antFarm.CHANCE_TURN_ON_TRAIL ? (Math.floor(Math.random() * 3) + 1) : 1;
						} else if (barrier > 0) {
							dirChange = (Math.floor(Math.random() * 2) + 2);
						}else {
							dirChange = (Math.random() * 100 + 1) < antFarm.CHANCE_TURN ? (Math.floor(Math.random() * 3) + 1) : 0;
						}
						//var dirChange = (Math.floor(Math.random() * 10) + 1) < 2 ? (Math.floor(Math.random() * 3) + 1) : 0;
						//left turn
						if (dirChange == 2 && ants[ant].dizzy > -1 * antFarm.DIZZINESS) {
							ants[ant].dir --;
							ants[ant].dizzy --;
							if (ants[ant].dir < 1)
								ants[ant].dir = 8;
						}
						//right turn
						if (dirChange == 3 && ants[ant].dizzy < antFarm.DIZZINESS) {
							ants[ant].dir ++;
							ants[ant].dizzy ++;
							if (ants[ant].dir > 8)
								ants[ant].dir = 1;
						}
						if(ants[ant].eating === 0)
							ants[ant].speed = 1;
						
						switch(ants[ant].dir) {
							case 1:
								if( ants[ant].y > ants[ant].speed && barrier === 0) {
									ants[ant].y -= ants[ant].speed;
									ants[ant].distance += 0.1;
								} else {
									ants[ant].dir = (Math.floor(Math.random() * 2)) === 0 ? 8 : 2;
								}
								if(ants[ant].x >= c.width - ants[ant].width - ants[ant].speed) {
									ants[ant].dir = (Math.random() * 100 + 1) < 11 ? 8 : 1;
								} else if (ants[ant].x === 1) {
									ants[ant].dir = (Math.random() * 100 + 1) < 11 ? 2 : 1;
								}
								break;
							case 2:
								if ( ants[ant].x < c.width - ants[ant].width - ants[ant].speed && barrier === 0) {
									ants[ant].x += ants[ant].speed;
									ants[ant].distance += 0.1;
								} else {
									ants[ant].dir = 1;
								}
								if( ants[ant].y > ants[ant].speed  && barrier === 0) {
									ants[ant].y -= ants[ant].speed;
									ants[ant].distance += 0.1;
								} else {
									ants[ant].dir = 3;
								}
								if(ants[ant].x >= c.width - ants[ant].width - ants[ant].speed && ants[ant].y <= ants[ant].speed) {
									ants[ant].dir = 6;
								}
								break;
							case 3:
								if ( ants[ant].x < c.width - ants[ant].width - ants[ant].speed && barrier === 0) {
									ants[ant].x += ants[ant].speed;
									ants[ant].distance += 0.1;
								} else {
									ants[ant].dir = (Math.floor(Math.random() * 2)) === 0 ? 2 : 4;
								}
								if(ants[ant].y >= c.height - ants[ant].height - ants[ant].speed ) {
									ants[ant].dir = (Math.random() * 100 + 1) < 11 ? 2 : 3;
								} else if (ants[ant].y === 1) {
									ants[ant].dir = (Math.random() * 100 + 1) < 11 ? 4 : 3;
								}
								break;
							case 4:
								if ( ants[ant].y < c.height - ants[ant].height - ants[ant].speed && barrier === 0) {
									ants[ant].y += ants[ant].speed;
									ants[ant].distance += 1;
								} else {
									ants[ant].dir = 3;
								}
								if ( ants[ant].x < c.width - ants[ant].width - ants[ant].speed && barrier === 0) {
									ants[ant].x += ants[ant].speed;
									ants[ant].distance += 0.1;
								} else
									ants[ant].dir = 5;
								if(ants[ant].y >= c.height - ants[ant].height - ants[ant].speed && ants[ant].x >= c.width - ants[ant].width - ants[ant].speed)
									ants[ant].dir = 8;
								break;
							case 5:
								if ( ants[ant].y < c.height - 3 - ants[ant].speed && barrier === 0) {
									ants[ant].y += ants[ant].speed;
									ants[ant].distance += 0.1;
								} else {
									ants[ant].dir = (Math.floor(Math.random() * 2)) === 0 ? 4 : 6;
								}
								if(ants[ant].x >= c.width - ants[ant].width - ants[ant].speed) {
									ants[ant].dir = (Math.random() * 100 + 1) < 11 ? 6 : 5;
								} else if (ants[ant].x === 1) {
									ants[ant].dir = (Math.random() * 100 + 1) < 11 ? 4 : 5;
								}
								break;
							case 6:
								if( ants[ant].x > ants[ant].speed && barrier === 0) {
									ants[ant].x -= ants[ant].speed;
									ants[ant].distance += 0.1;
								} else {
									ants[ant].dir = 5;
								}
								if ( ants[ant].y < c.height - 3 - ants[ant].speed && barrier === 0) {
									ants[ant].y += ants[ant].speed;
									ants[ant].distance += 0.1;
								} else {
									ants[ant].dir = 7;
								}
								if(ants[ant].x <= ants[ant].speed && ants[ant].y >= c.height - 3 - ants[ant].speed) {
									ants[ant].dir = 2;
								}
								break;
							case 7:
								//document.getElementById("w").style.background = 'red';
								if( ants[ant].x > ants[ant].speed && barrier === 0) {
									ants[ant].x -= ants[ant].speed;
									ants[ant].distance += 0.1;
								} else {
									ants[ant].dir = (Math.floor(Math.random() * 2)) === 0 ? 6 : 8;
								}
								if(ants[ant].y >= c.height - ants[ant].height - ants[ant].speed) {
									ants[ant].dir = (Math.random() * 100 + 1) < 11 ? 8 : 7;
								} else if (ants[ant].y === 1) {
									ants[ant].dir = (Math.random() * 100 + 1) < 11 ? 6 : 7;
								}
								break;
							case 8:
								//document.getElementById("nw").style.background = 'red';
								if( ants[ant].x > ants[ant].speed && barrier === 0) {
									ants[ant].x -= ants[ant].speed;
									ants[ant].distance += 0.1;
								} else
									ants[ant].dir = 1;
								if( ants[ant].y > ants[ant].speed && barrier === 0) {
									ants[ant].y -= ants[ant].speed;
									ants[ant].distance += 0.1;
								} else {
									ants[ant].dir = 7;
								}
								if(ants[ant].x <= ants[ant].speed && ants[ant].y <= ants[ant].speed) {
									ants[ant].dir = 4;
								}			
						}
						if(ants[ant].x > CANVAS_WIDTH/2 - 5 && ants[ant].x < CANVAS_WIDTH/2 + 5 && ants[ant].y > CANVAS_HEIGHT/2 - 5 && ants[ant].y < CANVAS_HEIGHT/2 + 5) {
							ants[ant].trailStrength = TRAIL_STRENGTH;
							if(ants[ant].hasFood) {
								//console.log('brought food home');
								colonyFood++;
								ph += 10;
								$('#ph').html(ph);
								ants[ant].dropFood();
							} else if (colonyFood > 0 && ants[ant].energy < 5001) {
								//console.log('took some colony food');
								ants[ant].energy += 1000;
								colonyFood --;
							}
							document.getElementById('food').innerHTML = colonyFood;
						}
						if(ants[ant].x === c.width/2 && ants[ant].y === c.height/2) {
							//console.log('at home, turning around');
							ants[ant].dir += 4;
							if (ants[ant].dir > 8)
								ants[ant].dir -= 8;
						}
					}
					//draw trail
					ctx.fillStyle = "rgba(255,0,0," + ants[ant].trailStrength + ")";
					
					drawSquare(ants[ant].x, ants[ant].y, 3, ants[ant].trailStrength)
					
					//console.log(trailData);

					ants[ant].trailStrength -= TRAIL_STRENGTH_DECAY;
					if(ants[ant].trailStrength < .0001 )
						ants[ant].trailStrength = .0001;
					ctx.fillRect(ants[ant].x,ants[ant].y,3,3);
				}
			}
		}
		}
	}, 20)

	var img, food;
	var double = false;
	var food_grow = 0;
	setInterval(function() {
		var numAnts = ants.length;
		for(var a = 0; a < numAnts; a++) {
			if(ants[a].alive)
				ants[a].update();
		}
		if(double && colonyFood > 20 && !paused) {
			ants.push(new ant());
			colonyFood -= 3;
			var babySprite = $('<img class="babySprite" src="./img/newant.png">')
			$("#game").append(babySprite)
			babySprite.css('top', CANVAS_HEIGHT/2 + 23);
			babySprite.css('left', CANVAS_WIDTH/2 + 53);
			babySprite.animate({queue: false, top: CANVAS_HEIGHT/2 - 15 + 'px'}, 1300).fadeOut(800, function() {
				babySprite.remove();
			});
		}
		if(food_grow == antFarm.FOOD_GROWTH_RATE && !paused) {
			console.log("grow food")
			img = ctx.getImageData(0,0, c.width, c.height);
			food = ctxf.getImageData(0,0, c.width, c.height);
			//var pixels=img.data;
			var foodpixels = food.data;
			var newFood;
			for (var i = 0; i < NUM_PIXELS; i++) {
			    if(trailData[i]) {
			    	trailData[i] = trailData[i] - .0001;
			    }
			    if(img.data[i*4 + 3] > 0)
			    	img.data[i*4 + 3] = img.data[i*4 + 3] - 2;
			    if(food.data[i*4 + 1] > 0)
			    	if((Math.random() * 1000 + 1) < 2) {
				    	ctxf.fillStyle = "#00bb00";
						ctxf.beginPath();
						ctxf.arc(Math.floor((i) % CANVAS_WIDTH), Math.floor(i / CANVAS_WIDTH), 2, 0, 2 * Math.PI, false);
			      	ctxf.fill();
		      	}
			}

			ctx.clearRect(0, 0, c.width, c.height);
			ctx.putImageData(img, 0, 0);
			food_grow = 0;
		}
		food_grow++;
		double = !double;
	}, 1000);
}


