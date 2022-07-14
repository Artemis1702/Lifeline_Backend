const getData = "Select * from organ";
const getDataById = "Select * from organ where organid = $1";
const removeUser = "Delete from users where mobile = $1";
const updateData = "Update users Set name = $1 where mobile = $2";

const checkMobileExists = "Select u from users u where u.mobile = $1";
const checkUsernameExists = "Select u from users u where u.username = $1";
const checkEntryExists = "Select o from organdonation o where o.donationid = $1";
const checkEntryExistsT = "Select t from tissuedonation t where t.donationid = $1";
const addUser = "Insert into users values ($1,$2,$3,$4,$5)";
const checkLogin = "Select check_password($1,$2)";
const addLogin = "Insert into login values ($1,$2)";
const addOrgan = "Insert into organdonation (organid,bloodid,sizeid,tissue,username) values ($1,$2,$3,$4,$5)";
const addTissue = "Insert into tissuedonation (tissueid,bloodid,sizeid,username) values ($1,$2,$3,$4)";
const removeOrgan = "Delete from organdonation where donationid = $1";
const removeTissue = "Delete from tissuedonation where donationid = $1";
const searchOrgan = "Select organdonation.donationid, organ.organ, blood.bloodgroup, organsize.size, organdonation.tissue, organdonation.username from organdonation inner join organ on organdonation.organid = organ.organid inner join blood on organdonation.bloodid = blood.bloodid inner join organsize on organdonation.sizeid = organsize.sizeid where organdonation.organid = $1 and organdonation.bloodid = $2 and organdonation.sizeid = $3  ";
const searchTissue = "Select tissuedonation.donationid, tissue.tissue, blood.bloodgroup, organsize.size, tissuedonation.username from tissuedonation inner join tissue on tissuedonation.tissueid = tissue.tissueid inner join blood on tissuedonation.bloodid = blood.bloodid inner join organsize on tissuedonation.sizeid = organsize.sizeid where tissuedonation.tissueid = $1 and tissuedonation.bloodid = $2 and tissuedonation.sizeid = $3 ";


module.exports = {
    getData,
    getDataById,
    removeUser,
    updateData,
    checkMobileExists,
    checkUsernameExists,
    checkEntryExistsT,
    checkEntryExists,
    addUser,
    checkLogin,
    addLogin,   
    addOrgan,
    addTissue,
    removeOrgan,
    removeTissue,
    searchOrgan,
    searchTissue,
}