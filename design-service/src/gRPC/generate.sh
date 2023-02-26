
# this if i use protoc-gen-ts locally (not installed globally)
# grpc_tools_node_protoc \
#   --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
#   --js_out=import_style=commonjs,binary:./generated \
#   --grpc_out=./generated \
#   --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
#   --ts_out=./generated \
#   example.proto

# this if i use protoc-gen-ts installed globally
# grpc_tools_node_protoc \
#   --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
#   --js_out=import_style=commonjs,binary:./generated \
#   --grpc_out=./generated \
#   --plugin=protoc-gen-ts=`which protoc-gen-ts` \
#   --ts_out=./generated \
#   example.proto


# grpc_tools_node_protoc \
#   --plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
#   --js_out=import_style=commonjs,binary:./generated \
#   --grpc_out=./generated \
#   --plugin=protoc-gen-ts=`which protoc-gen-ts-plugin` \
#   --ts_out=./generated \
#   example.proto