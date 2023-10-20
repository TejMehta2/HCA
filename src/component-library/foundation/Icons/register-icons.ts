import fs from 'fs'
import path from 'path'

const assetsFolderName = 'assets'
const assetsDirectory = path.join(__dirname, assetsFolderName)

const splitter = /\W/

// Helpers
const toPascalCase = (text: string) =>
  text
    .split(splitter)
    .map((t) => t[0].toUpperCase() + t.slice(1).toLowerCase())
    .join('')

const toVariableName = (svgFileName: string) =>
  `icon${toPascalCase(svgFileName.replace('.svg', ''))}`

// TS string creators
const createImportFromFileName = (fileName: string) =>
  `import ${toVariableName(fileName)} from './${assetsFolderName}/${fileName}'`

const createImportsFromFileNames = (fileNames: string[]) =>
  fileNames.map(createImportFromFileName).join('\n')

const createTypesFromFileName = (fileNames: string[]) =>
  fileNames
    .map((fileName: string) => `'${toVariableName(fileName)}'`)
    .join('\n  | ')

const createMapEntriesFromFileNames = (fileNames: string[]) =>
  fileNames
    .map(
      (fileName: string) =>
        `['${toVariableName(fileName)}', ${toVariableName(fileName)}],`
    )
    .join('\n  ')

const generateFileContent = (err, fileNames: string[]) => {
  const fileContent = `${createImportsFromFileNames(fileNames)}

export type IconName =
  | ${createTypesFromFileName(fileNames)}

const iconMap = new Map<IconName, unknown>([
  ${createMapEntriesFromFileNames(fileNames)}
])

export default iconMap
`
  const destination = path.join(__dirname, 'icon-map.generated.ts')

  fs.writeFileSync(destination, fileContent)
}

fs.readdir(assetsDirectory, generateFileContent)
