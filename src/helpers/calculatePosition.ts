export const calculatePosition = (
	index: number,
	total: number,
	currentSegment: number
) => {
	const offsetAngle = (360 / total) * currentSegment + 60;
	const angle = (index / total) * 360 - offsetAngle;
	const radius = 268;
	return {
		x: radius * Math.cos((angle * Math.PI) / 180),
		y: radius * Math.sin((angle * Math.PI) / 180),
		angle: angle,
	};
};
