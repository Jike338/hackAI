from flask import Flask, render_template, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process', methods=['POST'])
def process():
    prompt = request.json['prompt']

    # Execute the curl command
    try:
        output = subprocess.check_output(["curl", "aaa.com"], text=True)
        # if you want the raw bytes, remove the text=True argument
    except subprocess.CalledProcessError as e:
        output = f"Error executing curl: {e}"

    print(f"CURL Output: {output}")

    result = f"Processed: {prompt}"  # You can integrate the output into this result if needed
    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
