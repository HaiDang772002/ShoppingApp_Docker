# Sử dụng image base node:16-slim
FROM node:16-slim

# Tạo thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các gói dependencies
RUN npm install

# Sao chép tất cả các file trong thư mục ứng dụng vào thư mục làm việc
COPY . .

# Chạy ứng dụng khi container được khởi chạy
CMD ["npm", "start"]
