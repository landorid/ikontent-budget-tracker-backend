module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'prettier --write',
    'eslint "{src,apps,libs,test}/**/*.ts" --fix',
  ],
  '*.{css,scss,md}': ['prettier --write'],
};
