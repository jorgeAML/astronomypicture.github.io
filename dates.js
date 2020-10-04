function newDate () {
    let dateOne = new Date('October 1, 2020');
    let dateTwo = new Date('September, 30, 2020');
    console.info('DATE:' + dateOne);
    console.log('----------------------------------');
    console.info('Updated on Github Repository, the last one was: ' + dateTwo)
    console.log('----------------------------------');
    dateTwo.setFullYear(2020);
    console.info('Year created: ' + dateTwo.getFullYear());
}
newDate();

function port () {
    let name = [
        {name: 'Astronomy app.', api: 'APOD Astronomy Picture Of the Day.'},
        {port: 8124, tools:'Amazon Alexa Conversations.'}
    ]
    console.log('----------------------------');
    console.info('USEFUL INFORMATION');
    console.log('----------------------------');
    console.info('The port will be at: ' + name[1].port);
    console.info('Tools I used: ' + name[1].tools);
    console.info('App name: ' + name[0].name);
    console.info('Api that we are working: ' + name[0].api);
    console.log('----------------------------');
}
port();
