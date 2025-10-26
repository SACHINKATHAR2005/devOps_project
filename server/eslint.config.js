export default [
    {
        files: ['**/*.js'],
        rules: {
            'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
            semi: ['error', 'always'],
        },
    },
];
