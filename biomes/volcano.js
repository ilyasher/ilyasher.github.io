biome_dict["Volcano"] = function (biome)
{
    biome.background_color = new RGBColor(180, 180, 180); // Grey
    biome.height_function = function(x, y, z)
    {
        function volcanoize(x, y, height)
        {
            x /= cWidth; y /= cHeight; height /= 1.5;
            r = Math.pow(Math.pow(x - 0.5, 2)
                       + Math.pow(y - 0.5, 2), 0.5);
            height += 4 / (100  * Math.pow(r, 3.2) + 1)
                    - 1 / (1000 * Math.pow(r, 2.8) + 1);
            return height;
        }
        var f_0 = 1/300, n_octaves = 7;
        var proto_height = getStackedSimplex(x, y, z, f_0, n_octaves);
        return volcanoize(x, y, proto_height)
    }

    biome.moisture_function = function(x, y, z)
    {
        var f_0 = 1/10, n_octaves = 1;
        return getStackedSimplex(x, y, z, f_0, n_octaves);
    }

    biome.color_function = function(height, moisture, slope)
    {
    	var greyness = slope * 2500;
        var COLOR_DARK_GREY    = new RGBColor(50, 50, 50);
        var COLOR_FOREST_GREEN = new RGBColor(71, 84, 33);
        var COLOR_SNOW_WHITE   = new RGBColor(200, 200, 200);

        var shading = new RGBColor(greyness, greyness, greyness, 0);
        COLOR_DARK_GREY    = COLOR_DARK_GREY.add(shading);
        COLOR_FOREST_GREEN = COLOR_FOREST_GREEN.add(shading);
        COLOR_SNOW_WHITE   = COLOR_SNOW_WHITE.add(shading);

        if (height + moisture / 3 < 0.4) {
            if (moisture > -0.3)
                return COLOR_DARK_GREY;
            return COLOR_FOREST_GREEN; }
        if ((height + moisture/5 + Math.abs(slope) * 30) < 3.1)
            return COLOR_DARK_GREY;
        if (moisture > 0.5 && height < 3.2)
            return COLOR_DARK_GREY;
        return COLOR_SNOW_WHITE;
    }
};
