// @flow

export const loadPhotos = (year: number) => new Promise(
        (resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000)
        }
).then(() => {
            switch (year) {
                case 2014:
                    return [1, 2, 3, 4];
                case 2015:
                    return [1, 2, 3, 4, 5];
                case 2016:
                    return [1, 2, 3, 4, 5, 6];
                default:
                    return [];
            }
        }
);
