# Hướng dẫn Cài đặt và Sử dụng Grafana và Prometheus trên Ubuntu

## Giới thiệu

Hướng dẫn này cung cấp các bước để cài đặt và cấu hình Prometheus và Grafana trên hệ điều hành Ubuntu. Prometheus là một hệ thống giám sát và cảnh báo mã nguồn mở, trong khi Grafana là một công cụ trực quan hóa dữ liệu phổ biến.

## Cài đặt Prometheus

### 1. Cập nhật hệ thống
```bash
sudo apt update
sudo apt upgrade
```
### 2. Tải và cài đặt Prometheus

```bash
# Tải phiên bản mới nhất.
wget https://github.com/prometheus/prometheus/releases/download/v2.47.0/prometheus-2.47.0.linux-amd64.tar.gz

# Giải nén và di chuyển thư mục:
tar xvf prometheus-2.47.0.linux-amd64.tar.gz
sudo mv prometheus-2.47.0.linux-amd64 /usr/local/prometheus

# Tạo người dùng và nhóm cho Prometheus
sudo useradd --no-create-home --shell /bin/false prometheus

# Cấp quyền sở hữu cho các tập tin Prometheus
sudo chown -R prometheus:prometheus /usr/local/prometheus

# Tạo tệp cấu hình Prometheus
sudo nano /usr/local/prometheus/prometheus.yml
    
    # thêm phần cấu hình mặc định sau
    global:
    scrape_interval: 15s

    scrape_configs:
        - job_name: 'prometheus'
        static_configs:
            - targets: ['localhost:9090']

# Tạo tệp dịch vụ systemd:
sudo nano /etc/systemd/system/prometheus.service

    # thêm phần cấu hình mặc định sau 
    [Unit]
    Description=Prometheus
    Documentation=https://prometheus.io/docs/introduction/overview/
    After=network.target
    
    [Service]
    User=prometheus
    Group=prometheus
    ExecStart=/usr/local/prometheus/prometheus 
    --config.file=/usr/local/prometheus/prometheus.yml
    
    [Install]
    WantedBy=multi-user.target
```
Khởi động và bật dịch vụ Prometheus
```bash
sudo systemctl daemon-reload
sudo systemctl start prometheus
sudo systemctl enable prometheus
```
Kiểm tra Prometheus
- Truy cập Prometheus qua trình duyệt: http://localhost:9090

## Cài đặt Grafana
```bash
# Thêm kho lưu trữ Grafana
sudo apt install -y software-properties-common
sudo add-apt-repository "deb https://packages.grafana.com/oss/deb stable main"
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -

# Cài đặt Grafana
sudo apt update
sudo apt install grafana

#Khởi động và bật dịch vụ Grafana
sudo systemctl start grafana-server
sudo systemctl enable grafana-server
```
Kiểm tra Grafana
- Truy cập Grafana qua trình duyệt: http://localhost:3000
    - Đăng nhập với thông tin mặc định:
        - Username: admin
        - Password: admin

## Kết nối Grafana với Prometheus
- Đăng nhập vào Grafana
- Thêm nguồn dữ liệu Prometheus
    - Truy cập Configuration (biểu tượng bánh răng) > Data Sources.
    - Nhấp vào nút Add data source.
    - Chọn Prometheus.
    - Cấu hình URL:
        - URL: http://localhost:9090
    - Nhấp vào Save & Test để kiểm tra kết nối.
- Tạo Dashboard
    - Truy cập + > Dashboard > Add new panel.
    - Chọn nguồn dữ liệu Prometheus và cấu hình truy vấn để hiện thị dữ liệu.

