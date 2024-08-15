# Hướng dẫn Cài đặt trên Ubuntu Node Exporter và Nginx auth

## 1. Cài đặt Node Exporter
### Bước 1: Tải và cài đặt Node Exporter
```bash
# Trên mỗi node, tải phiên bản mới nhất của Node Exporter:
wget https://github.com/prometheus/node_exporter/releases/download/v1.6.1/node_exporter-1.6.1.linux-amd64.tar.gz

# Giải nén và di chuyển thư mục:
tar xvf node_exporter-1.6.1.linux-amd64.tar.gz
sudo mv node_exporter-1.6.1.linux-amd64 /usr/local/node_exporter
```

### Bước 2: Tạo dịch vụ Node Exporter
```bash 
# Tạo tệp dịch vụ systemd cho Node Exporter:
sudo nano /etc/systemd/system/node_exporter.service
    # Thêm cấu hình sau vào tệp:
    [Unit]
    Description=Node Exporter
    After=network.target
    
    [Service]
    User=nobody
    ExecStart=/usr/local/node_exporter/node_exporter
    
    [Install]
    WantedBy=default.target
```
### Bước 3: Khởi động và bật dịch vụ Node Exporter
```bash 
sudo systemctl daemon-reload
sudo systemctl start node_exporter
sudo systemctl enable node_exporter
sudo systemctl status node_exporter
```
### Bước 4: Kiểm tra 
Để kiểm tra hoạt động của node exporter truy cập: 
- http://localhost:9100/metrics. 
***note***: thay 9100 bằng port mà bạn đã cấu hình

## 2. Cài đặt Nginx

### Bước 1: Cập nhật hệ thống
```bash
sudo apt update
sudo apt upgrade
```
### Bước 2: Cài đặt Nginx
```bash
sudo apt install nginx
sudo systemctl status nginx
```
### Bước 3: Cấu hình tường lửa
```bash
sudo ufw allow 'Nginx HTTP'
sudo ufw allow 'Nginx HTTPS'

sudo ufw status
```
### Bước 4: Cấu hình auth Node Exporter
Tạo file node_exporter.conf
```bash
sudo nano /etc/nginx/sites-enabled/node_exporter.conf
```
Thêm phần cấu hình và file
```bash
server {
    # cấu hình port phù hợp
    listen 9101 default_server;   
    listen [::]:9101 default_server;
    
    server_name _;

    location / {
        proxy_pass http://localhost:9100;
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
Kiểm tra cấu hình nginx
```bash
sudo nginx -t

# khởi động lại nginx
sudo systemctl reload nginx

# public port phù hợp (port: 9101)
sudo ufw allow 9101

# kiểm tra lại 
sudo ufw status

# thử với lệnh curl nếu kết quả là 401 Authorization Required là thành công
curl http://localhost:9101 
```



