# Thêm Dashboard vào Grafana
### 1. Tạo Dashboard Mới 

- Bước 1: Đăng nhập vào Grafana
    - Đăng nhập với thông tin mặc định:
        - Username: admin
        - Password: admin

- Bước 2: Tạo Dashboard Mới
    - Trên giao diện chính của Grafana, nhấp vào biểu tượng + ở thanh bên trái.
    - Chọn Dashboard.
    - Nhấp vào Add new panel để thêm các biểu đồ hoặc bảng vào dashboard của bạn.

- Bước 3: Cấu hình Panel
    - Chọn loại panel bạn muốn (ví dụ: Graph, Singlestat, Table, v.v.).
    - Cấu hình dữ liệu cho panel bằng cách chọn nguồn dữ liệu và nhập truy vấn Prometheus của bạn.
    - Tùy chỉnh các cài đặt hiển thị, tiêu đề, và các thuộc tính khác.

- Bước 4: Lưu Dashboard
    - Nhấp vào biểu tượng đĩa lưu ở góc trên bên phải.
    - Đặt tên cho dashboard và nhấp vào Save.

### 2. Nhập Dashboard từ JSON

Grafana cho phép bạn nhập các dashboard từ tệp JSON, điều này hữu ích nếu bạn có các dashboard được cấu hình sẵn hoặc muốn chia sẻ cấu hình dashboard với người khác.
- Bước 1: Tải Dashboard JSON
    - Nếu bạn có một tệp JSON cho dashboard, hãy chuẩn bị tệp đó. Bạn có thể tải các dashboard JSON từ trang Grafana hoặc từ cộng đồng.
- Bước 2: Nhập Dashboard JSON
    - Trên giao diện chính của Grafana, nhấp vào biểu tượng + ở thanh bên trái.
    - Chọn Import.
    - Chọn tệp JSON từ máy tính của bạn hoặc dán mã JSON vào ô nhập.
    - Chọn nguồn dữ liệu tương ứng cho dashboard và nhấp vào Import.

### 3. Tạo Dashboard từ Mẫu (Templates)
Grafana cung cấp nhiều mẫu dashboard có sẵn mà bạn có thể tùy chỉnh.
- Bước 1: Truy cập Grafana Dashboard Directory
    - Truy cập Grafana Dashboard Directory để tìm kiếm các dashboard mẫu phù hợp với nhu cầu của bạn.
- Bước 2: Nhập Mẫu Dashboard
    - Mở dashboard mẫu bạn muốn.
    - Sao chép ID của dashboard (có thể thấy ở URL của dashboard mẫu).
    - Vào Grafana và chọn + > Import.
    - Dán ID vào ô nhập hoặc tải tệp JSON tương ứng nếu có sẵn.
    -  Chọn nguồn dữ liệu phù hợp và nhấp vào Import.
### 4. Quản lý Dashboard
- Bước 1: Sắp xếp và Tổ chức
    - Đặt tên và mô tả cho các dashboard để dễ dàng quản lý.
    - Sử dụng thư mục để tổ chức các dashboard liên quan.