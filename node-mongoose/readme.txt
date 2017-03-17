simpleserver.js是node链接mongodb的简单实现，
server和operations是把常用的操作放到模块中

本例用的都是mongoose模块，需要事先
npm install mongoose --save
     npm install assert --save
     然后启动数据库：Zmy-Apple@MingyangdeMacBook-Pro:~$ cd /Users/Zmy-Apple/ApplicationData/coursera/mongodb
Zmy-Apple@MingyangdeMacBook-Pro:~/ApplicationData/coursera/mongodb$ mongod --dbpath=data
     
     server-1.js和server-2.js的代表了两种创建一个document（表中的一行）的两种方式，进行对比
     server-3.js：Here we are examining how mongoose supports sub-documents inside the document. 
     
     
和上一个例子用的是MongoDB driver对比

区别是：mongoDB Driver 是no-sql，直接往里存就行，而mongoose定义了一个schema，类似SQL数据库了
