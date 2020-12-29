import FakeToolRepository from '../repositories/fakes/FakeToolRepository';
import CreateToolService from './CreateToolService';

describe('CreateToolService', () => {
  it('should be able to create a new tool', () => {
    const fakeToolRepository = new FakeToolRepository();
    const createTool = new CreateToolService(fakeToolRepository);
  });

  it('should not be able a create two tools with same title', () => {});
});
