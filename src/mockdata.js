export const getMockProjects = (count) => {
  return [...Array(count)].map((_elem, idx) => ({
    pid: `PID_${idx}`,
    showTitle: `SHOWTITLEEEEEE_${idx}`,
    title: `TITLETITLETITLETITLETITLETITLETITLE_${idx}`,
    year: 2019 + idx,
    authors: [
      'AUTHORS_1',
      'AUTHORS_2',
      'AUTHORS_3',
      'AUTHORS_4',
    ],
    cover: 'https://firebasestorage.googleapis.com/v0/b/crlab-admin.appspot.com/o/projects%2Fcover.png?alt=media&token=fb8b7c1d-c941-427a-8f64-1622068d11e7',
    imgs: [
      {
        uuid: '0',
        caption: 'caption caption caption caption caption',
        url: 'https://dummyimage.com/420x320/ff7f7f/333333.png',
      },
      {
        uuid: '1',
        caption: 'caption caption caption caption caption',
        url: 'https://dummyimage.com/420x320/ff7f7f/333333.png',
      },
      {
        uuid: '2',
        caption: 'caption caption caption caption caption',
        url: 'https://dummyimage.com/420x320/ff7f7f/333333.png',
      },
    ],
    videos: [
      {
        caption: 'caption caption caption caption caption',
        url: 'https://dummyimage.com/420x320/ff7f7f/333333.png',
      },
      {
        caption: 'caption caption caption caption caption',
        url: 'https://dummyimage.com/420x320/ff7f7f/333333.png',
      },
      {
        caption: 'caption caption caption caption caption',
        url: 'https://dummyimage.com/420x320/ff7f7f/333333.png',
      },
    ],
    abstract: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    descriptions: [
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
    tags: [
      'HELLOW',
      'WORLD',
      'VR/AR'
    ],
    // --
    publicationOn: 'UIST',
    acceptedYear: 2019,
    pdf: 'https://dummyimage.com/420x320/ff7f7f/333333.pdf',
    doi: 'https://dummyimage.com/420x320/ff7f7f/333333',
    timestamp: Date.now() + idx * 1000,
  }));
};

export const getMockMembers = (count) => {
  return [...Array(count)].map((_elem, idx) => ({
    uid: `MEMBER_${idx}`,
    fullName: `FIRST LAST ${idx}`,
    avatar: 'https://dummyimage.com/420x320/ff7f7f/333333.png',
    title: `TITLE_${idx}`,
    focusOn: [
      'AR',
      'VR',
      '3D-model',
    ],
    email: 'dksldklsdkl@gmail.com',
    website: '',
    about: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    publications: [
      {
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        conference: 'CHI',
        year: 2019,
        link: 'dsdsdsdsdsd',
      },
      {
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        conference: 'CHI',
        year: 2019,
        link: 'dsdsdsdsdsd',
      },
      {
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        conference: 'CHI',
        year: 2019,
        link: 'dsdsdsdsdsd',
      },
    ],
    awards: [
      {
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        year: 2019,
      },
      {
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        year: 2019,
      },
      {
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
        year: 2019,
      },
    ]
  }));
};
