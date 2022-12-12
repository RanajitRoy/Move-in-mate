sudo apt update
sudo apt install -y git
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - &&\
sudo apt install -y nodejs
git clone https://github.com/RanajitRoy/Move-in-mate.git
sudo apt-get install gnupg2 wget -y
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb http://repo.mongodb.org/apt/debian bullseye/mongodb-org/6.0 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update -y
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
cd Move-in-mate/db-access-service
npm install
export DB_HOST="localhost"
export HOST_ENV="34.28.180.242"
node server.js &
cd ../listing-service
npm install
node server.js &
cd ../login-service
npm install
node server.js &
cd ../logs-service
npm install
node server.js &
cd ../session-manager-service
npm install
node server.js &
cd ../web-service
npm install
npm run build
sudo npm install -g serve
sudo serve -s build -l tcp://0.0.0.0:80 &