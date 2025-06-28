# Admin Authentication Testing Guide

## Tổng quan

Hướng dẫn này sẽ giúp bạn test hệ thống xác thực admin để đảm bảo mọi thứ hoạt động đúng. Admin panel có trang đăng nhập riêng biệt tại `/admin/login`.

## Chuẩn bị Backend

### 1. Tạo User Admin
Đảm bảo backend có user với role `ROLE_ADMIN`:

```sql
-- Kiểm tra roles trong database
SELECT * FROM roles;

-- Tạo user admin (nếu chưa có)
INSERT INTO users (username, email, password) VALUES ('admin', 'admin@example.com', '$2a$10$...');

-- Gán role admin cho user
INSERT INTO user_roles (user_id, role_id) VALUES (1, 2); -- role_id của ROLE_ADMIN
```

### 2. Test API Endpoints
Test các API endpoints trước:

```bash
# Test đăng nhập
curl -X POST http://localhost:8080/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password"}' \
  -c cookies.txt

# Test lấy thông tin user
curl -X GET http://localhost:8080/api/auth/user \
  -b cookies.txt
```

## Test Cases

### Test Case 1: User chưa đăng nhập truy cập admin panel
**Mục tiêu**: Kiểm tra xem user chưa đăng nhập có được redirect về trang admin login không

**Các bước**:
1. Mở trình duyệt ở chế độ ẩn danh
2. Truy cập `http://localhost:3000/admin`
3. Xóa tất cả cookies và localStorage

**Kết quả mong đợi**:
- Tự động redirect về `http://localhost:3000/admin/login`
- Hiển thị trang admin login với dark theme
- Có form đăng nhập với username và password
- Có nút "Back to main site"

### Test Case 2: User đã đăng nhập nhưng không phải admin
**Mục tiêu**: Kiểm tra xem user thường có thể truy cập admin panel không

**Các bước**:
1. Đăng nhập với user thường (có role `ROLE_USER`) tại `/login`
2. Truy cập `http://localhost:3000/admin`

**Kết quả mong đợi**:
- Hiển thị trang `AccessDenied`
- Có thông báo "You don't have administrator privileges"
- Có các nút: Go to Home, Go Back, View Profile

### Test Case 3: User admin truy cập admin panel
**Mục tiêu**: Kiểm tra xem admin có thể truy cập admin panel không

**Các bước**:
1. Truy cập `http://localhost:3000/admin/login`
2. Đăng nhập với user admin (có role `ROLE_ADMIN`)
3. Kiểm tra redirect về `/admin`

**Kết quả mong đợi**:
- Truy cập được admin dashboard
- Hiển thị sidebar với các menu: Dashboard, Categories, Products, etc.
- Header hiển thị username và role "Administrator"

### Test Case 4: User đã đăng nhập admin truy cập admin login
**Mục tiêu**: Kiểm tra xem admin đã đăng nhập có bị redirect khi truy cập admin login không

**Các bước**:
1. Đăng nhập với user admin
2. Truy cập `http://localhost:3000/admin/login`

**Kết quả mong đợi**:
- Tự động redirect về `/admin`
- Không hiển thị trang admin login

### Test Case 5: Test logout từ admin panel
**Mục tiêu**: Kiểm tra chức năng logout

**Các bước**:
1. Đăng nhập với user admin
2. Truy cập admin panel
3. Click nút logout trong header

**Kết quả mong đợi**:
- Đăng xuất thành công
- Chuyển về trang admin login (`/admin/login`)
- Không thể truy cập admin panel nữa

### Test Case 6: Test refresh page
**Mục tiêu**: Kiểm tra xem authentication có được duy trì khi refresh không

**Các bước**:
1. Đăng nhập với user admin
2. Truy cập admin panel
3. Refresh trang (F5)

**Kết quả mong đợi**:
- Vẫn ở trong admin panel
- Không bị redirect về login
- User info vẫn được hiển thị đúng

### Test Case 7: Test navigation giữa admin và user pages
**Mục tiêu**: Kiểm tra xem admin có thể navigate giữa admin và user pages không

**Các bước**:
1. Đăng nhập với user admin
2. Truy cập admin panel
3. Click "Back to main site" từ admin login page
4. Truy cập `/admin` từ main site

**Kết quả mong đợi**:
- Có thể navigate giữa admin và user pages
- Admin authentication được duy trì
- Không bị logout khi chuyển đổi

## Debug Tips

### 1. Kiểm tra Redux State
Mở Redux DevTools và kiểm tra state:

```javascript
// Kiểm tra auth state
state.auth.user

// Kiểm tra user có roles không
state.auth.user.roles
```

### 2. Kiểm tra Network Requests
Mở Developer Tools > Network và kiểm tra:

- Request đến `/api/auth/signin`
- Request đến `/api/auth/user`
- Response có chứa `roles` array không

### 3. Kiểm tra Cookies
Mở Developer Tools > Application > Cookies và kiểm tra:

- Có JWT cookie không
- Cookie có httpOnly không
- Cookie có secure flag không (nếu dùng HTTPS)

### 4. Console Logs
Thêm console.log để debug:

```javascript
// Trong useAdminAuth hook
console.log('User:', user);
console.log('Is Admin:', isAdmin);
console.log('Has Admin Access:', hasAdminAccess);

// Trong AdminRoute
console.log('Current pathname:', window.location.pathname);
console.log('Is authenticated:', isAuthenticated);
```

## Common Issues

### Issue 1: User không có roles
**Triệu chứng**: User đăng nhập được nhưng không có quyền admin

**Nguyên nhân**: Backend không trả về `roles` trong response

**Giải pháp**:
- Kiểm tra backend response có chứa `roles` array không
- Đảm bảo user có role `ROLE_ADMIN` trong database

### Issue 2: CORS Error
**Triệu chứng**: Không thể gọi API từ frontend

**Giải pháp**:
- Cấu hình CORS trong backend
- Đảm bảo `withCredentials: true` trong axios config

### Issue 3: Cookie không được gửi
**Triệu chứng**: Authentication bị mất khi refresh

**Giải pháp**:
- Kiểm tra domain của cookie
- Đảm bảo frontend và backend cùng domain hoặc cấu hình CORS đúng

### Issue 4: Redirect loop
**Triệu chứng**: Bị redirect liên tục giữa `/admin` và `/admin/login`

**Nguyên nhân**: Logic kiểm tra authentication có vấn đề

**Giải pháp**:
- Kiểm tra logic trong AdminRoute và AdminLoginRoute
- Đảm bảo user state được load đúng từ localStorage

## Test Data

### User Admin
```json
{
  "username": "admin",
  "password": "admin123",
  "email": "admin@example.com",
  "roles": ["ROLE_ADMIN", "ROLE_USER"]
}
```

### User Normal
```json
{
  "username": "user",
  "password": "user123", 
  "email": "user@example.com",
  "roles": ["ROLE_USER"]
}
```

## URLs để Test

### Admin URLs:
- `http://localhost:3000/admin/login` - Trang đăng nhập admin
- `http://localhost:3000/admin` - Admin dashboard
- `http://localhost:3000/admin/categories` - Quản lý categories
- `http://localhost:3000/admin/products` - Quản lý products

### User URLs:
- `http://localhost:3000/login` - Trang đăng nhập user thường
- `http://localhost:3000/register` - Trang đăng ký user

## Automation Testing

### Jest Test Example
```javascript
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AdminRoute from '../components/admin/AdminRoute';
import { store } from '../store/reducers/store';

test('redirects to admin login for unauthenticated user', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <AdminRoute />
      </BrowserRouter>
    </Provider>
  );
  
  // Should redirect to /admin/login
  expect(window.location.pathname).toBe('/admin/login');
});

test('shows admin login page', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <AdminLogin />
      </BrowserRouter>
    </Provider>
  );
  
  expect(screen.getByText('Admin Panel')).toBeInTheDocument();
  expect(screen.getByText('Sign in to access the administration dashboard')).toBeInTheDocument();
});
```

## Performance Testing

### Load Testing
- Test với nhiều user cùng lúc truy cập admin panel
- Kiểm tra response time của API calls
- Monitor memory usage

### Security Testing
- Test SQL injection
- Test XSS attacks
- Test CSRF protection
- Test JWT token tampering
- Test admin login page isolation 