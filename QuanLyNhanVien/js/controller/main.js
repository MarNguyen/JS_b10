//tao doi tuong dsnv
var dnsv = new DanhSachNhanVien();
var validation = new Validation();

getLocalStorage();

function getEle(id) {
  return document.getElementById(id);
}

function layThongTinNV(isAdd) {
  //Lấy thông tin từ user nhập
  var taiKhoan = getEle("tknv").value;
  var tenNV = getEle("name").value;
  var email = getEle("email").value;
  var matKhau = getEle("password").value;
  var ngayLam = getEle("datepicker").value;
  var luongCB = getEle("luongCB").value;
  var chucVu = getEle("chucvu").value;
  var gioLam = getEle("gioLam").value;

  
  //flag: cờ
  var isValid = true; //hợp lệ

  //Check Validation
  if (isAdd) {
    //tai khoan NV
    isValid &=
      validation.kiemTraRong(taiKhoan, "errortaiKhoan", "(*) Vui long nhap tai khoan NV") &&
      validation.kiemTraDoDaiKyTu(
        taiKhoan,
        "errortaiKhoan",
        "(*) Vui long nhap ky tu 4 - 6",
        4,
        6
      ) &&
      validation.kiemTraTrungTaiKhoan(
        taiKhoan,
        "errortaiKhoan",
        "(*) Tai Khoan da ton tai",
        dsnv.arr
      );
  }

  //tenNV
  isValid &=
    validation.kiemTraRong(tenNV, "errorTenNV", "(*) Vui long nhap tenNV") &&
    validation.kiemTraChuoiKitu(
      tenNV,
      "errortenNV",
      "(*) Vui long nhap chuoi ki tu"
    );

  //email
  isValid &=
    validation.kiemTraRong(email, "errorEmail", "(*) Vui long nhap email") &&
    validation.kiemTraEmail(
      email,
      "errorEmail",
      "(*) Vui long nhap email dung dinh dang"
    );

  //Matkhau
  isValid &= validation.kiemTraRong(
    matKhau,
    "errorMatKhau",
    "(*) Vui long nhap mat khau"
  );

  //ngay lam
  isValid &= validation.kiemTraRong(
    ngayLam,
    "errorNgayLam",
    "(*) Vui long nhap Ngay lam"
  );

  //chuc Vu
  isValid &= validation.kiemTraChonChucVu(
    "chucVu",
    "errorChucVu",
    "(*) Vui long chon chucVu"
  );

  //lương Cơ Bản
  isValid &= validation.kiemTraRong(
    luongCB,
    "errorLuongCB",
    "(*) Vui long nhap LuongCB"
  );

  //Gio Lam
  isValid &= validation.kiemTraRong(
    gioLam,
    "errorGioLam",
    "(*) Vui long nhap Gio Lam"
  );

  if (!isValid) return;

  //tạo đối tượng từ lớp đối tượng NhanVien
  var nv = new NhanVien(
    taiKhoan,
    tenNV,
    email,
    matKhau,
    ngayLam,
    luongCB,
    chucVu,
    gioLam,
  );

  nv.tinhTongLuong();

  return nv;
}

getEle("btnThemNV").onclick = function () {
    var nv = layThongTinNV(true);
  
    if (nv) {
      dsnv.themNV(nv);
  
      //render danh sách SV đã thêm ra UI
      renderTable(dsnv.arr);
  
      setLocalStorage();
    }
  };


  
function renderTable(data) {
    var content = "";
  
    for (var i = 0; i < data.length; i++) {
      var nv = data[i];
      content += `
          <tr>
              <td>${nv.taiKhoan}</td>
              <td>${nv.tenNV}</td>
              <td>${nv.email}</td>
              <td>${nv.ngayLam}</td>
              <td>${nv.chucVu}</td>
              <td>${nv.tongLuong}</td>
              <td>${nv.xepLoai}</td>
              <td>
                  <button class="btn btn-info" onclick="deleteSV('${nv.taiKhoan}')">Delete</button>
              </td>
          </tr>
      `;
    }
  
    getEle("tableDanhSach").innerHTML = content;
  }
  
  /**
   * Edit NV
   */
  function editSV(taiKhoan) {
    var nv = dsnv.layChiTietNV(taiKhoan);
    if (nv) {
      //Dom tới các thẻ input show value
      getEle("tknv").value = nv.taiKhoan;
      getEle("name").disabled = true;
  
      getEle("txtTenSV").value = sv.tenSV;
      getEle("email").value = sv.email;
      getEle("password").value = sv.matKhau;
      getEle("datepicker").value = sv.ngayLam;
      getEle("luongCB").value = sv.luongCB;
      getEle("chucvu").value = sv.chucVu;
      getEle("tbGiolam").value = sv.gioLam;
    }
  }
  
  /**
   * Update NV
   */
  getEle("btnCapNhat").addEventListener("click", function () {
    var nv = layThongTinNV(false);
    dsnv.capNhatNV(nv);
    renderTable(dsnv.arr);
    setLocalStorage();
  });
  
  /**
   * Delete NV
   */
  function deleteNV(taiKhoan) {
    //xoá NV
    dsnv.xoaNV(taiKhoan);
    //render lại table
    renderTable(dsnv.arr);
    //Lưu lại LocalStorage
    setLocalStorage();
  }
  
  /**
   * Tim kiem SV
   */
  getEle("searchName").addEventListener("keyup", function () {
    var keyword = getEle("searchName").value;
    var mangTimKiem = dsnv.timKiemNV(keyword);
    renderTable(mangTimKiem);
  });
  
  
  function setLocalStorage() {
    //Convert JSON => string
    var dataString = JSON.stringify(dsnv.arr);
    //lưu data xuống LocalStorage
    localStorage.setItem("DSNV", dataString);
  }
  
  function getLocalStorage() {
    if (localStorage.getItem("DSNV")) {
      var dataString = localStorage.getItem("DSNV");
      //Convert string => JSON
      dsnv.arr = JSON.parse(dataString);
      //render lại table
      renderTable(dsnv.arr);
    }
  }