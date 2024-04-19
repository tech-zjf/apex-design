import { UserConfig, defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import typescript from '@rollup/plugin-typescript';

function resolve(str: string) {
    return path.resolve(__dirname, str);
}
export default defineConfig({
    plugins: [
        react(),
        typescript({
            target: 'es5',
            rootDir: resolve('src/'),
            declaration: true,
            declarationDir: resolve('dist'),
            exclude: resolve('node_modules/**'),
            allowSyntheticDefaultImports: true,
        }),
    ],
    build: {
        // 输出文件
        outDir: 'dist',
        lib: {
            // 组件库源码的入口文件
            entry: resolve('./src/index.tsx'),
            // 组件库名称
            name: 'apex-design',
            // 打包后文件名
            fileName: 'build',
            // 打包格式
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
        },
    },
} as UserConfig);
