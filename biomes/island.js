biome_dict["Island"] = function (biome)
{
    biome.background_color = new RGBColor(153, 224, 255); // Sky Blue
    biome.height_function = function(x, y, z)
    {
        function islandize(x, y, height)
        {
            x /= cWidth; y /= cHeight;
            var r = Math.pow(Math.pow(x - 0.5, 2)
                           + Math.pow(y - 0.5, 2), 0.5)
            height += 1/4 * 1/(r - 0.8) + 0.6;
            height = height > 0
                   ?  2.2 * Math.pow( height, 1.6)
                   : -2.2 * Math.pow(-height, 1.6);
            return height;
        }
        var f_0 = 1/300, n_octaves = 7;
        var height = 0.5 * getStackedSimplex(x, y, z, f_0, n_octaves);
        return islandize(x, y, height)
    }

    biome.color_function = function(height, moisture, slope)
    {
    	var greyness = slope * 8000;
        var shading  = new RGBColor(greyness, greyness, greyness, 0);

        var COLOR_OCEAN     = new RGBColor(0, 68, 142);
        var COLOR_REEF      = new RGBColor(0, 149, 198);
        var COLOR_WAVES     = new RGBColor(140, 209, 248);
        var COLOR_BEACH     = new RGBColor(229, 212, 184);
        var COLOR_PLAINS    = new RGBColor(136, 182, 101);
        var COLOR_MOUNTIANS = new RGBColor(67, 116, 52);

        COLOR_OCEAN     = COLOR_OCEAN.add(shading.scale(1/8));
        COLOR_REEF      = COLOR_REEF.add(shading);
        COLOR_WAVES     = COLOR_WAVES.add(shading.scale(3));
        COLOR_BEACH     = COLOR_BEACH.add(shading.scale(5));
        COLOR_PLAINS    = COLOR_PLAINS.add(shading);
        COLOR_MOUNTIANS = COLOR_MOUNTIANS.add(shading);

        COLOR_PLAINS = COLOR_PLAINS.scale((0.2 - height) / 0.2).add(
                       COLOR_MOUNTIANS.scale(height / 0.2))

    	if (height < -0.1) return COLOR_OCEAN;
    	if (height < -0.005) return COLOR_REEF;
    	if (height < 0) return COLOR_WAVES;
    	if (height < 0.003) return COLOR_BEACH;
    	if (height < 0.2) return COLOR_PLAINS;
        return COLOR_MOUNTIANS;
    }
}
