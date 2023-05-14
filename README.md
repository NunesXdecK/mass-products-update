# mass-products-update
Projeto para teste de emprego

Primeiros passos:
Instalar MySQL 8 e após executar o SQL que está na pasta for-test.
Instalar uma versãod o Node.JS, recomendado a 16.
No root do projeto temos um projeto react. Abra o terminal\CMD\PowerShell nesse diretório e execute o comando "npm install" para instalar as dependencias e após execute o comando "npm start" para iniciar o servidor do front-end.
No root do projeto dentro da pasta server temos um projeto Node.JS com express. Abra o seu gerenciador de projetos, recomendado uso do VS Code, e abra o arquivo server.ts dentro da pasta src, neste arquivo encontre a constante de configuração do MySQL chamado dbConfig, informe todos os atributos que ele pede, host, user, password e database. Logo após abra o terminal\CMD\PowerShell nesse diretório e execute o comando "npm install" para instalar as dependencias e após execute o comando "tsc --skipLibCheck && node dist/server.js" para rodar o TypeScript e após iniciar o servidor do back-end.
Para testar com eficacia acesse no navegador o endereço localhost:3000 você verá uma tela com 3 botões e uma tabela vazia, primeiro clicke no botão que está embaixo de "Selecionar arquivo .CSV" ele pedirá um arquivo .CSV na pasta for-test terá 4 arquivos, um para produtos válidos, um para pacotes de produtos, um para apenas produtos e o ultimo com valores inválidos, aperte o botão "VALIDAR" e após caso liberado aperte o botão "ATUALIZAR". Caso você importe algum arquivo e ele não permitir a atualização veja no canto esquedo de cada linha, havera um icone e se permanecer com o mouse em cima verá uma mensagem que lhe dirá o que há de errado.
