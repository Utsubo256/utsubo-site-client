# うつぼさいと

URL: [https://www.utsubo-site.net](https://www.utsubo-site.net)

<img src="https://github.com/Utsubo256/image-storage/blob/main/utsubo-site/readme/lp.png?raw=true">

こちらはクライアント側のリポジトリです。API 側は[こちら](https://github.com/Utsubo256/utsubo-site-api)です。

## サービス概要

「うつぼさいと」はウツボを知って、水族館へ行き、ウツボの魅力を共有することを目的とするサービスです。
本サービスの特徴は以下です。

- 日本全国の水族館で観られるウツボの特徴を分かりやすく、興味を持ちやすいように紹介している
- 観たいウツボがどの水族館で観られるか、行きたい水族館でどのウツボが観られるかがすぐに分かる
- いいねボタンやコメント機能によりウツボの魅力を他の人と共有できる

<img src="https://github.com/Utsubo256/image-storage/blob/main/utsubo-site/readme/morays.png?raw=true" width="350"> <img src="https://github.com/Utsubo256/image-storage/blob/main/utsubo-site/readme/aquaria.png?raw=true" width="350">

## 本サービス開発の背景

もともと水族館が好きで、小さい頃から水族館に定期的に訪れていました。
好きな海の生き物はたくさんいますが、その中でも特にウツボが好きで、水族館に訪れるたびにじっくり観察しています。

ウツボは種類によって大きさや模様がさまざまで、とても魅力的であるにも関わらずあまり注目されていないように感じていました。
そこで、「ウツボを一覧で表示したり、ウツボを絵にして特徴を分かりやすく伝えれば、ウツボの魅力が伝わるのではないか」と考え、本サービスの開発を始めました。

## 技術スタック

バックエンド

- 言語: Ruby 3.2.2
- フレームワーク: Ruby on Rails 7.0.4.3 (API モード)
- API 形式: REST
- テスト: RSpec
- 静的コード解析: RuboCop

フロントエンド

- 言語: TypeScript 5.0.3
- ライブラリ、フレームワーク: React 18.2.0、Next.js 13.2.4
- UI、Style: Chakra UI v2、emotion
- デザイン: Figma
- Component Style: Functional + hooks
- HTTP クライアント: axios

その他

- 認証認可: Firebase Authentication v9
- エディタ: VSCode
- バージョン管理システム、リポジトリホスティングサービス: Git、GitHub
- 仮想環境: Docker、docker-compose

## 画面設計

[Figma](https://www.figma.com/file/4ZPo7Qanlr5IXEPVTS8fs8/Utsubo-site?type=design&node-id=0-1&t=uvE21rQIoQp0aGY8-0)

## ER 図

<img src="https://github.com/Utsubo256/image-storage/blob/main/utsubo-site/readme/ERD.jpg?raw=true">

## 外部リンク

学習した内容を Twitter や Qiita に投稿しています。

- [Twitter](https://twitter.com/Utsubo256)
- [Qiita](https://qiita.com/Utsubo)
