const inputs = document.querySelectorAll('input');
const elements = document.querySelectorAll('.all');
const allInput = document.forms['toggleForm'].elements['all']

inputs.forEach((item) => {
    if (item.name !== 'all') {
        item.addEventListener('click', function () {
            document.querySelector('.' + item.name).hidden = !item.checked
        })
    } else {
        item.addEventListener('click', function () {
            elements.forEach(f => {
                f.hidden = !item.checked
            })
            inputs.forEach(m => m.checked = item.checked)
        })
    }
})



