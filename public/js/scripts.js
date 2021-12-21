// let submit = document.querySelector('#send');
let status;
const save = document.getElementById('btn-save')

// const attributes = document.getElementById('attributes-form')





const choseAttributes = () => {
    let type = document.getElementById('productType').value
    const attributes = document.getElementById('attributes-form')
    if (type === 'DVD') {
        attributes.removeChild(attributes.firstChild)
        return attributes.innerHTML =
            '<div>\n' +
            '          <div class="input-label mb-4">\n' +
            '            <div class="label-container">\n' +
            '              <label for="size" class="label">Size (MB)</label>\n' +
            '            </div>\n' +
            '            <input type="text" class="form-control" name="size" id="size" placeholder="Enter size (number)"><br>\n' +
            '          </div>\n' +
            '          <div class="input-label mb-4 leftgap">\n' +
            '              <h5>Please, provide size</h5>\n' +
            '          </div>\n' +
            '</div>'
    } else if (type === 'Furniture') {
        attributes.removeChild(attributes.firstChild)

        return attributes.innerHTML=
            '<div>\n' +
            '          <div class="input-label mb-4">\n' +
            '            <div class="label-container">\n' +
            '              <label for="height" class="label">Height (CM)</label>\n' +
            '            </div>\n' +
            '            <input type="text" class="form-control" name="height" id="height" placeholder="Enter height (number)"><br>\n' +
            '          </div>\n' +
            '          <div class="input-label mb-4">\n' +
            '            <div class="label-container">\n' +
            '              <label for="width" class="label">Width (CM)</label>\n' +
            '            </div>\n' +
            '            <input type="text" class="form-control" name="width" id="width" placeholder="Enter width (number)"><br>\n' +
            '          </div>\n' +
            '          <div class="input-label mb-4">\n' +
            '            <div class="label-container">\n' +
            '              <label for="length" class="label">Length (CM)</label>\n' +
            '            </div>\n' +
            '            <input type="text" class="form-control" name="length" id="length" placeholder="Enter length (number)"><br><br>\n' +
            '          </div>\n' +
            '          <div class="input-label mb-4 leftgap">\n' +
            '              <h5>Please, provide dementions</h5>\n' +
            '          </div>\n' +
            '</div>'
    } else if (type === 'Book') {
        attributes.removeChild(attributes.firstChild)

        return attributes.innerHTML =
            '<div>\n' +
            '          <div class="input-label mb-4">\n' +
            '            <div class="label-container">\n' +
            '              <label for="weight" class="label">Weight (KG)</label>\n' +
            '            </div>\n' +
            '            <input type="text" class="form-control" name="weight" id="weight" placeholder="Enter weight (number)"><br>\n' +
            '          </div>\n' +
            '          <div class="input-label mb-4 leftgap">\n' +
            '              <h5>Please, provide weight</h5>\n' +
            '          </div>\n' +
            ' </div>'

    }
}


let attributesData = () => {
    let type = document.getElementById('productType').value

    if (type === 'DVD') {
        let size = document.getElementById('size').value
        return [size]
    } else if (type === 'Furniture') {
        let height = document.getElementById('height').value
        let width = document.getElementById('width').value
        let length = document.getElementById('length').value
        return [height, width, length]

    } else if (type === 'Book') {
        let weight = document.getElementById('weight').value
        return [weight]

    }
}


save.addEventListener('click', () => {
    let sku = document.getElementById('sku'),
    name = document.getElementById('name'),
    price = document.getElementById('price'),
    type = document.getElementById('productType'),
    attributesDataValue = attributesData()

    return dataToBack(sku, name, price, type, attributesDataValue)
})




let dataToBack = async (sku, name, price, type) => {

    const fields = document.querySelectorAll('#size, #height, #width, #length, #weight')
    let attributes = {
        sku: sku.value,
        name: name.value,
        price: price.value,
        type: type.value,
        // attrArr: {}
    }


    let attrSet = () => {
        fields.forEach(field => {
        const {name, value} = field

        // attributes.attrArr[name] = value;
        attributes[name] = value;

        })
    }

    // attributes[attribute] =

    console.log(attributes)
    // const data = JSON.stringify(formData)
    // console.log(data)

    await attrSet()
    await fetch("http://sw-back/php/addInProdList.php", {
    method: 'POST',
    body: JSON.stringify(attributes),
    mode: 'no-cors',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    }).then(response => {
        status=response.status
        return response.text()

    }).then(response => {
        console.log(response)
        // if(status === 200)
        //     location.href="../index.html"

    }).catch(err => console.log(err))

    await document.getElementById('product_form').reset()
};

