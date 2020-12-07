import { EntityRepository, Repository, getRepository, In } from 'typeorm';
import ITagsRepository from '../dtos/ITagsRepository';
import Tag from '../models/Tag';

interface IFindTags {
  id: string;
}

@EntityRepository(Tag)
class TagsRepository implements ITagsRepository {
  private ormRepositoty: Repository<Tag>;

  constructor() {
    this.ormRepositoty = getRepository(Tag);
  }

  public async create(tags: string[]): Promise<Tag[]> {
    const savedTags = this.ormRepositoty.create({
      title: tags,
    });

    await this.ormRepositoty.save(savedTags);

    return savedTags;
  }

  public async findAllById(tags: IFindTags[]): Promise<Tag[]> {
    const tagsId = tags.map(tag => tag.id);

    const existingTag = await this.ormRepositoty.find({
      where: {
        id: In(tagsId),
      },
    });

    return existingTag;
  }
}

export default TagsRepository;
