from flask import Flask
from flask import request
from flask_cors import CORS, cross_origin
from processing import process_data

app = Flask(__name__)

app.config['SECRET_KEY'] = 'the quick brown fox jumps over the lazy   dog'
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={r"/foo": {"origins": "http://localhost:port"}})


@app.route('/', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content- Type','Authorization'])
def test():
    if request.method == 'GET':
        return 'AI service is up and running. Say thank you demon!'
    else:
        return "POST Error 405 Method Not Allowed"


@app.route('/design', methods=['POST', 'GET', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'])
@cross_origin(origin='localhost', headers=['Content- Type','Authorization'])
def design():
    if request.method == 'POST':
        data = request.get_json()
        res = process_data(data)
        return res

    else:
        return f"{request.method} requests are not allowed at this endpoint. Only POST requests are allowed."


if __name__ == '__main__':
    app.run('0.0.0.0:5000')
