import { expect } from 'vitest'
import * as E  from 'fp-ts/Either'


expect.extend({
	toBeEither: (received, expected?: 'Right' | 'Left') => {
		switch (expected) {
			case 'Right':
				return {
					pass: E.isRight(received),
					message: () => `Expected a Right either but got Left`
				}
			case 'Left':
				return {
					pass: E.isLeft(received),
					message: () => `Expected a Left either but got Right`
				}
			default:
				return {
					pass: '_tag' in received && /Left|Right/.test(received._tag),
					message: () => `Expected an either but got ${received}`
				}
		}
	}
})


interface EitherMatchers<R = unknown> {
	toBeEither(tag?: 'Left' | 'Right'): R
}

declare global {
	namespace Vi {
		interface Assertion extends EitherMatchers {}
		interface AsymmetricMatchersContaining extends EitherMatchers {}
	}
}
