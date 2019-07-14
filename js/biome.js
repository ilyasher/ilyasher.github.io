class Biome
{
	constructor()
	{
		var COLOR_LIGHT_GREY = new RGBColor(170, 170, 170);
		var COLOR_GREY = new RGBColor(100, 100, 100);

		this._background_color = COLOR_LIGHT_GREY;
		this._name = "Default";
		this._height_function = function(x, y, z)
		{
		    var f_0 = 1/300, n_octaves = 7;
		    return getStackedSimplex(x, y, z, f_0, n_octaves);
		}
		this._moisture_function = function(x, y, z)
		{
		    var f_0 = 1/500, n_octaves = 7;
		    return getStackedSimplex(x, y, z, f_0, n_octaves);
		}
		this._color_function = function(height, moisture, slope)
		{
			var greyness = slope * 8000;
			var shading = new RGBColor(greyness, greyness, greyness);
			return COLOR_GREY.add(shading);
		}
	}
	height(x, y, z)   { return this._height_function(x, y, z); }
	moisture(x, y, z) { return this._moisture_function(x, y, z); }
	color(h, m, s)    { return this._color_function(h, m, s); }

	get background_color() {return this._background_color;}
	get name() 	   		   {return this._biome_name;}

	set height_function(x)   {this._height_function = x;}
	set moisture_function(x) {this._moisture_function = x;}
	set color_function(x)    {this._color_function = x;}
	set background_color(x)  {this._background_color = x;}
	set name(x) 		 	 {this._name = x;}
}
class RGBColor
{
	constructor(r, g, b, a=255)
	{
		this._r = r;
		this._g = g;
		this._b = b;
		this._a = a;
	}
	get r() {return this._r;}
	get g() {return this._g;}
	get b() {return this._b;}
	get a() {return this._a;}

	set r(x) {this._r = x;}
	set g(x) {this._g = x;}
	set b(x) {this._b = x;}
	set a(x) {this._a = x;}

	add(color)
	{
		var return_color = new RGBColor(this._r, this._g, this._b, this._a)
		return_color.r += color.r;
		return_color.g += color.g;
		return_color.b += color.b;
		return_color.a += color.a;
		return return_color;
	}

	scale(factor)
	{
		var return_color = new RGBColor(this._r, this._g, this._b, this._a)
		return_color.r *= factor;
		return_color.g *= factor;
		return_color.b *= factor;
		return_color.a *= factor;
		return return_color;
	}
}
