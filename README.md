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
    graduateYear: number;
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
    name: string;
    termAndYear: string;
    credits: number;
    loaction: string; // e.g. YYYY/MM/DD
    tas: {
      name: string;
      email: string;
    }[],
    office: string;
    officeHours: string;
    email: string;
    descriptions: string[];
    link: string; // to nctu course
    timestamp: number;
  };
};

type Contact = {
  name: string;
  email: string;
  office: string;
  officeHours: string;
  lab: string;
  description: string;
  banner: string;
  timestamp: number;
};
```

## TODO

* FIX
- [x] Courses: Use TextArea in description 
- [x] Projects: no link will cause filter undefined error when editing
- [ ] News: date validtion 

* 補
- [x] Lab Intro. limit visions length
- [x] LabIntroduction
- [x] Contact
- [x] Member 加上 graduateYear
- [x] Course 加上 termAndYear, email

* Phase 1
- [x] Support Search Bar in `List`
- [x] Support Validation in `DynamicMultiInput`
- News
  - [x] Using Date picker or support regx validation
  - [x] Support sorted on `List`
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

* Phase 2 
- [x] Refactor `setInitFormValue` func.
  - Without using key to decide what to do
- [x] Refactor `prepareUploadedData` func.
  - Without using key to decide what to do
- [x] Refactor `DynamicMultiInput` & `DynamicInput`
- [x] Configlize `Main` 
