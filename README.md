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

# Diagram
![LibQuality](https://github.com/brunogdelphim/LibQuality/blob/main/LibQualy.png)

- User will reach GitHub via <strong>Backend</strong> on first access
- User will be tracked (cookies and search history) to local storage its queries
- <strong>Front-end</strong> will use tracked data to provide acertive data
- <strong>Backend</strong> will keep the <strong>Database</strong> up-to-date in scheduled manner
