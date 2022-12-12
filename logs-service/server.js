const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "../proto/logs.proto";

const loaderOptions = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

const logs = []

var packageDef = protoLoader.loadSync(PROTO_PATH, loaderOptions);
const grpcObj = grpc.loadPackageDefinition(packageDef);

const ourServer = new grpc.Server();

ourServer.addService(grpcObj.LogsSvc.service, {
    add: (logMsg, callback) => {
        logs.push(logMsg.request.msg)
        console.log(logMsg.request.msg)
        callback(null, "success");
    },
});

ourServer.bindAsync(
    "0.0.0.0:6001",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
        console.log("Server running at http://0.0.0.0:6001");
        ourServer.start();
    }
);