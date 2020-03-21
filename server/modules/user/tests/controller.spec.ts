import supertest from 'supertest';
import { Container, AsyncContainerModule, interfaces } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

describe('UserController', () => {
	let container: Container;
	let server: InversifyExpressServer;

	beforeEach(() => {
		// container = new Container();
		// const bindings = new AsyncContainerModule(async (bind: interfaces.Bind) => {
		//    await require('../controller/index');
		// });
		// await container.loadAsync(bindings);
		// server = new InversifyExpressServer(container);
	});

	it('test', () => {
		expect(1 + 1).toBe(2);
		// supertest(server.build())
		//    .get('/user')
		//    .expect('Content-Type', /json/)
		//    .expect(200)
		//    .end((err, res) => {
		//       if (err) {
		//          return done(err);
		//       }
		//       expect(res.body).toBeTruthy();
		//       // expect(res.body.stories).toHaveLength(stubStories.length);
		//       // expect(res.body.total).toEqual(stubStories.length);
		//       // expect(mockStoryService.getStories).toHaveBeenCalled();
		//       return done();
		//    });
	});
});
