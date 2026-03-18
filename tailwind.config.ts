
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx,jsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#49b5e7',
					foreground: '#ffffff'
				},
				secondary: {
					DEFAULT: '#F7FAFF',
					foreground: '#141414'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: '#E9E9E9',
					foreground: '#5A5A5A'
				},
				accent: {
					DEFAULT: '#49b5e7',
					foreground: '#ffffff'
				},
				popover: {
					DEFAULT: '#ffffff',
					foreground: '#141414'
				},
				card: {
					DEFAULT: '#ffffff',
					foreground: '#141414'
				},
				/* Capassotech palette */
				capasso: {
					primary:    '#49b5e7',
					'primary-hover': '#3a9fd4',
					dark:       '#141414',
					blackish:   '#222631',
					light:      '#f5f5f5',
					'mid-blue': '#EFF8FD',
					'light-blue': '#F7FAFF',
					'light-grey': '#E9E9E9',
					'dark-grey': '#5A5A5A',
					'medium-grey': '#979797',
					secondary:  '#222222',
					gray:       '#333333',
				}
			},
			fontFamily: {
				sans: ['Plus Jakarta Sans', 'Mulish', 'sans-serif'],
				mono: ['Source Code Pro', 'monospace'],
			},
			fontSize: {
				'display': ['3.875rem', { lineHeight: '1.3', fontWeight: '700' }],
				'h2':      ['3rem',     { lineHeight: '1.3', fontWeight: '700' }],
				'h3':      ['2rem',     { lineHeight: '1.3', fontWeight: '600' }],
				'h4':      ['1.5rem',   { lineHeight: '1.3', fontWeight: '600' }],
				'body-lg': ['1.125rem', { lineHeight: '1.4' }],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				pill: '30px',
			},
			boxShadow: {
				'soft':   '0 0 56px -16px #E4E5E7',
				'card':   '0 8px 32px rgba(0,0,0,0.08)',
				'card-hover': '0 20px 60px rgba(0,0,0,0.12)',
				'blue':   '0 8px 24px rgba(73,181,231,0.35)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%':   { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					'0%':   { opacity: '0', transform: 'translateY(40px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%':      { transform: 'translateY(-10px)' }
				}
			},
			animation: {
				'accordion-down':  'accordion-down 0.2s ease-out',
				'accordion-up':    'accordion-up 0.2s ease-out',
				'fade-in':         'fade-in 0.6s ease-out',
				'slide-up':        'slide-up 0.7s ease-out',
				'float':           'float 4s ease-in-out infinite',
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
