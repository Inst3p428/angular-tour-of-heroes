from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
app.config['DEBUG'] = True
CORS(app)

all_heroes = [
    {'id':11, 'name': 'Dr.Nice'},
    {'id':12, 'name': 'Narco'},
    {'id':13, 'name': 'Bombasto'},
    {'id':14, 'name': 'Celeritas'},
    {'id':15, 'name': 'Magneta'},
    {'id':16, 'name': 'RubberMan'},
    {'id':17, 'name': 'Dynama'},
    {'id':18, 'name': 'Dr Iq'},
    {'id':19, 'name': 'Magma'},
    {'id':20, 'name': 'Torando'}
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