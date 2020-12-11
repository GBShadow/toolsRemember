import User from '../../users/infra/typeorm/entities/User';

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
