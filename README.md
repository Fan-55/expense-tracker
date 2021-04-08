## Expense Tracker

This is a web application for you to keep track of your daily expense.
![](/screenshot/expense-tracker.png)


### Demo
---
👉 [Try it on heroku (click me)](https://expense-tracker-fan55.herokuapp.com/users/login)

Use the following seed user data to log in or register your own account

| Email | password |
| ------ | ------ |
| user1@example.com | 123 |
| user2@example.com | 123 |

### Features
---
- register your own account
- login via your own account or Facebook account
- filtering records by category using "類別" dropdown menu
- filtering records by month using "月份" dropdown menu
- clicking editing icon to modify the detail information of chosen record
- clicking delete icon to remove the record from the list

### How to use
---
0. Prerequisites
- install [MongoDB](https://www.mongodb.com/try/download/community)
- install [Robo 3T](https://robomongo.org/)
- start the MongoDB server
- create a MongoDB connection
- create a database named `expense-tracker`

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

4. Rename the `.env.example` file to `.env`

For FACEBOOK_ID and FACEBOOK_SECRET in `.env`, go to [FACEBOOK for Developers](https://developers.facebook.com/) to create your own app. Then, add `Facebook Login` product to your app. Finally, replace the value of FACEBOOK_ID and FACEBOOK_SECRET with your own the App ID and App Secret respectively.

5. Implant seed data
```
$ npm run seed
```
Once seed data is implanted, you will see the following on the terminal. Otherwise, errors will be shown on the terminal.
```
MongoDB connected!
Category seeds created!
MongoDB connected!
record seeds created!
```

6. Execute app via either nodemon or node

- via nodemon

```
$ npm run dev
```

- via node

```
$ npm run start
```

7. You will see the following on your terminal suggesting successful set up

```
This app is listening at http://loaclhost:3000
MongoDB connected!
```
8. Open the browser and type in the following URL then you are ready to go!

```
http://localhost:3000/users/login
```
### Tools used for this web application
---
- Node.js: v10.15.0
- Express: v4.17.1
- express-handlebars: v5.1.0
- bcrypt: v2.4.3
- connect-flash: v0.1.1
- dotenv: v8.2.0
- express-session: v1.17.7
- passport: v0.4.1
- passport-facebook: v3.0.0
- passport-local: v1.0.0
- method-override: v3.0.0
- body-parser: v1.19.0
- mongoose: v5.10.9
- MongoDB: v4.2.9
- Robo 3T: v1.4.1