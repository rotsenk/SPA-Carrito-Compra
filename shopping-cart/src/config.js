export const IS_DEVELOPMENT = process.env.NODE_ENV != 'production';
//IS_DEV va a ser true si proccess dev es diferente de 'producción'
//esto puede evitar problemas de qué es lo que pasa, por qué los estados no se ven
//sin necesidad de abrir las herramientas de desarrollo del navegador
//cuando se empaqueta para producción, el NODE_ENV cambia automáticamente a modo production