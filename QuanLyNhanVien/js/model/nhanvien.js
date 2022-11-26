function NhanVien (
_taiKhoan,
_tenNV,
_email,
_matKhau,
_ngayLam,
_luongCoBan,
_chucVu,
_gioLam,
_tongLuong,
_loaiNhanVien,
) {
    // property
this.taiKhoan = _taiKhoan;
this.tenNV = _tenNV;
this.email = _email;
this.matkhau = _matKhau;
this.ngayLam = _ngayLam;
this.luongCoBan = _luongCoBan;
this.chucVu = _chucVu;
this.gioLam = _gioLam;
this.tongLuong = 0;
this.loaiNhanVien = "";

// method
this.tinhTongLuong = function () {
if (this.chucVu === "Sếp") {
    this.tongLuong = parseFloat(this.luongCoBan) * 3
}
if (this.chucVu === "Trưởng phòng") {
    this.tongLuong = parseFloat(this.luongCoBan) * 2
}
if (this.chucVu === "Nhân viên") {
    this.tongLuong = parseFloat(this.luongCoBan) * 1
}
}
this.xepLoaiNhanVien = function () {
    if (this.gioLam >= 192) {
        this.loaiNhanVien = "nhân viên xuất sắc"
    } else {
        if (this.gioLam >= 176) {
            this.loaiNhanVien = "nhân viên giỏi"
        } else {
            if (this.gioLam >= 160) {
                this.loaiNhanVien = "nhân viên khá"
            } else {
                this.loaiNhanVien = "nhân viên trung bình"
            }
        }
    }
}
}