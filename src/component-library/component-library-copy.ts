import fs from 'fs';
import path from 'path';

// Copy the production parts of the component library into the target directory
const destinationDirectory = path.join(
  __dirname,
  `../${process.argv[2]}/component-library`
);
fs.mkdirSync(destinationDirectory, { recursive: true });

const performCopy = () => {
  const foldersToCopy = [
    'components',
    'core-components',
    'site-components',
    'foundation',
    'globals',
    'assets',
    'hooks',
    'utilities',
  ];

  try {
    foldersToCopy.forEach((folder) => {
      const sourceDirectory = path.join(__dirname, folder);
      const targetDirectory = path.join(destinationDirectory, folder);
      fs.cpSync(sourceDirectory, targetDirectory, {
        recursive: true,
        filter: (source) => {
          if (
            source.endsWith('.spec.tsx') ||
            source.endsWith('.stories.tsx') ||
            source.endsWith('.mdx') ||
            source.includes('placeholder')
          ) {
            return false;
          }
          return true;
        },
      });
    });
    console.log(`Copied ${__dirname} to ${destinationDirectory}`);
  } catch (err) {
    console.error(err);
  }
};

if (process.argv.includes('--watch')) {
  let isWatching = false;
  fs.watch(__dirname, { recursive: true }, (eventType, fileName) => {
    if (isWatching) return;
    isWatching = true;
    if (eventType === 'change') {
      console.log(`Change detected in ${fileName}`);
      performCopy();
    }
    setTimeout(() => {
      isWatching = false;
    }, 500);
  });
} else {
  performCopy();
}
