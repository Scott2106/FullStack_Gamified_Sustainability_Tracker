# Welcome to Lumos Task. #
## Harry Potter Inspired Sustainability Task Tracker ##
## Set Up and How to Run The Application:
- run 'npm i' in the terminal to install all the necessary packages. <br>
- run 'npm start' to start our own server in the local host(you may use 'npm run dev' to automatically restart our server after changes in codes are made).<br>
- run the sql script in your MYSQL workbench.<br>
- you may start interacting with the application through web pages. ## <br> 
#### For illustrative purpose, the password is a lowercase version of the username, with no spaces. For example,username:Hermione Granger, password:hermionegranger ####
<br>

![alt text](readMeImages/image-3.png)
![alt text](readMeImages/image-4.png)
This the landing page of my application. The navbar includes 6 functionalitites:
* going back to the index page,
* viewing user details(modifying single user details and leaderboard),
* to-do tasks,
* virtual items that users can buy or trade,
* global messaging and
* login, logout and register.
![alt text](readMeImages/image-17.png)
This is Log in page. After the user has submitted the form, bcrypt library compares the entered password with the hashed password from the database. If the credentials are correct, users are given access token and can start interacting with the application.
![alt text](readMeImages/image-18.png)
This is register page. After user has submitted the form, the passwords are securely salted and hashed and users will be given the jwt token. (only allow password of more than 10 characters for more secure experience.)
![alt text](readMeImages/image-6.png)
Dropdown box shows log-in and register if the user does not have token.
![alt text](readMeImages/image-5.png)
Dropdown box only indicates log-out for those users with valid token.
![alt text](readMeImages/image-7.png)
Implement jwt token verifying and refreshing function in all of the html pages to ensure that users have valid token to do related stuffs.
![alt text](readMeImages/image-8.png)
Check for html params to make sure user cannot manipulate params and perform functions to accounts they do not own.
![alt text](readMeImages/image-10.png)
Users can terminate their accounts or update their profile pictures. They can also view details such as how many tasks they have completed, how many items they own and how much galleons they have.
![alt text](readMeImages/image-11.png)
Leaderboard of users based on the numbers of tasks they have completed.
![alt text](readMeImages/image-12.png)
This page contains all the tasks user can participate in. After they have completed, they may press the +add button to keep record.
![alt text](readMeImages/imagea.png)
Global messaging page where user can interacts with each other. Users can add, edit and delete messages of their own but cannot do those tasks for other users. The edit button and delete button only appear when the hovered message item was posted by the user himself. 
![alt text](readMeImages/item.png)
This is the page related to virtual items of the wizarding world.
![alt text](readMeImages/image-15.png)
Users may buy or trade the items with the one they own.
![alt text](readMeImages/rating.png)
They can also give ratings which were later displayed in the item cards.
![alt text](readMeImages/luckydraw.png)
Users can also participate in lucky draw. The rule of the lucky draws are
- users cannot draw more than once on the same day.
- if you win an item that you have already owned, your lucky draw will be cancelled as the rule of the games dictates that you cannot possess same two items. 