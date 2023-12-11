# my_commute react native project

## App Description
The Project is a part of my course 'Mobile Programming' at Haaga-Helia UAS, Helsinki. I built an mobile app to track the commute habit of user. The user are able to signup and then login and then save their past journey. User can input the date, start, destination and mode of commute they took to travel. Then the app will give the distance between the two points and the user can save the journey. User can check their journey history from History page and the total journey made in each mode of commute from the Summary page. The user can update their profile from profile page.

## Technologies
The project was built using React native: EXPO. The app uses most of the components provided by react native. React Navigation stack navigator is used to navigate between the screens. In this project I have used two APIs. Openweathermap API is used to show the current weather of the current location. The current location is acquired using Expo Location library provided by expo. The other API used in the project is provided by Google maps. The API is used to set the start and destination input by the user. I have used GooglePlacesAutoComplete to help user to fill the address. I have also used DateTimePicker component to make user able to select the date from the calendar.

I have used Firebase to store the user data. The user can register through email/password and the user data is saved in Firebase authentication. The user can login using the credentials. The journey data and Profile data is saved in the Realtime Database.  
