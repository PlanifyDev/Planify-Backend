import grpc
from generated.ai_service_pb2 import project_response, version_response
from generated.ai_service_pb2_grpc import AIServicer, add_AIServicer_to_server
from concurrent import futures

class AIServicer(AIServicer):
    def create_project(self, request, context):
        print(request)
        response = project_response()
        response.project_img = "project_image"
        response.project_icon = "project_icon"

        return response

    def create_version(self, request, context):
        print(request)
        
        response = version_response()
        response.version_img = "version_image"
        response.version_icon = "version_icon"

        return response


server = grpc.server(
    futures.ThreadPoolExecutor(max_workers=10),
    options=(('grpc.max_thread_pool_size', 10),)
)

add_AIServicer_to_server(AIServicer(), server)


server.add_insecure_port("[::]:50051")
server.start()
server.wait_for_termination()