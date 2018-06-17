from flask import render_template
from flask import Flask
from pymi import light_up

app = Flask(__name__)

@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
	return render_template('hello.html', name=name)

@app.route('/light/<position>/<color>')
def handle_color(position="10", color="1"):
	light_up(position, color)
	return 'OK'

@app.route('/')
def hello_world():
	return 'Hello, World!'
