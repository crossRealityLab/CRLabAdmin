# Cross Reality Lab Admin

## Section

### Current sections
* Projects
* Courses
* Members
* News
* Contact
* Lab Introduction

### Add new section

Set up config files in src/configs/ with: 

``` typescript
type Config = {
  tabName: string; 
  routePath: string;  // section root path
  endpoint: string; // api endpoint in firebase
  iconType: string;   // icon name string in antd
  routes: SubRouteConfig[]; // sub pages route config under root path
};

type SubRouteConfig = {
  path: string;
  routeOptions : object;  // react router's <Route>'s props
  component: React.ComponentType; // usage component in this route, e.g. Form, List 
  props: object;  // props which will inject to usage component
};
```

export it from src/configs/index.js

``` js
...
import [new section config] from './[new section config path]';

export default {
  ...,
  [new seciion config],
};
```

## Input Component

### Types

Set in src/contants.js

* Current types

``` js
IMG: Symbol('img'), // e.g. cover, avatar
IMGS_WITH_CAPTION: Symbol('imgs-with-caption'),
FIELD: Symbol('field'),
TEXTAREA: Symbol('textarea'),
MULTI_FIELDS: Symbol('multi-fields'), // e.g. tags
MULTI_FIELDS_OF_FIELDS: Symbol('multi-fields-of-fields'), // e.g. publication, awards
```

### Current Components
* Input
  - Field
    - type: FIELD
  - TextArea
    - type: TEXTAREA
  - Both params
    ``` typescript
    type Params = {
      dataKey: string;  // binding key for antd
      validationRules: array;  // antd's validationRules
      inputProps: object; // will inject to antd component
    }
    ```
  
* DynamicInput
  - Generate multiple input fields in one label
  - type: MULTI_FIELDS
  - params
    ``` typescript
    type Params = {
      dataKey: string;  // binding key for antd
      validationRules: array;  // antd's validationRules
      isTextArea: boolean; 
      limitedFieldNums: number;
    }
    ```
* DynamicMultiInput
  - Generate multiple input field of fields in one label
  - type: MULTI_FIELDS_OF_FIELDS
  - params
    ``` typescript
    type Params = {
      dataKey: string;  // binding key for antd
      fields: {
          key: string;  // binding key for internel field
          inputParams: object;  // props inject to input component, e.g. placeholder: '...';
          validationRules: // antd's validationRules
      }[];
    }
    ```
  
* ImgUploader
  - Image input
  - Single image
    - type: IMG
  - Mutile images with caption
    - type: IMGS_WITH_CAPTION
  - params
    ``` typescript
    type Params = {
      dataKey: string;  // binding key for antd
      endpoint: string; // image upload's endpoint, e.g. /projects
      isSingleImg: boolean; // must set to false if type is IMGS_WITH_CAPTION
      withCaption: boolean; // must set to true if type is IMGS_WITH_CAPTION
    }
    ```


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

## Before develop
* ADD env.js in src/

``` bash
$ yarn
$ yarn start
```
