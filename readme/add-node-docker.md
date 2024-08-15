# Hướng dẫn Cài đặt Node Exporter và Nginx auth trên Docker Compose

## 1. Cài đặt Docker và cài đặt Docker Compose 
### Bước 1: Cài đặt Docker trên ubuntu
Cập nhật danh sách gói và cài đặt các gói cần thiết:
```bash
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
```
Thêm GPG key cho Docker:
```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```
Thêm repository Docker vào APT sources:
```bash
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```
Cập nhật lại danh sách gói
```bash
sudo apt update
```
Cài đặt Docker:
```bash
sudo apt install docker-ce
```
Kiểm tra Docker đã được cài đặt thành công:
```bash
sudo systemctl status docker
```
### Bước 2: Cài đặt Docker Compose
Tải phiên bản mới nhất của Docker Compose:
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
Cấp quyền thực thi cho Docker Compose:
```bash
sudo chmod +x /usr/local/bin/docker-compose
```
Kiểm tra Docker Compose đã được cài đặt thành công:

```bash
docker-compose --version
```
## 2. Setup docker-compose file cho Node Export và Nginx và setup auth
### Bước 1: Setup docker compose file

Cấu trúc thư mục như sau
    
```bash
node-exporter-nginx/
├── docker-compose.yml
└── nginx.conf
```

Tạo docker-compose file cho Node Exporter và Nginx
```bash
sudo mkdir node-exporter-nginx
cd node-exporter-nginx
sudo nano docker-compose.yml
```
Thêm cấu hình cho file docker-compose.yml
```bash 
version: '3.7'

services:
  node_exporter:
    image: prom/node-exporter
    container_name: node_exporter
    ports:
      - "9100:9100" #chọn port phù hợp để cấu hình đảm bảo port chưa được sử dụng.
    networks:
      monitoring:
        ipv4_address: 172.18.238.4

  nginx:
    image: nginx:latest
    container_name: nginx
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    ports:
      - "9102:9102" #chọn port phù hợp để cấu hình đảm bảo port chưa được sử dụng.
    depends_on:
      - node_exporter
    networks:
      monitoring:
        ipv4_address: 172.18.238.6

volumes:
  grafana-storage:

networks:
  monitoring:
    driver: bridge
    ipam:
      config:
        - subnet: 172.18.238.0/24
```
### Bước 2: Cấu hình file auth Nginx

Tạo file config nginx ở cùng thư mục gốc với file docker-compose
```bash
sudo nano nginx.conf
```
Thêm phần cấu hình cho file nginx.conf
```bash
server {
    listen 9102 default_server;
    listen [::]:9102 default_server;
    
    server_name _;

    location / {
        proxy_pass http://172.18.238.4:9100;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Xác thực token
        set $valid_token "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MjI5MzUwNTAsImV4cCI6MTc1NDQ3MTA1MCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.Yu7LiDXG4ygNghqP2jADeLFHY9_TAtb69EUQn1-p6Hv6SFEPQwBEZvIn3BLIOVII8d5LWK7kVKQrUXLUVum6sA";

        set $token "";
        if ($http_authorization ~* "^Bearer\s+(.+)$") {
            set $token $1;
        }

        if ($token != $valid_token) {
            return 401;
        }
    }
}
```
### Bước 3: Chạy Docker Compose
Khởi động các dịch vụ bằng Docker Compose:
```bash
sudo docker compose up -d
```
Kiểm tra docker container
```bash
sudo docker ps 
```
Các lênh kiểm tra logs, network container
```bash
sudo docker logs “container_name”

sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}'   “container_name”

```

Kiểm tra node-exporter và auth nginx
```bash
# node-exporter
curl http://172.18.238.4:9100/metrics

# auth nginx kết quả là 401 Authorization Required là thành công
curl http://localhost:9102
```
### Bước 4: Public port
```bash 
sudo ufw allow 9102

sudo ufw status
```



