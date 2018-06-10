if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js', { scope: '/' })
        .then(function (reg) {
            // happy path
            console.log('Registration succeeded. Scope is ' + reg.scope);
        }).catch(function (error) {
            // registration failed
            console.log('Registration failed with ' + error);
        });
} else {
    console.log('Service workers are not supported.');
}