import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import Tag from './Tag';
import Tool from './Tool';

@Entity('tools_tags')
class ToolsTags {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tool, tool => tool.tools_tags)
  @JoinColumn({ name: 'tool_id' })
  tool: Tool;

  @ManyToOne(() => Tag, tag => tag.tools_tags)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;

  @Column()
  tool_id: string;

  @Column()
  tag_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ToolsTags;
