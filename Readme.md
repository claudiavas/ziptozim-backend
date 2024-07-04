# Readme for ZiptoZim

ZiptoZim it´s an Api that allows users to send an http request to convert a webpage into a Zim file.

## Testing Command

curl -X POST -H "Content-Type: multipart/form-data" -F "inputFile=@greybox.zip" -F "outputFile=greyboxoutput.zim" -F "welcomePage=index.html" -F "favicon=favicon.png" -F "language=eng" -F "title=Our Website" -F "description= " -F "creator=Wikipedia" -F "publisher=Me" http://localhost:3019/convert

## Docker Commands

docker build -t ziptozim .
docker run -p 3500:3500 ziptozim

## Node JS Dependencies

See a brief description os each Node JS dependency in package.json.

## External Repositories

The Dockerfile clones several repositories that are necessary for the application. The primary repository your application depends on is:
(*) `zim-tools`: This repository contains various tools to create, inspect and manipulate ZIM files. These tools are written in C++ and are built using `meson` and `ninja-build`. The repository can be found at [https://github.com/openzim/zim-tools].

These other repositories are dependencies required by `zim-tools`:
(*) `libzim`: [https://github.com/openzim/libzim].
(*) `Mustache`: [https://github.com/kainjow/Mustache].
(*) `docopt`: [https://github.com/docopt/docopt].

## Interaction with External Repos

This application interacts with `zim-tools` and its dependencies in different ways. For example, it might use `child_process.exec` or `child_process.spawn` to run a command-line tool from one of the repositories. Or it might import a JavaScript library from one of the repositories using `require`.

In the case of C++ dependencies, Node.js uses a tool called `node-gyp` to compile and build the native addons. `node-gyp` is a cross-platform command-line tool written in Node.js for compiling native addon modules for Node.js, which includes the functionality of C++ and Python libraries.
