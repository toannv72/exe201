
export const routs = {
  "/": { link: "/", name: "Home" },
  "/login": { link: "/login", name: "Đăng nhập" },
  "/reissue": { link: "/reissue", name: "Tạo tài khoản" },
  "/createProduct": { name: 'Tạo dịch vụ', name2: 'ADMIN', link: '/staff/product/create', },
  "/tableProduct": { name: 'Quản lý dịch vụ', link: '/staff/product/table', },
  "/tableOrder": { name: 'Đơn Hàng', link: '/staff/order', },
  "/logout": { name: 'Đăng Xuất', link: '/logout', },
  "/order": { name: 'Đơn hàng', link: '/order', },
  "/orderRequest": { name: 'Đơn hàng theo yêu cầu', link: '/staff/orderRequest', },
  "/showAll": { name: 'Tất cả đơn hàng', link: '/showAll', },
};
