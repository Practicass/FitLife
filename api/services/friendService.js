
const Friend = require("../models/friendSchema")

const friendUserids = async(identityUserId) => {
    try{

        let friends = await Friend.find({"user": identityUserId }).select({"friend": 1, "_id": 0}).exec()
        let friends2 = await Friend.find({"friend": identityUserId}).select({"user": 1, "_id": 0}).exec()
        


        let friendsClean = [];

        friends.forEach(friends => {
            friendsClean.push(friends.friend)
        })

        friends2.forEach(friends => {
            friendsClean.push(friends.user)
        })


        return {
            friends: friendsClean
        }
    }catch(error){

        return {}
    }
    
}

const friendThisUser = async(identityUserId, profileUserId) => {
    

    let friends = await Friend.find({$or:[{"user": identityUserId ,"friend": profileUserId},{"user": profileUserId ,"friend": identityUserId}]})
    let res = true
    if(friends.length == 0){
        res = false
    }

    return {
        res
    }
}





module.exports = {

    friendUserids,
    friendThisUser

}