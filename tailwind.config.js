/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B1D51",
        orange: "#FF7A00",
        solarsky: "#00A3E0",
        surface: "#F8F9FA",
        solar: {
          gold: "#FFB800",
          amber: "#FF8C00",
          glow: "#FFF3CD",
          deep: "#0A1628",
          teal: "#00C9A7",
        },
      },
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
        outfit: ["Outfit", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
        space: ["Space Grotesk", "sans-serif"],
      },
      backgroundImage: {
        'solar-gradient': 'linear-gradient(135deg, #0B1D51 0%, #1a3a8f 50%, #0B1D51 100%)',
        'sun-burst': 'radial-gradient(circle at center, #FFB800 0%, #FF7A00 40%, transparent 70%)',
        'energy-flow': 'linear-gradient(90deg, #00A3E0, #00C9A7, #FFB800)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'ray': 'ray 3s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,184,0,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255,184,0,0.7)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        ray: {
          '0%, 100%': { opacity: '0.4', transform: 'scaleY(1)' },
          '50%': { opacity: '1', transform: 'scaleY(1.2)' },
        },
      },
    },
  },
  plugins: [],
}
