
# 單純使用 `.md` 與 `.ipynb` 格式寫作的最小可行方案


- JW
- 2024-02-16


**需求**：我只想單純使用 .md 紀錄純文字、簡單的數學式 (支援 latex)、表格與程式。如果需要有執行結果的，則用 .ipynb 的檔案來紀錄和執行。最後，只需要最非常簡單的事情，甚至不用轉檔，就可以彙整。
（我這麼說，就是因為 [`Quarto`](https://quarto.org/) 也很好用，但他是要轉檔。）

一種最小可行方案：`mkdocs`，並部署在 `readthedocs` 上面。


## 使用 mkdocs


### Install

在 mac 系統上，用 homebrew 就可以了。

```
## general
brew install mkdocs

## for material theme
brew install mkdocs-material
```

在 windows 系統上，就參考官網： [mkdcos](https://www.mkdocs.org/)

```
pip install mkdocs
```

### Usage

使用上，就按照官網指示：

```
# create a new project
mkdocs new my-project

# go into the project's file
cd my-project

# show in your local computer
mkdocs serve
```

### Add Files

- 使用 markdown 檔案應該是基本可行的。
- 使用 jupyter 檔案則加上外掛就可行。（如下節所示）

## 設定 mkdocs

### Add a `requirement.txt` in the docs file

這一步是為了安裝所需要的 python 套件。例子：

```
mkdocs
mkdocs-jupyter
mkdocs-material
```


### Add a `.readthedocs.yaml` in the file

這是上傳到 readthedocs 上時會需要的。通常部署時參考他建議的寫法就行。例子：

```
# Read the Docs configuration file for MkDocs projects
# See https://docs.readthedocs.io/en/stable/config-file/v2.html for details

# Required
version: 2

# Set the version of Python and other tools you might need
build:
  os: ubuntu-22.04
  tools:
    python: "3.12"

mkdocs:
  configuration: mkdocs.yml

# Optionally declare the Python requirements required to build your docs
python:
  install:
  - requirements: docs/requirements.txt
```

### change your `mkdocs.yml`

最後，就是修改 `mkdocs.yml` 中的設定。
因為本文目標是「最小可行」，因此就是字型什麼幾乎不改，目錄也不改，都用預設值。唯二需要增加的是：

- latex 語法支援。詳細設定方式請參考 [Material for MkDocs - Math](https://squidfunk.github.io/mkdocs-material/reference/math/)
- jupyter 格式支援。在 plugins 加入 `- mkdocs-jupyter`。



例子：

```
site_name: YOUR_SITE_NAME

## if you need to chage
#nav:
#  - ipynb:
#    - ch3: ch3.ipynb

theme: readthedocs

## mathjax for .md
markdown_extensions:
  - footnotes # 支援腳注
  - admonition # 支援提示區塊
  - pymdownx.arithmatex:
      generic: true

extra_javascript:
  - javascripts/mathjax.js
  - https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.6/MathJax.js?config=TeX-AMS-MML_HTMLorMML


plugins:
  - search
  - mkdocs-jupyter

```


關於 markdown_extensions 可以寫什麼，可以參考 [Material for MkDocs - Python Markdown Extensions](https://squidfunk.github.io/mkdocs-material/setup/extensions/python-markdown-extensions/#highlight)

## 部署到 readthedocs

完成之後，只需要再做二步：

1. 把這個資料夾上傳到 Github 上面。
2. 登入 readthedocs，連結你的 github。選擇這個 repo，然後發佈即可。


---

現在，一個簡單而基本可行的介面已經完成了！
接下來只需要把你的 markdown 和 jupyter 檔案無腦放入 `docs` 資料夾中上傳即可！