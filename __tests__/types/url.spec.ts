import { expect, it } from 'vitest';
import { url } from '~/lib/models/custom-types/url';


it('Should decode a valid url', () => {
	const result = url.decode('https://www.google.com');
	expect(result).toBeEither('Right')
})

it('Should not decode a url without http protocol', () => {
	const result = url.decode('google.com')
	expect(result).toBeEither('Left')
})

it('Should not decode a non valid url', () => {
	const result = url.decode('google')
	expect(result).toBeEither('Left')
})
