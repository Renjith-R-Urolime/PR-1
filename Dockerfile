FROM node:18.12.0-alpine AS builder
ARG BUILD_ENV=development
#ENV NODE_ENV production

# Add a work directory
WORKDIR /app

# Make sure we got brotli
RUN apk update
RUN apk add --upgrade brotli

# Install dependencies
COPY package.json .

RUN npm install --force

COPY . .

RUN npm run build:$BUILD_ENV

RUN cd /app/dist/infithra && find . -type f -exec brotli {} \;



# Use Ubuntu as the builder stage
FROM ubuntu:22.04 as webbuilder

# Update package lists and install necessary dependencies
RUN apt update \
    && apt upgrade -y \
    && apt install -y libpcre3 libpcre3-dev zlib1g zlib1g-dev openssl libssl-dev wget git gcc make libbrotli-dev

# Set the working directory
WORKDIR /app

# Download and extract Nginx source
RUN wget https://nginx.org/download/nginx-1.25.4.tar.gz && tar -zxf nginx-1.25.4.tar.gz

# Clone ngx_brotli submodule
RUN git clone --recurse-submodules -j8 https://github.com/google/ngx_brotli

# Configure and compile Nginx with ngx_brotli module
RUN cd nginx-1.25.4 && ./configure --with-compat --add-dynamic-module=../ngx_brotli \
    && make modules



# Use Nginx Alpine as the final stage
FROM nginx:1.25.4-alpine

# Copy the compiled ngx_http_brotli modules from the builder stage
COPY --from=webbuilder /app/nginx-1.25.4/objs/ngx_http_brotli_static_module.so /etc/nginx/modules/
COPY --from=webbuilder /app/nginx-1.25.4/objs/ngx_http_brotli_filter_module.so /etc/nginx/modules/
COPY --from=builder --chown=nginx:nginx /app/dist/infithra /usr/share/nginx/html

# Copy the main Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf
COPY brotli.conf /etc/nginx/conf.d/brotli.conf



# Expose port 80
EXPOSE 80

# Set the default command to start Nginx
CMD ["nginx", "-g", "daemon off;"]

