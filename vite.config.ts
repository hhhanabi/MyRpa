import { UserConfigExport, ConfigEnv } from 'vite'
import path from 'path'

import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import { loadEnv } from 'vite'

export default ({ command,mode }: ConfigEnv): UserConfigExport => {
  const env = loadEnv(mode,process.cwd())
  return {
    plugins: [
      vue(),
      viteMockServe({
        localEnabled: command === "serve",
      }),
    ],
    resolve:{
      alias:{
        "@":path.resolve(__dirname,"./src")
      }
    },
    server: {
      proxy: {
        // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  }
}