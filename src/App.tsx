import React from 'react';
import { Timeline } from './components/Timeline/Timeline';
import { timelineData } from './data/data';

export function App() {
	return <Timeline segments={timelineData} />;
}
