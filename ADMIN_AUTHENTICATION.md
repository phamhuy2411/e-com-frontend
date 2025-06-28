# Admin Authentication System

## Tổng quan

Hệ thống xác thực admin đã được cải thiện để bảo vệ các trang admin và đảm bảo chỉ những user có quyền admin mới có thể truy cập. Admin panel có trang đăng nhập riêng biệt hoàn toàn độc lập với trang đăng nhập của user thường.

## Các Component

### 1. AdminRoute (`src/components/admin/AdminRoute.jsx`)
- Component chính để bảo vệ các route admin
- Kiểm tra user đã đăng nhập và có quyền admin
- Redirect về `/admin/login` nếu chưa đăng nhập
- Hiển thị AccessDenied nếu không có quyền admin

### 2. AdminLogin (`src/components/admin/AdminLogin.jsx`)
- Trang đăng nhập riêng cho admin với giao diện độc lập
- Thiết kế dark theme với gradient background
- Redirect về `/admin` sau khi đăng nhập thành công

### 3. AdminLoginRoute (`src/components/admin/AdminLoginRoute.jsx`)
- Route guard cho trang admin login
- Redirect user đã đăng nhập admin về `/admin`
- Chỉ cho phép user chưa đăng nhập truy cập

### 4. useAdminAuth Hook (`src/hooks/useAdminAuth.js`)
- Custom hook để kiểm tra quyền admin
- Trả về các thông tin: `user`, `isAuthenticated`, `isAdmin`, `hasAdminAccess`

### 5. AccessDenied (`src/components/admin/AccessDenied.jsx`)
- Hiển thị khi user đã đăng nhập nhưng không có quyền admin
- Cung cấp các tùy chọn: Go to Home, Go Back, View Profile

### 6. AdminLoading (`src/components/admin/AdminLoading.jsx`)
- Hiển thị loading state khi đang kiểm tra quyền

### 7. AdminError (`src/components/admin/AdminError.jsx`)
- Hiển thị khi có lỗi xảy ra trong quá trình xác thực

## Cách sử dụng

### 1. Bảo vệ Route Admin
```jsx
// Trong App.jsx
<Route path="/admin/login" element={
  <AdminLoginRoute>
    <AdminLogin />
  </AdminLoginRoute>
} />
<Route path="/admin" element={<AdminRoute />}>
  <Route index element={<AdminDashboard />} />
  <Route path="categories" element={<CategoryList />} />
  <Route path="products" element={<ProductList />} />
</Route>
```

### 2. Kiểm tra quyền admin trong component
```jsx
import { useAdminAuth } from '../hooks/useAdminAuth';

const MyComponent = () => {
  const { isAuthenticated, hasAdminAccess, user } = useAdminAuth();
  
  if (!hasAdminAccess) {
    return <AccessDenied />;
  }
  
  return <div>Admin content</div>;
};
```

### 3. Hiển thị thông tin user trong admin header
```jsx
import { useAdminAuth } from '../hooks/useAdminAuth';

const AdminHeader = () => {
  const { user } = useAdminAuth();
  
  return (
    <div>
      <span>{user?.username || 'Admin User'}</span>
    </div>
  );
};
```

## Cấu trúc User Object (Backend Response)

Backend trả về `UserInfoResponse` với cấu trúc:

```javascript
// Response từ /api/auth/signin
{
  id: 1,
  username: "admin_user",
  roles: ["ROLE_ADMIN", "ROLE_USER"]  // List<String> từ userDetails.getAuthorities()
}

// Response từ /api/auth/user
{
  id: 1,
  username: "admin_user", 
  roles: ["ROLE_ADMIN", "ROLE_USER"]
}
```

### Các Role được hỗ trợ:
- `ROLE_USER` - User thường
- `ROLE_ADMIN` - Administrator (có quyền truy cập admin panel)
- `ROLE_SELLER` - Seller (có thể thêm trong tương lai)

## Luồng xác thực

1. **User truy cập `/admin`**: 
   - Nếu chưa đăng nhập → Redirect về `/admin/login`
   - Nếu đã đăng nhập nhưng không có quyền admin → Hiển thị `AccessDenied`
   - Nếu có quyền admin → Truy cập admin panel

2. **User truy cập `/admin/login`**:
   - Nếu chưa đăng nhập → Hiển thị trang admin login
   - Nếu đã đăng nhập admin → Redirect về `/admin`
   - Nếu đã đăng nhập nhưng không phải admin → Redirect về `/admin` (sẽ hiển thị AccessDenied)

3. **Đăng nhập thành công**: Redirect về `/admin`

## Tùy chỉnh

### Thay đổi logic kiểm tra admin
Chỉnh sửa file `src/hooks/useAdminAuth.js`:

```javascript
const isAdmin = user && (
  user.roles?.includes('ROLE_ADMIN') || 
  user.role === 'ROLE_ADMIN' ||
  user.authorities?.some(auth => auth.authority === 'ROLE_ADMIN') ||
  user.isAdmin === true ||
  // Thêm logic tùy chỉnh ở đây
  user.customAdminField === true
);
```

### Thay đổi giao diện Admin Login
Chỉnh sửa file `src/components/admin/AdminLogin.jsx`:
- Thay đổi màu sắc, layout
- Thêm logo công ty
- Tùy chỉnh validation messages

### Thay đổi giao diện
- Chỉnh sửa các component trong `src/components/admin/`
- Có thể tùy chỉnh màu sắc, layout, và nội dung

## Bảo mật

- Tất cả các API admin đều yêu cầu xác thực
- Frontend chỉ là lớp bảo vệ UI, backend vẫn cần kiểm tra quyền
- Sử dụng `withCredentials: true` trong axios để gửi cookies
- JWT token được lưu trong cookie (httpOnly) thay vì localStorage
- Admin login page hoàn toàn độc lập với user login

## Backend Integration

### API Endpoints:
- `POST /api/auth/signin` - Đăng nhập
- `POST /api/auth/signup` - Đăng ký
- `GET /api/auth/user` - Lấy thông tin user hiện tại
- `POST /api/auth/signout` - Đăng xuất

### Authentication Flow:
1. User truy cập `/admin` → Redirect về `/admin/login`
2. User đăng nhập qua `/api/auth/signin`
3. Backend trả về JWT cookie và UserInfoResponse
4. Frontend lưu user info vào Redux store
5. Redirect về `/admin`
6. AdminRoute kiểm tra `user.roles.includes('ROLE_ADMIN')`
7. Nếu có quyền admin → truy cập admin panel
8. Nếu không có quyền → hiển thị AccessDenied

## URLs

### Admin URLs:
- `/admin/login` - Trang đăng nhập admin
- `/admin` - Admin dashboard
- `/admin/categories` - Quản lý categories
- `/admin/products` - Quản lý products

### User URLs:
- `/login` - Trang đăng nhập user thường
- `/register` - Trang đăng ký user

## Lưu ý

- Backend sử dụng Spring Security với JWT cookies
- Roles được trả về dưới dạng `List<String>` từ `userDetails.getAuthorities()`
- Đảm bảo backend trả về đúng cấu trúc UserInfoResponse
- Admin panel hoàn toàn độc lập với user interface
- Test kỹ các trường hợp: chưa đăng nhập, đã đăng nhập nhưng không phải admin, và admin 