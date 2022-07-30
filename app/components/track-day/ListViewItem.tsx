import { CalendarIcon, ClockIcon, LocationMarkerIcon, UsersIcon } from '@heroicons/react/outline';
import { addMinutes, formatDuration } from 'date-fns';
import format from 'date-fns/format';
import type { FC, PropsWithChildren } from 'react';
import { useMemo } from 'react';

import type { Track, TrackEvent } from '~/lib/models';


interface IListViewItemProps {
	trackDay: TrackEvent;
	track: Track
}

const ListViewItem: FC<PropsWithChildren<IListViewItemProps>> = ( { trackDay, track } ) => {
	const date = useMemo( () => {
		const date = format( new Date( trackDay.start ), 'EEEE, dd MMM yyyy' );
		const start = format( new Date( trackDay.start ), 'HH:mm' );
		const end = format( addMinutes( new Date( trackDay.start ), trackDay.duration ), 'HH:mm' );
		const duration = formatDuration( {
			hours: trackDay.duration / 60,
		} );

		return {
			asString: date,
			start,
			end,
			duration,
		};
	}, [trackDay.start, trackDay.duration] );

	return (
		<li key={trackDay.id}>
			<a className="hover:bg-gray-50 block" href='#'>
				<div className="sm:px-6 px-4 py-4">
					<div className="flex items-center justify-between">
						<p className="text-sm font-medium text-orange-600 truncate">{trackDay.title}</p>
						<div className="flex flex-shrink-0 ml-2">
							{trackDay.quantity > 0 ? (
								<p className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
									{trackDay.quantity} Available
								</p>
							) : (
								<p className="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">
									Sold Out
								</p>
							)}
						</div>
					</div>
					<p className="mb-1.5 text-sm text-gray-500">{trackDay.description}</p>
					<div className="sm:flex sm:items-end sm:justify-between mt-4">
						<div className="sm:flex">
							<p className="flex items-center text-sm text-gray-500">
								<UsersIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
								{trackDay.organization?.name}
							</p>
							<p className="sm:mt-0 sm:ml-6 flex items-center mt-2 text-sm text-gray-500">
								<LocationMarkerIcon
									className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
								{track?.name}
							</p>
						</div>
						<div className="sm:mt-0 flex items-center gap-4 mt-2 text-sm text-gray-500">
							<div className="flex flex-col gap-2">
								<p className="flex items-center gap-1">
									<CalendarIcon className="flex-shrink-0 w-5 h-5 text-gray-400" aria-hidden="true" />
									<time dateTime={trackDay.start}>{date.asString}</time>
								</p>

								<p className="flex items-center gap-1">
									<ClockIcon className="flex-shrink-0 w-5 h-5 text-gray-400" aria-hidden="true" />
									<time dateTime={trackDay.start}>
										{date.start} - {date.end}
									</time>

									<p>({date.duration})</p>
								</p>
							</div>
						</div>
					</div>
				</div>
			</a>
		</li>
	);
};

ListViewItem.displayName = 'ListViewItem';

export default ListViewItem;
