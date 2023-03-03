#  - Build the proto files for the gRPC server
grpc_tools_node_protoc \
    --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
    --js_out=import_style=commonjs,binary:../generated \
    --grpc_out=../generated \
    --plugin=protoc-gen-ts=`which protoc-gen-ts-plugin` \
    --ts_out=../generated \
    auth.proto

