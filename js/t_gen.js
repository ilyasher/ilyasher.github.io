function getHeightAmplifier(height, moisture)
{
    return height < 0 ? 0 : 1;
}

function findSlope(biome, x, y, z, height)
{
    epsilon = 1/10000;
    var x_component = 1;
    var y_component = 0;

    var slope = (biome.height(x + epsilon * x_component, y + epsilon * y_component, z) - height) / epsilon;
    return slope;
}

function getStackedSimplex(x, y, z, f_0 = 1/300, n_octaves = 4, a = 2, b = 1/2)
{
	var height = 0;
	for (var i = 0; i < n_octaves; i ++)
	{
		height += Math.pow(b, i) * noise.simplex3(f_0 * x * Math.pow(a, i),
												  f_0 * y * Math.pow(a, i),
												  z);
	}
	var normalizer = (1 - Math.pow(b, n_octaves)) / (1 - b);
	height /= normalizer;
	return height;
}
