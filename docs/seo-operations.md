# SEO 運用手順書

技術実装（構造化データ・sitemap・lastmod・OGP・画像最適化）を**検索エンジンに認識・計測させる**ための運用手順をまとめる。コード変更ではなく、Search Console / Bing への登録、sitemap 送信、検証、継続監視が対象。

実装の経緯は各 PR（SEO Stage 1〜4）と [docs/post-launch-checklist.md](post-launch-checklist.md) を参照。

## 対象サイト

| サイト | URL | インデックス | sitemap |
| --- | --- | --- | --- |
| portal | `https://fujioha.com` | する | `https://fujioha.com/sitemap.xml` |
| game | `https://game.fujioha.com` | する | `https://game.fujioha.com/sitemap.xml` |
| hokkaido | `https://hokkaido.fujioha.com` | **しない（準備中・noindex）** | 無し（robots で Disallow） |

> hokkaido は現在 `noindex` かつ `robots.txt` で全 Disallow。公開するまで Search Console への sitemap 送信やインデックス登録はしない。公開時の手順は末尾「hokkaido 公開時」を参照。

---

## 1. Google Search Console

### 1-1. プロパティ登録（ドメインプロパティ推奨）

`fujioha.com` とサブドメインをまとめて扱える**ドメインプロパティ**を推奨する。

1. [Google Search Console](https://search.google.com/search-console) を開く
2. 「プロパティを追加」→「ドメイン」を選び `fujioha.com` を入力
3. 表示された **TXT レコード**を Cloudflare DNS に追加する
   - Cloudflare ダッシュボード → 対象ドメイン → DNS → レコード追加
   - Type: `TXT`, Name: `@`(=fujioha.com), Content: 指示された `google-site-verification=...`
   - プロキシ対象外（DNS のみ）。保存後、数分待つ
4. Search Console に戻り「確認」

> ドメインプロパティが使えない場合は **URL プレフィックスプロパティ**（`https://fujioha.com/` と `https://game.fujioha.com/` を個別登録）でも可。その場合の確認は HTML メタタグ or HTML ファイル設置になるが、本サイトは静的配信なので DNS 確認のドメインプロパティの方が楽。

### 1-2. sitemap 送信

各プロパティで sitemap を送信する（ドメインプロパティなら 1 か所で両方送れる）。

1. 左メニュー「サイトマップ」
2. 以下を追加して送信:
   - `https://fujioha.com/sitemap.xml`
   - `https://game.fujioha.com/sitemap.xml`
3. ステータスが「成功」になり、検出 URL 数が想定どおりか確認
   - portal: `/`, `/about`, `/contact`, `/disclaimer`, `/journal`, `/privacy`, `/terms`（7件）
   - game: `/`（1件）

> sitemap には Stage 2 で `lastmod` を入れてある（更新日・法務制定日）。コンテンツ更新後に再デプロイすると lastmod が更新され、クロールの再訪を促せる。

### 1-3. 構造化データ / リッチリザルトの確認

Stage 1〜3 で入れた JSON-LD が正しく認識されるか確認する。

1. [リッチリザルト テスト](https://search.google.com/test/rich-results) に各 URL を入力
2. 期待される検出:
   | URL | 期待する構造化データ |
   | --- | --- |
   | `https://fujioha.com/` | WebSite, （Person）, ItemList（最近の更新） |
   | `https://fujioha.com/privacy` 等 | WebSite, BreadcrumbList |
   | `https://game.fujioha.com/` | WebSite, ItemList（VideoGame 入り） |
3. より厳密な検証は [Schema Markup Validator](https://validator.schema.org/) を使う（リッチリザルト非対応の型も確認できる）
4. Search Console 左メニュー「拡張」配下に「パンくずリスト」等が出てくるか（反映に数日かかる）

### 1-4. URL 検査 / インデックス登録リクエスト

主要ページは公開直後に手動でインデックスを促す。

1. 上部の検索窓に URL を入力 → 「URL 検査」
2. 「インデックス登録をリクエスト」
3. portal の `/`, game の `/` など主要導線を実施

---

## 2. Bing Webmaster Tools

1. [Bing Webmaster Tools](https://www.bing.com/webmasters) を開く
2. **「Google Search Console からインポート」**が最速（GSC 連携で検証・sitemap を引き継げる）
3. 手動の場合は `fujioha.com` を追加し、DNS / メタタグ / XML ファイルのいずれかで確認
4. sitemap（`https://fujioha.com/sitemap.xml`, `https://game.fujioha.com/sitemap.xml`）を送信

---

## 3. アクセス計測（Cloudflare Web Analytics）

プライバシーポリシー（[privacy](https://fujioha.com/privacy)）で「Cloudflare Web Analytics を使用」と明記済み。**ダッシュボードでの有効化が未実施なら必ず行う**（文面と実態を一致させるため）。

1. Cloudflare ダッシュボード → Analytics & Logs → Web Analytics
2. 対象サイト（少なくとも `fujioha.com` / `game.fujioha.com`）を追加して有効化
3. 自動注入（Pages 連携）を使う。CSP は先回りで `static.cloudflareinsights.com` / `cloudflareinsights.com` を許可済み（`_headers`）
4. 数時間後、PV・リファラ・国別が計測されているか確認
5. ブラウザのコンソールに CSP 違反が出ていないか実機確認

---

## 4. 継続監視（公開後）

| 頻度 | 確認 |
| --- | --- |
| 公開直後 | sitemap 送信成功 / 主要 URL のインデックス登録リクエスト / リッチリザルト テスト |
| 24時間 | カバレッジ（除外・エラー URL）／計測が動いているか |
| 1週間 | 検索パフォーマンス（表示回数・CTR）／Core Web Vitals／拡張（パンくず等）の反映 |
| 月次 | 検索流入の多いページ／クロールエラー／構造化データの「無効」検出 |

- Core Web Vitals は Search Console「ウェブに関する主な指標」で実フィールド値を見る。
- 構造化データを変更した PR の後は、該当ページをリッチリザルト テストで再検証する。

---

## 5. hokkaido 公開時のチェックリスト

hokkaido を準備中から公開へ切り替える際にまとめて実施する。

- [ ] `apps/hokkaido/src/layouts/BaseLayout.astro` の `SeoHead` から `noindex` を外す
  - これで Stage 1/3 で配線済みの WebSite 構造化データが自動出力される
- [ ] `apps/hokkaido/public/robots.txt` を Disallow から `Allow: /` ＋ Sitemap 行へ変更
- [ ] hokkaido 用 `sitemap.xml.ts` を追加（portal/game と同じ `routesFromPages` パターンを流用）
- [ ] companions（地域ガイド）の ItemList を index へ配線（game index と同パターン）
- [ ] Search Console に `https://hokkaido.fujioha.com/sitemap.xml` を送信
- [ ] 主要ページの URL 検査 → インデックス登録リクエスト
- [ ] リッチリザルト テストで構造化データを確認

---

## 関連ドキュメント

- [docs/deployment.md](deployment.md) — Cloudflare Pages のデプロイ設定
- [docs/post-launch-checklist.md](post-launch-checklist.md) — 公開直後〜1週間の確認項目（計測・SEO の節を含む）
