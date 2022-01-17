
let changeNumberOfProducts = () => { // Get DB data


    fetch("https://product-list-sw.000webhostapp.com/php/showAll.php", {
        method: 'GET',
        mode: 'no-cors',
    }).then(response => {
            status=response.status
            return response.text()
    }).then(response => {
        console.log(response)
        let responseArrs = response.split(', ').filter(item => item !== "")
        let newArr = []
        responseArrs.map(item =>
            newArr.push(JSON.parse(item))
        )
        return newArr

    }).then(responseArrs => {
        console.log(responseArrs)
        if (responseArrs.length===0) {
            addElem(0)
        } else if (responseArrs.length===1) {
            addElem(responseArrs[0])
        } else {
            responseArrs.map(arr => addElem(arr))
        }
    }).catch(err => alert(err))
};



let addElem = (arr) => { // Create product blocks


    const productList = document.getElementById('product-list')

    if(arr===0) {
        return productList.insertAdjacentHTML("beforeend",
            '<div class="empty-product-list"><h4>Product list is empty</h4></div>'
        )
    }

    let attrDiv = ''
    if (arr.type==='DVD') {
        attrDiv=`Size: ${arr.size} MB`
    } else if (arr.type==='Furniture') {
        attrDiv=`Dimensions: ${arr.length}x${arr.height}x${arr.width}`
    } else {
        attrDiv=`Weight: ${arr.weight} KG`
    }


    productList.insertAdjacentHTML("beforeend",
    `<div class="product" id=\"${arr.sku},${arr.type}\">\n` +
        '     <input class="delete-checkbox" type="checkbox" id="delete"/>\n' +
        '     <div class="product-info" >\n' +
        `         <div class="spaces">${arr.sku}</div>\n`+
        `         <div class="spaces">${arr.name}</div>\n` +
        `         <div class="spaces">${Number(arr.price).toFixed(2)} $</div>\n`+
        `         <div class="spaces">${attrDiv}</div>\n`+
        '     </div>\n' +
        ' </div>')



}

let deleteAllBtn = document.getElementById('delete-product-btn')
deleteAllBtn.addEventListener('click',  () => {
    const nedDel = document.querySelectorAll('.product')
    nedDel.forEach(item => {
            if(item.querySelector('input:checked')) {
                dataToBack(item.id)
                console.log(item.id)
            }
        }
    )
})

let dataToBack = async (info) => { // Remove of products with checked checkpoints

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
