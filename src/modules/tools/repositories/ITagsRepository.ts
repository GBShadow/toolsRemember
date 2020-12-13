import Tag from '../infra/typeorm/entities/Tag';

export default interface ITagsRepository {
  create(tags: string[]): Promise<Tag[]>;
  findAllByTitle(tags: string[]): Promise<Tag[]>;
  findByTitle(tags: string): Promise<Tag | undefined>;
}
