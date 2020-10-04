# LibQuality
An endpoint that collects data from GitHub, consolidate, and make them available through a REST api.

### Performance: CQRS will segregate the user request with the main data gathering from GitHub API
### Raw data is collected with NodeJs 'https' module. It is modeled according to the sketch model and stored in CouchDB
#### CouchDB was chosen because of the multi-device replication feature. The database is designed according to the sketch model

# Achitecture Elements
## 1) Front-end
Vue.js is chosen to implement Flux and enable granular reactivity system for efficient updates

## 2) Database
CouchDB is chosen to rely on local data like and avoid waiting for a slow network connection to see data

## 3) Backend
NodeJs will orchestrate the data gathering, modeling and syncronization

## 4) GitHub API
https://developer.github.com/v3/ No authentication needed

