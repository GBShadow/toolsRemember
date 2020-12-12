import Tag from '../infra/typeorm/entities/Tag';

interface IFindTags {
  title: string;
}

export default interface ITagsRepository {
  create(tags: string[]): Promise<Tag[]>;
  findAllByTitle(tags: IFindTags[]): Promise<Tag[]>;
}
