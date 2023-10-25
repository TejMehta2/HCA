# Sitecore XM Cloud Spike

## Getting started

All npm commands below should be run at the root of the solution i.e the directory where the "hca-workspace" `package.json` file is found, unless specified otherwise.

### Front end

1. Make sure you are using the up-to-date LTS version of [node](https://nodejs.org/en)
2. Run `npm i`

### Component library Storybook

1. Run `npm run storybook`
2. Navigate your browser to the local host reported in the console

### NextJS Front end

The NextJS solution(s) exist at e.g. `src/[solution]/`. For this example, we use the first NextJS solution: hcamain.

1. Make a local copy of the `.env` file located in the solution folder e.g. copy `src/hcamain/.env` to `src/hcamain/.env.local`.
2. Replace the values for `SITECORE_API_KEY`, `GRAPH_QL_ENDPOINT` and `JSS_APP_NAME` in the newly created `.env.local` with the values provided in the Sitecore cloud instance.
3. Run the start command corresponding to the solution e.g. `npm run hcamain:start` (see scripts in root `package.json`)
4. Navigate your browser to the location reported to the console e.g. http://localhost:3000

### Back end

1. In an ADMIN terminal:

   ```ps1
   .\init.ps1 -InitEnv -LicenseXmlPath "C:\path\to\license.xml" -AdminPassword "DesiredAdminPassword"
   ```

2. Restart your terminal and run:

   ```ps1
   .\up.ps1
   ```

3. Follow the instructions to [deploy to XM Cloud](#deploy-to-xmcloud)

4. Create Edge token and [query from edge](#query-edge)

---

## Contributing

### Adding a component to the component library

1. Make sure you have followed the getting started steps above.
2. Run `npm run scaffold`
3. Follow the instructions in the command line

### Committing changes

When you are ready to make a commit, ensure your files are tested, formatted and linted.

Run the Jest unit tests:

`npm run test:component-library`

Lint your files and check the console for any errors:

`npm run lint`

Fix any formatting errors using Prettier and the stylelint --fix flag:

`npm run format`

Note: Some linting errors in SCSS must be manually resolved

# Design library

There is a HCA design library that can be found in `src/component-library`.

The justification and context around using Storybook for demonstrating the design library and Chromatic for hosting it can be found in [ADR 09 - Storybook framework](https://github.com/HCA-Eqtr/HCA-XMCloud/blob/main/documentation/009%20Storybook%20Framework.md) and [ADR 15 - Storybook publishing](https://github.com/HCA-Eqtr/HCA-XMCloud/blob/main/documentation/015%20Storybook%20publishing.md)

### Demo

The latest production version of the design library can be [here](https://prod--65329240ee109f18f59053f2.chromatic.com/).
