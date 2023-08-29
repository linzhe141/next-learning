export const getNavList = () =>
  Promise.resolve([
    {
      label: 'test1',
      url: '/blog/1',
      children: [
        { label: 'test1-1', url: '/blog/1-1' },
        {
          label: 'test1-2',
          url: '/blog/1-2',
          children: [
            {
              label: 'test1-2-1',
              url: '/blog/1-2-1',
            },
            {
              label: 'test1-2-2',
              url: '/blog/1-2-2',
            },
            {
              label: 'test1-2-3',
              url: '/blog/1-2-3',
              children: [
                {
                  label: 'test1-2-3-1',
                  url: '/blog/1-2-3-1',
                },
              ],
            },
            {
              label: 'test1-2-4',
              url: '/blog/1-2-4',
            },
          ],
        },
        { label: 'test1-3', url: '/blog/1-3' },
      ],
    },
    { label: 'test2', url: '/blog/2' },
    { label: 'test3', url: '/blog/3' },
  ])
