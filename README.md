# Node JS, Queue POC

Node JS, Queue Poc is a Node application which help to integrate with apache activeMQ along with multiple databases. 

## Installation

Use the command for install dependencies

```bash
npm install
```
## Start the application

Use the command for start application

```bash
node server.js
```
## DB Table
Create new database in mysql and create below table
```sql
CREATE TABLE Tutorials (
    ID int NOT NULL AUTO_INCREMENT,
    title varchar(255) NOT NULL,
    description varchar(255),
    published int,
    mongoRefId varchar(255) NOT NULL, 
    PRIMARY KEY (ID)
);
```