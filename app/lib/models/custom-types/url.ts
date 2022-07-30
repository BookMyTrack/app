import * as t from 'io-ts'

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/


export interface UrlBrand {
	readonly Url: unique symbol
}

export type Url = t.Branded<string, UrlBrand>
export interface UrlC extends t.Type<Url, string, unknown> {}

export const url : UrlC = t.brand(
	t.string,
	(s): s is Url => urlRegex.test(s),
	'Url'
)
