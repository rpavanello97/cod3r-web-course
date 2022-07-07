function speakLater(seconds, message) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(message);
        }, seconds * 1000)
    });
}

/** Calling the promise */
speakLater(4, 'Thats so nice!')
    .then(message => message.concat('!!'))
    .then(otherMessage => console.log(otherMessage))
    .catch(e => console.log(e))