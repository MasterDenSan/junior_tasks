let a = [1, 2, 3, 4, 5];
let k = 3;


let shiftArray = (arr, step) => {
    if (Array.isArray(arr)) {
        console.log(`Масив до сдвига элементов вправо на: ${step}`, arr)
        for (let i = 0; i < (step - 1); i++) {
            arr.push(arr[0])
            arr.shift()
        }
        console.log(`Масив после сдвига элементов вправо на: ${step}`, arr)
    } else {
        console.log(`${arr} не является масивом передайте масив первым аргументом`)
    }
}

shiftArray(a, k)

