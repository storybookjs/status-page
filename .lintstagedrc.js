module.exports = {
  '**/*.@(js|jsx|ts|tsx)': (filenames) => {
    const files = filenames.map((file) => file.split(`${process.cwd()}/`)[1]);
    return [
      `next lint --fix --file ${files.join(' --file ')}`,
      `prettier --write ${files.join(' ')}`,
    ];
  },
  '**/*': 'prettier --write --ignore-unknown',
};
