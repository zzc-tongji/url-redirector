# Docker

### Build

``` sh
git clean -xfd
docker build -t zzcgwu/url-redirector .
```

### Run

(Example)

#### Script

``` sh
cp ./config.example.json config.json
docker run -d --restart on-failure --name url-redirector -v ./config.json:/usr/src/app/config.json -p 8080:8080 zzcgwu/url-redirector
```

#### Compose

``` yaml
version: '3.3'
services:
  url-redirector:
    restart: on-failure
    container_name: url-redirector
    volumes:
      - './config.json:/usr/src/app/config.json'
    ports:
      - '8000:8080'
    image: zzcgwu/url-redirector
```

``` sh
docker-compose up -d
```

