import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import amd from 'rollup-plugin-amd';
//import * as fs from 'fs'
//import lookup from 'module-lookup-amd';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //   amd({
  //     include: './node_modules/azure-devops-extension-sdk/*',
  //     // rewire: function (moduleId, parentPath) { // Optional, Default: false
  //     //   return lookup({
  //     //       partial: moduleId,
  //     //       filename: parentPath,
  //     //       config: 'path-to-requirejs.config' // Or an object
  //     //   });
  //     // }
  //   })
  // ],
  // optimizeDeps :{
  //   //exclude: ['azure-devops-extension-api', 'azure-devops-extension-sdk']
  // },
  build: {
    sourcemap: true
  },
  server: {
    https: true
    // {
    //   key: fs.readFileSync('cert.pem'),
    //   cert: fs.readFileSync('key.pem')
    // }
  }
})
