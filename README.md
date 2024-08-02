# Hướng Dẫn Cài Đặt và Sử Dụng Prometheus và Grafana trên Docker


## Giới thiệu
# Dự án này cung cấp hướng dẫn cài đặt và sử dụng Prometheus và Grafana, Alertmanager, bằng Docker trên Ubuntu. Prometheus là một hệ thống giám sát và cảnh báo mã nguồn mở, còn Grafana là một công cụ phân tích và hiển thị dữ liệu. Và Alertmanager để gửi thông báo đến telegram

## Yêu cầu
- Ubuntu
- Docker
- Docker Compose


## Cài đặt

### 1. Cài đặt Docker và Docker Compose
Trước hết, bạn cần cài đặt Docker và Docker Compose:
```bash
sudo apt update
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker

sudo apt install -y docker-compose
```
### 2. Tạo thư mục dự án và cấu hình Docker Compose
```bash
mkdir prometheus-grafana
cd prometheus-grafana 
```
Với cấu trúc sau thư mục như sau
    
```bash
prometheus-grafana/
├── alertmanager/
│   └── alertmanager.yml
├── grafana/
│   └── provisioning/
│       └── datasources
│           └── prometheus.yml
├── prometheus/
│   ├── rules/ 
│   │   └── alert.rules.yml
│   └── prometheus.yml
├── docker-compose.yml
├── webhook.py
└── README.md
```

Mô tả thư mục
* prometheus-grafana/: Thư mục gốc dự án
    - alertmanager/
        - alertmanager.yml: file chứa các cấu hình cho Alertmanager
    - grafana/
        - provisioning/
            - datasources/
                - prometheus.yml: file chưa các cấu hình săn về datasources cho Grafana
    - prometheus/
        - rules/ 
            - alert.rules.yml: phần chưa các cấu hình cảnh báo của Prometheus
        - prometheus.yml: phần chưa các cấu hình, định nghĩa các job và các target để giám sát của Prometheus.
    - docker-compose.yml: File cấu hình Docker Compose để định nghĩa và chạy các dịch vụ Prometheus và Grafana, Alertmanager.
    - webhook.py: Để cải thiện giao diện cho thông báo chung tôi sử dụng python để làm webhook giưa alertmanager và telegram, để  nhận thông báo từ alertmanager chỉnh sửa giao diện trc khi gửi qua telegram





    