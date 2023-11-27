export default interface CreateTaskDto {
  title: string;
  description: string;
  tags: Array<string> | string;
  responsibleId?: number;
}
