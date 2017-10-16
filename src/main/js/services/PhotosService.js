export const loadPhotos = () => new Promise(
        (resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000)
        }
).then(() => [1, 2, 3, 4, 5]);
