function DanhSachNhanVien() {
    this.arr = [];
  
    this.themNV = function (nv) {
      this.arr.push(nv);
    };
  
    this.timViTriNV = function (taiKhoan) {
      /**
       * Tim vi tri
       * 0. Tao bien index gan -1 (khong tim thay)
       * 1. Duyệt mảng
       *      => nv = arr[i]
       * 2. Nếu nv.maNV trùng với maNV
       *      => true => gán i cho biến index
       */
      var index = -1;
      for (var i = 0; i < this.arr.length; i++) {
        var nv = this.arr[i];
        if (nv.taiKhoan === taiKhoan) {
          index = i;
          break;
        }
      }
      return index;
    };
  
    this.xoaNV = function (taiKhoan) {
      var index = this.timViTriNV(taiKhoan);
  
      if (index !== -1) {
        this.arr.splice(index, 1);
      }
    };
  
    this.layChiTietNV = function (taiKhoan) {
      //Tim vi tri NV
      var index = this.timViTriNV(taiKhoan);
  
      if (index !== -1) {
        return this.arr[index];
      }
    };
  
    this.capNhatNV = function (nv) {
      //tim vi tri nv can update
      var index = this.timViTriNV(nv.taiKhoan);
  
      if (index !== -1) {
        this.arr[index] = nv;
      }
    };
  
    this.timKiemNV = function (keyword) {
      /**
       * 0. tạo mangTimKiem = []
       * 1. Duyệt mảng arr
       *      => nv = arr[i]
       * 2. Nếu nv.xepLoai trùng với keyword
       *      => true => push nv vào mangTimKiem
       * 3. trả về mangTimKiem
       */
      var mangTimKiem = [];
  
      for (var i = 0; i < this.arr.length; i++) {
        var nv = this.arr[i];
        //chuyển xepLoai về chự thường
        var xepLoaiLowerCase = nv.xepLoai.toLowerCase();
        var keywordLowerCase = keyword.toLowerCase();
        if (xepLoaiLowerCase.indexOf(keywordLowerCase) !== -1) {
          mangTimKiem.push(nv);
        }
      }
  
      return mangTimKiem;
    };
  }