import { nestCategoryChildren } from './index';

describe('Test nestCategoryChildren function', () => {
  it('Should nest the categories which have a parent_id inside their related parents recursively', () => {
    const input = [
      {
        depth: 0,
        id: 16815,
        name: "Humanities",
        node_children_count: 4,
        node_video_count: 0,
        parent_id: null
      },
      {
        depth: 1,
        id: 16817,
        name: "Art",
        node_children_count: 7,
        node_video_count: 0,
        parent_id: 16815
      },
      {
        depth: 2,
        id: 16821,
        name: "Ancient",
        node_children_count: 0,
        node_video_count: 0,
        parent_id: 16817
      }
    ];
    const output = [
      {
        depth: 0,
        id: 16815,
        name: "Humanities",
        node_children_count: 4,
        node_video_count: 0,
        parent_id: null,
        children: [
          {
            depth: 1,
            id: 16817,
            name: "Art",
            node_children_count: 7,
            node_video_count: 0,
            parent_id: 16815,
            children: [
              {
                depth: 2,
                id: 16821,
                name: "Ancient",
                node_children_count: 0,
                node_video_count: 0,
                parent_id: 16817
              }
            ]
          }
        ]
      }
    ];
    expect(nestCategoryChildren(input, []))
      .toEqual(output);
  });
});
