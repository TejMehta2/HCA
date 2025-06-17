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
    'assets',
    'careers',
    'components',
    'context',
    'consultant-finder',
    'core-components',
    'foundation',
    'globals',
    'hooks',
    'site-components',
    'the-birth-company',
    'types',
    'utilities',
    'utility-functions',
    'yext',
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
performCopy();
