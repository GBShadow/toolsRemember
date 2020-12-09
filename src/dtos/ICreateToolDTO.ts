import User from '../models/User';

interface ITags {
  tag_id: string;
}

export default interface ICreateToolDTO {
  user: User;
  title: string;
  link: string;
  description: string;
  tags: ITags[];
}
