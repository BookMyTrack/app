import type { LoaderFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { addMinutes, format, formatDuration } from 'date-fns';
import { useEffect, useMemo } from 'react';
import { Button } from 'ariakit/button';


import { TrackEvent } from '~/lib/models';
import type { Track } from '~/lib/models/track';
import { getById } from '~/lib/models/track';
import { useAppState } from '~/lib/state/app-state';
import clsx from 'clsx';

export const loader: LoaderFunction = async ( { params } ) => {
	const id = parseInt( params.trackId! )

	if ( isNaN( id ) || !params.trackId ) {
		return redirect( '/' )
	}

	try {
		const track = await getById( id )

		return json( track )
	} catch ( error ) {
		console.error( error )

		return redirect( '/' )
	}
}

export default function TrackById() {
	const track: Track = useLoaderData()
	const setTrack = useAppState( s => s.setTrack )

	useEffect( () => {
		setTrack( track )
	}, [track] )

	return (
		<>
			{track?.events?.length === 0 && (
				<div className="relative flex items-center justify-center w-full h-48 p-12 text-center border-2 border-gray-300 border-dashed rounded-lg">
					<span className="text-sm font-medium text-gray-900">
						No track-days available for <b>{track.name}</b>
					</span>
				</div>
			)}

			<ul className='lg:grid lg:grid-cols-2 flex flex-col gap-4'>
				{track?.events.map( trackDay => (
					<TrackDayItem trackDay={trackDay} key={trackDay.id} />
				) )}
			</ul>
		</>
	)
}

const TrackDayItem = ( { trackDay }: { trackDay: TrackEvent } ) => {
	const navigate = useNavigate()

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
		<li className='rx-bg-neutral-3 rx-border-neutral-6 flex items-center justify-start p-4 border rounded-lg shadow'>
			<div>
				<h3 className='text-lg font-bold'>{trackDay.title}</h3>
				<time dateTime={date.start}>{date.asString}</time>
				<p>{date.start} / {date.end} {date.duration !== '' ? `(${date.duration})` : ''}</p>
			</div>
			<Button
				onClick={() => navigate( trackDay.url )}
				disabled={!trackDay.url || trackDay.quantity === 0}
				className={clsx(
					'rx-bg-orange-10 ml-auto border text-white rx-border-orange-6',
					'text-md font-semibold',
					'flex items-center justify-center gap-4',
					'py-2 px-4 rounded-lg',
					'hover:opacity-75 duration-150 transition-all',
					'disabled:bg-[transparent] disabled:border-[transparent] disabled:rx-text-neutral-11'
				)}
			>
				{trackDay.quantity === 0 ? 'Sold Out' : (
					trackDay.netPrice === 0 ? 'Free' : `$${trackDay.netPrice}`
				)}
			</Button>
		</li>
	)
}
