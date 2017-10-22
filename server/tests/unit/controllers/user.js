import UsersController from '../../../controllers/user'
import sinon from 'sinon'
import User from '../../../models/user'


describe('Controllers: Users', () => {
    describe('criar um usuário: create()', () => {
      it('Deve criar um usuário', () => {
           
        User.findOrCreate = sinon.stub();
        
        const requestBody =  {
            "name":"sarah",
            "email": "sarah@hotmail.com",
            "password": "213"
        }
    
          const expectedResponse = [{
            id: 1,
            name: 'Test User',
            created_at: '2016-08-06T23:55:36.692Z',
            updated_at: '2016-08-06T23:55:36.692Z',
          },true];
          
          class fakeUser {
            static findOrCreate() {}
          }
          
          const response = {
            sendStatus: sinon.spy()
          };

          const findOrCreateStub = sinon.stub(fakeUser, 'findOrCreate');
         
         findOrCreateStub.withArgs({where: { email: requestBody.email },
                                    defaults: { name: requestBody.name, 
                                               password: requestBody.password },
                                    }).resolves(expectedResponse);
            
          const usersController = new UsersController(fakeUser);
         
          return usersController.create(requestBody)
          .then(response => {
              console.log(response)
            sinon.assert.match(response.statusCode, 201);
            
        })
      })
    })
})