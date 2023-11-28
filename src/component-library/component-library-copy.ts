import fs from 'fs';
import path from 'path';

// Copy the production parts of the component library into the target directory
const destinationDirectory = path.join(
  __dirname,
  `../${process.argv[2]}/component-library`
);
fs.mkdirSync(destinationDirectory, { recursive: true });

const foldersToCopy = [
  'components',
  'core-components',
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
  console.log('success!');
} catch (err) {
  console.error(err);
}
