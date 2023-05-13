<<<<<<< HEAD
# mass-products-update
Projeto para teste de emprego

Primeiros passos:
Instalar MySQL 8 e após executar o SQL que está na pasta for-test.
Instalar uma versãod o Node.JS, recomendado a 16.
No root do projeto temos um projeto react. Abra o terminal\CMD\PowerShell nesse diretório e execute o comando "npm install" para instalar as dependencias e após execute o comando "npm start" para iniciar o servidor do front-end.
No root do projeto dentro da pasta server temos um projeto Node.JS com express. Abra o seu gerenciador de projetos, recomendado uso do VS Code, e abra o arquivo server.ts dentro da pasta src, neste arquivo encontre a constante de configuração do MySQL chamado dbConfig, informe todos os atributos que ele pede, host, user, password e database. Logo após abra o terminal\CMD\PowerShell nesse diretório e execute o comando "npm install" para instalar as dependencias e após execute o comando "tsc --skipLibCheck && node dist/server.js" para rodar o TypeScript e após iniciar o servidor do back-end.
Para testar com eficacia acesse no navegador o endereço localhost:3000 você verá uma tela com 3 botões e uma tabela vazia, primeiro clicke no botão que está embaixo de "Selecionar arquivo .CSV" ele pedirá um arquivo .CSV na pasta for-test terá 4 arquivos, um para produtos válidos, um para pacotes de produtos, um para apenas produtos e o ultimo com valores inválidos, aperte o botão "VALIDAR" e após caso liberado aperte o botão "ATUALIZAR". Caso você importe algum arquivo e ele não permitir a atualização veja no canto esquedo de cada linha, havera um icone e se permanecer com o mouse em cima verá uma mensagem que lhe dirá o que há de errado.
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
>>>>>>> a9e7819 (Initialize project using Create React App)
