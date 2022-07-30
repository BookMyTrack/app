import type { FC, PropsWithChildren } from 'react';

import type { TrackEvent } from '~/lib/models';

interface ICalendarViewProps {
	events: TrackEvent[];
}

const CalendarView: FC<PropsWithChildren<ICalendarViewProps>> = props => {
	// Do your stuff here,

	return null
};

CalendarView.displayName = 'CalendarView';

export default CalendarView;
