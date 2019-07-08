# Cross Reality Lab Admin

## Data Spec .

``` typescript
type Project = {
  pid: string;
  showTitle: string;
  title: string;
  year: number;
  authors: string[];
  cover: stirng;  // url
  imgs: {
    caption: string;
    url: stirng;
  }[],
  videos: {
    caption: string;
    url: string;
  }[]
  abstract: string;
  descriptions: string[];  // 用 array 來分段
  tags: string[];
  timestamp: number;
  // If is accepted by conference
  publication?: string;  // e.g. CHI UIST 
  acceptedYear?: number;
  pdf?: string; // url
  doi?: string; // url
};

type Member = {
  uid: string;
  fullName: string;
  avatar: string; // url
  title: string;  // e.g. Professor, PhD, master 
  focusOn: string[];  // e.g. haptic, 3d-model, UIUX
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

type News = {
  nid: string;
  title: string;
  description: string;
  date: string; // e.g. YYYY/MM/DD
  timestamp: number;
};

type LabIntroduction = {
  title: string,
  subTitle: string,
  vision: string[],
  timestamp: number;
}
type Course = {
  basicInformation: {
    CourseNumber: string,
    Credits: number,
    TermYear: string,
    Location: string,
    TA: string[],
    Instructor: string
    OfficeLocation: string
    OfficeHours: string
    Email: string
  }
  description: string,
  video: string,
  image: string,
  timestamp: number;
}

type Contact = {
  description: string,
  banner: string,
  contantInformation: {
    name: string,
    phone: string,
    officeHour: string,
    office: string,
    lab: string,
  }
  timestamp: number;
}
```


## TODO
* [] Modulelize 各個不同類型 Input
  - Keep in components file
* [] Validation
* [] 調整各個 Input Field 寬度高度
* [] 串接資料
  - 在 root (Edit.js/Create.js) 撰寫邏輯
    - check 是否帶有 id 
      - 有: Edit  -> 會有 initial data state .
      - 無: Create 