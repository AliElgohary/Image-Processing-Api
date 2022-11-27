# ImageProcessingAPI


Scripts used in the project:

compile => npm run build
execute unit test => npm run jasmine
complile and run unit test using nodemon => npm run test 
start development server => npm run start
check for linting errors =>npm run lint  
run prettier => npm run prettier



Endpoint:

process JPEG images :
/api/images?filename=<filename>&width=<width>&height=<height>&format=jpeg

 process PNG images :
/api/images?filename=<filename>&width=<width>&height=<height>&format=png

the changes :
1- provided error messages for all parameters failuire senario
2- fixed lint

