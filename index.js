// Starting point for the backend application
const startApplication = require('./src/app');

try{
    console.log('Starting the Application Server..');
    startApplication();
}
catch(error){
    console.log(`\nOops!! Something went wrong... \n${error}`);
    console.log('\nExecution terminated.');
}