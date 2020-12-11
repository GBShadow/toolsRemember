import Tag from '../infra/typeorm/entities/Tag';

interface IFindTags {
  id: string;
}

export default interface ITagsRepository {
  create(tags: string[]): Promise<Tag[]>;
  findAllById(tags: IFindTags[]): Promise<Tag[]>;
}
