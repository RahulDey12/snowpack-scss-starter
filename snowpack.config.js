const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    mount: {
        public: '/',
        src: {
            url: '/src',
            resolve: true,
        },

        // Configurations for @fortawesome/fontawesome-free
        // "node_modules/@fortawesome/fontawesome-free/webfonts": {
        //     url: "/src/webfonts",
        //     static: true,
        //     resolve: false
        // }
    },
    plugins: [
        [
            '@snowpack/plugin-webpack',
            {
                manifest: false,
                htmlMinifierOptions: false,
                outputPattern: {
                    js: 'js/app.js',
                    css: 'css/app.css'
                },
                extendConfig: (config) => {
                    config.module.rules = config.module.rules.filter(a => String(a.test) != String(/\.css$/))

                    config.module.rules = [
                        ...config.module.rules,
                        ...[
                            {
                                test: /\.css$/,
                                use: [
                                    {
                                        loader: MiniCssExtractPlugin.loader,
                                        options: {
                                            publicPath: '../',
                                        }
                                    },
                                    {
                                      loader: require.resolve('css-loader'),
                                    },
                                ],
                            },

                            {
                                test: /\.(jpe?g|png|webp|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                                type: 'asset/resource',
                                generator: {
                                    filename: 'public/[name]-[hash][ext]'
                                }
                            }
                        ]
                    ]

                    config.optimization.runtimeChunk = false;
                    config.optimization.splitChunks = false;

                    return config;
                }
            }
        ],
        [
            "@snowpack/plugin-sass",
            {
                native: true,
                compilerOptions: {
                    quietDeps: true
                }
            },
        ],
        "@snowpack/plugin-postcss",
        "snowpack-plugin-relative-css-urls",
    ],
    packageOptions: {
        /* ... */
    },
    devOptions: {
        /* ... */
    },
    buildOptions: {
        out: "dist",
        clean: true,
        sourcemap: false,
    },
};
