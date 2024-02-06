module.exports = {
  env: { browser: true, es2021: true },
  extends: [
    'airbnb',
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    requireConfigFile: false,
    babelOptions: {
      babelrc: false,
      configFile: false,
      presets: ['@babel/preset-react'],
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: [
    'react',
    'react-hooks',
    'prettier',
    'jsx-a11y',
    'import',
    'react-refresh',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/state-in-constructor': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/destructuring-assignment': 'off',
    'no-nested-ternary': 'off',
    'react/button-has-type': 'off',
    'no-param-reassign': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'arrow-body-style': 'off',
    'react/forbid-prop-types': 'off',
  },
};
