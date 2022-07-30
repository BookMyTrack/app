import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';

import Navbar from '~/components/Navbar';
import TrackCard from '~/components/TrackCard';

import * as track from '../lib/models/track'

export const loader: LoaderFunction = async () => {
  try {
    const response = await track.getAll()

    return json(response)
  } catch (error) {
    console.error(error)
    return json([])
  }
}


export default function Index() {
  const tracks: track.Track[] = useLoaderData()

  return (

      <div className='max-w-8xl justify-items-center grid items-start w-full h-full grid-cols-3 gap-4 p-8 mx-auto'>
        {tracks.map(track => (
          <Link to={`/tracks/${track.id}/events`} key={track.id} className='flex max-w-[300px] items-center justify-center'>
            <TrackCard track={track} />
          </Link>
        ))}
      </div>
  );
}
