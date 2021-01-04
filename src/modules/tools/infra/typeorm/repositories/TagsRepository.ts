import { EntityRepository, Repository, getRepository, In } from 'typeorm';
import ITagsRepository from '@modules/tools/repositories/ITagsRepository';
import Tag from '../entities/Tag';

@EntityRepository(Tag)
class TagsRepository implements ITagsRepository {
  private ormRepository: Repository<Tag>;

  constructor() {
    this.ormRepository = getRepository(Tag);
  }

  public async create(tagsTitle: string[]): Promise<Tag[]> {
    const savedTags = tagsTitle.map((title: string) =>
      this.ormRepository.create({ title }),
    );

    await this.ormRepository.save(savedTags);

    return savedTags;
  }

  public async findByTitle(tagTitle: string): Promise<Tag | undefined> {
    const existingTag = await this.ormRepository.findOne({
      where: {
        title: tagTitle,
      },
    });

    return existingTag;
  }

  public async findAllByTitle(tagsTitle: string[]): Promise<Tag[]> {
    const existingTag = await this.ormRepository.find({
      where: {
        title: In(tagsTitle),
      },
    });

    return existingTag;
  }
}

export default TagsRepository;
