module.exports = (api) => {
    const presets = ['@babel/preset-env', '@babel/preset-react'];
    const plugins = [
        '@babel/plugin-proposal-class-properties',
        '@babel/plugin-proposal-object-rest-spread',
    ];

    if (api.env('production')) {
        return {
            presets,
            plugins: [
                ...plugins,
                [
                    'transform-react-remove-prop-types',
                    { ignoreFilenames: ['node_modules'] },
                ],
            ],
        };
    }

    return {
        plugins,
        presets,
    };
};
