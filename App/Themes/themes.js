import { colors } from './Styling'

export const LightThemeCustom = {
	dark: false,
	colors: {
		text: colors.black,
		primary: colors.aquaMain,
		background: colors.offWhite1,
		card: colors.offWhite1,
		border: colors.aquaMain,
		notification: '#0F7A6C',
		danger: colors.dangerLight
	},
	styles: {
		border: colors.black,
		backgroundColor: colors.offWhite1,
		color: colors.black
	}
}

export const DarkThemeCustom = {
	dark: true,
	colors: {
		text: colors.offWhite1,
		primary: colors.aquaMain,
		background: colors.black,
		card: colors.black,
		border: colors.aquaMain,
		notification: '#0F7A6C',
		danger: colors.dangerDark
	},
	styles: {
		border: colors.offWhite1,
		backgroundColor: colors.aquaMain,
		color: colors.offWhite1
	}
}