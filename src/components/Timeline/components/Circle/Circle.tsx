import { useEffect, useRef, useState } from 'react';
import { Button } from '@/ui';
import { calculatePosition } from '@/helpers/calculatePosition';
import { TimeSegment } from '@/types/types';
import gsap from 'gsap';
import * as styles from './Circle.module.scss';

type TCircleProps = {
	segments: TimeSegment[];
	activeSegment: number;
	setActiveSegment: (index: number) => void;
};

export const Circle = ({
	segments,
	activeSegment,
	setActiveSegment,
}: TCircleProps) => {
	const circleRef = useRef<HTMLDivElement>(null);
	const segmentRefs = useRef<(HTMLButtonElement | null)[]>([]);
	const [showTitleIndex, setShowTitleIndex] = useState(activeSegment);

	const [displayPeriodStart, setDisplayPeriodStart] = useState(
		segments[activeSegment].period[0]
	);
	const [displayPeriodEnd, setDisplayPeriodEnd] = useState(
		segments[activeSegment].period[1]
	);

	useEffect(() => {
		segments.forEach((_, index) => {
			const el = segmentRefs.current[index];
			const position = calculatePosition(index, segments.length, activeSegment);
			if (el) {
				gsap.to(el, {
					x: position.x,
					y: position.y,
					duration: 0.5,
					ease: 'circ.out',
					onComplete: () => {
						if (index === activeSegment) {
							setShowTitleIndex(index);
						}
					},
				});
				if (index !== activeSegment) {
					setShowTitleIndex(prev => (prev === index ? -1 : prev));
				}
			}
		});
	}, [activeSegment, segments]);

	useEffect(() => {
		const tl = gsap.timeline();

		const currentStart = displayPeriodStart;
		const currentEnd = displayPeriodEnd;

		const nextStart = segments[activeSegment].period[0];
		const nextEnd = segments[activeSegment].period[1];

		tl.to(
			{ value: currentStart },
			{
				value: nextStart,
				duration: 0.5,
				ease: 'power2.out',
				onUpdate: function () {
					setDisplayPeriodStart(Math.round(this.targets()[0].value));
				},
			}
		);

		tl.to(
			{ value: currentEnd },
			{
				value: nextEnd,
				duration: 0.5,
				ease: 'power2.out',
				onUpdate: function () {
					setDisplayPeriodEnd(Math.round(this.targets()[0].value));
				},
			},
			'<'
		);
	}, [activeSegment, displayPeriodEnd, displayPeriodStart, segments]);

	return (
		<div className={styles.wrapper}>
			<span className={styles.wrapper__horizontal}></span>
			<span className={styles.wrapper__vertical}></span>
			<div className={styles.circle} ref={circleRef}>
				<h2 className={styles.circle__period}>
					<span>{displayPeriodStart}</span>
					<span>{displayPeriodEnd}</span>
				</h2>
				{segments.map((segment, index) => {
					const isActive = activeSegment === index;
					const showTitle = showTitleIndex === index;

					return (
						<Button
							key={segment.id}
							ref={(el: HTMLButtonElement | null) => {
								segmentRefs.current[index] = el;
							}}
							className={
								isActive ? styles.circle__segment : styles.circle__segmentActive
							}
							onClick={() => setActiveSegment(index)}
							style={{
								left: `50%`,
								top: `50%`,
							}}
						>
							<span>{segment.id}</span>
							<span
								className={styles.circle__title}
								style={{
									opacity: showTitle ? 1 : 0,
									transition: 'opacity 0.3s',
								}}
							>
								{segment.title}
							</span>
						</Button>
					);
				})}
			</div>
		</div>
	);
};
