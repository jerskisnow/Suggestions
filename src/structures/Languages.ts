import { readdir } from 'fs';

/**
 * Get the available language-codes from the languages folder
 * @return {Function} Returns a function which needs to be awaited because of the promisified callback
 */
const languageList = function(): Promise<string[]> {
    return new Promise(function(resolve, reject) {
        readdir('./languages/', function(error, result) {
            if (error) reject(error);
            else resolve(result);
        });
    });
};

// const languageList = () => new Promise((resolve, reject) => {
//     readdir("./languages/", (error, result) => {
//         if (error) reject(error);
//         else resolve(result);
//     });
// });

export default languageList;
