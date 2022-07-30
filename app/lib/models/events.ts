import * as t from 'io-ts'
import * as tt from 'io-ts-types'
import { Url, url } from './custom-types/url'


export const Organization = t.type({
	id: t.number,
	name: t.string,
	address: t.string,
	vat: t.string,
})

export type Organization = t.TypeOf<typeof Organization>

export const TrackEvent = t.type({
	id: t.number,
	title: t.string,
	description: t.string,
	duration: t.number,
	start: t.string,
	netPrice: t.number,
	quantity: t.number,
	track_id: t.number,
	organization_id: t.number,
	organization: Organization,
	url: tt.fromNullable(url, '' as Url)
})



export type TrackEvent = t.TypeOf<typeof TrackEvent>
