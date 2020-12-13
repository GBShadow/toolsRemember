import { EntityRepository, Repository, getRepository, In } from 'typeorm';
import ITagsRepository from '@modules/tools/repositories/ITagsRepository';
import Tag from '../entities/Tag';

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

  public async findByTitle(tag: string): Promise<Tag | undefined> {
    const existingTag = await this.ormRepositoty.findOne({
      where: {
        title: tag,
      },
    });

    return existingTag;
  }

  public async findAllByTitle(tags: string[]): Promise<Tag[]> {
    const existingTag = await this.ormRepositoty.find({
      where: {
        title: In(tags),
      },
    });

    return existingTag;
  }
}

export default TagsRepository;
