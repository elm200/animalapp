# Flux + React.js + Rails のデモアプリ(複数モデル）

猫(cat)と犬(dog)の名前(name)と体重(weight)を管理します。Cat と Dog という２つのモデルがあるのがポイントです。

Facebook の [flux-todomvc](https://github.com/facebook/flux/tree/master/examples/flux-todomvc) を参考にしました。

上記のサンプルでは、Store がオンメモリだったので、Ajax で Rails のバックエンドと通信して、データをデータベース(Sqlite3)に保存するようにしました。

## 注意
現在、実装のわかりやすさを優先して CSRF からの保護を無効にしてあります。近々、CSRF 対策を行う予定。

## インストール方法

```
$ git clone git@github.com:elm200/animalapp.git
$ cd animalapp
$ rake db:migrate
$ cd public
$ npm install
$ cd ..
$ rails s
```

http://localhost:3000/ にアクセスすると、本ウェブアプリが起動します。
