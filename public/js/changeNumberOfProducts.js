
let changeNumberOfProducts = () => {


    fetch("http://sw-front/public/php/showAll.php", {
        method: 'GET',
        mode: 'no-cors',
    }).then(response => {
            status=response.status
            return response.text()
    }).then(response => {
        console.log(response)
        let responseArrs = response.split(', ').filter(item => item !== "")
        console.log(responseArrs)
        let newArr = []
        responseArrs.map(item =>
            newArr.push(JSON.parse(item))
        )
        // console.log(responseArrs)
        return newArr


        // let newArr = []
        // for (let i = 0; i < responseArrs.length; i++) {
        //     let item = responseArrs[i].split('$/$')
        //     newArr.push(item)
        //
        // }
        // newArr.forEach(item=>item[4]=
        //     item[4].length===2
        //         ? [item[4].split('#@#').filter(item => item !== "")]
        //         :item[4].split('#@#').filter(item => item !== ""))
        // return newArr
    }).then(responseArrs => {
        console.log(responseArrs)

        if (responseArrs.length>1) {
            responseArrs.map(arr => addElem(arr))
        } else {
            addElem(responseArrs[0])
        }
    }).catch(err => alert(err))
};



// По идее сформировать массив уже в запросе с базы данных, сделав массив в массива :
// ([sku, name, price, [attr1, attr2, attr3](типо вместо type вставить массив в php)])
// При помощи foreach тут уже преобразовать массив в html блоки



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
        '     <input class="delete-checkbox-block" type="checkbox" id="delete"/>\n' +
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
    await fetch("http://sw-front/public/php/deleteAll.php", {
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
        .then(response => {
            console.log(response)

        })
        .catch(err => console.log(err))
    window.location.reload()
};




