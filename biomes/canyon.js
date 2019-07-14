biome_dict["Canyon"] = function (biome)
{
    biome.background_color = new RGBColor(252, 236, 218); // Sky Blue
    biome.height_function = function(x, y, z)
    {
        function canyonize(x, y, height)
        {
            var proto_height = Math.atan(5 * (height + 0.2));
            return proto_height / (Math.PI / 2);
        }
        var f_0 = 1/300, n_octaves = 7;
        var height = getStackedSimplex(x, y, z, f_0, n_octaves);
        return canyonize(x, y, height)
    }

    biome.moisture_function = function(x, y, z)
    {
        var f_0 = 1/10, n_octaves = 1;
        var moisture = getStackedSimplex(x, y, z, f_0, n_octaves);
        return moisture;
    }

    biome.color_function = function(height, moisture, slope)
    {
    	var greyness = slope * 1500;
        var shading = new RGBColor(greyness, greyness, greyness, 0);

        var VEGETATION_COLOR = new RGBColor(71, 84, 33);
        var LIGHT_SOIL_COLOR = new RGBColor(179, 150, 102);
        var ROCK_COLOR       = new RGBColor(142, 110, 84);
        var LIGHT_ROCK_COLOR = new RGBColor(185, 150, 100);
        var DIRT_COLOR       = new RGBColor(132, 100, 74);

        VEGETATION_COLOR = VEGETATION_COLOR.add(shading);
        LIGHT_SOIL_COLOR = LIGHT_SOIL_COLOR.add(shading);
        ROCK_COLOR       = ROCK_COLOR.add(shading);
        LIGHT_ROCK_COLOR = LIGHT_ROCK_COLOR.add(shading);
        DIRT_COLOR       = DIRT_COLOR.add(shading);

        if (height < -0.5) {
            if (moisture > 0.2) return LIGHT_SOIL_COLOR;
            return VEGETATION_COLOR; }
        if ((height + moisture / 20) < 0.4) return ROCK_COLOR;
        if ((height + moisture / 5) < 0.55) return LIGHT_ROCK_COLOR;
        if (moisture > 0.2) return DIRT_COLOR;
        return VEGETATION_COLOR
    }
}
