import React from 'react';
import { Button } from '../../../../ui/Button/Button';
import type { TimeSegment } from '../../../../types/types';
import * as styles from './Buttons.module.scss';

type TButtonsProps = {
	segments: TimeSegment[];
	activeSegment: number;
	setActiveSegment: (newValue: number) => void;
};

export const Buttons = ({
	segments,
	activeSegment,
	setActiveSegment,
}: TButtonsProps) => {
	return (
		<div className={styles.buttons}>
			<span>
				{activeSegment + 1}/{segments.length}
			</span>
			<div>
				<Button
					className={styles.buttons__button}
					onClick={() => setActiveSegment(activeSegment - 1)}
					disabled={activeSegment === 0}
				/>
				<Button
					className={styles.buttons__button}
					onClick={() => setActiveSegment(activeSegment + 1)}
					disabled={activeSegment === segments.length - 1}
				/>
			</div>
		</div>
	);
};
