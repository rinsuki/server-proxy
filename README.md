# server proxy

指定された TCP ポートで接続を待ち受け、接続されたら指定されたホストとポートに指定された HTTP プロキシを通じてコネクションを確立します。
Node.js製です。

## how to install

```
npm install -g server-tcp-proxy
```

## how to use

```
server-tcp-proxy 3000 localhost:8080 example.com:80
```

この場合、`3000`ポートで待ち受け、HTTPプロキシ`localhost:8080`を経由して`example.com:80`に接続します。