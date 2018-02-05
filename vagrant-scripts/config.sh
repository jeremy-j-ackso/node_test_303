# Adding couchdb repos
echo "deb https://apache.bintray.com/couchdb-deb xenial main" > /etc/apt/sources.list.d/couchdb.list
curl -L https://couchdb.apache.org/repo/bintray-pubkey.asc | apt-key add -


# Setting up couchdb debconf
COUCHDB_PASSWORD=password
COUCHDB_BIND=0.0.0.0
echo "couchdb couchdb/mode select standalone
couchdb couchdb/mode seen true
couchdb couchdb/bindaddress string ${COUCHDB_BIND}
couchdb couchdb/bindaddress seen true
couchdb couchdb/adminpass password ${COUCHDB_PASSWORD}
couchdb couchdb/adminpass seen true
couchdb couchdb/adminpass_again password ${COUCHDB_PASSWORD}
couchdb couchdb/adminpass_again seen true" | debconf-set-selections

# Installing couchdb
apt-get update -y -q
DEBIAN_FRONTEND=noninteractive apt-get install -y -q couchdb

# Creating couchdb database for node_db.
curl -sL -X PUT http://admin:password@localhost:5984/node_db

# Creating node_user for couchdb
curl -sL -X PUT http://admin:password@localhost:5984/_users/org.couchdb.user:node_user \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  --data '{"name": "node_user", "password": "realysecure", "roles": ["api"], "type": "user"}'

# Adding node_user to _security document for node_db.
curl -sL -X PUT http://admin:password@localhost:5984/node_db/_security \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  --data '{"admins": {"names": [], "roles": []}, "members": {"names": ["node_user"], "roles": ["api"]}}'
