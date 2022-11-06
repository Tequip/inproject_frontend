export enum ESizes {
	"2xl" = 62,
	xl = 48,
	lg = 32,
	md = 24,
	default = 24,
	sm = 16
}

export type sizeType = keyof typeof ESizes;
