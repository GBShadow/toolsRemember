import { EntityRepository, Repository, getRepository, In } from 'typeorm';
import ITagsRepository from '@modules/tools/repositories/ITagsRepository';
import Tag from '../entities/Tag';

interface IFindTags {
  title: string;
}

@EntityRepository(Tag)
class TagsRepository implements ITagsRepository {
  private ormRepositoty: Repository<Tag>;

  constructor() {
    this.ormRepositoty = getRepository(Tag);
  }

  public async create(tags: string[]): Promise<Tag[]> {
    const savedTags = tags.map((title: string) =>
      this.ormRepositoty.create({ title }),
    );

    await this.ormRepositoty.save(savedTags);

    return savedTags;
  }

  public async findAllByTitle(tags: IFindTags[]): Promise<Tag[]> {
    const tagsTitle = tags.map(tag => tag.title);

    const existingTag = await this.ormRepositoty.find({
      where: {
        title: In(tagsTitle),
      },
    });

    return existingTag;
  }
}

export default TagsRepository;
