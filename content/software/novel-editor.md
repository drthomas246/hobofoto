---
title: "Novel Editor"
date: 2020-10-16T12:30:33+09:00
draft: false
math: false
foto: false
---

## Novel Editor

ダウンロードは{{<exlink href="https://www.vector.co.jp/soft/dl/winnt/writing/se520411.html" text="Vector">}}から  
プログラムソースは{{<exlink href="https://github.com/drthomas246/novel_editor/" text="GitHub">}}から

- Python で作った、「{{<exlink href="https://syosetu.com/" text="小説家になろう">}}」の投稿用エディタです。
- 「キャラクター」、「職種」、「場所」、「イベント」、「イメージ」、「小説」をわけて管理することで小説を少しでも楽にかけるようにしてあります。
- TABキーでキャラクターに登録した、一覧を簡単に入力することができます。
- Ctrl+Rで選択文字列の漢字部分にルビを振ることができます。
- Ctrl+Shift+Rで文章を読み上げることができます。
- Ctrl+Uで小説家になろうのユーザーページを開くことができます。
- 登場人物がシンタックスハイライトされます。

### 使用方法

- Windows用にコンパイルした物(novel_editor.exe)がにあります。ダブルクリックすれば起動します。  
また、削除は、novel_editorフォルダを削除してください。レジストリは汚していません。

- __ver0.2.0b以降からセーブファイルの保存形式が変更になっています。今までのファイルを開くと最悪セーブファイル自身が破壊されてしまいます。  
ver0.2.0b以降を初めて使う場合は、申し訳ありませんが、Releasesにあるchange.exeでファイルの保存形式を変換してからご使用ください。  
一度変更するとその後は、change.exeを使用せずに保存できるようになります。__

### コマンド一覧

#### 通常時 (文字入力画面)

| コマンド | 処理内容 |
:--:|:--:
| Ctrl+N | 新規作成 |
| Ctrl+E | ファイルを開く |
| Ctrl+W | 名前をつけて保存 |
| Ctrl+S | 上書き保存 |
| Ctrl+Shift+C | 文字数、行数カウントダイアログ表示 |
| Ctrl+Shift+F | フォントサイズの変更 |
| Ctrl+Shift+R | 文章の読み上げ |
| Ctrl+R | 選択文字列にルビを振る |
| Ctrl+U | 小説家になろうのユーザーページを開く |
| Ctrl+Y | 文章校正を行う |
| Ctrl+X | 切り取り |
| Ctrl+C | コピー |
| Ctrl+V | ペースト |
| Ctrl+A | すべて選択 |
| Ctrl+F | 検索 |
| Ctrl+L | 置換 |
| Ctrl+Z | UNDO |
| Ctrl+Shift+Z | REDO |
| Tab | 名前の一覧表示 |
| Ctrl+H | ヘルプを表示する |
| Ctrl+Shift+V | バージョン情報 |

#### Tabキー押下時 (文字入力画面)

| コマンド | 処理内容 |
:--:|:--:
| Esc | 一覧表示をやめる |
| Tab | 一覧表示をやめる |
| ↑↓キー | 一覧を選択 |
| Enter | 一覧を決定 |

#### 通常時 (リスト画面)

| コマンド | 処理内容 |
:--:|:--:
| キャラクター、職種、場所、イベント、小説の大項目を選択して右クリック | 小項目作成ダイアログを表示 |
| 小項目を選択して右クリック | 小項目削除ダイアログを表示 |
| Ctrl+G | ファイル名の変更 |

#### 通常時 (イメージ画面)

| コマンド | 処理内容 |
:--:|:--:
| スクロール | 画像の上下移動 |
| Ctrl+スクロール | 画像の拡大縮小 |

### その他
#### Yahoo! 校正支援
- Yahoo! 校正支援を使って校正をしています。  
そのためには、{{<exlink "https://www.yahoo-help.jp/app/answers/detail/p/537/a_id/43398">}}を参考にアプリケーションIDを作成し、Releaseフォルダにあるappid.txtのデータに、Client IDを記入してください。

### 開発者向け
#### Documentationについて
- 開発者用に{{<exlink href="https://drthomas246.github.io/novel_editor/html/" text="Documentation">}}を置いてあります。

### Copyright
- ファイル名：novel_editor.py,novel_editor.exe,change.py,change.exe
- 作者：山原 喜寛 (Yamahara Yoshihiro)
- 著作年：2019-{{<this_year>}}
- HP：https://www.hobofoto.net/
- E-mail：yoshihiro@yamahara.email
- ライセンス：{{<exlink href="https://github.com/drthomas246/novel_editor/blob/master/LICENSE.md" text="GNU GPL3 License">}}[]()