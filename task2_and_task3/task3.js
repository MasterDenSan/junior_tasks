let str1 = "1aab1abba";
let str2 = "1abbaabcd";


const finder = (string1, string2) => {
    if (typeof string1 === "string" && typeof string2 === "string") {
        console.log(`Проверяемые строки 1)${string1} 2)${string2}`)
        arr = [];
        string1.split('').reduce((last, item) => {
            if (string2.indexOf(`${last}${item}`) !== -1) {
                arr.push(`${last}${item}`);
                return `${last}${item}`;
            } else return item;
        }, '');

        console.log(`Общая последовательность: ${arr.sort((a, b) => b.length - a.length)[0]}`)
    } else {
        console.log(`${string1} или ${string2} не является строкой`)
    }

}

finder(str1, str2)