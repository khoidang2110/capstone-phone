function getEle(id) {
  return document.getElementById(id);
}


var phoneList = new PhoneList();
var cartPhone= [];

const fetchList = function () {
  axios({
      url: "https://6302e6ca9eb72a839d755c30.mockapi.io/cyberphone/phone",
      method: "GET",
  })
      .then(function (res) {
          phoneList.arrProduct = res.data;
          
          renderHTML();
          // getLocalStorage();
      })
      .catch(function (err) {
      });
};
fetchList();

function renderHTML(dataProduct = phoneList.arrProduct) {
  let content = "";
  dataProduct.forEach(function (phone) {
      content += `
    <div class="col-12 col-md-6 col-lg-4">
    <div class="card cardPhone">
        <img src="${phone.img}" class="card-img-top" alt="...">
        <div class="card-body">
            <div class="d-flex justify-content-between">
                <div>
                    <h3 class="cardPhone__title ">${phone.name}</h3>
                    <p class="cardPhone__text">${phone.desc}</p>
                </div>
                <div>
                    <h3 class="cardPhone__title ">${phone.price}</h3>
                </div>
            </div>
            <div class="d-flex justify-content-between">
                <div class="cardPhone__rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                </div>
                <div>
                    <button class="btnPhone-shadow"   onclick="add_cart(${phone.id})"><i class="fa fa-shopping-cart"></i> Add</button>
                </div>
            </div>
        </div>
    </div>
</div>
    `;
  });

  getEle("product_content").innerHTML = content;
  
};

const renderCart = function (list = cartPhone) {
  var htmlContent = "";
  for (var i = 0; i < list.length; i++) {
      //template string
      htmlContent += `
      <tr>
          <td>
          <img
              style="width: 50px;"
              src="${list[i].product.img}"
          />
          </td>
          <td style="font-size: 15px;">${list[i].product.name}</td>
          <td>${parseInt(list[i].product.price).toLocaleString()}</td>
          <td>
          <span>${list[i].quantity} </span>
          
          </td>
          <td >${parseInt(
              +list[i].quantity * +list[i].product.price
          ).toLocaleString()} VND </td>
          <td>
          <button class="btn btn-danger" onclick="deleteCartItem(${list[i].product.id
          })">x</button>
          </td>
      </tr>
  `;
  }
  document.getElementById("cart-row").innerHTML = htmlContent;
  document.getElementById("total").innerHTML =
      sum().toLocaleString() + "VND";
  setLocalStorage();
};


const add_cart = function (id) {
  var indexProduct = findIndexProduct(id);
  var indexCart = findIndexCart(id);
  if (indexCart >= 0) {
      cartPhone[indexCart].quantity++;
  } else {
      var cartItem = {
          product: phoneList.arrProduct[indexProduct],
          quantity: 1,
      };
      cartPhone.push(cartItem);
  }
  renderCart(cartPhone);
};

const findIndexProduct = function (id) {
    for (var i = 0; i < phoneList.arrProduct.length; i++) {
        if (parseInt(phoneList.arrProduct[i].id) === parseInt(id)) {
            return i;
        }
    }
    return -1;
};
const findIndexCart = function (id) {
    for (var i = 0; i < cartPhone.length; i++) {
        if (parseInt(cartPhone[i].product.id) === parseInt(id)) {
            return i;
        }
    }
    return -1;
};

const sum = function () {
  var totalSum = 0;
  var quantity;
  var price;
  for (var i = 0; i < cartPhone.length; i++) {
      quantity = +cartPhone[i].quantity;
      price = +cartPhone[i].product.price;
      totalSum += quantity * price;
  }
  return totalSum;
};

const descendItem = function (id) {
  var index = findIndexCart(id);
  if (index !== -1) {
      if (parseInt(cartProduct[index].quantity) > 1) {
          cartProduct[index].quantity--;
      } else {
          deleteCartItem(id);
      }
  }
  renderCart(cartProduct);
};

const increaseItem = function (id) {
  var index = findIndexCart(id);
  if (index !== -1) {
      cartProduct[index].quantity++;
  }
  renderCart(cartProduct);
};


const deleteCartItem = function (id) {
  var index = findIndexCart(id);
  if (index !== -1) {
      cartPhone.splice(index, 1);
  }
  renderCart(cartPhone);
};

getLocalStorage();

function setLocalStorage() {
  // convert json ==> string
  var dataString = JSON.stringify(cartPhone);
  localStorage.setItem('ListCartProduct', dataString);

}

function getLocalStorage() {
  //Kiểm tra dữ liệu từ LocalStorage : null, ""
  if (localStorage.getItem('ListCartProduct')) {
      var dataString = localStorage.getItem('ListCartProduct');
      // convert string ==> JSON
      cartPhone = JSON.parse(dataString);
      // Hiển thị danh sách giỏ hàng ra ngoài giao diện
      renderCart(cartPhone);

  }
}

const purchaseCart = function () {
  cartPhone = [];
  var dataString = JSON.parse(localStorage.getItem('ListCartProduct'));
  if (dataString == "") {
      alert("Chưa có sản phẩm trong giỏ hàng");
  } else {
      localStorage.clear("ListCartProduct");
      renderCart(cartPhone);
      alert("Bạn đã thanh toán thành công");
  }
};


