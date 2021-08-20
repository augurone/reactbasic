module.exports = {
    linters: {
        '*.{js,jsx}': [
            'eslint',
            'npm run test-hook -s',
            'git add',
        ],
        '*.less': [
            'stylelint --syntax less',
            'git add',
        ],
    },
    ignore: [
        'config/**.js',
        '**/dist/*.min.js',
        '**/**/*.spec.js',
        '**/graphs/*.js',
        '**/adi/**/*.js',
    ],
};
