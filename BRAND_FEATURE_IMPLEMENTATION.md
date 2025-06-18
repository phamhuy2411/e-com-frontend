# Brand Feature Implementation

## Tổng quan
Đã thêm tính năng brand filter vào frontend e-commerce để người dùng có thể lọc sản phẩm theo brand.

## Các thay đổi đã thực hiện

### 1. Redux Store Updates

#### `src/store/reducers/ProductReducer.js`
- Thêm `brands: null` vào `initialState`
- Thêm case `FETCH_BRANDS` để lưu brands vào state
- Thêm case `RESET_BRANDS` để reset brands

#### `src/store/actions/index.js`
- Thêm `fetchBrands()` action để fetch tất cả brands
- Thêm `fetchBrandsByCategory(categoryName)` action để fetch brands theo category

### 2. API Integration

#### `src/hooks/useProductFilter.js`
- Thêm xử lý brand parameter trong URL query
- Brand parameter sẽ được gửi đến backend API

### 3. UI Components

#### `src/components/products/Filter.jsx`
- Thêm `brands` prop vào component
- Thêm `brand` state và `handleBrandChange` function
- Thêm Brand Selection dropdown UI
- Cập nhật PropTypes để include brands

#### `src/components/products/Products.jsx`
- Import `fetchBrands` action
- Thêm `brands` vào selector
- Dispatch `fetchBrands()` trong useEffect
- Pass `brands` prop xuống Filter component

## API Endpoints Sử dụng

Backend cần cung cấp các endpoints sau:

1. `GET /api/public/brands` - Lấy tất cả brands
2. `GET /api/public/category/{categoryName}/brands` - Lấy brands theo category
3. `GET /api/public/products?brand={brandName}` - Lọc sản phẩm theo brand

## Cách sử dụng

1. Brand filter sẽ xuất hiện trong sidebar filter
2. Người dùng có thể chọn "All" hoặc một brand cụ thể
3. URL sẽ được cập nhật với brand parameter
4. Sản phẩm sẽ được lọc theo brand đã chọn

## Cấu trúc Brand Data

Brand object cần có cấu trúc:
```javascript
{
  brandId: string,
  brandName: string
}
```

## Testing

- Build thành công không có lỗi
- Dev server chạy bình thường
- Tất cả PropTypes đã được cập nhật đúng
- Không ảnh hưởng đến logic hiện tại của các component khác 