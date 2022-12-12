# Move-in-mate
Student Move-in-mate

## Installation
Only use wsl ubuntu on windows

### Install node.js and npm
For windows:
```
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - &&\
sudo apt-get install -y nodejs
```

For macOS:
```
brew update
brew install node@18
```

Testing install:
```
node -v
npm -v
```

### creating new service (use express.js)
Make a new directory for every new service.

Open terminal and go to `move-in-mate` directory.
```
mkdir <new-service-name>
cd <new-service-name>
npm init
npm install express
```

### Reconfigure after cloning
Open terminal and go to each service directory directory.
```
npm install
```
