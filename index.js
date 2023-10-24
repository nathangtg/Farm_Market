//VARIABLE DECLARATIONS
let itemsInCart = [];
const items = document.querySelectorAll('.itemBox');
const cartContainer = document.querySelector('.userCart');
const yourCartHeader = document.querySelector('.yourCartHeader');
const itemQuantityElement = document.querySelector('.itemQuantity');
const parentBox = document.querySelector('.itemCarted')
const totalBox = document.getElementsByClassName('.totalNumber');

//FUNCTIONS
const countTotalPrice = function (){
    let totalPrice = 0;
    itemsInCart.forEach(item => {
        totalPrice += item.price
    })
    console.log(totalPrice)
    return totalPrice;
}
function updateItemsInCart(item) {
    const existingItem = itemsInCart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        // If the item is already in the cart, update quantity and price
        existingItem.count += 1;
        existingItem.price = existingItem.basePrice * existingItem.count;
    } else {
        // If the item is not in the cart, add it to the cart
        itemsInCart.push(item);
    }
    console.log(itemsInCart);
}

const updateShoppingCartHTML = function () {
    if (itemsInCart.length > 0) {
        let result = itemsInCart.map(product => {
            console.log('Updating HTML');
            console.log('Items in cart:', itemsInCart.length);
            return `
                    <div class="itemCarted">
                        <div class="itemCartBoxed">
                            <img class="imageInCart" src="${product.image}">
                            <h4>${product.name}</h4>
                            <div class="itemQuantitySelector">
                                <h4>Quantity : ${product.count}</h4>
<!--                                <button class="removeItemIcon"><span id="removeIcon" class="material-symbols-outlined">remove</span></button>-->
<!--                                <button class="addItemIcon"><span id="addIcon" class="material-symbols-outlined">add</span></button>-->
                            </div>
                            <div class="priceOfItem">
                            <h4>Price:</h4>
                                <h4>${product.price}</h4>
                            </div>
        </div>
    </div>
            `;
        });
        // Append the new HTML to the existing content
        cartContainer.innerHTML = result.join('');

        // Update the total quantity in the yourCartHeader
        const totalQuantity = itemsInCart.reduce((total, item) => total + item.count, 0);
        itemQuantityElement.textContent = ` : ${totalQuantity.toString()}`
    } else {
        itemQuantityElement.textContent = '$nbsp'; // Reset to 0 if the cart is empty
    }
    countTotalPrice()
};


items.forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.target.classList.contains('itemBuyButton')) {
            const itemID = e.target.getAttribute('itemid');
            const itemName = item.querySelector('.itemTitle').innerHTML;
            const itemPrice = item.querySelector('.itemPrice').innerHTML;
            const itemImage = item.querySelector('.itemThumbnail').src;
            console.log('Test Dialog item : ' + itemID);
            let itemsToCart = {
                name: itemName,
                image: itemImage,
                id: itemID,
                count: 1,
                price: +itemPrice,
                basePrice: +itemPrice,
            };
            updateItemsInCart(itemsToCart);
            countTotalPrice();
            updateShoppingCartHTML();
            updateFinalTotalHtml()
        }
    })
});

cartContainer.addEventListener('click', (e) =>{

    const isPlusButton = e.target.classList.contains('addItemIcon')
    const isMinusButton = e.target.classList.contains('removeItemIcon')
    if (isPlusButton || isMinusButton){
        console.log('You Accessed me')
        for (let i = 0; i < itemsInCart.length; i++){
            if (itemsInCart[i].id === e.target.dataset.id){
                if (isPlusButton){
                    itemsInCart[i] += 1;
                    console.log('hello')
                }
                else if (isMinusButton){
                    itemsInCart[i] -= 1;
                }
                itemsInCart[i].price = itemsInCart[i].basePrice * itemsInCart[i].count;
            }
            if (itemsInCart[i].count <= 0){
                itemsInCart.splice(i, 1)
            }
        }
        updateShoppingCartHTML()
    }

    console.log(e)
    console.log(e.target)
    console.log(e.target.id)
})

const updateFinalTotalHtml = function () {
    let totalPrice = countTotalPrice();
    totalPrice = totalPrice.toString();

    // Select the .totalNumber element
    const totalNumberElement = document.querySelector('.totalNumber');

    // Update the content of the .totalNumber element
    totalNumberElement.innerHTML = `${totalPrice}`;
};
