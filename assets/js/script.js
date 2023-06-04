var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centerSlide: 'true',
  fade: 'true',
  grabCursor: 'true',
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints:{
    0: {
        slidesPerView: 1,
    },
    520: {
        slidesPerView: 2,
    },
    950: {
        slidesPerView: 3,
    },
  },
});


var swiper = new Swiper(".movieSwiper", {
  spaceBetween: 0,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".movie-pagination",
    clickable: true,
  },
});



function isExisted(listItem, newItem) {
  let myIndex = -1;
  listItem.forEach((item, index) => {
    if (item.id == newItem.id) {
      myIndex = index;
    }
  });

  return myIndex;
}

function loadShoppingCart() {

  if (JSON.parse(localStorage.getItem('cartItems')) === null) {
    var listItem = [];
  }
  else {
    listItem = JSON.parse(localStorage.getItem('cartItems'));
  }

  const selectedItem = (evt) => {
    const itemClicked = evt.target;
    alert("Item id: " + itemClicked.previousElementSibling.children[0].textContent);
    if (typeof Storage !== undefined) {
      let newItem = {
        id: itemClicked.previousElementSibling.children[0].textContent,
        name: itemClicked.previousElementSibling.children[1].textContent,
        price: itemClicked.previousElementSibling.children[2].textContent,
        quantity: 1,
      };

      let index = isExisted(listItem, newItem);
      if (index == -1) {
        listItem.push(newItem);
      }
      else {
        listItem[index].quantity++;
      }

      localStorage.setItem('cartItems', JSON.stringify(listItem));
      window.location.reload();
    }
    else {
      alert('Local storage is not working on your browser');
    }
  }

  
  
  const attachingEvent = evt => evt.addEventListener('click', selectedItem);

  const add2Cart = document.getElementsByClassName('button-add-to-cart');
  let arrItem = Array.from(add2Cart);
  arrItem.forEach(attachingEvent);


  const shoppingCart = document.querySelector('.shopping-cart');
  shoppingCart.addEventListener('click', function() {
    location.href = 'showcart.html';
  })

  // number of ordered items
  if (localStorage.cartItems != undefined) {
    let numberOfOrderedItems = document.querySelector('.ordered-items');
    let count = 0;
    listItem.forEach(item => {
      count += item.quantity;
    })
    numberOfOrderedItems.innerHTML = count;
  }
}

function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}

function showCart(){
  if (JSON.parse(localStorage.getItem('cartItems')) == null) {
    alert('Your cart is empty. Please go back homepage to order items.');
    location.href = "shopingcart.html"; 
  } else {  
    let custommerCart = JSON.parse(localStorage.getItem('cartItems'));
    const tblHead = document.getElementsByTagName('thead')[0];
    const tblBody = document.getElementsByTagName('tbody')[0];
    const tblHFoot = document.getElementsByTagName('tfoot')[0];
    let headColumns = bodyRows = footColumns = '';
    headColumns += '<tr><th>No</th><th>Item Id</th><th>Item Name</th> <th>Quantity</th><th>Item Price</th><th>Delete</th></tr>';
    tblHead.innerHTML = headColumns;
    vat = total = amountPaid = 0;
    no = 0; /* ordinalNumber = 0; */
    if (custommerCart[0] === null) {
      bodyRows += '<tr><td colspan="5">No items found</td></tr>'
    } else {
      custommerCart.forEach(item => {
        total += Number(item.quantity) * Number(item.price.replace(/[^0-9]/g, ""));
        bodyRows += '<tr><td>' + ++no + '</td><td>' + item.id + '</td><td>' + item.name + '</td><td>' + item.quantity + '</td><td>' + item.price + '$' + '</td><td><a href="#" onclick=deleteCart(this);>Delete</a></td></tr>';
      });
    }

    tblBody.innerHTML = bodyRows;
    footColumns += '<tr><td colspan="4">Total:</td> <td>' + total + '$' + '</td><td rowspan="3"</td></tr>';
    footColumns += '<tr><td colspan="4">VAT:</td> <td>' + roundToTwo(total * 0.1) + '$' + '</td><td rowspan="3"</td></tr>';
    footColumns += '<tr><td colspan="4">Amount paid:</td> <td>' + roundToTwo(total * 1.1) + '$' + '</td><td rowspan="3"</td></tr>';

    tblHFoot.innerHTML = footColumns;

  }
}

function deleteCart(evt) {
  let updatedCart = []; 
  let custommerCart = JSON.parse(localStorage.getItem('cartItems'));
  custommerCart.forEach(item => {
    if(item.id != evt.parentElement.parentElement.children[1].textContent){ 
      updatedCart.push(item);
    }
  });
  localStorage.setItem('cartItems',JSON.stringify(updatedCart));
  window.location.reload();
};
  