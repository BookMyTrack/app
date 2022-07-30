import type { FC, PropsWithChildren } from 'react';

import type { Track, TrackEvent } from '~/lib/models';

import ListViewItem from './ListViewItem';

interface IListViewProps {
	track: Track
}

const ListView: FC<PropsWithChildren<IListViewProps>> = ({ track }) => (
	<div className="sm:rounded-md overflow-hidden bg-white shadow">
		<ul className="divide-y divide-gray-200">
			{track.events.map(trackEvent => (
				<ListViewItem track={track} key={trackEvent.id} trackDay={trackEvent} />
			))}
		</ul>
	</div>
);

ListView.displayName = 'ListView';

export default ListView;
