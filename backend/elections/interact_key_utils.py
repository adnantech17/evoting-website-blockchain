from web3 import Web3
import json
import os
import random
# Replace with your Ethereum node URL
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545/"))

# Replace with the path to your contract's ABI JSON file
file_path = os.path.join(os.path.dirname(__file__), 'contracts', 'KeyDistribution.json')
with open(file_path) as f:
    contract_json = json.load(f)

abi = contract_json["abi"]
def get_key(contract_address):
    contract_address = "0x833C518440e1f32cB0295f4a9654B4D549c37df2"
    contract = w3.eth.contract(address=contract_address, abi=abi)
    accounts = w3.eth.accounts
    tx_object = {
        "from": accounts[1],
        "gas": 6721975,
    }  
    data = contract.functions.getKey().call()
    contract.functions.getKey().transact(tx_object)
    

    return data