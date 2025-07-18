export interface TimelineEvent {
	id: number;
	title: string;
	description: string;
	date: string;
}

export interface TimeSegment {
	id: number;
	title: string;
	period: number[];
	events: TimelineEvent[];
}
