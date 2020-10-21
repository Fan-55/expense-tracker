## Restaurant List

This is a web application for you to keep track of your daily expense.

![](/expense_tracker.jpg)


### Features
---
- filtering records by category using "種類" dropdown menu
- clicking "編輯" button to modify the detail information of chosen record
- clicking "刪除" button to remove the record from the list
- confirmation message will pop up before deletion

### How to use
---
0. Prerequisites
- install [MongoDB](https://www.mongodb.com/try/download/community)
- install [Robo 3T](https://robomongo.org/)
- start the MongoDB server
- create a MongoDB connection
- create a database named "expense-tracker"

1. Clone this repository 

```
$ git clone https://github.com/Fan-55/expense-tracker.git
```

2. Go to the directory 

```
$ cd expense-tracker
```

3. Install the required packages 

```
$ npm install
```

4. Implant seed data
```
$ npm run seed
```

5. Execute app via either nodemon or node

- via nodemon

```
$ npm run dev
```

- via node

```
$ npm run start
```

6. You will see the following on your terminal suggesting successful set up

```
This app is listening at http://loaclhost:3000
MongoDB connected!
```
7. Open the browser and type in the following URL then you are ready to go!

```
http://localhost:3000
```
### Tools used for this web application
---
- Node.js: v10.15.0
- Express: v4.17.1
- express-handlebars: v5.1.0
- method-override: v3.0.0
- body-parser: v1.19.0
- mongoose: v5.10.9
- MongoDB: v4.2.9
- Robo 3T: v1.4.1