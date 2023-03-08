//import jwt
const jwt=require('jsonwebtoken')

//import db
const db=require('./db')

//database
userDetails={
    1000:{acno:1000, username:'Akash', password:123, balance:0,transaction:[]},
    1001:{acno:1001, username:'Amal', password:147, balance:0,transaction:[]},
    1002:{acno:1002, username:'Vishnu', password:120, balance:0,transaction:[]},
    1003:{acno:1003, username:'Rahul', password:123, balance:0,transaction:[]},
    1004:{acno:1004, username:'Karthik', password:852, balance:0,transaction:[]}
  }


  

const register=(acno,username,password)=>{
  return db.User.findOne({acno})  //data
  .then(user=>{
    if(user){
      return {
        status:'false',
        statusCode:400,
        message:'User already exist'
     }
    }
    else{
      const newUser=new db.User({
        acno:acno,
        username:username,
        password:password,
        balance:0,
        transaction:[] 
      })
      newUser.save();//data saved in mongodb

      return {
        status:'true',
        statusCode:200,
        message:'Register successfully'
     }
    }
  })
     
    }
//     else{
//      userDetails[acno]={acno,username,password,balance:0,transaction:[]}
     
//     }
//  }
 


//  login=(acno,psd)=>{


//    if(acno in userDetails){
//        if(psd==userDetails[acno]['password']){
//         currentUser=userDetails[acno]['username']
//          currentacno=acno
//          const token=jwt.sign({
//           currentacno:acno},
//           'superkey5037')  //to generate token
//           //it will generate a number and it assign to token
//           return {
//             status:'true',
//             statusCode:200,
//             message:'Login successful',
//             token:token
//          }
//        }
//        else{
//         // alert('Incorrect password')
//         return {
//          status:'false',
//          statusCode:400,
//          message:'Password incorrect'
//       }
//        }
//    }
//    else{
//     // alert('User not exist')
//     return {
//       status:'false',
//       statusCode:400,
//       message:'Invalid userdetails'
//    }
//    }

// }
const login=(acno,password)=>{
   return db.User.findOne({acno,password})  //data
   .then(user=>{
    if(user){
      currentUser=user.username
      currentAcno=acno
      const token =jwt.sign({currentAcno:acno},'superkey5037')
      return {
        status:'true',
        statusCode:200,
        message:'Login successful',
        token:token,
        currentUser:currentUser,
        currentAcno:acno
      }
    }
    else{
      return {
        status:'false',
        statusCode:400,
        message:'Invalid userdetails'
      }
    }
   })

}


// deposit=(acno,psd,amnt)=>{
   
//    var amount=parseInt(amnt)
//    if(acno in userDetails){
//      if(psd==userDetails[acno]['password']){
//        userDetails[acno]['balance']+=amount
 
//        //add deposit details in transaction array
//        userDetails[acno]['transaction'].push({type:'Credit',amount})
//        return {
//          status:'true',
//          statusCode:200,
//          message:`${amount} is credited & balance is ${userDetails[acno]['balance']}`
//        }
//      }
//      else{
//       //  alert('incorrect password')
//        return {
//          status:'false',
//        statusCode:400,
//        message:'password incorrect'
//       }
//      }
//      }
//      else{
//       //  alert('incorrect ac no')
//        return {
//          status:'false',
//       statusCode:400,
//       message:'Invalid userdetails'
//        }
//      }
//    }

const deposit=(acno,pswd,amt)=>{
   
  var amount=parseInt(amt)
  return db.User.findOne({acno,pswd})  //data
  .then(user=>{
    if(user){
         user.balance+=amount;
         user.transaction.push({
          Type:'Credit',
          Amount:amount
         })
         user.save();
         return{
          status:'true',
          statusCode:200,
          message:`${amount} is credited & balance is ${user.balance}`
         }
    }
    else{
      return{
        status:'false',
        statusCode:400,
        message:'incorrect userdetails'
      }
    }
  })
}
  

      
  //  withdraw=(acno,psd,amnt)=>{
  //   // let userDetails=this.userDetails
  //   var amount=parseInt(amnt)
  //   if(acno in userDetails){
  //     if(psd==userDetails[acno]['password']){
  //       if(amnt<=userDetails[acno]['balance']){
  //         userDetails[acno]['balance']-=amount

  //         //add to transaction history
  //         userDetails[acno]['transaction'].push({type:'Debit',amount})
  //         // this.saveData()
  //         return {
  //           status:"true",
  //           statusCode:200,
  //           message:`${amount} is debited and balance is ${userDetails[acno]['balance']} `
  //         }
  
  //       }
  //       else{
  //         // alert('insufficient balance')
  //         return {
  //           status:'false',
  //        statusCode:400,
  //        message:'insufficient balance'
  //         }
  //       }
  //     }
  //     else{
  //       // alert('incorrect password')
  //       return {
  //         status:'false',
  //      statusCode:400,
  //      message:'password incorrect'
  //       }
  //     }
  //     }
  //     else{
  //       // alert('incorrect ac no')
  //       return {
  //         status:'false',
  //      statusCode:400,
  //      message:'incorrect ac no'
  //       }
  //     }
  //   }


const  withdraw=(acno,pswd,amt)=>{
    var amount=parseInt(amt)
    return db.User.findOne({acno,pswd})//data
    .then(user=>{
      if(user){
        if(user.balance>amount){
          user.balance-=amount;
          user.transaction.push({
            Type:'Debit',
            Amount:amount
          })
          user.save()
          return{
            status:"true",
            statusCode:200,
            message:`${amount} is debited and balance is ${user.balance} `
          }
        }
        else{
          return{
            status:'false',
            statusCode:400,
            message:'incorrect userdetails'
          }
        }
      }
    })
  }





    // getTransaction=(acno)=>{
    //   return {
    //     status:"true",
    //   statusCode:200,
    //   transaction:userDetails[acno]['transaction'] 
    // }
    //    }

  const  getTransaction=(acno)=>{
    return db.User.findOne({acno})
    .then (user=>{
      if(user){
        return{
          status:"true",
      statusCode:200,
      transaction:user.transaction
        }
      }
      else{
        return{
            status:false,
            statusCode:400,
            message:'user not found'
        }
      }
    })
      
       }

       
       //to delete account
       const deleteAcc=(acno)=>{
        return db.User.deleteOne({acno})
        .then(user=>{
          if(user){
            return{
              status:"true",
          statusCode:200,
          message:'User deleted successfully'
          }

        }
        else{
          return{
            statu:false,
            statusCode:400,
            message:'user not found'
          }
        }
      })
       }

  const loandetails=(acno)=>{
    return db.Loan.find({acno})
    .then (loan=>{
      if(loan){
        return{
          statusCode:200,
          Loan:loan
        }
      }
      else{
        return{
            status:false,
            statusCode:400,
            message:'user not found'
        }
      }
    })
  }



//to export
module.exports={
   register,
   login,
   deposit,
   withdraw,
   getTransaction,
   deleteAcc,loandetails
}