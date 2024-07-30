function asyncTask(name, delay, shouldReject) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldReject) {
                reject( {name});
            } else {
                resolve({name});
            }
        }, delay);
    });
}

const task1 = asyncTask('Task 1', 1000, false);
const task2 = asyncTask('Task 2', 2000, false);
const task3 = asyncTask('Task 3', 3000, true);

// Using Promise.all
Promise.all([task1, task2, task3])
    .then(results => {
        console.log('All tasks completed:', results);
    })
    .catch(error => {
        console.error('One or more tasks failed:', error);
    });

// Using Promise.allSettled
Promise.allSettled([task1, task2, task3])
    .then(results => {
        results.forEach(result => {
            if (result.status === 'fulfilled') {
                console.log(result.value);
            } else {
                console.error(result.reason);
            }
        });
    });