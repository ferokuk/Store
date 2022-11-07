//current problems:
//1) Cyrillic letters are not supported via input

const W3 = require('web3')
const ABI = require("./getABI")
const input = require('readline-sync');

const web3 = new W3(new W3.providers.WebsocketProvider('ws://127.0.0.1:8546'))
const address = require("./getAddress")
const contract = new web3.eth.Contract(ABI,address)
const roles = new Map()
roles.set('0','Admin')
roles.set('1','Buyer')
roles.set('2','Seller')
roles.set('3','Provider')
roles.set('4','Store')
roles.set('5','Bank')
async function getStores()
{
  let strs = []
  await contract.methods
  .getAllStores()
  .call()
  .then(value => strs = value)
  return strs
}
async function commsAndAnsws(strs,choice)
{
  let cmnts = []
  let answs = []
  await contract.methods
  .checkStoreComments(strs[choice-1])
  .call()
  .then(value => cmnts = value)
  await contract.methods
  .checkStoreAnswers(strs[choice-1])
  .call()
  .then(value => answs = value)
  console.log("\n")
  for(let i = 0; i < cmnts.length; i++)
  {
    console.log(`#${i+1} (C)`)
    console.log("=====================================")
    console.log(`login: ${cmnts[i][0]}`)
    console.log(`to: ${cmnts[i][2]}`)
    console.log(cmnts[i][3])
    console.log(`likes: ${cmnts[i][5]}, dislikes: ${cmnts[i][6]}`)
    console.log(`rating: ${cmnts[i][4]}`)
    console.log("answers: ")
    for(let j = 0; j < answs.length; j++)
    {
      if(answs[j][2] != cmnts[i][1]) continue
      console.log(`#${j+1} (A)`)
      console.log("------------------------------------")
      console.log(`login: ${answs[j][0]}`)
      console.log(`to: ${answs[j][2]}`)
      console.log(answs[j][3])
      console.log(`likes: ${answs[j][5]}, dislikes: ${answs[j][6]}`)
      console.log("------------------------------------")
    }
    console.log("=====================================")
  }
  if(cmnts.length == 0)
  {
    console.log("\n\n\n\n[+] No comments at the moment!\n\n\n\n\n")
  }
  return [cmnts,answs]
}
async function main()
{
  var act = 0
  var signedIn = false
  var user = null
  var strs = []
  while(true)
  { 
    console.log("Choose one of the following operations:\n[1] Sign in\n[2] Sign in as a store\n[3] Sign up\n[4] Check book of complainments and suggestions\n[5] Exit")
    act = input.question("Enter: ")
    switch(Number(act))
    {
      case 1:
        console.log("\n(Type 'back' to go back)")
        let address = input.question("Enter your address: ")
        if(address === "back") {continue}
        if(!web3.utils.isAddress(address))
        {
          console.log("[!] Provided address is invalid!")
          continue
        }
        let password = input.question("Enter your password: ")
        if(password === "back") {continue}
        await web3.eth.personal.unlockAccount(address,"")
        console.log("\n\n\n\n\n[+] Processing...\n\n\n\n\n")
        try
        {
          await contract.methods
          .login(address,password)
          .send({from: address})
          .then(value => user = value.events.Login.returnValues.user)
          signedIn = true
          console.log("\n\n\n\n\n[+] You have successfully signed in!\n\n\n\n\n")
        }
        catch(error)
        {
          console.log("\n\n\n\n\n[!] Account doesn't exist or invalid password\n\n\n\n\n")
          await web3.eth.personal.lockAccount(address)
          continue
        }
        break
      case 2:
        console.log("\n(type 'back' to go back)")
        let addr = input.question("Enter your address: ")
        if(addr === "back"){continue}
        if(!web3.utils.isAddress(addr))
        {
          console.log("\n\n\n\n\n[!] Provided address is invalid!\n\n\n\n\n")
          continue
        }
        let passw = input.question("Enter your password: ")
        if(passw === "back") {continue}
        await web3.eth.personal.unlockAccount(addr,"")
        console.log("\n\n\n\n\n[+] Processing...\n\n\n\n\n")
        try
        {
          await contract.methods
          .loginInStore(addr,passw)
          .send({from: addr})
          .then(value => user = value.events.LoginInStore.returnValues.store)
          signedIn = true
          console.log("\n\n\n\n\n[+] You have successfully signed in!\n\n\n\n\n")
        }
        catch(error)
        {
          console.log("\n\n\n\n\n[!] Account doesn't exist or invalid password\n\n\n\n\n")
          await web3.eth.personal.lockAccount(addr)
          continue
        }
      break
      case 3:
        let login; let pasw; let adr; let fio;
        do
        {
          login = input.question("Enter your login or type 'back' to go back: ")
        }while(!login)
        if(login == "back") 
        {
          login = null
          continue
        }
        do
        {
          pasw = input.question("Enter your password or type 'back' to go back: ")
        }while(!pasw)
        if(pasw == "back")
        {
          pasw = login = adr = null
          continue
        }
        do
        {
          fio = input.question("Enter your full name or type 'back' to go back: ")
        }while(!fio)
        if(fio == "back")
        {
          fio = pasw = login = adr = null
          continue
        }
        console.log("\n\n\n\n\n[+] Creating new address...\n\n\n\n\n")
        await web3.eth.personal
        .newAccount("")
        .then(value => adr = value)
        console.log(`\n[+] Address created! Your address will be: ${adr}\n`)
        console.log("[+] Prefunding it...")
        let accs = await web3.eth.getAccounts()
        await web3.eth.personal.unlockAccount(accs[0],"")
        await web3.eth
        .sendTransaction({from: accs[0], to: adr, value: web3.utils.toWei('50', 'ether')})
        .then()
        await web3.eth.personal.lockAccount(accs[0])
        console.log("\n[+] Account successfully prefunded!\n")
        await web3.eth.personal.unlockAccount(adr,"")
        console.log("[+] Processing...")
        try
        {
          await contract.methods
          .registration(login,pasw,adr,fio)
          .send({from: adr})
          .then()
          console.log("\n\n\n\n\n[+] You have successfully signed up!\n\n\n\n\n")
        }
        catch(error)
        {
          console.log("[!] This address already exists!\n")
          await web3.eth.personal.lockAccount(adr)
          continue
        }

        break
      case 4:
        let strs = await getStores()
        for(let i = 0; i < strs.length; i++)
        {
          console.log(`#${i+1}. ${strs[i]}`)
        }
        let choice = input.question("Which store you want to check? Pick a number: ")
        if(choice <= 0 || choice > strs.length)
        {
          console.log("[!] Invalid store number!")
          continue
        }
        await commsAndAnsws(strs,choice)
        break
      case 5:
        console.log("Goodbye")
        process.exit()
      default:
        console.log("[!] This command doesn't exist")
        continue
      }
    if(signedIn) break
  }
  while(signedIn)
  {
    console.log(`Hello, ${user[0]}`)
    console.log(`Your role is ${roles.get(user[4])}`)
   
    if(roles.get(user[4]) === "Buyer")
    {
      console.log(`Your balance is ${await web3.eth.getBalance(user[1]).then(value => web3.utils.fromWei(String(value)))} ether`)
      console.log("You can:\n[1] Sign out\n[2] Send promotion request\n[3] Check store comments\n[4] Comment\n[5] Buy products")
      act = 0
      act = input.question("Enter what you want: ")
      switch(Number(act))
      {
        case 1:
          user = null
          signedIn = false
          main()
          break
        case 2:
          let strss = await getStores()
          for(let i = 0; i < strss.length; i++)
          {
            console.log(`#${i+1}. ${strss[i]}`)
          }
          console.log("(type 'back' to cancel)")
          let id = input.question("Pick a number of store where you wish to work from above ↑: ")
          if(id === 'back') continue
          if(id <= 0 || id > strss.length)
          {
            console.log("[!] Invalid number!")
            continue
          }
          console.log("\n\n\n\n\n[+] Processing...\n\n\n\n\n")
          try
          {
            await contract.methods
            .buyerToSeller(strss[id-1])
            .send({from: user[1]})
            .then()

          }
          catch(error)
          {
            console.log("\n\n\n\n\n[!] You have already sent request!\n\n\n\n\n")
            continue
          }
          console.log("\n\n\n\n\n[+] Promotion request has been successfully sent!\n\n\n\n\n")
          break
        case 3:
          let strs = await getStores()
          for(let i = 0; i < strs.length; i++)
          {
            console.log(`#${i+1}. ${strs[i]}`)
          }
          console.log("(type 'back' to cancel)")
          let choice = input.question("Which store you want to check? Pick a number: ")
          if(choice === "back") {continue}
          if(choice <= 0 || choice > strs.length)
          {
            console.log("[!] Invalid store number!")
            continue
          }
          let get 
          await commsAndAnsws(strs,choice).then(value => get = value)
          console.log("(type 'back' to cancel)")
          let commOrAnsw = input.question("Like/dislike comment or answer?(C/A): ").toUpperCase()
          if(commOrAnsw === "back") {continue}
          if (commOrAnsw !== "C" && commOrAnsw !== "A")
          {
            console.log("\n\n\n\n\n[!] Invalid operation!\n\n\n\n\n")
            continue
          }
          let rateId = input.question("Enter comments'id to rate: ")
          if(rateId <= 0 || rateId > get[0].length && commOrAnsw === "C")
          {
            console.log("\n\n\n\n\n[!] Invalid number!\n\n\n\n\n")
            continue
          }
          if(rateId <= 0 || rateId > get[1].length && commOrAnsw === "A")
          {
            console.log("\n\n\n\n\n[!] Invalid number!\n\n\n\n\n")
            continue
          }
          let likeOrDislike = input.question("Like/dislike?(L/D): ").toUpperCase()
          if(likeOrDislike !== "L" && likeOrDislike !== "D")
          {
            console.log("\n\n\n\n\n[!] Invalid operation!\n\n\n\n\n")
            continue
          }
          console.log("\n\n\n\n\n[+] Processing...\n\n\n\n\n")
          try
          {
            if(likeOrDislike === "L")
            {
                await contract.methods
                .buyerLikeComment((rateId-1),strs[choice-1],commOrAnsw==="C"?false:true)
                .send({from: user[1]})
                .then()
            }
            else
            {
              await contract.methods
              .buyerDislikeComment((rateId-1),strs[choice-1],commOrAnsw==="C"?false:true)
              .send({from: user[1]})
              .then()
            }
            console.log(`\n\n\n\n\n[+] Comment ${likeOrDislike==="L"?"liked":"disliked"} successfully!\n\n\n\n\n`)
          }
          catch(error)
          {
            console.log(`\n\n\n\n\n[!] You have already ${likeOrDislike==="L"?'liked':'disliked'} this comment!\n\n\n\n\n`)
          }
          break
        case 4:
          let strsForComm = await getStores()
          for(let i = 0; i < strsForComm.length; i++)
          {
            console.log(`#${i+1}. ${strsForComm[i]}`)
          }
          console.log("(type 'back' to cancel)")
          let choicee = input.question("Which store you want to comment? Pick a number: ")
          if(choicee === "back") {continue}
          if(choicee <= 0 || choicee > strsForComm.length)
          {
            console.log("[!] Invalid store number!")
            continue
          }
          let content = input.question("Enter your comment(50 chars max): ")
          content = content.slice(0,50)
          let rating = input.questionInt("Enter rating: ")
          if(rating < 1 || rating > 10)
          {
            console.log("\n\n\n\n\n[!] Invalid rating(should be 1-10)!\n\n\n\n\n")
            continue
          }
          console.log("\n\n\n\n\n[+] Processing...\n\n\n\n\n")
          await contract.methods
          .buyerComment(content,strsForComm[choicee-1],rating)
          .send({from: user[1]})
          .then()
          console.log("\n\n\n\n\n[+] Comment successfully sent!\n\n\n\n\n")
          break
        case 5:
          let stores = await getStores()
          let products = []
          for(let i = 0; i < stores.length; i++)
          {
            console.log(`#${i+1}. ${stores[i]}`)
          }
          console.log("(type 'back' to cancel)")
          let pick = input.question("Which store you want to check?: ")
          if(pick === "back") {continue}
          if(pick <= 0 || pick > stores.length)
          {
            console.log("\n\n\n\n\n[!] Invalid store number!\n\n\n\n\n")
            continue
          }
          await contract.methods
          .showProducts(stores[pick-1])
          .call()
          .then(value => products = value)
          if(products.length === 0)
          {
            console.log("\n\n\n\n\n[!] No products at the moment!\n\n\n\n\n")
            continue
          }
          for(let i = 0; i < products.length; i++)
          {
            console.log(`#${i+1}`)
            console.log(`Name: ${products[i][0]}`)
            console.log(`Expiration date: ${products[i][1]}`)
            console.log(`Min. temperature: ${products[i][2]}`)
            console.log(`Max. temperature: ${products[i][3]}`)
            console.log(`Base price: ${products[i][4]}`)
            console.log(`Kg or pieces: ${products[i][5]?"kg":"pieces"}`)
            console.log(`Amount: ${products[i][6]}`)
          }
          console.log("(type 'back' to cancel)")
          let productId = input.question("Enter product's number you wish to buy: ")
          if(productId === "back") continue
          if(productId <= 0 || productId > products.length)
          {
            console.log("\n\n\n\n\n[!] Invalid product number\n\n\n\n\n")
            continue
          }
          let amount = input.question("Enter product's amount you wish to buy: ")
          if(amount === "back") continue
          if(amount > products[productId-1][6] || amount <= 0)
          {
            console.log("\n\n\n\n\n[!] Invalid amount!\n\n\n\n\n")
            continue
          }
          let bal 
          await web3.eth.getBalance(user[1]).then(value => bal = web3.utils.fromWei(String(value)))
          if(amount * web3.utils.fromWei(String(products[productId-1][4])) > bal)
          {
            console.log("\n\n\n\n\n[!] Not enough money!\n\n\n\n\n")
            continue
          }
          console.log("\n\n\n\n\n[+] Processing...\n\n\n\n\n")
          await contract.methods
          .buyProduct(stores[pick-1],productId-1,amount)
          .send({from: user[1], value:amount*products[productId-1][4]})
          .then()
          console.log("\n\n\n\n\n[+] Product bought successfully!\n\n\n\n\n")
        default:
          console.log("\n\n\n\n\n[!] Invalid operation!\n\n\n\n\n")
      }

    }
    else if(roles.get(user[4]) === "Admin")
    {
      console.log("You can:\n[1] Sign out\n[2] Become buyer\n[3] Check and approve role change requests\n[4] Delete store\n[5] Add store\n[6] Add admin")
      act = 0
      act = input.question("Enter what you want: ")
      switch(Number(act))
      {
        case 1:
          user = null
          signedIn = false
          main()
          break
        case 2:
          if (input.keyInYN("\n\n\n\n\n\n[WARNING] Do you want become buyer? \nYou'll need to login again!: ")) 
          {
            // 'Y' key was pressed.
            console.log('\n\n\n\n\n[+] Processing...\n\n\n\n\n');
            await contract.methods
            .AdminToBuyer()
            .send({from: user[1]})
            .then()
            console.log("\n\n\n\n\n[+] Role changed!\n\n\n\n\n")
            user = null
            signedIn = false
            main()
          }
         
          break
        case 3:
          let requests = []
          await contract.methods
          .checkChangeRoles()
          .call()
          .then(value => requests = value)
          for(let i = 0; i < requests.length; i++)
          {
            console.log(`#${i+1}`)
            console.log(`Who: ${requests[i][0]}`)
            console.log(`Old role: ${roles.get(requests[i][1])}`)
            console.log(`New role: ${roles.get(requests[i][2])}`)
            console.log(`Store: ${requests[i][3]}`)
          }
          if(requests.length === 0)
          {
            console.log("\n\n\n\n\n[!] No requests at the moment!\n\n\n\n\n")
            continue
          }
          console.log("(type 'back' to cancel)")
          let admChange = input.question("Enter a request's number to approve/refuse it: ")
          if(admChange === "back") {continue}
          if(admChange <= 0 || admChange > requests.length)
          {
            console.log("\n\n\n\n\n[!] Invalid number!\n\n\n\n\n")
            continue
          }
          let appOrRef = input.question("Approve it or refuse?(A/R): ").toUpperCase()
          if(appOrRef !== "A" && appOrRef !== "R")
          {
            console.log("\n\n\n\n\n[!] Invalid operation!\n\n\n\n\n")
            continue
          }
          console.log("\n\n\n\n\n[+] Processing...\n\n\n\n\n")
          if(appOrRef === "A")
          {
            await contract.methods
            .approveChangeRole(admChange)
            .send({from: user[1]})
            .then()
          }
          else
          {
            await contract.methods
            .refuseChangeRole(Number(admChange))
            .send({from: user[1]})
            .then()
          }
          console.log(`\n\n\n\n\n[+] Request successfully ${admChange === "A"?"approved":"refused"}!`)
          break
        case 4:
          let dltStrs = await getStores()
          for(let i = 0; i < dltStrs.length; i++)
          {
            console.log(`#${i+1}. ${dltStrs[i]}`)
          }
          console.log("(type 'back' to cancel)")
          let strToDel = input.question("Enter a store's number you wish to delete: ")
          if(strToDel <= 0 || strToDel > dltStrs.length)
          {
            console.log("\n\n\n\n\n[!] Invalid store's number!\n\n\n\n\n")
            continue
          }
          if (input.keyInYN("\n\n\n\n\nDo you really want to delete this store(this can't be undone)?\n\n\n\n\n")) 
          {
            console.log('\n\n\n\n\n[+]Processing...\n\n\n\n\n')
            await contract.methods
            .deleteStore(dltStrs[strToDel-1])
            .send({from: user[1]})
            .then()
            console.log("\n\n\n\n\n[+] Store deleted successfully!\n\n\n\n\n")
            continue
          }
          break
        case 5:
          console.log("\n\n\n(type 'back' anytime to cancel)")
          let adr; let name; let pasw;
          do
          {
            adr = input.question("Enter address of new store: ")
          }while(!web3.utils.isAddress(adr) && adr !== "back")
          if(adr === "back")
          {
            adr = null
            continue
          }
          do
          {
            name = input.question("Enter name of new store: ")
          }while(!name)
          if(name === "back")
          {
            adr = name = null
            continue
          }
          do
          {
            pasw = input.question("Enter password of new store: ")
          }while(!pasw)
          if(pasw === "back")
          {
            pasw = name = adr = null
            continue
          }
          try
          {
            console.log("\n\n\n\n\n[+] Processing...\n\n\n\n\n")
            await contract.methods
            .addStore(adr,name,pasw)
            .send({from: user[1]})
            .then()
            console.log("\n\n\n\n\n[+] Store added successfully!\n\n\n\n\n")
          }
          catch(error)
          {
            console.log("\n\n\n\n\n[!] Store with this address already exists!\n\n\n\n\n")
            continue
          }
          break
        case 6:
          let newAdmAdr = input.question("Enter address of new admin: ")
          if(!web3.utils.isAddress(newAdmAdr))
          {
            console.log(`[!] ${newAdmAdr} is not an address!`)
            continue
          }
          console.log("\n\n\n\n\n[+] Processing...\n\n\n\n\n")
          try
          {
            await contract.methods
            .addAdmin(newAdmAdr)
            .send({from: user[1]})
            .then()
            console.log("\n\n\n\n\n[+] New admin successfully added!\n\n\n\n\n")
          }
          catch(error)
          {
            console.log("\n\n\n\n\n[!] This person is admin or doesn't exist!\n\n\n\n\n")
            continue
          }
          break
        default:
          console.log("\n\n\n\n\n[!] Invalid operation!\n\n\n\n\n")
          break
      }
    }
    else if(roles.get(user[4]) === "Seller")
    {
      console.log("You can:\n[1] Sign out\n[2] Send request to become buyer\n[3] Answer to comments")
      act = 0
      act = input.question("Enter what you want: ")
      switch(Number(act))
      {
        case 1:
          signedIn = false
          user = null
          main()
          break
        case 2:
          if (!input.keyInYN("\n\n\n\n\nDo you really want to become buyer?\n\n\n\n\n")) continue
          try
          {
            await contract.methods
            .sellerToBuyer()
            .send({from: user[1]})
            .then()
            console.log("\n\n\n\n\n[+] Request successfully sent!\n\n\n\n\n")
          }
          catch(error)
          {
            console.log("\n\n\n\n\n[!] You already requested!\n\n\n\n\n")
            continue
          }
        case 3:
          let get
          let strs = await getStores()
          let my_store = 0
          for(let i = 0; i < strs.length; i++)
          {
            console.log(`#${i+1}. ${strs[i]}`)
            if(strs[i] === user[5])
            {
              my_store = i+1
            }
          }

          await commsAndAnsws(strs,my_store).then(value => get = value)
          console.log("(type 'back' to go back)")
          let id = input.question("Enter comment's id to answer: ")
          if(id === "back"){continue}
          if(id <= 0 || id > get[0].length)
          {
            console.log("\n\n\n\n\n[!] Invalid id!\n\n\n\n\n")
            continue
          }
          let content = input.question("Enter your comment(50 chars max): ")
          content = content.slice(0,50)
          console.log("\n\n\n\n\n[+] Processing...\n\n\n\n\n")
          await contract.methods
          .answerOnComment(content,get[0][id-1][1])
          .send({from: user[1]})
          .then()
          console.log("\n\n\n\n\n[+] Answer successfully sent!\n\n\n\n\n")
          break
        default:
          console.log("\n\n\n\n\n[!] Invalid operation!\n\n\n\n\n")
          break
      }

    }
    else if(roles.get(user[4]) === "Bank")
    {
      console.log("You can:\n[1] Sign out\n[2] Check debts")
      act = 0
      act = input.question("Enter what you want: ")
      switch(Number(act))
      {
        case 1:
          signedIn = false
          user = null
          main()
          break
        case 2:
          let allDebts = []
          let allStores = await getStores()
          for(let i = 0; i < allStores.length; i++)
          {
            await contract.methods.debts(allStores[i]).call().then(value => allDebts.push(value))
          }
          console.log("\n\n\n\n\n[+] All debts: \n")
          for(let i = 0; i < allDebts.length; i++)
          {
            console.log(`#${i+1}. ${allStores[i]}: ${await web3.utils.fromWei(allDebts[i])} ether`)
          }
          break
        default:
          console.log("\n\n\n\n\n[!] Invalid operation!\n\n\n\n\n")
          break
      }
    }
    else if(roles.get(user[4]) === "Provider")
    {
      console.log("You can:\n[1] Sign out\n[2] Create product")
      act = 0
      act = input.question("Enter what you want: ")
      switch(Number(act))
      {
        case 1:
          signedIn = false
          user = null
          main()
          break
        case 2:
          let name; let expDate; let minTemp; let maxTemp; let basePrice; let kg = true
          console.log("(type 'back' anytime to cancel)")
          do
          {
            name = input.question("Enter product's name: ")
          }while(!name)
          if(name === "back")
          {
            name = null
            continue
          }
          do
          {
            expDate = input.question("Enter product's expiration date: ")
          }while(!expDate)
          if(expDate === "back")
          {
            expDate = name = null
            continue
          }
          do
          {
            minTemp = input.question("Enter product's minimum temperature: ")
          }while(!minTemp)
          if(minTemp === "back")
          {
            minTemp = expDate = name = null
            continue
          }
          do
          {
            maxTemp = input.question("Enter product's maximum temperature: ")
          }while(!maxTemp)
          if(maxTemp === "back")
          {
            maxTemp = minTemp = expDate = name = null
            continue
          }
          kg = input.keyInYN("Product in kg? (y = kg; n = pieces): ")
          do
          {
            basePrice = input.question("Enter product's base price(in ETH): ")
          }while(!basePrice)
          if(basePrice === "back")
          {
            basePrice = kg = maxTemp = minTemp = expDate = name = null
            continue
          }
          basePrice = web3.utils.toWei(basePrice)
          console.log("\n\n\n\n\n[+] Processing...\n\n\n\n\n")
          await contract.methods
          .createProduct(name,expDate,minTemp,maxTemp,basePrice)
          .send({from: user[1]})
          .then()
          console.log("\n\n\n\n\n[+] Product created successfully!\n\n\n\n\n")
          break
        default:
          console.log("\n\n\n\n\n[!] Invalid operation!\n\n\n\n\n")
          break
      }
    }
    else if(roles.get(user[4]) === "Store")
    {
      console.log(`Your balance is ${await web3.eth.getBalance(user[1]).then(value => web3.utils.fromWei(String(value)))} ether`)
      console.log("You can:\n[1] Sign out\n[2] Check sellers\n[3] Check debts\n[4] Pay debts\n[5] Provide products")
      act = 0
      act = input.question("Enter what you want: ")
      switch(Number(act))
      {
        case 1:
          signedIn = false
          user = null
          main()
          break
        case 2:
          console.log("\n\n\n\n\n[+] All sellers: ")
          for(let i = 0; i < user[6].length; i++)
          {
            console.log("--------------------------------------")
            console.log(`#${i+1}.`)
            console.log(`Login: ${user[6][i][0]}`)
            console.log(`Full name: ${user[6][i][3]}`)
            console.log("--------------------------------------")
          }
          break
        case 3:
          console.log(`\n\n\n\n\n[+] Debt is: ${await contract.methods.debts(user[1]).call()}\n\n\n\n\n`)
          break
        case 4:
          let debt 
          await contract.methods.debts(user[1]).call().then(value => debt = value)
          console.log(debt)
          if(debt == 0)
          {
            console.log("\n\n\n\n\n[+] You don't need to pay debts!\n\n\n\n\n")
            continue
          }
          console.log("(type 'back' to cancel)")
          let money = input.question("Enter amount of ether you would like to pay: ")
          if(money === "back"){continue}
          if(money > debt)
          {
            money = debt
          }
          if(money > await web3.eth
            .getBalance(user[1])
            .then(value => web3.utils.fromWei(String(value))))
          {
            console.log("\n\n\n\n\n[!] You don't have enough money!\n\n\n\n\n")
            continue
          }
          await contract.methods
          .payDebts()
          .send({from: user[1], value: money})
          .then()
          console.log("\n\n\n\n\n[+] Your money successfully sent!\n\n\n\n\n")
        case 5:
          let name; let amount; let k
          console.log("(type 'back' to cancel)")
          name = input.question("Enter product's name: ")
          if(name === "back"){continue}
          amount = input.question("Enter product's amount: ")
          if(amount === "back"){continue}
          if(amount <= 100) k = 100
          else if(amount > 100 && amount < 1000) k = 95
          else k = 90
          let price
          try
          {
            await contract.methods
            .calculatePriceOfProduct(name,amount,k)
            .call()
            .then(value => price = value)
            let bal 
            await web3.eth.getBalance(user[1]).then(value => bal = value)
            console.log(`\n\n\n\n\n[+] Price before delivery: ${web3.utils.fromWei(price)} ether\n\n\n\n\n`)
            if(Number(price)/10**18 > Number(bal)/10**18)
            {
              console.log(`\n\n\n\n\n[!] You don't have enough money!\n
              You have: ${web3.utils.fromWei(String(bal))} ether\n
              Need: ${web3.utils.fromWei(String(price))} ether\n\n\n\n\n`)
              continue
            }
          }
          catch(error)
          {
            console.log(error)
            console.log("\n\n\n\n\n[!] This product doesn't exist!\n\n\n\n\n")
            continue
          }
          if(!input.keyInYN("Confirm purchase?")){continue}
          console.log("\n\n\n\n\n[+] Updating rating...\n\n\n\n\n")
          let rating = 0
          let length = user[7].length
          for(let i = 0; i < length; i++)
          {
            if(user[7][i][5] === "0" && user[7][i][6] === "0") {continue}
            rating += ((i + 1) * Number(user[7][i][5]))/(Number(user[7][i][5]) + Number(user[7][i][6]))
          }
          if(length !== 0)
          {
            rating *= 1000
            rating = Math.floor(rating/length)
          }
          await contract.methods
          .updateStoreRating(rating)
          .send({from: user[1]})
          .then()
          let finalPrice
          console.log("\n\n\n\n\n[+] Delivering...\n\n\n\n\n")
          await contract.methods
          .buyAndProvideProduct(name,amount,k)
          .send({from: user[1],value: price})
          .then(value => finalPrice = value.events.ProductProvided.returnValues.price)
          console.log(`\n\n\n\n\n[+] ${name} bought succesfully!\n\nFinal price is: ${web3.utils.fromWei(finalPrice)} ether\n\n\n\n\n`)
          break
        default:
          console.log("\n\n\n\n\n[!] Invalid operation!\n\n\n\n\n")
          break
      }
    }
  }
}
main()

