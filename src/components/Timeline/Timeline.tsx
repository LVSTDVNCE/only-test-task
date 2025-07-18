import { useState } from 'react';
import { Circle } from './components/Circle/Circle';
import { Buttons } from './components/Buttons/Buttons';
import { Divider, MySwiper } from '@/ui';
import { TimeSegment } from '@/types/types';
import * as styles from './Timeline.module.scss';

type TimelineProps = {
	segments: TimeSegment[];
};

export const Timeline = ({ segments }: TimelineProps) => {
	const [activeSegment, setActiveSegment] = useState<number>(0);

	return (
		<section className={styles.timeline}>
			<h1 className={styles.timeline__heading}>
				<span className={styles.timeline__linearGradient}></span>
				Исторические даты
			</h1>
			<Circle
				segments={segments}
				activeSegment={activeSegment}
				setActiveSegment={setActiveSegment}
			/>
			<Divider />
			<Buttons
				segments={segments}
				activeSegment={activeSegment}
				setActiveSegment={setActiveSegment}
			/>
			<MySwiper segments={segments} activeSegment={activeSegment} />
		</section>
	);
};
