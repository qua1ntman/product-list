let status;
const save = document.getElementById('btn-save')


const choseAttributes = () => { // Choose attribute form
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



save.addEventListener('click', () => { // Add main info about product
    let sku = document.getElementById('sku'),
    name = document.getElementById('name'),
    price = document.getElementById('price'),
    type = document.getElementById('productType')

    return dataToBack(sku, name, price, type)
})




let dataToBack = async (sku, name, price, type) => { // Add product in DB

    const fields = document.querySelectorAll('#size, #height, #width, #length, #weight')

    let attributes = {
        sku: sku.value,
        name: name.value,
        price: price.value,
        type: type.value,
    }


    let attrSet = () => {
        fields.forEach(field => {
        const {name, value} = field
        attributes[name] = value;
            console.log(typeof value)

        })
    }

    
    await attrSet()

    await console.log(typeof attributes.sku, typeof attributes.name, typeof attributes.price, typeof attributes.type)

    await fetch("https://product-list-sw.000webhostapp.com/php/addInProdList.php", {
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

    }).catch(err => console.log(err))

    document.getElementById('product_form').reset()
};

