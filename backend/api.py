# app.py
from flask import Flask, request, jsonify
from main import crew
app = Flask(__name__)


def crewkickoff(profile_link, post_links, product_name, description):
    inputs = {"data": [{"profilelink": profile_link, "postlinks": post_links, "productname": product_name, "description": description}]}
    crew_output = crew.kickoff(inputs = inputs)
    return f"{crew_output}"


@app.route('/process', methods=['POST'])
def process_data():
    data = request.get_json()
    profile_link = data.get('profileLink')
    post_links = data.get('postLinks')
    product_name = data.get('productName')
    description = data.get('description')
    
    
    result = crewkickoff(profile_link, post_links, product_name, description)
    
    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(debug=True)
