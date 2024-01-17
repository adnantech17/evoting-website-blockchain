from web3 import Web3
import json
import os
# Replace with your Ethereum node URL
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545/"))

# Replace with the path to your contract's ABI JSON file
file_path = os.path.join(os.path.dirname(__file__), 'contracts', 'Voting.json')
with open(file_path) as f:
    contract_json = json.load(f)

abi = contract_json["abi"]

# # Replace with the deployed contract address
contract_address = "0xb096176b053ab35cb5Bc35f2a291EbB80D4e08A7"

contract = w3.eth.contract(address=contract_address, abi=abi)
def get_vids(contract_address):
    contract = w3.eth.contract(address=contract_address, abi=abi)
    vids = contract.functions.getVIDs().call()
    arr = []
    for vid in vids:
        arr.append(vid.hex())
    return arr

def get_vote_count(contract_address):
    contract = w3.eth.contract(address=contract_address, abi=abi)
    try:
        vote_counts = contract.functions.voteCount().call()
    except:
        vote_counts = None
    return vote_counts

def perform_vote(contract_address, id):
    contract = w3.eth.contract(address=contract_address, abi=abi)
    vote_data = [0]*5
    vote_data[id] = 1
    print(vote_data)
    accounts = w3.eth.accounts
    tx_object = {
        "from": accounts[1],
        "gas": 6721975,
    }  
    vid = contract.functions.performVote(vote_data).call()
    contract.functions.performVote(vote_data).transact(tx_object)
    print("Your vote is successfully counted\nHere is your VID:")
    print(vid.hex())
    return vid.hex()

def submit_key(contract_address, key):
    contract = w3.eth.contract(address=contract_address, abi=abi)
    accounts = w3.eth.accounts
    tx_object = {
        "from": accounts[1],
        "gas": 6721975,
    }
    result = contract.functions.submitKey(key).call()
    contract.functions.submitKey(key).transact(tx_object)
    print(result)
