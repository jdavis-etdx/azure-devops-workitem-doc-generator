import typescript from '@rollup/plugin-typescript'


export default {
    input: 'src/main.tsx',
    output: {
        dir: 'output',
        format: "umd",
        exports: "named"
    },
    plugins: [typescript()]
}