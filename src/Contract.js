const ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "accepted",
				"type": "bool"
			}
		],
		"name": "CommentAccepted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "result",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "login",
				"type": "string"
			}
		],
		"name": "Login",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "who",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum AllVariables.Roles",
				"name": "oldRole",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "enum AllVariables.Roles",
				"name": "newRole",
				"type": "uint8"
			}
		],
		"name": "NewRoleApproved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "bought",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "change",
				"type": "uint256"
			}
		],
		"name": "ProductBought",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "provided",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "ProductProvided",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "result",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "login",
				"type": "string"
			}
		],
		"name": "Registration",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bool",
				"name": "result",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "who",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum AllVariables.Roles",
				"name": "oldRole",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "enum AllVariables.Roles",
				"name": "newRole",
				"type": "uint8"
			}
		],
		"name": "roleChangeRequested",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "AdminToBuyer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newAdmin",
				"type": "address"
			}
		],
		"name": "addAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_adr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_pasw",
				"type": "string"
			}
		],
		"name": "addStore",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "adminPersonalData",
		"outputs": [
			{
				"internalType": "string",
				"name": "login",
				"type": "string"
			},
			{
				"components": [
					{
						"internalType": "address",
						"name": "who",
						"type": "address"
					},
					{
						"internalType": "enum AllVariables.Roles",
						"name": "oldRole",
						"type": "uint8"
					},
					{
						"internalType": "enum AllVariables.Roles",
						"name": "newRole",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "store",
						"type": "address"
					}
				],
				"internalType": "struct AllVariables.changeRole[]",
				"name": "allroles",
				"type": "tuple[]"
			},
			{
				"internalType": "address[]",
				"name": "allsellers",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allSellers",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "allStores",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "approveChangeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkChangeRoles",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "who",
						"type": "address"
					},
					{
						"internalType": "enum AllVariables.Roles",
						"name": "oldRole",
						"type": "uint8"
					},
					{
						"internalType": "enum AllVariables.Roles",
						"name": "newRole",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "store",
						"type": "address"
					}
				],
				"internalType": "struct AllVariables.changeRole[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_storeAdr",
				"type": "address"
			}
		],
		"name": "deleteStore",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const address = '0x06b451246f4e77772617b40aD40C2658002F09C9'

export {ABI,address}