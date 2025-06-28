# Admin Authentication Debug Guide

## Vấn đề đã được fix:

### 1. **Response Interceptor (src/api/api.js)**
- ✅ Thêm delay 500ms trước khi redirect để tránh redirect quá nhanh
- ✅ Kiểm tra lại trước khi redirect để tránh redirect không cần thiết
- ✅ Không redirect nếu đã ở trang login

### 2. **Admin Authentication Hook (src/hooks/useAdminAuth.js)**
- ✅ Thêm kiểm tra fallback cho các format role khác nhau
- ✅ Hỗ trợ cả array và string roles
- ✅ Kiểm tra nhiều format admin role khác nhau

### 3. **Admin Route Protection (src/components/admin/AdminRoute.jsx)**
- ✅ Thêm kiểm tra localStorage để fetch user data nếu cần
- ✅ Cải thiện logic loading state

### 4. **Admin Actions (src/store/actions/adminActions.js)**
- ✅ Thêm action `authenticateAdminUser` riêng cho admin
- ✅ Kiểm tra role admin trước khi cho phép login
- ✅ Thêm retry logic cho lỗi 401
- ✅ Cải thiện error handling

### 5. **Admin Login Component (src/components/admin/AdminLogin.jsx)**
- ✅ Sử dụng action `authenticateAdminUser` thay vì action thông thường

## Cách kiểm tra và debug:

### 1. **Kiểm tra Console Browser**
```javascript
// Mở Developer Tools (F12) và chạy các lệnh sau:
console.log('Auth State:', JSON.parse(localStorage.getItem('auth')));
console.log('Current User:', store.getState().auth.user);
console.log('Admin Access:', useAdminAuth());
```

### 2. **Kiểm tra Network Tab**
- Xem API call `/auth/signin` có thành công không
- Kiểm tra response có chứa role admin không
- Xem API call tạo sản phẩm có lỗi gì không

### 3. **Kiểm tra localStorage**
```javascript
// Trong console browser
localStorage.getItem('auth') // Phải có roles chứa ADMIN
```

### 4. **Test Cases để kiểm tra:**

#### Test 1: Login Admin
1. Vào `/admin/login`
2. Đăng nhập với tài khoản admin
3. Kiểm tra xem có redirect về `/admin` không
4. Kiểm tra localStorage có lưu user info không

#### Test 2: Thêm sản phẩm
1. Đăng nhập admin thành công
2. Vào trang Products
3. Click "Add Product"
4. Điền form và submit
5. Kiểm tra xem có bị redirect về login không

#### Test 3: Kiểm tra token
1. Mở Developer Tools > Application > Cookies
2. Kiểm tra có JWT token không
3. Kiểm tra token có expired không

## Các format role admin được hỗ trợ:

```javascript
// Format 1: Array với ROLE_ADMIN
user.roles = ['ROLE_ADMIN', 'ROLE_USER']

// Format 2: String role
user.role = 'ROLE_ADMIN'

// Format 3: Authorities array
user.authorities = [{authority: 'ROLE_ADMIN'}]

// Format 4: Boolean flag
user.isAdmin = true

// Format 5: Array với ADMIN (không có ROLE_)
user.roles = ['ADMIN', 'USER']

// Format 6: String với ADMIN
user.roles = 'ADMIN'
```

## Nếu vẫn còn vấn đề:

### 1. **Kiểm tra Backend Response**
```javascript
// Trong console, sau khi login admin
console.log('Login Response:', response);
// Kiểm tra cấu trúc roles trong response
```

### 2. **Kiểm tra API Endpoints**
- `/auth/signin` - Login endpoint
- `/auth/user` - Get current user
- `/admin/categories/{id}/brands/{id}/product` - Create product

### 3. **Thêm Debug Logs**
```javascript
// Thêm vào useAdminAuth.js
console.log('User data:', user);
console.log('Is admin check:', isAdmin);
console.log('Has admin access:', hasAdminAccess);
```

### 4. **Kiểm tra CORS và Cookies**
- Đảm bảo `withCredentials: true` trong axios config
- Kiểm tra backend có set cookie đúng không
- Kiểm tra CORS configuration

## Lệnh để test nhanh:

```bash
# Kiểm tra build
npm run build

# Chạy development
npm run dev

# Kiểm tra lint
npm run lint
```

## Contact Support:
Nếu vẫn gặp vấn đề, hãy cung cấp:
1. Console errors
2. Network requests logs
3. Backend response structure
4. Browser và version
5. Steps to reproduce 