import { colors, ColorScheme } from '@vechaiui/react'
import * as radix_colors from '@radix-ui/colors'


export const base: ColorScheme = {
	id: 'base',
	type: 'light',
	colors: {
		bg: {
			base: radix_colors.mauve.mauve1,
			fill: colors.gray[900],
		},
		text: {
			foreground: radix_colors.mauve.mauve11,
			muted: radix_colors.mauve.mauve6,
		},
		primary: colors.amber,
		neutral: colors.blueGray,
	}
}
