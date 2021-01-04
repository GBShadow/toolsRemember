import ITagsRepository from '@modules/tools/repositories/ITagsRepository';
import { uuid } from 'uuidv4';
import Tag from '../../infra/typeorm/entities/Tag';

class FakeTagsRepository implements ITagsRepository {
  private tags: Tag[] = [];

  public async create(tagsTitle: string[]): Promise<Tag[]> {
    const savedTags = tagsTitle.map((title: string) => {
      const tag = new Tag();

      Object.assign(tag, {
        id: uuid(),
        title,
      });

      return tag;
    });

    this.tags.push(...savedTags);

    return savedTags;
  }

  public async findByTitle(tagTitle: string): Promise<Tag | undefined> {
    const existingTag = this.tags.find(tag => tag.title === tagTitle);

    return existingTag;
  }

  public async findAllByTitle(tagsTitle: string[]): Promise<Tag[]> {
    const existingTag = this.tags.filter(tag =>
      tagsTitle.find(title => title === tag.title),
    );

    return existingTag;
  }
}

export default FakeTagsRepository;
