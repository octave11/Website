 // Recreating "Pyramidal landscape" by Ali Al Saqban (@WakeMeAtThree on Twitter)
// https://twitter.com/WakeMeAtThree/status/1001443202891730945

var upLeft = { r: 123, g: 22, b: 46 };
var upRight = { r: 214, g: 23, b: 68 };
var midLeft = { r: 6, g: 168, b: 143 };
var midRight = { r: 9, g: 225, b: 184 };
var bottom = { r: 0, g: 226, b: 209 };

function draw(e) {
	var time = -e * 0.002;

	var size = 24;
	var squash = sin(time * 0.4) * 0.8 + 1;
	var squashedSize = size * squash;

	var sideCount = 24;
	var sideCount_half = sideCount * 0.5;
	var iSideCount = 1 / sideCount;
	var count = sideCount * sideCount;
	var iCount = 1 / count;
	var maxHeight = 3;

	translate(
	-size * (sideCount - 0.5),
	-squashedSize * 0.5 / (maxHeight * 0.5) * (sideCount - 0.5));


	for (var i = 0; i < count; i++) {
		var v = iToXY(i, sideCount);var
		x = v.x,y = v.y;
		var time_ = map(sin(time + v.add(0.5, 0.5).dist(sideCount_half, sideCount_half) * 0.3), -1, 1, 0, 1);
		var midPoint = 0.5;
		var t = map(time_, 0, midPoint, 0, 1);

		var h = lerp(-squashedSize, -size * maxHeight, t);

		var leftColors = [bottom, midLeft];
		var rightColors = [bottom, midRight];

		if (time_ >= midPoint) {
			leftColors = [midLeft, upLeft];
			rightColors = [midRight, upRight];
			t = map(time_, midPoint, 1, 0, 1);
		}

		push();

		translate((x + y % 2 * 0.5) * size * 2, y * squashedSize);

		beginPath();
		moveTo(-size, 0);
		lineTo(0, squashedSize);
		lineTo(0, h);
		fill(rgb(lerpRGB(leftColors[0], leftColors[1], t)));

		beginPath();
		moveTo(size, 0);
		lineTo(0, squashedSize);
		lineTo(0, h);
		fill(rgb(lerpRGB(rightColors[0], rightColors[1], t)));

		pop();
	}
}