import Tag from '../models/Tag';
import User from '../models/User';

export default interface ICreateToolDTO {
  user: User;
  title: string;
  link: string;
  description: string;
  tags: Tag[];
}
