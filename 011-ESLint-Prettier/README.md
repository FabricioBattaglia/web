# ESLint and Prettier:

One of the most important things to keep in mind while working on a project is keeping a clean and concise pattern. Since our code will most likely be read and worked on in the future by other people, we want to make this as easy as it can be. You also want to get someone else's code that you are working on and be able to easily understand what is going on.
With that in mind, we can start talking about ESLint and Prettier. First we will talk about what each of those are.

## ESLint:

ESLint is a linter, a tool designed to analyze source code and suggest optimizations and corrections. It allows us to write code that will be easier to read, have less errors, more maintainable, and keep a pattern. We will now see how to install and configure ESLint:

-   First we add the ESLint extension on VSCode(Everything for this project assumes that VSCode is used);
-   Now we install ESLint as a development dependency using yarn: ```yarn add eslint -d```;
-   No we initialize ESLint: ```yarn eslint --intit```;
-   The line above will prompt multiple options:
-   1: How would you like to use Eslint?
    -   To check syntax only;
    -   To check syntax and find problems;
    -   To check syntax, find problems and enforce code style;
        -   We will choose option #3;
-   2: What type of modules does your project use?
    -   JavaScript modules (import/export);
    -   CommonsJS (require/exports);
        -   We will choose option #1;
-   3: Which framework does your project use?
    -   React;
    -   Vue.JS;
    -   None of these;
        -   Since we are configuring our backend, we will choose #3;
-   4: Does your project use TypeScript?
    -   No;
    -   Yes;
        -   We will choose "yes";
-   5: Where does your code run?
    -   Browser;
    -   Node;
        -   We will choose "Node";
-   6: How would you like to define a style for your project?
    -   Use a popular style guide;
    -   Answer questions about your style;
        -   We will choose option #1;
-   7: Which style guide do you want to follow?
    -   Airbnb;
    -   Standard;
    -   Google;
        -   We will choose "Airbnb";
-   8: What format do you want your config file to be in?
    -   Javascript;
    -   YAML;
    -   JSON;
        -   We will choose "JSON";
-   Now ESLint will inform the necessary dependencies that our configuration requires and ask if it can automatically install them;
-   9: Would you like to install them now with npm?
-   We will select "NO" because we are not using npm;
-   To manually add the dependencies using yarn we will do the following:
    -   ```yarn add {add the dependencies suggested on the terminal} -d```;
    -   the dependencies should look something like: "@typescript-eslint/eslint-plugin@latest...";
    -   Copy everything but the part that looks like this: "eslint@^5.16.0 || ^6.8.0 || ^7.2.0";
    -   Everything but what is mentioned on the line above should be copied into the yarn add command;
    -   We are removing that part because it is telling the terminal to install ESLint, something we did already;
    -   Now we also add a plugin to help us organize the import order and other to allow to import TS files without having to share the extension;
    -   ```yarn add -d eslint-plugin-import-helpers eslint-import-resolver-typescript```;
-   With our dependencies taken care of we can go on;
-   Now on the project root we add a file named ".eslintignore";
-   Inside the file we will have:
```
/*.js
node_modules
dist
```
-   Now we will configure the file that was generated when initializing ESLint: ".eslintrc.json";
-   Inside "env" we add the line ```"jest": true```;
-   Still inside "env", make sure that the first line is: ```"es2020": true```;
-   Now inside "extends" we will add the line: ```"plugin:@typescript-eslint/recommended"```;
-   Now inside "plugins" we will add the line: ```"eslint-plugin-import-helpers"```;
-   Now inside "rules" we add the following lines:
```json
"camelcase": "off",
"import/no-unresolved": "error",
"@typescript-eslint/naming-convention": [
  "error",
  {
    "selector": "interface",
    "format": ["PascalCase"],
    "custom": {
      "regex": "^I[A-Z]",
      "match": true
    }
  }
],
"class-methods-use-this": "off",
"import/prefer-default-export": "off",
"no-shadow": "off",
"no-console": "off",
"no-useless-constructor": "off",
"no-empty-function": "off",
"lines-between-class-members": "off",
"import/extensions": [
  "error",
  "ignorePackages",
  {
    "ts": "never"
  }
],
"import-helpers/order-imports": [
  "warn",
  {
    "newlinesBetween": "always",
    "groups": ["module", "/^@shared/", ["parent", "sibling", "index"]],
    "alphabetize": { "order": "asc", "ignoreCase": true }
  }
],
"import/no-extraneous-dependencies": [
  "error",
  { "devDependencies": ["**/*.spec.js"] }
]
```
-   Now to make Node "understand" typescript we will need to add some lines to .eslintrc.json right under "rules":
```json
"settings": {
    "import/resolver": {
        "typescript": {}
    }
}
```
-   To finalize, we save everything and restart VSCode. Now when coding VSCode will inform errors.

The file ".eslintrc.json" should be looking like this now:
```json
{
    "env": {
        "es2020": true,
        "node": true,
				"jest": true
    },
    "extends": [
        "airbnb-base",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "eslint-plugin-import-helpers"
    ],
    "rules": {
      "camelcase": "off",
			"import/no-unresolved": "error",
			"@typescript-eslint/naming-convention": [
			  "error",
			  {
			    "selector": "interface",
			    "format": ["PascalCase"],
			    "custom": {
			      "regex": "^I[A-Z]",
			      "match": true
			    }
			  }
			],
			"class-methods-use-this": "off",
			"import/prefer-default-export": "off",
			"no-shadow": "off",
			"no-console": "off",
			"no-useless-constructor": "off",
			"no-empty-function": "off",
			"lines-between-class-members": "off",
			"import/extensions": [
			  "error",
			  "ignorePackages",
			  {
			    "ts": "never"
			  }
			],
			"import-helpers/order-imports": [
			  "warn",
			  {
			    "newlinesBetween": "always",
			    "groups": ["module", "/^@shared/", ["parent", "sibling", "index"]],
			    "alphabetize": { "order": "asc", "ignoreCase": true }
			  }
			],
			"import/no-extraneous-dependencies": [
			  "error",
			  { "devDependencies": ["**/*.spec.js"] }
			]
    },
    "settings": {
        "import/resolver": {
            "typescript": {}
        }
    }
}
```

## Prettier:

Now that we have finished configuring ESLint, we can start configuring Prettier. Before we go on about that, I think it is important to know what Prettier is and why we are adding it to our project. Prettier is a code formatter that ensures a single unified code format for your project. That will assist us developing a neat project that will be easier to maintain in the future, as well as adding new features.
To get Prettier:
-   ```yarn add prettier eslint-config-prettier eslint-plugin-prettier -d```;
-   This command adds 3 dependencies that will integrate prettier with eslint;
-   Now inside ".eslintrc.json" in "extends" we will add the following:
```json
"prettier",
"plugin:prettier/recommended"
```
-   And under "plugins" we will add the line: 
```json
"prettier"
```
-   And under "rules" we will add the line:
```json
"prettier/prettier": "error"
```

That's it! Now prettier and eslint are configured and ready to go! Here it is how the final file should look like (on the parts that we changed!):
```json
{
	...
  "extends": [
		...
    "prettier",
    "plugin:prettier/recommended"
  ],
  ...
  "plugins": [
    ...
    "prettier"
  ],
  "rules": {
    ...
		"prettier/prettier": "error"
  },
  ...
}
```

#### NOTE:
This knowledge comes from [this website (PORTUGUESE)](https://www.notion.so/ESLint-e-Prettier-Trilha-Node-js-d3f3ef576e7f45dfbbde5c25fa662779#eaf6e8bdcabc4d809cdae302e29750da)