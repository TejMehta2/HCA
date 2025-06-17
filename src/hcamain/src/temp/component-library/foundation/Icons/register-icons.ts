import fs from 'fs';
import path from 'path';

// Creates types and import map for SVG files
// Allows the props on the Icons component to be typed
// Also replaces hard coded SVG stroke/fill with currentColor

const assetsFolderName = 'assets-src';
const assetsDistFolderName = 'assets-dist';
const assetsDirectory = path.join(__dirname, assetsFolderName);
const splitter = /\W/;
const colorRegex = /"(#[a-zA-Z0-9]{3}|#[a-zA-Z0-9]{6}|black|white)"/gm;

// Helpers
const toPascalCase = (text: string) =>
  text
    .split(splitter)
    .map((t) => t[0].toUpperCase() + t.slice(1).toLowerCase())
    .join('');

const toVariableName = (svgFileName: string) =>
  `icon${toPascalCase(svgFileName.replace('.svg', ''))}`;

// TS string creators
const createImportFromFileName = (fileName: string) =>
  `import ${toVariableName(
    fileName
  )} from './${assetsDistFolderName}/${fileName}'`;

const createImportsFromFileNames = (fileNames: string[]) =>
  fileNames.map(createImportFromFileName).join('\n');

const createTypesFromFileName = (fileNames: string[]) =>
  fileNames
    .map((fileName: string) => `'${toVariableName(fileName)}'`)
    .join('\n  | ');

const createMapEntriesFromFileNames = (fileNames: string[]) =>
  fileNames
    .map(
      (fileName: string) =>
        `['${toVariableName(fileName)}', ${toVariableName(fileName)}],`
    )
    .join('\n  ');

const generateFileContent = (err: unknown, fileNames: string[]) => {
  if (err) {
    console.error(err);
  }
  const fileContent = `${createImportsFromFileNames(fileNames)}

export type IconName =
  | ${createTypesFromFileName(fileNames)}

const iconMap = new Map<IconName, () => JSX.Element>([
  ${createMapEntriesFromFileNames(fileNames)}
])

export default iconMap
`;
  const destination = path.join(__dirname, 'icon-map.generated.ts');

  fs.writeFileSync(destination, fileContent);

  // Replace hard coded SVG stroke/fill with currentColor
  fileNames.forEach((fileName: string) => {
    const templateFileLocation = path.join(assetsDirectory, fileName);
    fs.readFile(templateFileLocation, 'utf8', (err, fileContent) => {
      if (err) {
        console.error(err);
      }
      const hydratedTemplate = fileContent.replaceAll(
        colorRegex,
        '"currentColor"'
      );
      fs.writeFileSync(
        path.join(__dirname, 'assets-dist', fileName),
        hydratedTemplate
      );
    });
  });
};

fs.readdir(assetsDirectory, generateFileContent);
