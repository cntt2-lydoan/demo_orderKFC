const items = [{
    name:'Pizza 001',
    price: 5,
    quantity: 1
},
{
    name:'Pizza 001',
    price: 6,
    quantity: 1
},
{
    name:'Pizza 001',
    price: 7,
    quantity: 1
}]

const SHIPPING = 2;

function add(){
    items.push({
        name: `Pizza ${Math.random()}`,
        quantity: 1,
        price: Math.random() * 10
    })
    render()
}
function remove(index){
    items.splice(index,1)
    render();
}
function updateQuantity(index,quantity){
    if(quantity < 1){
        return
    }
    items[index].quantity = quantity
    render()
}
function render(){
    let subTotal = 0;
    items.forEach(item =>{
        subTotal += item.quantity * item.price;
    })
    const total = subTotal + SHIPPING;

    const html = items.map(item => `
    <li class="order-item">
        <span class="item-name">${item.name}</span>
        <span class="item-quantity">
            <button class="dec">-</button>
            <input type="number" value='${item.quantity}'/>
            <button class="inc">+</button>
        </span>
        <span class="item-price">
            <span>$${(item.quantity * item.price).toFixed(2)}</span>
            <button class="delete">X</button>
        </span>
    </li>`).join('')
    document.getElementById('order-items').innerHTML = html

    const deleteButtons = document.getElementsByClassName('delete')
    const decButtons = document.getElementsByClassName('dec')
    const incButtons = document.getElementsByClassName('inc')
    for (let i = 0;i< deleteButtons.length;i++){
        decButtons[i].addEventListener('click',() =>{
            updateQuantity(i, items[i].quantity -1)
        })
        incButtons[i].addEventListener('click',() =>{
            updateQuantity(i, items[i].quantity  + 1)
        })
        deleteButtons[i].addEventListener('click', () =>{
            remove(i);
        })
        
    }
    console.log(total);
    document.getElementById('sub-total').innerHTML = subTotal,
    document.getElementById('shipping').innerHTML = SHIPPING,
    document.getElementById('total').innerHTML = total
    // $('#sub-total').innerText = `$${subTotal}`,
    // $('#shipping').innerText = `$${SHIPPING}`,
    // $('#total').innerText = `$${total}`
}

document.getElementById('btn-add').addEventListener('click',() =>{
    add()
})
render();