var canvas, ctx, cWidth, cHeight, z;
var biome_dict = {};
var animate = false;

var f = function(message) {if (Math.random() > 0.9999) console.log(str);};

function updateHTML()
{
	var html = "";
	for (var biome_name in biome_dict)
	{
		html += '<option value="' + biome_name + '">' + biome_name + '</option>';
	}
	document.getElementById("biomes").innerHTML = html;
}

function initCanvas()
{
	canvas = document.getElementById("render");
	ctx = canvas.getContext("2d");
	cWidth = cHeight = canvas.width;
}

function generateImageData(data)
{
	var biome = new Biome();

	var biome_name = document.getElementById("biomes").value;
	var biome_function = biome_dict[biome_name];
	biome_function(biome);

	function fillCell(cell, color)
	{
		data[cell] = color.r;
		data[cell + 1] = color.g;
		data[cell + 2] = color.b;
		data[cell + 3] = color.a; // alpha channel (opaqueness)
	}

	var background_color = biome.background_color;
	for (var i = 0; i < canvas.width * canvas.height; i += 1)
	{
		fillCell(i * 4, background_color)
	}

	for (var x = 0; x < cWidth; x ++)
	{
		for (var y = 0; y < cHeight; y ++)
		{
			var height = biome.height(x, y, z);
			var moisture = biome.moisture(x, y, z);
			var slope = findSlope(biome, x, y, z, height);
			var color = biome.color(height, moisture, slope);
			var heightAmplifier = getHeightAmplifier(height, moisture);
			var cx = Math.round((x + y) / 2);
			var cy = Math.round((x - y) / 4
						  	  + canvas.height * 7/12
						      - height * 50 * heightAmplifier);
			for (var i = 0; i < 5; i ++)
			{
				var cell = (cx + cy * canvas.width) * 4;
				cy --;
				fillCell(cell, color);
			}
		}
	}
	return data;
}

function drawRender()
{
	var image = ctx.createImageData(canvas.width, canvas.height);
	var data = image.data;
	image.data = generateImageData(data);

	ctx.putImageData(image, 0, 0);

	if (animate)
	{
		z += 0.03;
		requestAnimationFrame(drawRender);
	}
}

function loadSeed()
{
	var input_seed = document.getElementById("seed").value;
	if (input_seed == "") {
		z = Math.random() * 100000
		return;
	}
	z = parseFloat(input_seed);
}

function toggleAnimate()
{
	animate = !animate;
	drawRender();
}

function updateSequence()
{
	loadSeed();
	initCanvas();
	requestAnimationFrame(drawRender);
}

function initSequence()
{
	updateHTML();
	updateSequence();
}

window.onload = initSequence;
