import fs from 'fs'
import path from 'path'
import prompts from 'prompts'

const templatePath = path.join(__dirname, 'templates')

const generateSingleFile = (
  componentPath,
  componentFileName,
  templateFileName
) => {
  // Get file contents
  const templateFileLocation = path.join(templatePath, templateFileName)
  fs.readFile(templateFileLocation, 'utf8', (err, fileContent) => {
    const splitOnce = (stringToSplit, subString) => {
      const [first, ...rest] = stringToSplit.split(subString)
      return [first, rest.length > 0 ? rest.join(subString) : null]
    }
    const [templatePrefix, fileSuffix] = splitOnce(templateFileName, '.')
    const hydratedTemplate = fileContent
      .replaceAll(templatePrefix, componentFileName)
      .replaceAll('TemplateDirectory', componentPath)

    const prefix =
      fileSuffix === 'module.scss' && componentPath === 'foundation' ? '_' : ''
    const destination = path.join(
      componentPath,
      `${componentFileName}/${prefix}${componentFileName}.${fileSuffix}`
    )
    fs.writeFileSync(destination, hydratedTemplate)
  })
}

const generateAllFiles = (componentPath, componentFileName) => {
  // Read files in templates folder
  fs.readdir(templatePath, (err, templateFileNames) => {
    // Make sure our directories exist. Create recursively if not
    const destinationFolder = path.join(componentPath, componentFileName)
    fs.mkdirSync(destinationFolder, { recursive: true })
    // Then we copy templates over
    templateFileNames.forEach((templateFileName) =>
      generateSingleFile(componentPath, componentFileName, templateFileName)
    )
  })
}

// Handle user input
const questions = [
  {
    type: 'text',
    name: 'name',
    message: 'What is the component name?',
  },
  {
    type: 'select',
    name: 'directory',
    message: 'Choose a directory',
    choices: [
      {
        title: 'components',
        description: 'e.g. cards, carousels',
        value: 'components',
      },
      {
        title: 'core-components',
        description: 'e.g. buttons, tabs, tags',
        value: 'core-components',
      },
      {
        title: 'foundation',
        description: 'e.g. fonts, colours, spacings',
        value: 'foundation',
      },
    ],
    initial: 0,
  },
]
;(async () => {
  const response = await prompts(questions)
  const { name, directory } = response
  try {
    generateAllFiles(directory, name)
    console.log(`Successfully scaffolded: "./${directory}/${name}/${name}.tsx"`)
  } catch (err) {
    console.log(`Could not scaffold "${directory}/${name}/"`)
    console.error(err)
  }
})()
