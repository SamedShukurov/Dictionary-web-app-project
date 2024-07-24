let cart = [];
let desserts = document.querySelector(".desserts");
fetch("data.json")
    .then((res) => res.json())
    .then((res) => {
        res.map((data) => {
            console.log(data)
            desserts.innerHTML += `                    
    <div class="dessert">
        <div class="part1">
            <img src="${data.image.desktop}" alt="food">
            <button class="addBtn" onclick="addToCart(this)">
                <img src="assets/images/icon-add-to-cart.svg" alt="add">
                <p>Add to cart</p>
            </button>
        </div>
        <div class="part2">
            <div class="name">${data.category}</div>
            <h1 class="fullname">${data.name}/h1>
            <p class="price">$${parseFloat(data.price).toFixed(2)}</p>
        </div>
    </div>`;
        });
    });

function addToCart(e, data) {
    e.classList.add("active");
    console.log(data)
    e.innerHTML = "";
    e.innerHTML += `
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
        </span>
        <p class="product__count">1</p>
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
        </span>
    `;
}
