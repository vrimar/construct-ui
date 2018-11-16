export interface IModel {
  id: string;
  type: string;
  children: IModel[];
}

export const data = [
  {
    id: '0',
    type: 'Folder',
    children: [
      {
        id: '0-0',
        type: 'Folder',
        children: [
          {
            id: '0-0-0',
            type: 'File',
            children: []
          }
        ]
      }
    ]
  },
  {
    id: '1',
    type: 'Folder',
    children: [
      {
        id: '1-0',
        type: 'File',
        children: []
      }
    ]
  },
  {
    id: '2',
    type: 'Folder',
    children: [
      {
        id: '2-0',
        type: 'File',
        children: []
      },
      {
        id: '2-1',
        type: 'File',
        children: []
      }
    ]
  }
] as IModel[];
