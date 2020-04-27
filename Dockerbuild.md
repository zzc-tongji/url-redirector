# Dockerbuild

### Build

``` bash
docker build -t zzcgwu/url-redictor .
docker push zzcgwu/url-redictor .
```

### Cross-Platform Build

``` bash
docker buildx build -t zzcgwu/url-redictor --platform=linux/amd64,linux/arm64,linux/s390x,linux/386,linux/arm/v7,linux/arm/v6 . --push

# https://segmentfault.com/a/1190000021166703
```