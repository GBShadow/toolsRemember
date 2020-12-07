import Tag from '../models/Tag';

export default interface ICreateToolDTO {
  user: string;
  title: string;
  link: string;
  description: string;
  tags: Tag[];
}
