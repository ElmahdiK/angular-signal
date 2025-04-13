export interface IPost {
  url?: string;
}

export class Post implements IPost {
  constructor(public url?: string) {
  }
}
