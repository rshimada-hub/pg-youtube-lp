# 工務店のYouTube制作サービス LP（ピュアグロース）

工務店向けYouTube制作サービスのランディングページ。静的サイト（HTML/CSS/JS のみ、ビルド不要）。

## ディレクトリ構成

```
pg-youtube-lp/
├── index.html          … LP本体（HTML構造のみ）
├── works.html          … 動画制作事例の一覧ページ（「VIEW MORE」からリンク）
├── css/
│   └── style.css       … LPの全スタイル
├── js/
│   └── main.js         … フォーム連動・カウントアップ・動画再生などの挙動
└── img/                … 画像・動画アセット
    ├── hero-bg.jpg           FV背景
    ├── bg-about.jpg / bg-faq.jpg   セクション背景
    ├── channel-01〜03.jpg    YouTube活用企業のチャンネルサムネ
    ├── work-<動画ID>.jpg     動画制作事例のサムネ（YouTube動画IDが名前）
    ├── offer-01〜18.jpg      無料オファーの流れる帯（マーキー）
    ├── pres-kokubu / kawamura / yamato.jpg   CASEの社長写真
    ├── member-01〜03.jpg     メンバー写真
    ├── reason-01.jpg / reason-channel-01.jpg  REASONの図版
    ├── video-poster.jpg      対談動画のサムネ（poster）
    ├── hiramatsu.mp4         対談動画本体（約4.8MB）
    ├── pg-logo-white.png / laurel.png / crew-cta-*.png
    └── thumbs/               works.html 用のサムネ一式
```

## ローカルでの確認方法

このフォルダ内で簡易サーバーを起動し、ブラウザで開きます。

```bash
python -m http.server 8000
```

→ ブラウザで `http://localhost:8000/` を開く。

## ホームページのサブディレクトリへ設置する場合

すべて**相対パス**で参照しているため、`pg-youtube-lp` フォルダの中身を
公開したいディレクトリ（例：`https://example.com/lp/youtube/`）にそのままアップロードすれば動作します。
`index.html` を書き換える必要はありません。

例：`/lp/youtube/` に置く場合
```
/lp/youtube/index.html
/lp/youtube/css/style.css
/lp/youtube/js/main.js
/lp/youtube/img/...
```

## 編集する場合

- **文言・構造** → `index.html`
- **デザイン・レイアウト・色** → `css/style.css`
- **動き（フォーム連動・カウントアップ・動画再生）** → `js/main.js`
- **画像差し替え** → `img/` の該当ファイルを同名で上書き（推奨サイズは元画像に準拠）

### 技術メモ
- レイアウトは `--s`（`css/style.css` 冒頭で定義：`min(1px, calc(100vw / 1800))`）を基準にした等倍スケール設計。数値は `calc(N * var(--s))` で指定。
- フォントは端末標準フォント（英字：Trebuchet MS 系／和文：ヒラギノ・游ゴシック系）を使用。外部Webフォントは読み込んでいない。
- 右サイドのCTA（成功事例集を取得／無料相談）はPC幅（901px以上）でのみ表示。押すと問い合わせフォームの該当チェックが自動で入る。
- お問い合わせフォームは送信処理未接続（`js/main.js` 内で `preventDefault` してデザイン確認用の完了表示のみ）。実運用時はサーバー側の送信処理につなぐ必要あり。

## 制作
ピュアグロース株式会社
