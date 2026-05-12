/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      // ============================================
      // CMI COULEURS PERSONNALISÉES
      // ============================================
      colors: {
        cmi: {
          // Purple — couleur principale
          purple: {
            DEFAULT: '#6B21A8',
            light: '#9333EA',
            dark: '#4C1D95',
          },
          // Gold — missions, excellence
          gold: {
            DEFAULT: '#D4A017',
            light: '#F59E0B',
            dark: '#B45309',
          },
          // Blue — confiance, paix
          blue: {
            DEFAULT: '#1E40AF',
            light: '#3B82F6',
            dark: '#1E3A8A',
          },
          // Backgrounds
          bg: {
            light: '#fafaf9',
            dark: '#1A1A2E',
          },
          // Texte
          text: {
            primary: '#edede9',
            secondary: '#6B7280',
            dark: '#1F2937',
          },
        },
      },

      // ============================================
      // CMI FONTS
      // ============================================
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-open-sans)', 'Helvetica', 'sans-serif'],
        chinese: ['var(--font-noto-sans-tc)', 'sans-serif'],
      },

      // ============================================
      // TYPOGRAPHY (garder l'existant)
      // ============================================
      typography: {
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: { fontSize: '2.5rem' },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: { fontSize: '3.5rem' },
              h2: { fontSize: '1.5rem' },
            },
          ],
        },
      },
    },
  },
}

export default config
