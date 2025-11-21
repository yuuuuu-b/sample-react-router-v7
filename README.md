# 学習用


主な機能

トピックの作成・編集・一覧表示

PostgreSQL を使った永続化

型安全なデータベース操作 (Drizzle ORM)

React Router v7 を用いたルーティング管理

Tailwind CSS + shadcn/ui による UI コンポーネント

TypeScript による型チェック

必要環境

Node.js 18 以上

PostgreSQL 15 以上

npm または yarn

インストール
# リポジトリをクローン
git clone <repository-url>
cd my-react-router-app

# 依存パッケージのインストール
npm install

データベース設定

PostgreSQL でデータベースを作成

CREATE DATABASE my_topics_db;


.env ファイルをプロジェクトルートに作成し、接続情報を設定

DATABASE_URL=postgres://username:password@localhost:5432/my_topics_db

マイグレーション

Drizzle を使ってテーブルを生成します。

# スキーマ生成
npm run drizzle:generate

# マイグレーション実行
npm run drizzle:migrate

開発サーバー起動
npm run dev


ブラウザで http://localhost:3000
 にアクセス。



開発用コマンド

型チェック: npm run typecheck

Drizzle 操作:

drizzle:generate - 型生成

drizzle:migrate - マイグレーション

drizzle:push - データベースに強制適用

drizzle:drop - テーブル削除（開発用）

技術スタック

フロントエンド: React 19, React Router 7, shadcn/ui, Tailwind CSS

バックエンド: Node.js, Express, TypeScript

データベース: PostgreSQL, Drizzle ORM

ツール: Vite, tsx, cross-env
