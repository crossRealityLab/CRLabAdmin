# Cross Reality Lab Admin

## Data Spec .

```typescript
type Project = {
  [uuid: string]: {
    uuid: string;
    showTitle: string;
    title: string;
    year: number;
    authors: string[];
    cover: {
      name: string;
      url: string;
    }[];
    imgs: {
      name: string;
      caption: string;
      url: stirng;
    }[];
    videos: string[]; // url
    abstract: string;
    descriptions: string[]; // 用 array 來分段
    tags: string[];
    createdTimestamp: number;
    timestamp: number; // last update time

    // If is accepted by conference
    publication?: string; // e.g. CHI UIST
    acceptedYear?: number;
    pdf?: string; // url
    doi?: string; // url
  };
};

type Member = {
  [uuid: string]: {
    uuid: string;
    fullName: string;
    avatar: {
      name: string;
      url: string;
    }[]; // url
    title: string; // e.g. Professor, PhD, master
    focusOn: string[]; // e.g. haptic, 3d-model, UIUX
    email: string;
    website?: string; // url
    about: string;
    publications: {
      title: string;
      conference: string;
      year: number;
      link: string;
    }[];
    awards: {
      title: string;
      year: number;
    }[];
    timestamp: number;
  };
};

type News = {
  [uuid: string]: {
    uuid: string;
    title: string;
    description: string;
    date: string; // e.g. YYYY/MM/DD
    timestamp: number;
  };
};

type LabIntroduction = {
  title: string;
  subTitle: string;
  vision: string[];
  timestamp: number;
};


type Course = {
  [uuid: string]: {
    uuid: string;
    courseID: string;
    credits: number;
    loaction: string; // e.g. YYYY/MM/DD
    tas: string[];
    office: string;
    officeHours: string;
    contact: string;  // maybe email
    descriptions: string[];
    link: string; // to nctu course
    timestamp: number;
  };
};

type Contact = {
  name: string;
  tel: string;
  office: string;
  officeHours: string;
  lab: string;
  description: string;
  banner: string;
  timestamp: number;
};
```

## TODO

- [ ] Search Bar
- [ ] Remain Info
- [ ] Refactor `setInitFormValue` func.
  - Without using key to decide what to do
- [ ] Refactor `prepareUploadedData` func.
  - Without using key to decide what to do
- [ ] Dynamic multiple input validation
- [x] Auth 
- [x] Modulelize 各個不同類型 Input
  - Keep in components file
- [x] Img, Video with caption
- [x] Validation
- [x] 串接資料
  - 在 root (Edit.js/Create.js) 撰寫邏輯
    - check 是否帶有 id
      - 有: Edit -> 會有 initial data state .
      - 無: Create
