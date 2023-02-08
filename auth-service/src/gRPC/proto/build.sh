# npm i grpc_tools_node_protoc_ts
# npm i grpc-tools@1.11.2
# PROTOC_GEN_GRPC="./node_modules/.bin/grpc_tools_node_protoc_plugin.cmd"
# PROTOC_GEN_GRPC_TS="./node_modules/.bin/protoc-gen-ts.cmd"
# PROTO_DIR="./src/gRPC/proto"
# OUT_DIR="./src/gRPC/proto_out"
# npx grpc_tools_node_protoc \
#   --plugin=protoc-gen-grpc:${PROTOC_GEN_GRPC} \
#   --js_out=import_style=commonjs,binary:${OUT_DIR} \
#   --grpc_out=${OUT_DIR} \
#   -I ${PROTO_DIR} \
#   ${PROTO_DIR}/*.proto
# npx grpc+_tools_node_protoc \
# protoc \
#   --plugin=protoc-gen-ts:${PROTOC_GEN_GRPC_TS}\
#   --ts_out=${OUT_DIR} \
#   -I ${PROTO_DIR} \
#   ${PROTO_DIR}/*.proto
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"
PROTOC_GEN_GRPC_PATH=""
# Path to this plugin
PROTOC_GEN_GRPC_TS_PATH="./node_modules/bin/protoc-gen-grpc-ts"
# Directory to write generated code to (.js and .d.ts files) 
OUT_DIR="./src/gRPC/proto_out"
protoc \
    --plugin="./node_modules/.bin/protoc-gen-ts_proto" \
    --ts_proto_opt="${OUT_DIR}" \
    --ts_proto_out="${OUT_DIR}" \
    ./src/gRPC/proto/auth.proto