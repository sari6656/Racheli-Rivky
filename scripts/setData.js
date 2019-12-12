var data = savedData || {};
try {
    if(localStorage.hasOwnProperty('gameSetting')) {
        var localData = localStorage.getItem('gameSetting');
        localData = JSON.parse(localData);
        if(localData.date > savedData.date) {
            data = localData;
        }
    }
} catch (error) {
    console.log('error on reading from local storage')
    console.log(error);
}
