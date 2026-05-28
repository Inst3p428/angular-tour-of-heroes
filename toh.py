from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
app.config['DEBUG'] = True
CORS(app)


all_heroes = [
    {'id':11, 'name': 'Dr.Nice', 'power': 108},
    {'id':12, 'name': 'Narco', 'power': 110},
    {'id':13, 'name': 'Bombasto', 'power': 15},
    {'id':14, 'name': 'Celeritas', 'power': 102},
    {'id':15, 'name': 'Magneta', 'power': 14},
    {'id':16, 'name': 'RubberMan', 'power': 90},
    {'id':17, 'name': 'Dynama', 'power': 106},
    {'id':18, 'name': 'Dr Iq', 'power': 70},
    {'id':19, 'name': 'Magma', 'power': 103},
    {'id':20, 'name': 'Torando', 'power': 110}
]

@app.route('/heroes', methods=['GET'])

def heroes():
    return jsonify(all_heroes)

@app.route('/detail/<id>', methods=['GET'])
def detail(id):

    for x in all_heroes:
        print(x)
        if int(x['id']) == int(id):
            return jsonify(x)

    return "Not Found", 404


@app.route('/update', methods=['POST'])
def update():
    data = request.data
    string = data.decode("UTF-8")
    data = eval(string)

    
    for x in all_heroes:
        if x['id'] == data['id']:
            x['name'] = data['name']
            return x

    return "Not Found", 404

app.run()