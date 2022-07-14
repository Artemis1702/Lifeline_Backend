 const { Router } =  require('express');
 const controller = require('./controller');

 const router = Router();

 router.get('/', controller.getData); 

 router.get('/:id',controller.getDataById);

 router.delete('/:mobile',controller.removeuser);

 router.put('/:mobile',controller.updateuser);

 
// insert sign up details
router.post('/signup',controller.addUser);

// checck login
router.post('/chack/login/',controller.checkLogin);

// insert available organs
router.post('/new/organ/',controller.addOrgan);  

// insert available tissue
router.post('/new/tissue/',controller.addTissue);  

// delete used organ
router.delete('/rm/organ/:id',controller.removeOrgan);

// delete used tissue
router.delete('/rm/tissue/:id',controller.removeTissue);

// search for organ
router.get('/search/organ/:organid/:bloodid/:sizeid/',controller.searchOrgan);

// search for tissue
router.get('/search/tissue/:tissueid/:bloodid/:sizeid/',controller.searchTissue);


module.exports = router;
