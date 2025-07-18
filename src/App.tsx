import { Timeline } from '@/components';
import { timelineData } from './data/data';

export function App() {
	return <Timeline segments={timelineData} />;
}
