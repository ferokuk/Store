const ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
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
				"components": [
					{
						"internalType": "string",
						"name": "login",
						"type": "string"
					},
					{
						"internalType": "address payable",
						"name": "adr",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "password",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "FIO",
						"type": "string"
					},
					{
						"internalType": "enum WsrStoreFull.Roles",
						"name": "role",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "store",
						"type": "address"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "login",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "from",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "to",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "content",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "rating",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "likes",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "dislikes",
								"type": "uint256"
							},
							{
								"internalType": "address[]",
								"name": "whoLiked",
								"type": "address[]"
							},
							{
								"internalType": "address[]",
								"name": "whoDisliked",
								"type": "address[]"
							}
						],
						"internalType": "struct WsrStoreFull.Comment[]",
						"name": "comments",
						"type": "tuple[]"
					}
				],
				"indexed": false,
				"internalType": "struct WsrStoreFull.Person",
				"name": "user",
				"type": "tuple"
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
				"name": "",
				"type": "bool"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "address payable",
						"name": "adr",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "password",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "rating",
						"type": "uint256"
					},
					{
						"internalType": "enum WsrStoreFull.Roles",
						"name": "role",
						"type": "uint8"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "expirationDate",
								"type": "string"
							},
							{
								"internalType": "int256",
								"name": "from_temperature",
								"type": "int256"
							},
							{
								"internalType": "int256",
								"name": "to_temperature",
								"type": "int256"
							},
							{
								"internalType": "uint256",
								"name": "basePrice",
								"type": "uint256"
							},
							{
								"internalType": "bool",
								"name": "kg",
								"type": "bool"
							},
							{
								"internalType": "uint256",
								"name": "amount",
								"type": "uint256"
							}
						],
						"internalType": "struct WsrStoreFull.Product[]",
						"name": "products",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "login",
								"type": "string"
							},
							{
								"internalType": "address payable",
								"name": "adr",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "password",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "FIO",
								"type": "string"
							},
							{
								"internalType": "enum WsrStoreFull.Roles",
								"name": "role",
								"type": "uint8"
							},
							{
								"internalType": "address",
								"name": "store",
								"type": "address"
							},
							{
								"components": [
									{
										"internalType": "string",
										"name": "login",
										"type": "string"
									},
									{
										"internalType": "address",
										"name": "from",
										"type": "address"
									},
									{
										"internalType": "address",
										"name": "to",
										"type": "address"
									},
									{
										"internalType": "string",
										"name": "content",
										"type": "string"
									},
									{
										"internalType": "uint256",
										"name": "rating",
										"type": "uint256"
									},
									{
										"internalType": "uint256",
										"name": "likes",
										"type": "uint256"
									},
									{
										"internalType": "uint256",
										"name": "dislikes",
										"type": "uint256"
									},
									{
										"internalType": "address[]",
										"name": "whoLiked",
										"type": "address[]"
									},
									{
										"internalType": "address[]",
										"name": "whoDisliked",
										"type": "address[]"
									}
								],
								"internalType": "struct WsrStoreFull.Comment[]",
								"name": "comments",
								"type": "tuple[]"
							}
						],
						"internalType": "struct WsrStoreFull.Person[]",
						"name": "staff",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "login",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "from",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "to",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "content",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "rating",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "likes",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "dislikes",
								"type": "uint256"
							},
							{
								"internalType": "address[]",
								"name": "whoLiked",
								"type": "address[]"
							},
							{
								"internalType": "address[]",
								"name": "whoDisliked",
								"type": "address[]"
							}
						],
						"internalType": "struct WsrStoreFull.Comment[]",
						"name": "comments",
						"type": "tuple[]"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "login",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "from",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "to",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "content",
								"type": "string"
							},
							{
								"internalType": "uint256",
								"name": "rating",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "likes",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "dislikes",
								"type": "uint256"
							},
							{
								"internalType": "address[]",
								"name": "whoLiked",
								"type": "address[]"
							},
							{
								"internalType": "address[]",
								"name": "whoDisliked",
								"type": "address[]"
							}
						],
						"internalType": "struct WsrStoreFull.Comment[]",
						"name": "answers",
						"type": "tuple[]"
					}
				],
				"indexed": false,
				"internalType": "struct WsrStoreFull.Store",
				"name": "store",
				"type": "tuple"
			}
		],
		"name": "LoginInStore",
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
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "ProductProvided",
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
				"components": [
					{
						"internalType": "address",
						"name": "who",
						"type": "address"
					},
					{
						"internalType": "enum WsrStoreFull.Roles",
						"name": "oldRole",
						"type": "uint8"
					},
					{
						"internalType": "enum WsrStoreFull.Roles",
						"name": "newRole",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "store",
						"type": "address"
					}
				],
				"internalType": "struct WsrStoreFull.changeRole[]",
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
				"internalType": "string",
				"name": "_content",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			}
		],
		"name": "answerOnComment",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_K",
				"type": "uint256"
			}
		],
		"name": "buyAndProvideProduct",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_storeAdr",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "buyProduct",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_content",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_rating",
				"type": "uint256"
			}
		],
		"name": "buyerComment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_storeAdr",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_answer",
				"type": "bool"
			}
		],
		"name": "buyerDislikeComment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_storeAdr",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_answer",
				"type": "bool"
			}
		],
		"name": "buyerLikeComment",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "buyerPersonalData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "login",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "content",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "rating",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "likes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "dislikes",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "whoLiked",
						"type": "address[]"
					},
					{
						"internalType": "address[]",
						"name": "whoDisliked",
						"type": "address[]"
					}
				],
				"internalType": "struct WsrStoreFull.Comment[]",
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
		"name": "buyerToSeller",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_amount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_K",
				"type": "uint256"
			}
		],
		"name": "calculatePriceOfProduct",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
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
						"internalType": "enum WsrStoreFull.Roles",
						"name": "oldRole",
						"type": "uint8"
					},
					{
						"internalType": "enum WsrStoreFull.Roles",
						"name": "newRole",
						"type": "uint8"
					},
					{
						"internalType": "address",
						"name": "store",
						"type": "address"
					}
				],
				"internalType": "struct WsrStoreFull.changeRole[]",
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
		"name": "checkStoreAnswers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "login",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "content",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "rating",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "likes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "dislikes",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "whoLiked",
						"type": "address[]"
					},
					{
						"internalType": "address[]",
						"name": "whoDisliked",
						"type": "address[]"
					}
				],
				"internalType": "struct WsrStoreFull.Comment[]",
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
		"name": "checkStoreComments",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "login",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "content",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "rating",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "likes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "dislikes",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "whoLiked",
						"type": "address[]"
					},
					{
						"internalType": "address[]",
						"name": "whoDisliked",
						"type": "address[]"
					}
				],
				"internalType": "struct WsrStoreFull.Comment[]",
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
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_expDate",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "_from_temp",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "_to_temp",
				"type": "int256"
			},
			{
				"internalType": "uint256",
				"name": "_basePrice",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "_kg",
				"type": "bool"
			}
		],
		"name": "createProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "debts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
	},
	{
		"inputs": [],
		"name": "getAllStores",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "stores",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_adr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_pasw",
				"type": "string"
			}
		],
		"name": "login",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_storeAdr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_pasw",
				"type": "string"
			}
		],
		"name": "loginInStore",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "payDebts",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "products",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "expirationDate",
				"type": "string"
			},
			{
				"internalType": "int256",
				"name": "from_temperature",
				"type": "int256"
			},
			{
				"internalType": "int256",
				"name": "to_temperature",
				"type": "int256"
			},
			{
				"internalType": "uint256",
				"name": "basePrice",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "kg",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
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
		"name": "refuseChangeRole",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_login",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_pasw",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "_adr",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_FIO",
				"type": "string"
			}
		],
		"name": "registration",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sellerPersonalData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "login",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "content",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "rating",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "likes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "dislikes",
						"type": "uint256"
					},
					{
						"internalType": "address[]",
						"name": "whoLiked",
						"type": "address[]"
					},
					{
						"internalType": "address[]",
						"name": "whoDisliked",
						"type": "address[]"
					}
				],
				"internalType": "struct WsrStoreFull.Comment[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sellerToBuyer",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "showProducts",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "expirationDate",
						"type": "string"
					},
					{
						"internalType": "int256",
						"name": "from_temperature",
						"type": "int256"
					},
					{
						"internalType": "int256",
						"name": "to_temperature",
						"type": "int256"
					},
					{
						"internalType": "uint256",
						"name": "basePrice",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "kg",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "amount",
						"type": "uint256"
					}
				],
				"internalType": "struct WsrStoreFull.Product[]",
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
				"internalType": "uint256",
				"name": "_rating",
				"type": "uint256"
			}
		],
		"name": "updateStoreRating",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const address = '0xA329F1075149dB7bC56e33bCa4b01b6D243C9a15'

export {ABI,address}
