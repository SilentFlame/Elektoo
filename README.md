***
# Elektoo #

### World's first choice engine. ###
The Elektoo project deals with the creation of a choice based search engine probably first of its kind.
The main problem this project is trying to solve:

* Choice Overload
* Wrong choices
* Unavailability of choice centric IT solutions

and to provide the user with results strictly related to the search he/she made.
***
### Features ###
Under this project the user is provided with two kinds of search methods to choose from.
 
* Search Query Box
* Choice matrix

***
### Search Query Box ###
In this method of search the user is provided with a query box in which the user gives the input(text) which is processed by the system and some ambiguous words are found then the system tries to resolve that ambiguity by giving the users some concrete suggestions in place of those ambiguous words.
One of the most important and unique feature that "Elektoo" provides is the "real-time update of count of number of results" on press of every space from the keyboard.
The query box also accomplishes features like "auto-complete" and "auto-correct".
The final display of the query would be a list of products/items related to the query given for search.

***
### Choice Matrix ###
Here the user will be provided with a "9x6" matrix having 9 product features("brand specific") and 5 values corresponding to those features(one column for the name of the feature).
Once the user selects a brand from the list of brands that the user is provided on the selection of the choice matrix, a matrix related to that brand will get displayed. There will be options to select or deselect different tabs in the respective rows according to which the entire matrix will get updated. This method of searching too would have the "real-time count".
The final display of the results will be similar to the "Search Query Box".
On selection of the product it will display all the features and specifications for that product.
***
### Things to do before running the application. ###
#### install  ``` Express.js, Sequelize.js, Node.js, mysql, bodyparser``` 
#### Node.js #####
```
sudo apt-get update
sudo apt-get install nodejs
```
In most cases you also need to install `npm` node.js package manager. You can do this by typing.
```
sudo apt-get install npm
```
#### Express.js ####
```
npm install express
```
#### Sequelize.js ####
```
npm install sequelize
```
#### MySql ####
```
npm install mysql
```
#### Bodyparser ####
```
npm install bodyparser
```

####Edit few lines in the **Server.js** file so as to make it compatible to run it on your system. #####
open file **Server.js** present inside the "source" directory
change the line numbers 5, 17, 18, 19 as per the details of your systems database.
line 6 : ` var sequelize = new Sequelize('database-name', 'user', 'database-password'` and rest lines are self understanding.
**while selecting the port on which to run the application first check whether the port is already in use or not, if yes then first make that port free or use some other free port(change lines 75, 76 in Server.js file) to run the application.**
```
sudo netstat -tlnp             // to list the current ports listening / open.
sudo fuser XXXX/tcp           // to find which process is using the XXXX port.
sudo fuser XXXX/tcp -k           // to kill the XXXX process and make that port free.
```

**Now we are ready to run the application.**
***
### Running the Application. ###
* go to the source directory.
* run ``` npm install```then run ``` nodejs Server.js``` on your terminal.
* you will see a message on your terminal console `We have started our server on port XXXX` which shows that the application has started running on port **XXXX**.
* Now visit `localhost:XXXX` in your browser.
**Use the application and experience the difference in searching.**
***
### Developing Team ####
* Aman Rai - Team Co-ordinator
* Ayushi Goyal - Tech Expert
* Prachi Agrawal - Technical Expert
* Vinay Singh - Documentation Specialist

***