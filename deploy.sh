#!/bin/bash

DEPLOY_DIR=_deploy

rm -rf $DEPLOY_DIR

nanoc compile

mkdir $DEPLOY_DIR
cd $DEPLOY_DIR

git init
git remote add origin git@github.com:psyho/coderetreat.sckrk.com.git
git fetch
git checkout gh-pages
rm -rf $(ls * | grep -v .git)

cp -rf ../output/* .
cp ../CNAME .

git add .
git commit -am "Updated page at `date`"
git push origin gh-pages --force
