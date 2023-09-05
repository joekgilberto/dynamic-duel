# Dynamic Duel
## Project Summary
A full-stack application that allows users to read up on their favorite superheroes and supervillains, and even pit them against each other.

## Trello
[Found here](https://trello.com/b/e1IHm99d/project-3-dynamicduel)

## Wireframes
### Index
![Index](./assets/index.png)

### Index Mobile
![Index Mobile](./assets/index-mobile.png)

### Show
![Show](./assets/show.png)

### Battles (Icebox)
![Battles](./assets/battles.png)

## Component Trees
### MVP Tree
![MVP Component Tree](./assets/mvp-tree.png)

### Icebox Tree
![Icebox Component Tree](./assets/icebox-tree.png)

## Models
### MVP
#### Primary Model - Users
|**Property**|**DataType**|
| - | - |
| _id | Objectid |
| name | String |
| googleId | String |
| email | String |
| avatar | String |
| favorites | Array |
| timestamps | Date |

### Icebox
#### Secondary Model - Battles
|**Property**|**DataType**|
| - | - |
| _id | Objectid |
| superOne | String |
| superTwo | String |
| winner | String |
| details | String |
| comments | Array |
| user | ObjectId |
| timestamps | Date |

#### Tertiary Model - Comments
|**Property**|**DataType**|
| - | - |
| _id | Objectid |
| comment | String |
| user | ObjectId |
| timestamps | Date |


## ERD
### Icebox
![ERD](./assets/icebox-erd.png)

## JSON Example
![JSON Example](./assets/json-example.png)

## User Stories
### MVP
- As a user I want to access superhero data so I can learn more about superheroes.
- As a user, I want to access a home page that shows me 6 random supers so I can discover new supers.
- As a user, I want to access a super show page that shows me specific details of supers so I can learn more.
- As a user, I want to search for supers by name, taking me to a search page, to help me find supers more easily.
- As a user, I want to be able to search for more supers when on the search page.
- As a user, I want to see a loading component when waiting for data to load so I know I'm waiting for data to be displayed.
- As a user I want to be able to login to the application with Google to save data specific to me.
- As a user, I want to be able to save my favorite superheroes.
- As a user, I want to be able to use the website on mobile.

### Icebox
- As a user, I want a refresh button at the bottom of the Home page to load 6 new random supers to learn about even more supers.
- As a user, I don't want to see the same supers on the home page when refreshed so I can discover new supers.
- As a user, I want to be able to navigate to a battles index page to see what other battles users have created
- As a user, I want to be able to navigate to a battles show page to see the details of a battle
- As a user, I want to be able to navigate to a new battles page and create and save a new battle between supers
- As a user, I want to be able to see my own battles on my user page
- As a user, I want to be able to navigate to an edit battles page and update my own battles
- As a user, I want to be able to delete my own battles
- As a user, I want to be able to leave comments on show pages of battles.