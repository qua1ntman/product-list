
let changeNumberOfProducts = () => {


    fetch("https://product-list-sw.000webhostapp.com/php/showAll.php", {
        method: 'GET',
        mode: 'no-cors',
    }).then(response => {
            status=response.status
            return response.text()
    }).then(response => {
        let responseArrs = response.split(', ').filter(item => item !== "")
        let newArr = []
        responseArrs.map(item =>
            newArr.push(JSON.parse(item))
        )
        return newArr

    }).then(responseArrs => {

        responseArrs.length>1
            ? responseArrs.map(arr => addElem(arr))
            : addElem(responseArrs[0])
    }).catch(err => alert(err))
};



let addElem = async (arr) => {

    const productList = document.getElementById('product-list')
    let attrDiv = ''
    if (arr.type==='DVD') {
        attrDiv=`Size: ${arr.size} MB`
    } else if (arr.type==='Furniture') {
        attrDiv=`Demention: ${arr.length}x${arr.height}x${arr.width}`
    } else {
        attrDiv=`Weight: ${arr.weight} KG`
    }


    await productList.insertAdjacentHTML("beforeend",
    `<div class="product" id=${arr.sku},${arr.type}>\n` +
        '     <input class="delete-checkbox" type="checkbox" id="delete"/>\n' +
        '     <div class="product-info" >\n' +
        `         <div class="spaces">${arr.sku}</div>\n`+
        `         <div class="spaces">${arr.name}</div>\n` +
        `         <div class="spaces">${Number(arr.price).toFixed(2)} $</div>\n`+
        `         <div class="spaces" id="attr">${attrDiv}</div>\n`+
        '     </div>\n' +
        ' </div>')



}

let deleteAllBtn = document.getElementById('delete-product-btn')
deleteAllBtn.addEventListener('click',  () => {
    const nedDel = document.querySelectorAll('.product')
    nedDel.forEach(item => {
            if(item.querySelector('input:checked')) {
                dataToBack(item.id)
            }
        }
    )
})

let dataToBack = async (info) => {

    const attributes = {}

    let attrSet = () => {
        let data = info.split(',')
        attributes['sku'] = data[0]
        attributes['type'] = data[1]
    }

    await attrSet()
    await console.log(attributes)
    await fetch("https://product-list-sw.000webhostapp.com/php/deleteAll.php", {
        method: 'POST',
        body: JSON.stringify(attributes),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            status=response.status
            return response.text()

        })
        .catch(err => console.log(err))
    window.location.reload()
};




