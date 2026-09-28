import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    rolldownOptions: {
      external: [
        'three',
        'three/addons/controls/OrbitControls.js',
        'three/addons/geometries/RoundedBoxGeometry.js',
        'three/addons/libs/lil-gui.module.min.js',
        'three/addons/postprocessing/EffectComposer.js',
        'three/addons/postprocessing/RenderPass.js',
        'three/addons/postprocessing/GTAOPass.js',
        'three/addons/postprocessing/UnrealBloomPass.js',
        'three/addons/postprocessing/OutputPass.js',
        'three/addons/postprocessing/ShaderPass.js'
      ]
    }
  }
})
