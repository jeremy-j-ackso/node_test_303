# Node Test Stuff

# Endpoints

## create
Should make insert a new record in the database.

```javascript
curl -sL -X PUT http://site.com:3000/addDocument \
  -H 'Accept: application/json' \
  -H 'Content-Type application/json' \
  --data '{"_id": "someid", "somedata": {"nestedworks": "one"}, "otherdata": 1}'
```

## get one by id
Should accept a query parameter of `_id` and return the according record.

```javascript
// Example: 
curl -sL http://site.com:3000/getOne?_id=XXXXX
```

## get all
Should just grab records form the database..

```javascript
// Example:
curl -sL http://site.com:3000/getAllDocs
```

## update
Should update an existing document in the database and otherwise error.

```javascript
// Example:
curl -sL -X POST http://site.com:3000/updateDoc \
  -H 'Accept: application/json'
  -H 'Accept: application/json'
  --data '{"_id": "someid", "somedata": {"nestedworks": "two"}, "otherdata": 1}'
```

## delete
Should mark a document as deleted.

```javascript
// Example:
curl -sL DELETE http://site.com3000/removeDoc?_id=someid
```
