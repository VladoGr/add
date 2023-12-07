const product = [
    {
        name: 'Tomato',
        price: 12,
        image: 'vegetable_image/tomato.jpg',
    },
    {
        name: 'Carrot',
        price: 10,
        image: 'vegetable_image/carrot.jpg',
    },
    {
        name: 'Potato',
        price: 6,
        image: 'vegetable_image/potato.jpeg',
    }
]

const container = document.getElementById('product')
const productName = document.querySelector('.product-name');
const quantity = document.querySelector('.quantity');
const totalPrice = document.querySelector('.total-price');
const inputNum = document.querySelectorAll('.input-num');
let pricex1 = [];
let globalprice = 0;

window.addEventListener('DOMContentLoaded', () => {
    displayVegetables(product);
})

const displayVegetables = (arg) => {
    let display = arg.map(e => {

        return `
    <div class="product-box">
        <div class="photo">
            <img class="card_image" src="${e.image}">
        </div>
        <div class="product-info">
            <h1 class="product-title">${e.name}</h1>
            <p class="product-price">${e.price}&nbsp&euro;</p>
            <input type="number" class="input-num" value="0" min="0" max="10">
            <button class="product-info-button">Add</button>
        </div>
    </div>`
    })


    let displayItem = display.join('');
    container.innerHTML = displayItem;
    let nth = document.querySelectorAll('.photo');
      
    const btn = document.querySelectorAll('.product-info-button');
    const productInfo = document.querySelector('.product-info').children;
    let total = document.querySelector('.total');
    
    btn.forEach(el => {
        el.addEventListener('click', (e) => {
            let x = e.target;
            let y = e.target.closest('.product-box');
            let g = x.previousElementSibling.value;
            let v = parseInt(g);
            let input = y.querySelector('.input-num').value;
            let name = y.querySelector('.product-title').innerHTML;
            let productPrice = y.querySelector('.product-price').innerHTML;
            let priceString = productPrice.substring(0, productPrice.length -1);
            let price = parseInt(priceString);
            let inputParse = parseInt(input);


            if(inputParse === 0) {
                el.style.border = "0.2em solid red";

            } else {

                let sectionProduct = document.querySelector('.section-product');
                sectionProduct.innerHTML += `
                <div class="select-product">
                <div class="buy-name">${name}</div>
                <div class="buy-quantity">${inputParse}</div>
                <div class="buy-price">${inputParse * price}&nbsp&euro;</div>
                <button class="del">X</button>
                </div>
                `;

                deleteItems();
                
                el.setAttribute('disabled', 'true');

                document.querySelector('.product-info-button').style.border = "0.2em solid lightseagreen";
            }


            let x10 = inputParse * price;
   
            let selectProduct = document.querySelector('.select-product');
            let buyPrice = document.querySelectorAll('.buy-price');

            globalprice += x10;

            total.innerHTML = `&nbsp  ${globalprice}&nbsp&euro;`

        })

    })

    const deleteItems = () => {
        const del = document.querySelectorAll('.del');
        del.forEach(el => {
            el.addEventListener('click',e => {
                let infoTarget = e.target.closest('.section-product .select-product');
                const buyName = infoTarget.querySelector('.buy-name');
                const info = document.querySelectorAll('.product-info');

                info.forEach(e => {
                    let infoName = e.querySelector('.product-title');
                    let btn = e.querySelector('.product-info-button')
                    let input = e.querySelector('.input-num');
                    let buyPrice = infoTarget.querySelector('.buy-price').innerHTML;
                    let priceString2 = buyPrice.substring(0, buyPrice.length -1);
                    let priceNumber = parseInt(priceString2);
        
                    if(infoName.innerHTML === buyName.innerHTML) {
                        btn.removeAttribute('disabled')
                        console.log(infoName, buyName)
                        input.value = 0;
                        globalprice -= priceNumber;
                        total.innerHTML = `&nbsp &nbsp${globalprice}&euro;`

                        
                    }
                })




                infoTarget.remove();



            })
        })
    }
    
}