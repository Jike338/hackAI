from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    prompt = request.json['prompt']
    result = f"Processed: {prompt}"  # Replace this line with your desired processing
    print("result")
    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
