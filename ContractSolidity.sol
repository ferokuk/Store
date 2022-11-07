// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract WsrStoreFull{

    event Login(bool result, Person user);
    event LoginInStore(bool,Store store);
    event NewRoleApproved(bool approved);
    event ProductProvided(bool provided, uint price);
    event ProductBought(bool bought);

    enum Roles
    {
        admin,
        buyer,
        seller,
        provider,
        store,
        bank
    }

    struct Person
    {
        string login;
        address payable adr;
        string password;
        string FIO;
        Roles role;
        address store;
        Comment[] comments;
    }

    Person per;
    mapping(address => Person) persons;
    address payable providerAddress = payable(0x290267c2C78b481EC35eE0E1E7DcF0CcC610B010);

    struct Comment
    {
        string login;
        address from;
        address to;
        string content;
        uint rating;
        uint likes;
        uint dislikes;
        address[] whoLiked;
        address[] whoDisliked;
    }
    Comment comment;

    struct Store
    {
        string name;
        address payable adr;
        string password;
        uint rating;
        Roles role;
        Product[] products;
        Person[] staff;
        Comment[] comments;
        Comment[] answers;
    }

    Store store;
    address[] allStores;
    address[] allSellers;
    mapping(address => Store) addressToStore;

    mapping(address => uint) public debts;

    struct Product
    {
        string name;
        string expirationDate;
        int from_temperature;
        int to_temperature;
        uint basePrice;
        bool kg;
        uint amount;
    }

    Product product;
    mapping(string => Product) public products;

    struct changeRole
    {
        address who;
        Roles oldRole;
        Roles newRole;
        address store;
    }
    
    changeRole changerole;
    changeRole[] allChangeRoles;

    constructor() 
    {
        per.login = "ivan";
        per.password = "123";
        per.adr = payable(0x2fA6CA2661B08A020BB0C61aa3e9c9896e87F7AF);
        per.FIO = "Ivanov Ivan Ivanovich";
        per.role = Roles.admin;
        persons[per.adr] = per;

        per.login = "petr";
        per.password = "123";
        per.adr = payable(0x583eE37D084e77b198FAB6A599357B62FE3D9066);
        per.FIO = "Petrov Petr Petrovich";
        per.role = Roles.buyer;
        persons[per.adr] = per;

        per.login = "oleg";
        per.password = "123";
        per.adr = payable(0xF8458534206281c3D8D00F5Fe2604D618D6483BE);
        per.FIO = "Olegov Oleg Olegovich";
        per.role = Roles.buyer;
        persons[per.adr] = per;

        per.login = "roman";
        per.password = "123";
        per.adr = payable(0xf702D815Fe7740Ee8f914CEC24Bb92840cF32A7d);
        per.FIO = "Romanov Roman Romanovich";
        per.role = Roles.buyer;
        persons[per.adr] = per;

        per.login = "goldfish";
        per.password = "123";
        per.adr = payable(0x290267c2C78b481EC35eE0E1E7DcF0CcC610B010);
        per.FIO = "Gold Fish Provider";
        per.role = Roles.provider;
        persons[per.adr] = per;

        per.adr = payable(0x0DfDeCc7460ca9622a09421569299b49c3B16a66);
        per.login = "Bank";
        per.password = "1";
        per.role = Roles.bank;
        per.FIO = "";
        persons[per.adr] = per;

        store.adr = payable(0x656a2c3e866bdab8841E18374544fb9FF0de70e8);
        store.name = "#1 Dmitrov";
        store.role = Roles.store;
        store.password = "1";
        allStores.push(store.adr);
        addressToStore[store.adr] = store;

        per.login = "semen";
        per.password = "123";
        per.adr = payable(0x4a753b3dBc3bD930689DeBc4324Ec8597A5DAe11);
        per.FIO = "Semenov Semen Semenovich";
        per.role = Roles.seller;
        per.store = 0x656a2c3e866bdab8841E18374544fb9FF0de70e8;
        persons[per.adr] = per;
        allSellers.push(per.adr);
        addressToStore[per.store].staff.push(per);
        per.store = address(0);

        store.adr = payable(0xf898A379DeaABb8a9D5e40b60e072b8b4702aaB7);
        store.name = "#2 Kaluga";
        store.role = Roles.store;
        store.password = "2";
        allStores.push(store.adr);
        addressToStore[store.adr] = store;

        store.adr = payable(0xCc98260c057aDe93dd28aD824B05a7a83cde53B4);
        store.name = "#3 Moscow";
        store.role = Roles.store;
        store.password = "3";
        allStores.push(store.adr);
        addressToStore[store.adr] = store;

        store.adr = payable(0xdc7f797223168136503aaEca02a4D99E503c9cfc);
        store.name = "#4 Ryazan'";
        store.role = Roles.store;
        store.password = "4";
        allStores.push(store.adr);
        addressToStore[store.adr] = store;

        store.adr = payable(0x710474e91AF82199f46836d604a84DCbaB5d113E);
        store.name = "#5 Samara";
        store.role = Roles.store;
        store.password = "5";
        allStores.push(store.adr);
        addressToStore[store.adr] = store;

        store.adr = payable(0xDcd80865e24aBAe1Bc19968B873C2b284370D7d9);
        store.name = "#6 Khabarovsk";
        store.role = Roles.store;
        store.password = "6";
        allStores.push(store.adr);
        addressToStore[store.adr] = store;

        product.name = "krev";
        product.expirationDate = "123";
        product.from_temperature = -5;
        product.to_temperature = -20;
        product.basePrice = 3*10**16;
        product.kg = true;
        products["krev"] = product;
        product.amount = 200;
        addressToStore[0x656a2c3e866bdab8841E18374544fb9FF0de70e8].products.push(product);
        product.amount = 0;

        comment.login = "petr";
        comment.from = 0x583eE37D084e77b198FAB6A599357B62FE3D9066;
        comment.to = 0x656a2c3e866bdab8841E18374544fb9FF0de70e8;
        comment.content = unicode"Быстрое обслуживание!";
        comment.rating = 9;
        comment.likes = 15;
        comment.dislikes = 1;
        addressToStore[0x656a2c3e866bdab8841E18374544fb9FF0de70e8].comments.push(comment);
        persons[0x583eE37D084e77b198FAB6A599357B62FE3D9066].comments.push(comment);

        comment.login = "roman";
        comment.from = 0xf702D815Fe7740Ee8f914CEC24Bb92840cF32A7d;
        comment.to = 0x656a2c3e866bdab8841E18374544fb9FF0de70e8;
        comment.content = unicode"Ничего особенного";
        comment.rating = 5;
        comment.likes = 3;
        comment.dislikes = 20;
        addressToStore[0x656a2c3e866bdab8841E18374544fb9FF0de70e8].comments.push(comment);
        persons[0xf702D815Fe7740Ee8f914CEC24Bb92840cF32A7d].comments.push(comment);

        comment.login = "roman";
        comment.from = 0xf702D815Fe7740Ee8f914CEC24Bb92840cF32A7d;
        comment.to = 0xdc7f797223168136503aaEca02a4D99E503c9cfc;
        comment.content = unicode"Ничего особенного";
        comment.rating = 5;
        comment.likes = 3;
        comment.dislikes = 20;
        addressToStore[0xdc7f797223168136503aaEca02a4D99E503c9cfc].comments.push(comment);
        persons[0xf702D815Fe7740Ee8f914CEC24Bb92840cF32A7d].comments.push(comment);

        comment.login = "semen";
        comment.from = 0x4a753b3dBc3bD930689DeBc4324Ec8597A5DAe11;
        comment.to = 0xf702D815Fe7740Ee8f914CEC24Bb92840cF32A7d;
        comment.content = unicode"Мне кажется ты охуел";
        addressToStore[0x656a2c3e866bdab8841E18374544fb9FF0de70e8].answers.push(comment);
        persons[0x4a753b3dBc3bD930689DeBc4324Ec8597A5DAe11].comments.push(comment);
        comment.likes = 0;
        comment.dislikes = 0;
    }

    function login(address _adr, string memory _pasw) external 
    {
        require(persons[_adr].adr != address(0) && keccak256(abi.encodePacked((persons[_adr].password))) == keccak256(abi.encodePacked((_pasw))));
        emit Login(true,persons[_adr]);
    }

    function registration(string memory _login, string memory _pasw, address payable _adr, string memory _FIO) external
    {
        require(persons[_adr].adr == address(0) && addressToStore[_adr].adr == address(0));
        per.login = _login;
        per.password = _pasw;
        per.adr = _adr;
        per.FIO = _FIO;
        per.role = Roles.buyer;
        persons[per.adr] = per;
    }

    function getAllStores() external view returns(address[] memory stores)
    {
        return allStores;
    }

    function checkStoreComments(address _storeAdr) external view returns(Comment[] memory)
    {
        return addressToStore[_storeAdr].comments;
    }

    function checkStoreAnswers(address _storeAdr) external view returns(Comment[] memory)
    {
        return addressToStore[_storeAdr].answers;
    }

    function createProduct(string memory _name, string memory _expDate, int _from_temp, int _to_temp, uint _basePrice, bool _kg) external
    {
        require(persons[msg.sender].role == Roles.provider);
        product.name = _name;
        product.expirationDate = _expDate;
        product.from_temperature = _from_temp;
        product.to_temperature = _to_temp;
        product.basePrice = _basePrice;
        product.kg = _kg;
        products[_name] = product;
    }

    function loginInStore(address _storeAdr, string memory _pasw) external
    {
        require(addressToStore[_storeAdr].adr != address(0) && keccak256(abi.encodePacked((addressToStore[_storeAdr].password))) == keccak256(abi.encodePacked((_pasw))));
        emit LoginInStore(true,addressToStore[_storeAdr]);
    }

    function payDebts() payable external
    {
        require(addressToStore[msg.sender].role == Roles.store);
        debts[msg.sender] -= msg.value;
    }

    function updateStoreRating(uint _rating) external 
    {
        addressToStore[msg.sender].rating = _rating;
    }

    function calculatePriceOfProduct(string memory _name, uint _amount, uint _K) view public returns(uint)
    {
        require(products[_name].basePrice != 0);
        return ((products[_name].basePrice - ((products[_name].basePrice * addressToStore[msg.sender].rating)/10000)) * _K * _amount)/100;
    }

    function buyAndProvideProduct(string memory _name, uint _amount, uint _K) payable external
    {
        require(addressToStore[msg.sender].role == Roles.store);
        uint firstPrice = calculatePriceOfProduct(_name,_amount, _K);
        uint price = firstPrice;
        for(uint i = 0; i < 6; i++)
        {
            int random_temperature = int(uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty, msg.sender)))) % 51;
            if(random_temperature > products[_name].to_temperature || -random_temperature < products[_name].from_temperature)
            {
                price*=90;
                price/=100;
            }
        }
        providerAddress.transfer(price);
        payable(msg.sender).transfer(firstPrice-price);
        for(uint i = 0; i < addressToStore[msg.sender].products.length; i++)
        {
           if(keccak256(abi.encodePacked((addressToStore[msg.sender].products[i].name))) == keccak256(abi.encodePacked((products[_name].name))))
           {
               addressToStore[msg.sender].products[i].amount += _amount;
               emit ProductProvided(true, price);
               return;
           }
           
        }
        Product memory newProduct = products[_name];
        newProduct.amount = _amount;
        newProduct.basePrice = newProduct.basePrice*15/10;
        addressToStore[msg.sender].products.push(newProduct);
        emit ProductProvided(true, price);
    }

    function _onlyAdmin() private view
    {
        require(persons[msg.sender].role == Roles.admin);
    }

    modifier onlyAdmin()
    {
        _onlyAdmin();
        _;
    }

    function AdminToBuyer() external onlyAdmin()
    {
        persons[msg.sender].role = Roles.buyer;
    }

    function checkChangeRoles() external view onlyAdmin() returns(changeRole[] memory)
    {
        return allChangeRoles;
    }

    function refuseChangeRole(uint _index) external onlyAdmin()
    {
        for(uint i = _index; i < allChangeRoles.length - 1; i++)
        {
            allChangeRoles[i] = allChangeRoles[i + 1];
        }
        allChangeRoles.pop();
    }

    function approveChangeRole(uint _index) external onlyAdmin()
    {
        if(allChangeRoles[_index].newRole == Roles.seller)
        {
            persons[allChangeRoles[_index].who].role = allChangeRoles[_index].newRole;
            addressToStore[allChangeRoles[_index].store].staff.push(persons[allChangeRoles[_index].who]);
            persons[allChangeRoles[_index].who].store = allChangeRoles[_index].store;
            allSellers.push(allChangeRoles[_index].who);
        }
        else
        {
            persons[allChangeRoles[_index].who].role = allChangeRoles[_index].newRole;
            for(uint i = 0; i < addressToStore[persons[allChangeRoles[_index].who].store].staff.length; i++)
            {
                if(addressToStore[persons[allChangeRoles[_index].who].store].staff[i].adr == persons[allChangeRoles[_index].who].adr)
                {
                    for(uint k = i; k <  addressToStore[persons[allChangeRoles[_index].who].store].staff.length - 1; k++)
                    {
                        addressToStore[persons[allChangeRoles[_index].who].store].staff[k] =  addressToStore[persons[allChangeRoles[_index].who].store].staff[k + 1];
                    }
                    addressToStore[persons[allChangeRoles[_index].who].store].staff.pop();
                    break;
                }
            }
            for(uint i = 0; i < allSellers.length; i++){
                if(allSellers[i] == allChangeRoles[_index].who)
                {
                    
                    for(uint k = i; k < allSellers.length - 1; k++)
                    {
                        allSellers[k] = allSellers[k + 1];
                    }
                    allSellers.pop();
                    break;
                }
            }
            
        }
        emit NewRoleApproved(true);
        for(uint i = _index; i < allChangeRoles.length - 1; i++)
        {
            allChangeRoles[i] = allChangeRoles[i + 1];
        }
        allChangeRoles.pop();
    } 

    function addAdmin(address _newAdmin) external onlyAdmin
    {
        require(persons[_newAdmin].adr != address(0));
        
        require(persons[_newAdmin].role != Roles.admin);
        persons[_newAdmin].role = Roles.admin;
    }

    function addStore(address payable _adr, string memory _name, string memory _pasw) external onlyAdmin()
    {
        //require(addressToStore[_adr].adr == address(0));
        store.adr = _adr;
        store.name = _name;
        store.password = _pasw;
        store.role = Roles.store;
        debts[store.adr] += (10**18) * 1000;
        addressToStore[_adr] = store;
        allStores.push(_adr);
    }

    function deleteStore(address _storeAdr) external onlyAdmin()
    {
        for (uint i = 0; i < allStores.length; i++)
        {
            if(allStores[i] == _storeAdr)
            {
                for(uint k = i; k < allStores.length - 1; k++)
                {
                    allStores[k] = allStores[k + 1];
                }
                allStores.pop();
                break;
            }
        }
        for(uint i = 0; i < addressToStore[_storeAdr].staff.length; i++)
        {
            persons[addressToStore[_storeAdr].staff[i].adr].role = Roles.buyer;
            persons[addressToStore[_storeAdr].staff[i].adr].store = address(0);
        }

        for(uint i = 0; i < allSellers.length; i++)
        {
            for(uint j = 0; j < addressToStore[_storeAdr].staff.length; j++)
            {
                if(allSellers[i] == addressToStore[_storeAdr].staff[j].adr)
                {
                    for(uint k = i; k < allSellers.length - 1; k++)
                    {
                        allSellers[k] = allSellers[k + 1];
                    }
                    allSellers.pop();
                }
            }
        }

        delete addressToStore[_storeAdr];
    }

    function adminPersonalData() view external onlyAdmin() returns(changeRole[] memory allroles,address[] memory allsellers)
    {
        return(allChangeRoles,allSellers);
    }

    function _onlyBuyer() private view
    {
        require(persons[msg.sender].role == Roles.buyer);
    }

    modifier onlyBuyer()
    {
        _onlyBuyer();
        _;
    }

    function buyerComment(string memory _content, address _to, uint _rating) external onlyBuyer()
    {
        comment.content = _content;
        comment.to = _to;
        comment.login = persons[msg.sender].login;
        comment.rating = _rating;
        persons[msg.sender].comments.push(comment);
        addressToStore[_to].comments.push(comment);
    }

    //to prevent from liking/disling one comment multiple times
    function validLikeDislike(uint _index, address _storeAdr, address _sender, bool _validateLike, bool _answer) private returns(bool)
    {
        if(!_answer)
        {
            if(_validateLike)
            {
                for(uint i = 0; i < addressToStore[_storeAdr].comments[_index].whoLiked.length; i++)
                {
                    if(addressToStore[_storeAdr].comments[_index].whoLiked[i] == _sender) return false;
                }
                for(uint i = 0; i < addressToStore[_storeAdr].comments[_index].whoDisliked.length; i++)
                {
                    if(addressToStore[_storeAdr].comments[_index].whoDisliked[i] == _sender)
                    {
                        addressToStore[_storeAdr].comments[_index].dislikes--;
                        delete addressToStore[_storeAdr].comments[_index].whoDisliked[i];
                        break;
                    }
                }
            }
            else
            {
                for(uint i = 0; i < addressToStore[_storeAdr].comments[_index].whoDisliked.length; i++)
                {
                    if(addressToStore[_storeAdr].comments[_index].whoDisliked[i] == _sender) return false;
                }
                for(uint i = 0; i < addressToStore[_storeAdr].comments[_index].whoLiked.length; i++)
                {
                    if(addressToStore[_storeAdr].comments[_index].whoLiked[i] == _sender)
                    {
                        addressToStore[_storeAdr].comments[_index].likes--;
                        delete addressToStore[_storeAdr].comments[_index].whoLiked[i];
                        break;
                    }
                }
            }
        }
        else
        {
            if(_validateLike)
            {
                for(uint i = 0; i < addressToStore[_storeAdr].answers[_index].whoLiked.length; i++)
                {
                    if(addressToStore[_storeAdr].answers[_index].whoLiked[i] == _sender) return false;
                }
                for(uint i = 0; i < addressToStore[_storeAdr].answers[_index].whoDisliked.length; i++)
                {
                    if(addressToStore[_storeAdr].answers[_index].whoDisliked[i] == _sender)
                    {
                        addressToStore[_storeAdr].answers[_index].dislikes--;
                        delete addressToStore[_storeAdr].answers[_index].whoDisliked[i];
                        break;
                    }
                }
            }
            else
            {
                for(uint i = 0; i < addressToStore[_storeAdr].answers[_index].whoDisliked.length; i++)
                {
                    if(addressToStore[_storeAdr].answers[_index].whoDisliked[i] == _sender) return false;
                }
                for(uint i = 0; i < addressToStore[_storeAdr].answers[_index].whoLiked.length; i++)
                {
                    if(addressToStore[_storeAdr].answers[_index].whoLiked[i] == _sender)
                    {
                        addressToStore[_storeAdr].answers[_index].likes--;
                        delete addressToStore[_storeAdr].answers[_index].whoLiked[i];
                        break;
                    }
                }
            }
        }
        return true;
    }

    function buyerLikeComment(uint _index, address _storeAdr, bool _answer) external onlyBuyer()
    {
        if(!_answer)
        {
            require(validLikeDislike(_index,_storeAdr,msg.sender,true,false));
            addressToStore[_storeAdr].comments[_index].likes++;
            addressToStore[_storeAdr].comments[_index].whoLiked.push(msg.sender);
        }
        else
        {
            require(validLikeDislike(_index,_storeAdr,msg.sender,true,true));
            addressToStore[_storeAdr].answers[_index].likes++;
            addressToStore[_storeAdr].answers[_index].whoLiked.push(msg.sender);
        }
    }

    function buyerDislikeComment(uint _index, address _storeAdr,bool _answer) external onlyBuyer()
    {
        if(!_answer)
        {
            require(validLikeDislike(_index,_storeAdr,msg.sender,false,false));
            addressToStore[_storeAdr].comments[_index].dislikes++;
            addressToStore[_storeAdr].comments[_index].whoDisliked.push(msg.sender);
        }
        else
        {
            require(validLikeDislike(_index,_storeAdr,msg.sender,false,true));
            addressToStore[_storeAdr].answers[_index].dislikes++;
            addressToStore[_storeAdr].answers[_index].whoDisliked.push(msg.sender);
        }
    }

    function validChangeRole() view private returns(bool res)
    {
        for(uint i = 0; i < allChangeRoles.length; i++){
            if(allChangeRoles[i].who == msg.sender){
                return false;
            }
        }
        return true;
    }

    function buyerToSeller(address _storeAdr) external onlyBuyer()
    {
        require(validChangeRole());
        changerole.who = msg.sender;
        changerole.store = _storeAdr;
        changerole.oldRole = Roles.buyer;
        changerole.newRole = Roles.seller;
        allChangeRoles.push(changerole);
    }

    function buyProduct(address payable _storeAdr, uint _index, uint _amount) payable external onlyBuyer()
    {
        uint price = addressToStore[_storeAdr].products[_index].basePrice * _amount;
        addressToStore[_storeAdr].products[_index].amount -= _amount;
        _storeAdr.transfer(price);
        emit ProductBought(true);
    }

    function showProducts(address _storeAdr) external view returns(Product[] memory)
    {
        return addressToStore[_storeAdr].products;
    }

    function buyerPersonalData() external view onlyBuyer() returns(Comment[] memory)
    {
        return(persons[msg.sender].comments);
    }

    function _onlySeller() private view
    {
        require(persons[msg.sender].role == Roles.seller);
    }

    modifier onlySeller()
    {
        _onlySeller();
        _;
    }

    function answerOnComment(string memory _content, address _to) external onlySeller()
    {
        comment.content = _content;
        comment.from = msg.sender;
        comment.to = _to;
        comment.likes = 0;
        comment.dislikes = 0;
        comment.login = persons[msg.sender].login;
        persons[msg.sender].comments.push(comment);
        addressToStore[persons[msg.sender].store].answers.push(comment);
    }
    
    function sellerToBuyer() external onlySeller()
    {
        require(validChangeRole());
        changerole.who = msg.sender;
        changerole.store = persons[msg.sender].store;
        changerole.oldRole = Roles.seller;
        changerole.newRole = Roles.buyer;
        allChangeRoles.push(changerole);
    }

    function sellerPersonalData() view external onlySeller() returns(Comment[] memory)
    {
        return(persons[msg.sender].comments);
    }

}
    