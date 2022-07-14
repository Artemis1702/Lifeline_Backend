const pool = require('../../db');
const queries = require('./queries');
const _ = require('lodash');

// Search all
const getData = (req,res) => {
    pool.query(queries.getData,(error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    })
};

// Search by id
const getDataById = (req,res) => {
    const id = parseInt(req.params.id); 
    pool.query(queries.getDataById, [id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows);
    });
};

// remove a user
const removeuser = (req,res) => {
    const mobile = parseInt(req.params.mobile); 
    pool.query(queries.checkMobileExists, [mobile], (error, results) => {
        const noUserFound = !results.rows.length;
        if(noUserFound){
            res.send("User not found")
        }

        pool.query(queries.removeUser, [mobile], (error,results) => {
            if (error) throw error;
            res.status(200).send("Student deleted")

        })
    });
};

// update a user
const updateuser = (req,res) => {
    const mobile = parseInt(req.params.mobile); 
    const { name } = req.body;

    pool.query(queries.checkMobileExists, [mobile], (error, results) => {
        const noUserFound = !results.rows.length;
        if(noUserFound){
            res.send("User not found")
        }

        pool.query(queries.updateData, [name, mobile], (error,results) => {
            if (error) throw error;
            res.status(200).send("Updated successfully")
        })
    });

}

//Adding a user through signup
const addUser = (req,res) => {
    const { name, mobile, age, gender, username, password} = req.body;

    pool.query(queries.checkMobileExists, [mobile], (error,results) => {
        if(results.rows.length) {
            res.send("User already exists");
        }

        pool.query(queries.addUser, [name, mobile, age, gender, username], (error,results) => {
            if (error) throw error;
            res.status(201).send('User entered');
        });

        pool.query(queries.addLogin, [username,password], (error,results) => {
            if(error) throw error;
            res.status(201).send('Login entered');
        });
    });
};

// CHECKING LOGIN
const checkLogin = (req,res) => {
    const{ username, password } = req.body;
    pool.query(queries.checkUsernameExists, [username], (error,results) => {
        const noUserFound = !results.rows.length;
        if(noUserFound) {
            res.send("User not found");
        }

        const success = pool.query(queries.checkLogin,[username,password]);
        if (success == true){
            res.send("true");
        }
        else{
            res.send("false");
        }
    })
}

//Inserting into available Organs table

const addOrgan = (req,res) => {
    const { organid, bloodid, sizeid, tissue, username } = req.body;

    pool.query(queries.checkUsernameExists, [username], (error,results) => {
        const noUserFound = !results.rows.length;
        if(noUserFound) {
            res.send("User not found");
        }

        pool.query(queries.addOrgan, [organid, bloodid,sizeid, tissue, username], (error,results) => {
            if (error) throw error;
            res.status(201).send('User entered');
        });

    });
};


// insert available tissue
const addTissue = (req,res) => {
    const { tissueid, bloodid, sizeid, username } = req.body;

    pool.query(queries.checkUsernameExists, [username], (error,results) => {
        const noUserFound = !results.rows.length;
        if(noUserFound) {
            res.send("User not found");
        }

        pool.query(queries.addTissue, [tissueid, bloodid,sizeid, username], (error,results) => {
            if (error) throw error;
            res.status(201).send('User entered');
        });

    });
};

// delete used organ
const removeOrgan = (req,res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.checkEntryExists, [id], (error,results) => {
        const noRecordFound = !results.rows.length;
        if(noRecordFound){
            res.send("Record not found")
        }
        pool.query(queries.removeOrgan, [id], (error,results) => {
            if (error) throw error;
            res.status(200).send("Organ used")
        })
    })
};

// delete used tissue
const removeTissue = (req,res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.checkEntryExistsT, [id], (error,results) => {
        const noRecordFound = !results.rows.length;
        if(noRecordFound){
            res.send("Record not found")
        }
        pool.query(queries.removeTissue, [id], (error,results) => {
            if (error) throw error;
            res.status(200).send("Tissue used")
        })
    })
};

// selecting organ records by search
const searchOrgan = (req,res) => {
    const { organid, bloodid, sizeid } = req.params;
    pool.query(queries.searchOrgan, [organid, bloodid, sizeid], (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

// selecting tissue records by search
const searchTissue = (req,res) => {
    const { tissueid, bloodid, sizeid } = req.params;
    pool.query(queries.searchTissue, [tissueid, bloodid, sizeid], (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

module.exports = {
    getData, 
    getDataById,
    removeuser,
    updateuser,
    addUser,
    checkLogin,
    addOrgan,
    addTissue,
    removeOrgan,
    removeTissue,
    searchOrgan,
    searchTissue,
};