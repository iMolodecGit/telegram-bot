# telegram-bot
------------------------

grpc types init -npx protoc \
--plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto \
--ts_proto_out=./src/grpc \
--ts_proto_opt=outputServices=grpc-js,esModuleInterop=true,outputClientImpl=grpc-js \
-I ./grpc \
./grpc/warehouse.proto