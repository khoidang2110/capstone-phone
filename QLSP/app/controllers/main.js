
var validation = new Validation();
var service = new Service();

function getEle(id){
    return document.getElementById(id);
}

function fetchData(){
service.getListPhone()

.then(function(result){
   renderHTML(result.data);
})
.catch(function(error){
    console.log(error);
});
}
fetchData();

function renderHTML(data){
    var content = ``;
    data.forEach(function(phone,index){
        content+=`
        <tr>
            <td>${index+1}</td>
            <td>${phone.type}</td>
            <td>${phone.name}</td>
            <td>${phone.price}</td>
            <td>${phone.screen}</td>
            <td>${phone.frontCamera}</td>
            <td>${phone.backCamera}</td>
            <td><img src="${phone.img}" width="50px"></td>
            <td>${phone.desc}</td>
            <td>
            <button class="btn btn-info"  data-toggle="modal" data-target="#myModal" onclick="editPhone(${phone.id})">Edit</button>
            <button class="btn btn-danger" onclick="deletePhone(${phone.id})">Delete</button>
           
            </td>
        </tr>
        `
    } );
    getEle("tblDanhSachSanPham").innerHTML = content;
}

/**
 * Delete
 */

function deletePhone(id){
   service.deletePhoneApi(id)
   .then(function(){
    //render list data
   fetchData();
   
   })
   .catch(function(error){
    console.log(error);
   });
}

getEle("btnThemSp").addEventListener("click", function(){
    //Sửa title
    //dom class phan tu thu 0
    document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm Sản phẩm";

    //tạo nút "add"
    var btnAdd = `<button class="btn btn-success" onclick="addPhone()">Add</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;

getEle("loaiSp").value = '';
getEle("tenSp").value = '';
getEle("giaSp").value = '';
getEle("manHinh").value = '';
getEle("camSau").value = '';
getEle("camTruoc").value = '';
getEle("hinhAnh").value = '';
getEle("moTa").value = '';
});

/**
 * Add phone
 */

function addPhone(){

var loaiSp = getEle("loaiSp").value;
var tenSp = getEle("tenSp").value;
var giaSp = getEle("giaSp").value;
var manHinh = getEle("manHinh").value;
var camSau = getEle("camSau").value;
var camTruoc = getEle("camTruoc").value;
var hinhAnh = getEle("hinhAnh").value;
var moTa = getEle("moTa").value;


var isValid = true;

isValid &= validation.checkSelect(
  "loaiSp",
  "tbLoaiSp",
  "(*) Vui lòng chọn loại sản phẩm"
  );

isValid &=
      validation.kiemTraRong(
        tenSp,
        "tbTenSp",
        "(*) Vui lòng nhập tên sản phẩm"
      );
isValid &=
validation.kiemTraSo(giaSp, "tbGiaSp", "(*) Vui lòng nhập số")&&validation.kiemTraRong(
  giaSp, "tbGiaSp", "(*) Vui lòng nhập giá");

isValid &=
validation.kiemTraRong(
  manHinh,
  "tbManHinh",
  "(*) Vui lòng nhập kích thước màn hình"
);
isValid &=
validation.kiemTraRong(camSau, "tbCamSau", "(*) Vui lòng không để trống");
isValid &=
validation.kiemTraRong(camTruoc, "tbCamTruoc", "(*) Vui lòng không để trống");

isValid &=
validation.kiemTraRong(hinhAnh, "tbHinhAnh", "(*) Vui lòng không để trống");
isValid &=
validation.kiemTraRong(moTa, "tbMoTa", "(*) Vui lòng không để trống") &&
validation.kiemTraDoDaiKiTu(
  moTa,
  "tbMoTa",
  "(*)Vui lòng nhập từ 1-60 ký tự",
  1,
  60
);

///cach phu dinh chi 1 dong
 if (!isValid) return null;

 


   // up len mock ko can id, backend lo
   var phone = new Phone(tenSp,giaSp,manHinh,camSau,camTruoc,hinhAnh,moTa,loaiSp,"");
   service.addPhoneApi(phone)
   .then(function(){
    //them xong goi lai lam fetch de lam moi
fetchData();
//dong modal
getEle("loaiSp").value = '';
getEle("tenSp").value = '';
getEle("giaSp").value = '';
getEle("manHinh").value = '';
getEle("camSau").value = '';
getEle("camTruoc").value = '';
getEle("hinhAnh").value = '';
getEle("moTa").value = '';

document.getElementsByClassName("close")[0].click();
   })
   .catch(function(error){
    console.log(error);
   })
}

/**
 * Edit user
 */
function editPhone(id){
    document.getElementsByClassName("modal-title")[0].innerHTML = "Update Phone";

    var btnUpdate = `<button class="btn btn-success" onclick="updatePhone(${id})">Update</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;
    
    service.getPhoneById(id)
   .then(function(result){
  
getEle("loaiSp").value = result.data.type;
getEle("tenSp").value = result.data.name;
getEle("giaSp").value = result.data.price;
getEle("manHinh").value = result.data.screen;
getEle("camSau").value = result.data.backCamera;
getEle("camTruoc").value = result.data.frontCamera;
getEle("hinhAnh").value = result.data.img;
getEle("moTa").value = result.data.desc;



   })
   .catch(function(error){
    console.log(error);
   });

   
}

/**
 * Update Phone
 */

function updatePhone(id){
  var loaiSp = getEle("loaiSp").value;
  var tenSp = getEle("tenSp").value;
  var giaSp = getEle("giaSp").value;
  var manHinh = getEle("manHinh").value;
  var camSau = getEle("camSau").value;
  var camTruoc = getEle("camTruoc").value;
  var hinhAnh = getEle("hinhAnh").value;
  var moTa = getEle("moTa").value;
    
    var isValid = true;


    isValid &= validation.checkSelect(
      "loaiSp",
      "tbLoaiSp",
      "(*) Vui lòng chọn loại sản phẩm"
      );
    
    isValid &=
          validation.kiemTraRong(
            tenSp,
            "tbTenSp",
            "(*) Vui lòng nhập tên sản phẩm"
          );
    isValid &=
    validation.kiemTraSo(giaSp, "tbGiaSp", "(*) Vui lòng nhập số")&&validation.kiemTraRong(
      giaSp, "tbGiaSp", "(*) Vui lòng nhập giá");
    
    isValid &=
    validation.kiemTraRong(
      manHinh,
      "tbManHinh",
      "(*) Vui lòng nhập kích thước màn hình"
    );
    isValid &=
    validation.kiemTraRong(camSau, "tbCamSau", "(*) Vui lòng không để trống");
    isValid &=
    validation.kiemTraRong(camTruoc, "tbCamTruoc", "(*) Vui lòng không để trống");
    
    isValid &=
    validation.kiemTraRong(hinhAnh, "tbHinhAnh", "(*) Vui lòng không để trống");
    isValid &=
    validation.kiemTraRong(moTa, "tbMoTa", "(*) Vui lòng không để trống") &&
    validation.kiemTraDoDaiKiTu(
      moTa,
      "tbMoTa",
      "(*)Vui lòng nhập từ 1-60 ký tự",
      1,
      60
    );

///cach phu dinh chi 1 dong
 if (!isValid) return null;
     
    
    
   // up len mock ko can id, backend lo
   var phone = new Phone(tenSp,giaSp,manHinh,camSau,camTruoc,hinhAnh,moTa,loaiSp,id);
   service.updatePhoneApi(phone)
   .then(function(){
    //them xong goi lai lam fetch de lam moi
fetchData();
//dong modal
getEle("loaiSp").value = '';
getEle("tenSp").value = '';
getEle("giaSp").value = '';
getEle("manHinh").value = '';
getEle("camSau").value = '';
getEle("camTruoc").value = '';
getEle("hinhAnh").value = '';
getEle("moTa").value = '';

document.getElementsByClassName("close")[0].click();
   })
   .catch(function(error){
    console.log(error);
   })
}

