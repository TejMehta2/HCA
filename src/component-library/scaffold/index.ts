import fs from 'fs';
import path from 'path';
import prompts, { PromptObject } from 'prompts';

const templatePath = path.join(__dirname, 'templates');

const generateSingleFile = (
  componentPath: string,
  componentFileName: string,
  templateFileName: string
) => {
  // Get file contents
  const templateFileLocation = path.join(templatePath, templateFileName);
  fs.readFile(templateFileLocation, 'utf8', (err, fileContent) => {
    if (err) {
      console.error(err);
    }
    const splitOnce = (stringToSplit: string, subString: string) => {
      const [first, ...rest] = stringToSplit.split(subString);
      return [first, rest.length > 0 ? rest.join(subString) : null];
    };
    const [templatePrefix, fileSuffix] = splitOnce(templateFileName, '.');
    const hydratedTemplate = fileContent
      .replaceAll(templatePrefix as string, componentFileName)
      .replaceAll('TemplateDirectory', componentPath);

    const prefix =
      fileSuffix === 'module.scss' && componentPath === 'foundation' ? '_' : '';
    const destination = path.join(
      componentPath,
      `${componentFileName}/${prefix}${componentFileName}.${fileSuffix}`
    );
    fs.writeFileSync(destination, hydratedTemplate);
  });
};

const generateAllFiles = (componentPath: string, componentFileName: string) => {
  // Read files in templates folder
  fs.readdir(templatePath, (err, templateFileNames) => {
    if (err) {
      console.error(err);
    }
    // Make sure our directories exist. Create recursively if not
    const destinationFolder = path.join(componentPath, componentFileName);
    fs.mkdirSync(destinationFolder, { recursive: true });
    // Then we copy templates over
    templateFileNames.forEach((templateFileName) =>
      generateSingleFile(componentPath, componentFileName, templateFileName)
    );
  });
};

// Handle user input
const questions: PromptObject[] = [
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
        title: 'site-components',
        description: 'e.g. card blocks, carousel blocks',
        value: 'site-components',
      },
      {
        title: 'components',
        description: 'e.g. cards, modals, tooltips',
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
      {
        title: 'consultant-finder',
        description: 'e.g. reviews, search, profile',
        value: 'consultant-finder',
      },
      {
        title: 'yext',
        description: 'for components related to yext search',
        value: 'yext',
      },
      {
        title: 'careers',
        description:
          'for components which exist in the careers subsection of site',
        value: 'careers',
      },
      {
        title: 'the-birth-company',
        description:
          'for components which exist in the birth company subsection of site',
        value: 'the-birth-company',
      },
    ],
    initial: 0,
  },
];
(async () => {
  const response = await prompts(questions);
  const { name, directory } = response;
  try {
    generateAllFiles(directory, name);
    console.log(
      `Successfully scaffolded: "./${directory}/${name}/${name}.tsx"`
    );
  } catch (err) {
    console.log(`Could not scaffold "${directory}/${name}/"`);
    console.error(err);
  }
})();
